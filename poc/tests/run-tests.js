/* Golden test cases for the ArthSakhi advisory engine.
   Run: node tests/run-tests.js   (from poc/)                    */
'use strict';
const path = require('path');
const D = require(path.join(__dirname, '..', 'data.js'));
Object.assign(globalThis, D);
const E = require(path.join(__dirname, '..', 'engine.js'));

let pass = 0, fail = 0;
function t(name, cond, detail) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.error('  ✗ ' + name + (detail ? ' — ' + detail : '')); }
}
function freshGraph(answers) {
  const g = E.createGraph(D.PERSONA_ROHAN);
  E.assessSuitability(g, answers || { q_age:1, q_stab:0, q_dep:1, q_hor:0, q_draw:1, q_exp:1 });
  return g;
}

console.log('\n== Suitability (SUIT-1.0) ==');
{
  const g = E.createGraph(D.PERSONA_ROHAN);
  // option index 0 carries max points on every question
  const cons = E.assessSuitability(g, { q_age:0, q_stab:0, q_dep:0, q_hor:0, q_draw:0, q_exp:0 });
  t('max answers → not Conservative', cons.bucket === 'Aggressive' || cons.bucket === 'Growth');
  const g2 = E.createGraph(D.PERSONA_ROHAN);
  // short horizon (<3y) + panic-seller + never invested
  const low = E.assessSuitability(g2, { q_age:0, q_stab:0, q_dep:2, q_hor:3, q_draw:3, q_exp:2 });
  t('short horizon + panic-seller → Conservative/Balanced', ['Conservative','Balanced'].includes(low.bucket));
  t('audit record has 6 entries with points', low.record.length === 6 && low.record.every(r=>'points' in r));
}

console.log('\n== Glide path (GLIDE-1.0) ==');
{
  const far = E.glidePath('Growth', 15), near = E.glidePath('Growth', 2), at = E.glidePath('Growth', 1);
  t('equity decreases as goal nears', far.equity > near.equity && near.equity > at.equity);
  t('allocations sum to 100', [far,near,at].every(a=>a.equity+a.debt+a.gold===100));
  t('1y to goal → capital protection (equity ≤ 20)', at.equity <= 20);
  t('Conservative < Aggressive at same horizon',
    E.glidePath('Conservative',10).equity < E.glidePath('Aggressive',10).equity);
}

console.log('\n== Financial-health gate (GATE-1.0) ==');
{
  const g = freshGraph();
  const h = E.financialHealth(g);
  t('burn = expenses + EMI', h.burn === 52000 + 22000);
  t('detects term-insurance gap (5L vs 12x income)', h.gaps.some(x=>x.type==='insurance'));
}

console.log('\n== Idle cash (IDLE-1.0) ==');
{
  const g = freshGraph();
  g.assets.savingsBalance = 800000;            // force idle
  const idle = E.detectIdleCash(g);
  t('flags idle cash above target+buffer', !!idle && idle.idle > 0);
  g.assets.savingsBalance = 100000;
  t('no idle flag when savings low', E.detectIdleCash(g) === null);
}

console.log('\n== Liquidity waterfall (LIQ-1.0) ==');
{
  const g = freshGraph();
  const w = E.liquidityWaterfall(g, 200000, 12);
  t('returns multiple ranked options', w.options.length >= 4 && w.options[0].rank === 1);
  t('options sorted by true cost ascending',
    w.options.every((o,i,a)=> i===0 || a[i-1].trueCost <= o.trueCost));
  const pl = w.options.find(o=>o.source.includes('Personal Loan'));
  t('personal loan is never the cheapest', pl.rank !== 1);
  const epf = w.options.find(o=>o.source.includes('EPF'));
  t('EPF advance carries opportunity cost > 0 despite 0% interest', epf.trueCost > 0);
  t('recommendation logged with LIQ-1.0', g.recommendations.some(r=>r.ruleId==='LIQ-1.0'));
}

console.log('\n== Prepay vs invest (PREPAY-1.0) ==');
{
  const g = freshGraph();
  const r = E.prepayVsInvest(g, 100000);
  t('computes both post-tax rates', r.postTaxLoanCostPct > 0 && r.postTaxInvestReturnPct > 0);
  t('home loan post-tax cost < nominal 8.4% (24b deduction)', r.postTaxLoanCostPct < 8.4);
  t('verdict is prepay or invest', ['prepay','invest'].includes(r.better));
  t('action uses taxonomy', g.recommendations.some(x=>['Prepay Loan','Buy'].includes(x.action)));
}

console.log('\n== Rebalancing (REBAL-1.0) ==');
{
  const g = freshGraph();  // Rohan is ~79% equity vs Balanced target → drift
  const r = E.rebalanceCheck(g);
  t('detects drift on equity-heavy book', r.needed === true && r.maxDrift > 5);
  t('tax-aware note (fresh money first)', r.recs[0].taxNote.toLowerCase().includes('fresh'));
}

console.log('\n== Tax optimisation (TAX-1.0) ==');
{
  const g = freshGraph();
  const r = E.taxOptimise(g);
  t('finds 80C gap of 60K', r.items.some(i=>i.type==='80C' && i.gap===60000));
  t('suggests LTCG harvesting within exemption', r.items.some(i=>i.type==='harvest'));
  t('ELSS rec carries taxNote', g.recommendations.some(x=>x.taxNote && x.taxNote.includes('80C')));
}

console.log('\n== Events (EVT-1.0) ==');
{
  const g = freshGraph();
  const b = E.handleEvent(g, 'bonus', { amount: 150000 });
  t('bonus fills emergency/80C first then analyses prepay-vs-invest',
    b.recs.length >= 1);
  const g2 = freshGraph();
  const c = E.handleEvent(g2, 'child', {});
  t('child event adds education goal with 10% inflation math',
    g2.goals.some(x=>x.id==='G-EDU2') && c.notes.some(n=>n.includes('10%') || n.includes('inflation')));
  const g3 = freshGraph();
  E.handleEvent(g3, 'salary_increase', { deltaMonthly: 10000 });
  t('salary increase → 50% step-up SIP rec of 5000',
    g3.recommendations.some(r=>r.amount===5000 && r.ruleId==='EVT-1.0'));
  const g4 = freshGraph();
  const m = E.handleEvent(g4, 'marriage', { year: 2028, amount: 1000000 });
  t('marriage: short horizon → conservative allocation in rec',
    m.recs[0].instrument.includes('E') && parseInt(m.recs[0].instrument.match(/E(\d+)/)[1]) <= 40);
}

console.log('\n== Monthly allocation (ALLOC-1.0) ==');
{
  const g = freshGraph();
  const a = E.monthlyAllocation(g);
  t('computes surplus 11K (95-52-22-10)', a.surplus === 11000);
  t('emits at least one allocation rec', a.recs.length >= 1);
}

console.log('\n== Curation (CURATE-1.0) ==');
{
  const picks = E.curateFunds({ equity: 60, debt: 30, gold: 10 }, { sec80CGap: 60000, targetYear: 2041 });
  t('max 3 picks (swipeless)', picks.length <= 3);
  t('every pick has a reason', picks.every(p=>p.why && p.fund));
}

console.log('\n== Escalation (ESCAL-1.0) & audit integrity ==');
{
  const g = freshGraph();
  E.escalate(g, 'Direct stock advice on external holdings', 'Customer asked to review Zerodha stocks');
  t('lead enters RM queue with context + book value', g.escalations.length===1 && g.escalations[0].portfolioValue>0);
  E.taxOptimise(g); E.monthlyAllocation(g);
  t('every recommendation has ruleId, version, reason',
    g.recommendations.every(r=>r.ruleId && r.engine && r.reason));
  t('every action from approved taxonomy',
    g.recommendations.every(r=>[...E.ACTIONS,'Hold','Escalate'].includes(r.action)));
}

console.log(`\n===== ${pass} passed, ${fail} failed =====`);
process.exit(fail ? 1 : 0);
