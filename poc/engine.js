/* ================================================================
   ArthSakhi PoC — Deterministic Advisory Engine
   Implements spec-input-kartik-methodology.md (BINDING):
   Client Graph · 7 capabilities · action taxonomy · glide paths ·
   Persistent Investment Intelligence event loop.
   Every recommendation carries {action, amount, instrument, reason,
   ruleId+version, goalId, taxNote} → audit trail.
   The LLM/avatar layer NEVER computes advice; it only explains
   what this engine returns. (D4/D5 architecture)
   METHODOLOGY STATUS: DRAFT — pending Kartik CA review.
   ================================================================ */
(function (root) {
'use strict';

const isNode = typeof module !== 'undefined';
const D = isNode ? require('./data.js')
                 : { CONSTANTS: root.CONSTANTS, FUNDS: root.FUNDS,
                     BANK_PRODUCTS: root.BANK_PRODUCTS, PERSONA_ROHAN: root.PERSONA_ROHAN };
const { CONSTANTS: C, FUNDS, BANK_PRODUCTS } = D;

const ENGINE_VERSION = 'ENGINE-0.9-DRAFT';

/* ---------------- Rules registry (audit ids) ---------------- */
const RULES = {
  'SUIT-1.0':  'Suitability scoring: 6-question conversational assessment mapped to risk bucket',
  'GATE-1.0':  'Financial-health gate: emergency fund + insurance before goal investing',
  'GLIDE-1.0': 'Goal glide path: allocation = f(risk bucket, years to goal), de-risk inside 10y',
  'ALLOC-1.0': 'Monthly capital allocation: surplus split across goals by priority & funding gap',
  'IDLE-1.0':  'Idle cash: savings above emergency target + buffer → deployment suggestion',
  'LIQ-1.0':   'Liquidity waterfall: rank funding options by true post-tax/opportunity cost',
  'PREPAY-1.0':'Prepay-vs-invest: compare post-tax loan cost vs expected post-tax portfolio return',
  'REBAL-1.0': 'Rebalancing: drift > threshold triggers corrective actions, fresh-money-first',
  'TAX-1.0':   '80C gap fill via ELSS; LTCG harvesting within annual exemption',
  'EVT-1.0':   'Event-based planning: salary increase / bonus / marriage / child / home purchase',
  'CURATE-1.0':'Curation: max 3 funds from approved list matching target allocation',
  'ESCAL-1.0': 'Escalation: out-of-universe or complex needs route to RM with context',
};

const ACTIONS = ['Buy','Sell','Redeem','Transfer','Rebalance','Harvest Loss','Prepay Loan'];

/* ---------------- Client Graph ---------------- */
function createGraph(persona) {
  return {
    schema: 'GRAPH-1.0',
    profile: { id: persona.id, name: persona.name, age: persona.age,
               city: persona.city, lang: persona.lang },
    income: { ...persona.income },
    expenses: { ...persona.expenses },
    assets: JSON.parse(JSON.stringify(persona.assets)),
    liabilities: JSON.parse(JSON.stringify(persona.liabilities)),
    insurance: { ...persona.insurance },
    taxes: { ...persona.taxes },
    goals: JSON.parse(JSON.stringify(persona.goals)),
    riskProfile: null,            // set by suitability
    strategy: null,               // standing strategy (set after onboarding)
    interactions: [],             // conversational memory (episodic)
    recommendations: [],          // every advice given, audit-grade
    events: [],                   // detected/user-declared life & money events
    escalations: [],              // RM lead queue entries
  };
}

function log(graph, kind, payload) {
  const entry = { ts: new Date().toISOString(), kind, ...payload };
  graph.interactions.push(entry);
  return entry;
}

function recommend(graph, rec) {
  const full = {
    ts: new Date().toISOString(),
    engine: ENGINE_VERSION,
    action: rec.action, amount: Math.round(rec.amount || 0),
    instrument: rec.instrument || null, reason: rec.reason,
    ruleId: rec.ruleId, rule: RULES[rec.ruleId],
    goalId: rec.goalId || null, taxNote: rec.taxNote || null,
    status: 'proposed',
  };
  if (!ACTIONS.includes(full.action) && full.action !== 'Hold' && full.action !== 'Escalate')
    throw new Error('Unknown action: ' + full.action);
  graph.recommendations.push(full);
  return full;
}

/* ---------------- Money math helpers ---------------- */
const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');
const fv = (pv, r, y) => pv * Math.pow(1 + r, y);
/* monthly SIP needed to reach target in y years at annual return r */
function sipFor(target, r, y) {
  const i = r / 12, n = Math.max(1, Math.round(y * 12));
  return target * i / (Math.pow(1 + i, n) - 1);
}

/* ---------------- 1) Suitability (SUIT-1.0) ---------------- */
const SUITABILITY_QS = [
  { id:'q_age', q:'Aapki age?', opts:[['<30',3],['30-45',2],['45-60',1],['60+',0]] },
  { id:'q_stab', q:'Income kitni stable hai?',
    opts:[['Fixed salary',2],['Mostly stable',1],['Seasonal/uncertain',0]] },
  { id:'q_dep', q:'Kitne log aap par depend karte hain?', opts:[['None',2],['1-2',1],['3+',0]] },
  { id:'q_hor', q:'Paisa mostly kab chahiye hoga?', opts:[['10y+',3],['5-10y',2],['3-5y',1],['<3y',0]] },
  { id:'q_draw', q:'₹1L invest kiya, 6 mahine baad ₹80K ho gaya. Aap?',
    opts:[['Aur kharidunga',3],['Hold karunga',2],['Thoda bechunga',1],['Sab bech dunga',0]] },
  { id:'q_exp', q:'Pehle kabhi MF/shares liye hain?', opts:[['Regularly',2],['Kabhi kabhi',1],['Never',0]] },
];

function assessSuitability(graph, answers) {
  // answers: {qid: optionIndex}
  let score = 0; const record = [];
  for (const q of SUITABILITY_QS) {
    const idx = answers[q.id]; const [label, pts] = q.opts[idx];
    score += pts; record.push({ q: q.q, answer: label, points: pts });
  }
  let bucket;
  if (score <= 4) bucket = 'Conservative';
  else if (score <= 8) bucket = 'Balanced';
  else if (score <= 12) bucket = 'Growth';
  else bucket = 'Aggressive';
  graph.riskProfile = { bucket, score, record, ruleId:'SUIT-1.0',
                        version: ENGINE_VERSION, ts: new Date().toISOString() };
  graph.strategy = { riskBucket: bucket, reviewEveryDays: 180,
                     note: 'Standing strategy; events perturb, engine re-plans.' };
  log(graph, 'suitability', { bucket, score });
  return graph.riskProfile;
}

/* ---------------- 2) Financial-health gate (GATE-1.0) ---------------- */
function financialHealth(graph) {
  const burn = graph.expenses.monthly + graph.liabilities.reduce((s,l)=>s+l.emi,0);
  const emergencyTarget = burn * C.thresholds.emergencyMonths;
  const liquid = graph.assets.savingsBalance +
                 graph.assets.mf.filter(m=>m.class==='liquid').reduce((s,m)=>s+m.value,0);
  const months = liquid / burn;
  const gaps = [];
  if (liquid < emergencyTarget)
    gaps.push({ type:'emergency', shortfall: emergencyTarget - liquid,
      msg:`Emergency fund ${months.toFixed(1)} months vs ${C.thresholds.emergencyMonths} target` });
  const coverNeeded = graph.income.salaryMonthly * 12 * C.thresholds.termCoverMultiple;
  if (graph.insurance.termCover < coverNeeded)
    gaps.push({ type:'insurance', shortfall: coverNeeded - graph.insurance.termCover,
      msg:`Term cover ${fmt(graph.insurance.termCover)} vs ~${fmt(coverNeeded)} needed (${C.thresholds.termCoverMultiple}x income)` });
  return { burn, emergencyTarget, liquid, months, gaps, ruleId:'GATE-1.0' };
}

/* ---------------- 3) Glide path (GLIDE-1.0) ---------------- */
/* DRAFT — CA review. Base equity by bucket; linear de-risk inside 10 years to goal. */
function glidePath(bucket, yearsToGoal) {
  const base = { Conservative:35, Balanced:50, Growth:65, Aggressive:75 }[bucket];
  let equity;
  if (yearsToGoal >= 10) equity = Math.min(base + 5, 80);
  else if (yearsToGoal <= 1) equity = 15;
  else equity = 15 + (base - 15) * (yearsToGoal - 1) / 9;   // linear ramp 1y→10y
  equity = Math.round(equity);
  const gold = yearsToGoal >= 3 ? 10 : 5;
  const debt = 100 - equity - gold;
  return { equity, debt, gold, ruleId:'GLIDE-1.0' };
}

function goalMath(goal) {
  const nowY = 2026;
  const years = Math.max(0.5, goal.targetYear - nowY);
  const infl = C.inflation[goal.inflation] ?? C.inflation.general;
  const target = fv(goal.targetAmountToday, infl, years);
  const growTo = fv(goal.fundedValue, C.expectedReturns.hybrid, years);
  const gap = Math.max(0, target - growTo);
  const sipNeeded = sipFor(gap, C.expectedReturns.hybrid, years);
  return { years, target, gap, sipNeeded,
           fundedPct: Math.min(100, Math.round(100 * growTo / target)) };
}

/* ---------------- 4) Curation (CURATE-1.0) — max 3, with reasons ------- */
function curateFunds(alloc, opts = {}) {
  const picks = [];
  if (opts.sec80CGap > 0)
    picks.push({ fund: FUNDS.find(f=>f.id==='F-ELSS'),
      why:`Fills ₹${Math.round(opts.sec80CGap/1000)}K of your 80C gap while giving equity growth` });
  if (alloc.equity >= 50 && !picks.length)
    picks.push({ fund: FUNDS.find(f=>f.id==='F-LM250'),
      why:'Low-cost broad-market core for the equity portion' });
  if (opts.targetYear) {
    const td = FUNDS.find(f=>f.targetYear && Math.abs(f.targetYear-opts.targetYear)<=3);
    if (td) picks.push({ fund: td,
      why:`One-fund option: auto de-risks toward ${td.targetYear}, equity taxation throughout` });
  }
  if (alloc.debt >= 25)
    picks.push({ fund: FUNDS.find(f=>f.id==='F-GILT'),
      why:'G-Sec exposure for the stability portion' });
  if (alloc.gold >= 10)
    picks.push({ fund: FUNDS.find(f=>f.id==='F-GOLD'),
      why:'Gold allocation per your plan (no lockers needed)' });
  return picks.slice(0, 3);   // swipeless: never more than 3
}

/* ---------------- 5) Monthly capital allocation (ALLOC-1.0) ------------ */
function monthlyAllocation(graph) {
  const health = financialHealth(graph);
  const emi = graph.liabilities.reduce((s,l)=>s+l.emi,0);
  const sips = graph.goals.reduce((s,g)=>s+g.sipMonthly,0);
  const surplus = graph.income.salaryMonthly - graph.expenses.monthly - emi - sips;
  const recs = [];
  let free = Math.max(0, surplus);
  // Gate first: top up emergency fund before growth investing
  if (health.gaps.some(g=>g.type==='emergency') && free > 0) {
    const amt = Math.min(free, Math.round(health.gaps.find(g=>g.type==='emergency').shortfall/6));
    recs.push(recommend(graph, { action:'Buy', amount: amt, instrument:'Liquid Fund (F-LIQ)',
      reason:'Financial-health gate: build emergency fund to 6 months before growth investing',
      ruleId:'GATE-1.0' }));
    free -= amt;
  }
  // Then goals by priority, weighted by funding gap
  const goals = [...graph.goals].sort((a,b)=>a.priority-b.priority);
  for (const g of goals) {
    if (free <= 500) break;
    const m = goalMath(g);
    const need = Math.max(0, m.sipNeeded - g.sipMonthly);
    if (need > 500) {
      const amt = Math.min(free, need);
      const alloc = glidePath(graph.riskProfile.bucket, m.years);
      recs.push(recommend(graph, { action:'Buy', amount: amt,
        instrument:`SIP step-up per glide path E${alloc.equity}/D${alloc.debt}/G${alloc.gold}`,
        reason:`${g.name} is ${m.fundedPct}% funded; needs ~${fmt(m.sipNeeded)}/mo total`,
        ruleId:'ALLOC-1.0', goalId: g.id }));
      free -= amt;
    }
  }
  return { surplus, health, recs, ruleId:'ALLOC-1.0' };
}

/* ---------------- 6) Idle cash / cash management (IDLE-1.0) ------------ */
function detectIdleCash(graph) {
  const health = financialHealth(graph);
  const buffer = health.burn * C.thresholds.idleCashMonths;
  const idle = graph.assets.savingsBalance - health.emergencyTarget - buffer;
  if (idle < 25000) return null;
  const yearlyLoss = idle * (C.expectedReturns.debt - C.rates.savingsIdle);
  return { idle, yearlyLoss,
    msg:`${fmt(idle)} sitting idle beyond emergency target + buffer, losing ~${fmt(yearlyLoss)}/yr vs debt funds`,
    ruleId:'IDLE-1.0' };
}

/* ---------------- 7) Liquidity waterfall (LIQ-1.0) --------------------- */
/* Kartik's EPF chain, upgraded: rank ALL funding options by true cost.    */
function liquidityWaterfall(graph, amountNeeded, horizonMonths = 12) {
  const y = horizonMonths / 12;
  const options = [];
  // EPF advance: 0% interest but retirement compounding lost (to age 58)
  const yrsToRetire = 58 - graph.profile.age;
  const epfMax = graph.assets.epfBalance * 0.75;
  if (epfMax > 0) options.push({
    source:'EPF advance (EPFO, purpose-bound)', available: epfMax,
    explicitCostPct: 0,
    trueCost: fv(Math.min(amountNeeded, epfMax), C.rates.epf, yrsToRetire) - Math.min(amountNeeded, epfMax),
    note:`0% interest, but ${fmt(Math.min(amountNeeded,epfMax))} stops compounding at 8.25% for ${yrsToRetire}y till retirement`,
  });
  // Loan against FD
  const fdTotal = graph.assets.fds.reduce((s,f)=>s+f.amount,0);
  if (fdTotal > 0) options.push({
    source: BANK_PRODUCTS.loanAgainstFD.name, available: fdTotal * 0.9,
    explicitCostPct: C.rates.loanAgainstFD * 100,
    trueCost: amountNeeded * (C.rates.loanAgainstFD - C.rates.fd) * y,
    note:`Pay ${(C.rates.loanAgainstFD*100).toFixed(1)}% but FD keeps earning ${(C.rates.fd*100).toFixed(1)}% — net cost ~${((C.rates.loanAgainstFD-C.rates.fd)*100).toFixed(1)}%`,
  });
  // Loan against MF
  const mfTotal = graph.assets.mf.reduce((s,m)=>s+m.value,0);
  if (mfTotal > 0) options.push({
    source: BANK_PRODUCTS.loanAgainstMF.name, available: mfTotal * 0.5,
    explicitCostPct: C.rates.loanAgainstMF * 100,
    trueCost: amountNeeded * (C.rates.loanAgainstMF - C.expectedReturns.hybrid) * y,
    note:`Portfolio stays invested & compounding; no capital-gains event triggered`,
  });
  // Break FD
  if (fdTotal > 0) options.push({
    source:'Break FD prematurely', available: fdTotal,
    explicitCostPct: C.rates.fdBreakPenalty * 100,
    trueCost: amountNeeded * (C.rates.fdBreakPenalty + C.rates.fd * 0.5) * y,
    note:`~1% penalty + lower slab rate on tenure actually run; FD compounding ends`,
  });
  // Redeem MF
  if (mfTotal > 0) {
    const ltGain = graph.assets.mf.reduce((s,m)=>s+(m.gainLT||0),0);
    const taxable = Math.max(0, ltGain - C.tax.ltcgEquityExemption);
    options.push({
      source:'Redeem MF units', available: mfTotal,
      explicitCostPct: 0,
      trueCost: amountNeeded * C.expectedReturns.hybrid * y + taxable * C.tax.ltcgEquityRate,
      note: taxable>0 ? `LTCG tax ${fmt(taxable*C.tax.ltcgEquityRate)} + lost compounding`
                      : `No LTCG tax (within ₹1.25L exemption) but compounding lost`,
    });
  }
  // Personal loan
  options.push({
    source: BANK_PRODUCTS.personalLoan.name, available: Infinity,
    explicitCostPct: C.rates.personalLoan * 100,
    trueCost: amountNeeded * C.rates.personalLoan * y,
    note:'Fastest but most expensive; keeps all assets intact',
  });
  options.sort((a,b)=>a.trueCost-b.trueCost);
  options.forEach((o,i)=>o.rank=i+1);
  recommend(graph, { action:'Transfer', amount: amountNeeded,
    instrument: options[0].source,
    reason:`Cheapest true-cost source for ${fmt(amountNeeded)} over ${horizonMonths} months: ${options[0].note}`,
    ruleId:'LIQ-1.0',
    taxNote: options[0].source.includes('Redeem') ? 'LTCG computed above' : 'No capital-gains event' });
  return { amountNeeded, horizonMonths, options, ruleId:'LIQ-1.0' };
}

/* ---------------- 8) Prepay vs invest (PREPAY-1.0) --------------------- */
function prepayVsInvest(graph, lumpsum) {
  const loan = graph.liabilities[0];
  if (!loan) return null;
  // Home loan: interest deductible u/s 24(b) up to 2L (old regime) → post-tax cost
  const deductible = loan.type === 'homeLoan' && graph.taxes.regime === 'old';
  const postTaxLoanCost = deductible ? loan.rate * (1 - C.tax.slabAssumed) : loan.rate;
  const postTaxInvestReturn = C.expectedReturns.hybrid * (1 - 0.10); // rough LTCG haircut
  const better = postTaxInvestReturn > postTaxLoanCost ? 'invest' : 'prepay';
  const spreadPct = Math.abs(postTaxInvestReturn - postTaxLoanCost) * 100;
  const result = { lumpsum, loan: loan.name,
    postTaxLoanCostPct: +(postTaxLoanCost*100).toFixed(2),
    postTaxInvestReturnPct: +(postTaxInvestReturn*100).toFixed(2),
    better, spreadPct: +spreadPct.toFixed(2),
    note: deductible ? 'Home-loan interest deduction u/s 24(b) makes effective loan cost lower (old regime)'
                     : 'No interest deduction assumed',
    ruleId:'PREPAY-1.0' };
  recommend(graph, {
    action: better==='prepay' ? 'Prepay Loan' : 'Buy',
    amount: lumpsum,
    instrument: better==='prepay' ? loan.name : 'Glide-path portfolio',
    reason:`Post-tax: invest ~${result.postTaxInvestReturnPct}% vs loan ~${result.postTaxLoanCostPct}% → ${better} wins by ${result.spreadPct}pp`,
    ruleId:'PREPAY-1.0', taxNote: result.note });
  return result;
}

/* ---------------- 9) Rebalancing (REBAL-1.0) --------------------------- */
function rebalanceCheck(graph) {
  const g = graph.goals[0]; const m = goalMath(g);
  const target = glidePath(graph.riskProfile.bucket, m.years);
  const mf = graph.assets.mf;
  const total = mf.reduce((s,x)=>s+x.value,0);
  const cur = {
    equity: Math.round(100 * mf.filter(x=>x.class==='equity').reduce((s,x)=>s+x.value,0) / total),
    debt:   Math.round(100 * mf.filter(x=>x.class==='debt').reduce((s,x)=>s+x.value,0) / total),
    gold:   Math.round(100 * mf.filter(x=>x.class==='gold').reduce((s,x)=>s+x.value,0) / total),
  };
  const drift = { equity: cur.equity - target.equity, debt: cur.debt - target.debt,
                  gold: cur.gold - target.gold };
  const maxDrift = Math.max(...Object.values(drift).map(Math.abs));
  const needed = maxDrift > C.thresholds.driftPp;
  let recs = [];
  if (needed) {
    const over = Object.entries(drift).sort((a,b)=>b[1]-a[1])[0][0];
    const under = Object.entries(drift).sort((a,b)=>a[1]-b[1])[0][0];
    const amt = total * maxDrift / 100;
    recs.push(recommend(graph, { action:'Rebalance', amount: amt,
      instrument:`${over} → ${under}`,
      reason:`Portfolio ${cur.equity}/${cur.debt}/${cur.gold} vs target ${target.equity}/${target.debt}/${target.gold} (drift ${maxDrift}pp > ${C.thresholds.driftPp}pp)`,
      ruleId:'REBAL-1.0',
      taxNote:'Prefer routing FRESH SIPs to underweight class first — avoids LTCG event; sell only if drift persists' }));
  }
  return { cur, target, drift, maxDrift, needed, recs, ruleId:'REBAL-1.0' };
}

/* ---------------- 10) Tax optimisation (TAX-1.0) ----------------------- */
function taxOptimise(graph) {
  const out = { ruleId:'TAX-1.0', items: [] };
  const gap80C = Math.max(0, C.tax.sec80CLimit - graph.taxes.sec80CUsed);
  if (gap80C > 0) {
    out.items.push({ type:'80C', gap: gap80C,
      msg:`80C gap ${fmt(gap80C)} → ELSS saves ~${fmt(gap80C * C.tax.slabAssumed)} tax at 30% slab (3y lock-in)` });
    recommend(graph, { action:'Buy', amount: gap80C, instrument:'ELSS Tax Saver (F-ELSS)',
      reason:`Unused 80C of ${fmt(gap80C)}; saves ~${fmt(gap80C*C.tax.slabAssumed)} tax this FY`,
      ruleId:'TAX-1.0', taxNote:'Sec 80C, old regime; 3-year lock-in applies' });
  }
  const ltGain = graph.assets.mf.reduce((s,m)=>s+(m.gainLT||0),0);
  const harvestable = Math.min(ltGain, C.tax.ltcgEquityExemption);
  if (harvestable > 10000) {
    out.items.push({ type:'harvest', amount: harvestable,
      msg:`Harvest ${fmt(harvestable)} LTCG tax-free within ₹1.25L annual exemption, re-buy next day — resets cost base` });
    recommend(graph, { action:'Harvest Loss', amount: harvestable,
      instrument:'Equity MF units (gain harvesting)',
      reason:'Use the ₹1.25L LTCG exemption before FY end; re-purchase resets acquisition cost',
      ruleId:'TAX-1.0', taxNote:'LTCG within exemption = zero tax; watch exit loads/STT' });
  }
  return out;
}

/* ---------------- 11) Event-based planning (EVT-1.0) ------------------- */
function handleEvent(graph, type, params = {}) {
  graph.events.push({ ts: new Date().toISOString(), type, params });
  const out = { type, recs: [], notes: [], ruleId:'EVT-1.0' };
  if (type === 'salary_increase') {
    const delta = params.deltaMonthly || Math.round(graph.income.salaryMonthly * 0.10);
    graph.income.salaryMonthly += delta;
    const stepUp = Math.round(delta * 0.5);
    out.recs.push(recommend(graph, { action:'Buy', amount: stepUp,
      instrument:'SIP step-up across goals',
      reason:`Salary up ${fmt(delta)}/mo — lock 50% before lifestyle absorbs it (pay-yourself-first)`,
      ruleId:'EVT-1.0' }));
  }
  if (type === 'bonus') {
    const amt = params.amount || graph.income.bonusExpected;
    const health = financialHealth(graph);
    let rest = amt;
    const eGap = health.gaps.find(g=>g.type==='emergency');
    if (eGap) { const t = Math.min(rest, eGap.shortfall);
      out.recs.push(recommend(graph,{action:'Buy',amount:t,instrument:'Liquid Fund (F-LIQ)',
        reason:'Bonus first fills emergency-fund gap (health gate)',ruleId:'GATE-1.0'})); rest-=t; }
    const gap80C = Math.max(0, C.tax.sec80CLimit - graph.taxes.sec80CUsed);
    if (gap80C>0 && rest>0){ const t=Math.min(rest,gap80C);
      out.recs.push(recommend(graph,{action:'Buy',amount:t,instrument:'ELSS Tax Saver (F-ELSS)',
        reason:`80C gap ${fmt(gap80C)} — instant ~30% tax saving on this slice`,
        ruleId:'TAX-1.0',taxNote:'Sec 80C; 3y lock-in'})); rest-=t; }
    if (rest>0) { out.prepayAnalysis = prepayVsInvest(graph, rest); }
  }
  if (type === 'marriage') {
    graph.goals.push({ id:'G-WED', name:'Wedding', targetYear: params.year || 2028,
      targetAmountToday: params.amount || 1200000, inflation:'wedding',
      priority: 1, fundedValue: 0, sipMonthly: 0 });
    const m = goalMath(graph.goals[graph.goals.length-1]);
    out.notes.push(`Wedding ${params.year||2028}: inflated target ${fmt(m.target)}, needs ~${fmt(m.sipNeeded)}/mo`);
    out.recs.push(recommend(graph,{action:'Buy',amount:m.sipNeeded,
      instrument:`Short-horizon mix (debt-tilted: E${glidePath(graph.riskProfile.bucket,m.years).equity}%)`,
      reason:'New goal registered; short horizon → conservative glide from day one',
      ruleId:'GLIDE-1.0', goalId:'G-WED'}));
  }
  if (type === 'child') {
    graph.goals.push({ id:'G-EDU2', name:"Child's education", targetYear: 2044,
      targetAmountToday: 2500000, inflation:'education', priority:1, fundedValue:0, sipMonthly:0 });
    const m = goalMath(graph.goals[graph.goals.length-1]);
    out.notes.push(`Education 2044 @10% inflation: target ${fmt(m.target)} — start ${fmt(m.sipNeeded)}/mo now`);
    const coverNeeded = graph.income.salaryMonthly*12*C.thresholds.termCoverMultiple - graph.insurance.termCover;
    if (coverNeeded>0) out.notes.push(`Term cover gap now ${fmt(coverNeeded)} — protection BEFORE investing (gate)`);
    out.recs.push(recommend(graph,{action:'Buy',amount:m.sipNeeded,
      instrument:'Target 2041 Lifecycle Fund (F-TD2041) or glide-path SIP',
      reason:'18-year horizon: growth tilt now, auto de-risk near goal; education inflation 10% priced in',
      ruleId:'GLIDE-1.0', goalId:'G-EDU2'}));
  }
  if (type === 'home_purchase') {
    const price = params.price || 6000000; const dp = price * 0.20;
    const yr = params.year || 2030;
    graph.goals.push({ id:'G-HOME', name:'Home down payment', targetYear: yr,
      targetAmountToday: dp, inflation:'property', priority:1, fundedValue:0, sipMonthly:0 });
    const m = goalMath(graph.goals[graph.goals.length-1]);
    out.notes.push(`20% down payment ${fmt(dp)} by ${yr} (+~7% stamp/registration on top): ~${fmt(m.sipNeeded)}/mo, debt-tilted`);
    out.recs.push(recommend(graph,{action:'Buy',amount:m.sipNeeded,
      instrument:`Debt-tilted mix (E${glidePath(graph.riskProfile.bucket,m.years).equity}%)`,
      reason:'Capital-protection matters more than growth for a dated, non-negotiable goal',
      ruleId:'GLIDE-1.0', goalId:'G-HOME'}));
  }
  return out;
}

/* ---------------- 12) Escalation to RM (ESCAL-1.0) --------------------- */
function escalate(graph, topic, context) {
  const lead = { ts: new Date().toISOString(), customer: graph.profile.name,
    custId: graph.profile.id, topic, context,
    riskBucket: graph.riskProfile?.bucket || 'unprofiled',
    portfolioValue: graph.assets.mf.reduce((s,m)=>s+m.value,0) +
                    graph.assets.fds.reduce((s,f)=>s+f.amount,0) +
                    graph.assets.savingsBalance,
    status:'new', ruleId:'ESCAL-1.0' };
  graph.escalations.push(lead);
  recommend(graph, { action:'Escalate', amount:0, instrument:'RM / Wealth desk',
    reason:`Out-of-universe or complex need: ${topic}. Full context handed to RM.`,
    ruleId:'ESCAL-1.0' });
  return lead;
}

/* ---------------- Persistent Investment Intelligence loop -------------- */
/* One call = "what should the avatar proactively surface right now?"      */
function standingInsights(graph) {
  const insights = [];
  const idle = detectIdleCash(graph);
  if (idle) insights.push({ kind:'idle_cash', ...idle });
  const fdSoon = graph.assets.fds.find(f=>f.maturesInDays <= 30);
  if (fdSoon) insights.push({ kind:'fd_maturity',
    msg:`FD of ${fmt(fdSoon.amount)} matures in ${fdSoon.maturesInDays} days — decide before it auto-renews at ${(C.rates.fd*100).toFixed(1)}%`,
    ruleId:'IDLE-1.0' });
  const reb = rebalanceCheck(graph);
  if (reb.needed) insights.push({ kind:'drift',
    msg:`Portfolio drifted ${reb.maxDrift}pp from your glide path`, ruleId:'REBAL-1.0' });
  const tax = taxOptimiseDry(graph);
  if (tax.length) insights.push({ kind:'tax', msg: tax[0], ruleId:'TAX-1.0' });
  return insights.slice(0, 3);   // anti-spam budget: max 3 proactive items
}
function taxOptimiseDry(graph) {   // non-mutating peek for insights
  const msgs = [];
  const gap = Math.max(0, C.tax.sec80CLimit - graph.taxes.sec80CUsed);
  if (gap>0) msgs.push(`${fmt(gap)} of 80C still unused — ~${fmt(gap*C.tax.slabAssumed)} tax on the table`);
  return msgs;
}

/* ---------------- exports ---------------- */
const Engine = { ENGINE_VERSION, RULES, ACTIONS, SUITABILITY_QS,
  createGraph, log, recommend, fmt, fv, sipFor,
  assessSuitability, financialHealth, glidePath, goalMath, curateFunds,
  monthlyAllocation, detectIdleCash, liquidityWaterfall, prepayVsInvest,
  rebalanceCheck, taxOptimise, handleEvent, escalate, standingInsights };

if (isNode) module.exports = Engine; else root.Engine = Engine;
})(typeof window !== 'undefined' ? window : globalThis);
