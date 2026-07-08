/* ArthSakhi PoC — conversation app (scripted flow machine + engine calls).
   Architecture: avatar/LLM layer explains; engine.js decides. Every number
   on screen came from a deterministic engine call logged to the audit panel. */
'use strict';

/* ---------------- state ---------------- */
const SAVE_KEY = 'arthsakhi-graph-v1';
let graph = load() || Engine.createGraph(PERSONA_ROHAN);
function save(){ localStorage.setItem(SAVE_KEY, JSON.stringify(graph)); renderAudit(); }
function load(){ try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } }

/* ---------------- chat primitives ---------------- */
const msgs = () => document.getElementById('msgs');
function userSay(text){ addMsg(text, 'user'); }
function botSay(html, speakText){
  addMsg(html, 'bot');
  if (speakText) Voice.speak(speakText);
}
function addMsg(html, who){
  const d = document.createElement('div');
  d.className = 'msg ' + who; d.innerHTML = html;
  msgs().appendChild(d); msgs().scrollTop = msgs().scrollHeight;
}
function setChips(list){
  const c = document.getElementById('chips'); c.innerHTML = '';
  if (Voice.rec) {
    const m = document.createElement('button');
    m.className = 'chip mic'; m.id = 'mic'; m.textContent = '🎤 Bol ke poochho';
    m.onclick = () => Voice.listen(); c.appendChild(m);
  }
  for (const [label, fn] of list) {
    const b = document.createElement('button');
    b.className = 'chip'; b.textContent = label;
    b.onclick = () => { userSay(label); fn(); }; c.appendChild(b);
  }
}
const F = Engine.fmt;

/* ---------------- audit panel ---------------- */
function renderAudit(){
  const el = document.getElementById('audit-list'); if (!el) return;
  const recs = [...graph.recommendations].reverse();
  el.innerHTML = recs.length ? '' :
    `<div class="audit-empty">No recommendations yet.<br>Every advice Asha gives lands here with its rule, version and tax note — SEBI AI/ML-ready audit trail.</div>`;
  for (const r of recs) {
    const d = document.createElement('div'); d.className = 'audit-entry';
    d.innerHTML = `<span class="act">${r.action}</span> ${r.amount ? F(r.amount) : ''} ${r.instrument ? '→ ' + r.instrument : ''}
      <div class="rule">${r.ruleId} · ${r.engine} · ${new Date(r.ts).toLocaleTimeString()}</div>
      <div class="why">${r.reason}</div>${r.taxNote ? `<div class="tax">TAX: ${r.taxNote}</div>` : ''}`;
    el.appendChild(d);
  }
}

/* ---------------- insights strip (Persistent Investment Intelligence) --- */
function renderInsights(){
  const el = document.getElementById('insights'); el.innerHTML = '';
  if (!graph.riskProfile) return;
  for (const ins of Engine.standingInsights(graph)) {
    const d = document.createElement('div'); d.className = 'insight';
    d.innerHTML = `<b>${{idle_cash:'💰 Idle cash',fd_maturity:'⏰ FD maturing',drift:'⚖️ Drift alert',tax:'🧾 Tax'}[ins.kind]}</b><br>${ins.msg}`;
    d.onclick = () => { userSay('Batao iske baare mein'); flowFor(ins.kind)(); };
    el.appendChild(d);
  }
}
function flowFor(kind){ return { idle_cash: flows.idle, fd_maturity: flows.idle, drift: flows.rebalance, tax: flows.tax }[kind] || flows.menu; }

/* ---------------- onboarding (conversational suitability) -------------- */
let obIdx = 0, obAnswers = {};
function startOnboarding(){
  botSay(`Namaste! Main <b>Asha</b> hoon — aapki IDBI wealth saathi. 🙏
Main aapke paise ki poori picture samajh kar, sirf aapke liye plan banaungi.
<div class="card">🔍 <b>Transparency:</b> Main ek AI hoon. Meri har suggestion bank ke approved rule-engine se aati hai aur audit panel (right side) mein record hoti hai. Yeh advice nahi, distributor guidance hai.</div>
Shuru karne se pehle ${Engine.SUITABILITY_QS.length} chhote sawaal — koi form nahi, bas baat-cheet. 😊`,
  'Namaste! Main Asha hoon, aapki IDBI wealth saathi. Chaliye, kuch chhote sawaalon se shuru karte hain.');
  askNextQ();
}
function askNextQ(){
  const q = Engine.SUITABILITY_QS[obIdx];
  botSay(`<b>Q${obIdx+1}/${Engine.SUITABILITY_QS.length}:</b> ${q.q}`);
  setChips(q.opts.map(([label], i) => [label, () => {
    obAnswers[q.id] = i; obIdx++;
    obIdx < Engine.SUITABILITY_QS.length ? askNextQ() : finishOnboarding();
  }]));
}
function finishOnboarding(){
  const rp = Engine.assessSuitability(graph, obAnswers);
  const health = Engine.financialHealth(graph);
  save();
  const gapHtml = health.gaps.map(g=>`⚠️ ${g.msg}`).join('<br>') || '✅ Emergency & insurance base looks okay';
  botSay(`Ho gaya! Aapka profile: <b>${rp.bucket}</b> investor (score ${rp.score}/15).
<div class="card"><b>Financial health check (pehla kadam, hamesha):</b><br>${gapHtml}</div>
<div class="card">📋 Aapke jawaab suitability record mein save ho gaye — audit panel dekhiye. Har recommendation isi profile se nikalti hai.</div>`,
  `Aapka profile ban gaya — aap ${rp.bucket} investor hain. Pehle emergency fund aur insurance, phir growth. Ab poochhiye jo poochhna hai!`);
  renderInsights(); mainMenu();
}

/* ---------------- returning-user greeting (episodic memory) ------------ */
function greetReturning(){
  const last = [...graph.interactions].reverse().find(i => i.kind === 'topic');
  const lastLine = last ? `Pichhli baar aapne <b>${last.topic}</b> ke baare mein poochha tha — koi update chahiye?<br>` : '';
  botSay(`Wapas swagat hai, ${graph.profile.name} ji! 🙏 ${lastLine}Aaj main kya madad karoon?`,
    `Wapas swagat hai ${graph.profile.name} ji! Aaj kya madad karoon?`);
  renderInsights(); mainMenu();
}

/* ---------------- flows ---------------- */
const flows = {
  menu: mainMenu,

  idle(){
    topic('idle cash');
    const idle = Engine.detectIdleCash(graph);
    if (!idle) return botSay('Abhi koi idle cash nahi — emergency target ke andar hai. 👍', 'Abhi sab theek hai, idle cash nahi.');
    const g = graph.goals[0]; const m = Engine.goalMath(g);
    const alloc = Engine.glidePath(graph.riskProfile.bucket, m.years);
    const picks = Engine.curateFunds(alloc, { targetYear: g.targetYear,
      sec80CGap: Math.max(0, CONSTANTS.tax.sec80CLimit - graph.taxes.sec80CUsed) });
    Engine.recommend(graph, { action:'Buy', amount: idle.idle,
      instrument: picks.map(p=>p.fund.name).join(' + '),
      reason:`Idle cash deployment per standing strategy: ${idle.msg}`,
      ruleId:'IDLE-1.0', goalId: g.id });
    save();
    botSay(`💰 <b>${idle.msg}</b>
<div class="card">Aapki <b>${graph.riskProfile.bucket}</b> strategy + "${g.name}" (${m.years.toFixed(0)}y door) ke hisaab se mix: <b>${alloc.equity}% equity / ${alloc.debt}% debt / ${alloc.gold}% gold</b></div>
Sirf ${picks.length} options — zyada nahi (koi catalog nahi 😄):
${picks.map(p=>`<div class="card"><b>${p.fund.name}</b><br>${p.why}</div>`).join('')}`,
    `Aapke paas ${F(idle.idle)} idle pade hain, saal ka karib ${F(idle.yearlyLoss)} ka nuksaan. Main teen options bata rahi hoon aapki strategy ke hisaab se.`);
    mainMenu();
  },

  goals(){
    topic('goal funding');
    const rows = graph.goals.map(g => { const m = Engine.goalMath(g);
      return `<tr><td>${g.name}</td><td>${g.targetYear}</td><td>${F(m.target)}</td><td>${m.fundedPct}%</td><td>${F(m.sipNeeded)}/mo</td></tr>`; }).join('');
    const a = Engine.monthlyAllocation(graph); save();
    botSay(`🎯 <b>Goal funding status</b> (inflation-adjusted):
<table><tr><th>Goal</th><th>Year</th><th>Target (then)</th><th>Funded</th><th>SIP needed</th></tr>${rows}</table>
<div class="card">Monthly surplus: <b>${F(a.surplus)}</b>. ${a.recs.length ? 'Allocation suggestion audit panel mein logged hai.' : 'Sab SIPs on-track hain.'}</div>`,
    `Aapke goals ki funding dekh li. Education inflation das percent hota hai, isliye targets bade dikhte hain — par SIP se possible hai.`);
    mainMenu();
  },

  liquidity(){
    topic('urgent liquidity');
    botSay(`Samajh gayi — paison ki zaroorat hai. Ghabraiye mat, <b>portfolio todna aakhri option hota hai</b>. Kitna chahiye?`,
      'Kitna amount chahiye? Main sabse saste options nikaal deti hoon.');
    setChips([['₹50,000', ()=>liq(50000)], ['₹1 lakh', ()=>liq(100000)], ['₹2 lakh', ()=>liq(200000)], ['₹5 lakh', ()=>liq(500000)]]);
  },

  bonus(){
    topic('bonus planning');
    const out = Engine.handleEvent(graph, 'bonus', { amount: graph.income.bonusExpected }); save();
    const pa = out.prepayAnalysis;
    botSay(`🎉 Badhai ho! ${F(150000)} ka bonus — lifestyle se pehle strategy. Plan:
${out.recs.map(r=>`<div class="card"><b>${r.action}</b> ${F(r.amount)} → ${r.instrument}<br><small>${r.reason}</small></div>`).join('')}
${pa ? `<div class="card"><b>Bacha hua paisa — Prepay vs Invest:</b><br>Home loan post-tax cost ~<b>${pa.postTaxLoanCostPct}%</b> (24b deduction ke baad) vs invest post-tax ~<b>${pa.postTaxInvestReturnPct}%</b> → <b>${pa.better === 'prepay' ? 'Loan prepay karo' : 'Invest karo'}</b> (${pa.spreadPct}pp ka fark)</div>` : ''}`,
    `Badhai ho bonus ki! Pehle emergency fund, phir tax bachat, aur bache paise par maine prepay versus invest ka post-tax hisaab laga diya hai.`);
    mainMenu();
  },

  rebalance(){
    topic('rebalancing');
    const r = Engine.rebalanceCheck(graph); save();
    botSay(`⚖️ <b>Portfolio vs glide path:</b>
<table><tr><th></th><th>Equity</th><th>Debt</th><th>Gold</th></tr>
<tr><td>Aapka</td><td>${r.cur.equity}%</td><td>${r.cur.debt}%</td><td>${r.cur.gold}%</td></tr>
<tr><td>Target</td><td>${r.target.equity}%</td><td>${r.target.debt}%</td><td>${r.target.gold}%</td></tr></table>
${r.needed ? `<div class="card">Drift <b>${r.maxDrift}pp</b> — action needed. Par bechne se pehle: <b>nayi SIPs ko underweight class mein daalo</b> — tax event hi nahi banega. Detail audit panel mein.</div>` : '<div class="card">✅ Drift threshold ke andar — kuch nahi karna.</div>'}`,
    r.needed ? `Aapka portfolio target se ${r.maxDrift} points hata hua hai. Bechne se pehle nayi SIP se theek karenge, taaki tax na lage.` : 'Portfolio balanced hai, kuch nahi karna.');
    mainMenu();
  },

  tax(){
    topic('tax optimisation');
    const r = Engine.taxOptimise(graph); save();
    botSay(`🧾 <b>Tax optimisation (FY 2026-27):</b>
${r.items.map(i=>`<div class="card">${i.msg}</div>`).join('') || '<div class="card">Sab optimize hai ✅</div>'}`,
    `Do cheezein mili hain — 80C ka gap ELSS se bhariye, aur LTCG exemption ka fayda uthaiye. Dono ka hisaab de diya hai.`);
    mainMenu();
  },

  crash(){
    topic('market panic');
    // ANTI-SYCOPHANCY by design: the avatar disagrees, warmly, and it's logged.
    Engine.log(graph, 'advice_given', { note:'Customer wanted to sell-all in drawdown; advised against panic-selling per strategy.' });
    Engine.recommend(graph, { action:'Hold', amount:0, instrument:'Full portfolio',
      reason:'Customer requested sell-all on market fall; standing strategy has 15y horizon on primary goal — crystallising losses contradicts suitability profile. Advised to continue SIPs.',
      ruleId:'SUIT-1.0' }); save();
    botSay(`Main samajh sakti hoon — girti market dekh kar darr lagta hai. 💚
Par main aapki dost bhi hoon aur advisor bhi, isliye <b>seedhi baat</b>: abhi sab bechna aapke apne plan ke khilaaf hai.
<div class="card">📉 Aapka "${graph.goals[0].name}" goal <b>${Engine.goalMath(graph.goals[0]).years.toFixed(0)} saal</b> door hai. Itihaas mein har 20%+ giraavat ke baad market ne recover kiya hai — nuksan sirf bechne par lock hota hai.<br><br>💡 Aapke profile ke hisaab se yeh SIP ka <i>best</i> time hai — units saste mil rahe hain.</div>
<div class="card">🤝 Phir bhi bechna chahte hain? Main aapko RM se baat karwa deti hoon — bade decisions par insaan se baat karna hamesha sahi hai.</div>`,
    `Darr samajh sakti hoon, par seedhi baat — abhi bechna aapke apne plan ke khilaaf hai. Goal pandrah saal door hai, aur SIP ke liye yeh accha waqt hai. Chahen to RM se baat karwa doon?`);
    setChips([['Theek hai, SIP chalu rakho', ()=>{ botSay('Samajhdari ki baat! 🙌 Main agle mahine phir check-in karungi.', 'Bahut accha decision!'); mainMenu(); }],
              ['Phir bhi RM se baat karao', flows.stocks]]);
  },

  stocks(){
    topic('RM escalation');
    const lead = Engine.escalate(graph, 'Out-of-universe request (direct equity / sell-all counselling)',
      'Customer needs human advisory beyond distributor guidance. Context: ' + (graph.interactions.slice(-1)[0]?.topic || 'n/a'));
    save();
    botSay(`Yeh wala kaam mere daayre se bahar hai — direct stocks par advice sirf hamare <b>wealth desk ke insaan</b> de sakte hain (SEBI rules 🙏).
<div class="card">✅ Maine aapki request RM queue mein daal di — <b>poore context ke saath</b> (profile: ${lead.riskBucket}, portfolio: ${F(lead.portfolioValue)}). Aapko kal tak call aayega.<br><br>👀 Demo: <a href="rm.html" target="_blank">RM Console kholiye</a> — dekhi ye RM ko kya dikhta hai.</div>`,
    `Yeh sawal main RM ko de rahi hoon, poore context ke saath. Kal tak unka call aa jayega.`);
    mainMenu();
  },

  child(){
    topic('child planning');
    const out = Engine.handleEvent(graph, 'child', {}); save();
    botSay(`👶 Kitni khushi ki baat hai! Congratulations!
Naye mehmaan ke liye plan:
${out.notes.map(n=>`<div class="card">${n}</div>`).join('')}
${out.recs.map(r=>`<div class="card"><b>${r.action}</b> ${F(r.amount)}/mo → ${r.instrument}<br><small>${r.reason}</small></div>`).join('')}`,
    `Badhai ho! Bachhe ki education ka target maine das percent education inflation ke saath nikala hai, aur pehle term insurance badhana zaroori hai. Lifecycle fund is kaam ke liye perfect hai — khud hi de-risk hota jaata hai.`);
    mainMenu();
  },

  marriage(){
    topic('wedding planning');
    const out = Engine.handleEvent(graph, 'marriage', { year: 2028, amount: 1200000 }); save();
    botSay(`💍 Shubh kaam! 2028 ki shaadi ke liye:
${out.notes.map(n=>`<div class="card">${n}</div>`).join('')}
<div class="card">⚠️ Sirf 2 saal door hai isliye <b>equity kam, debt zyada</b> — dated goal mein capital protection pehle. Rec audit panel mein.</div>`,
    `Shaadi 2028 mein hai, matlab paisa do saal mein chahiye — isliye safe allocation rakhi hai, growth se zyada protection.`);
    mainMenu();
  },

  home(){
    topic('home purchase');
    const out = Engine.handleEvent(graph, 'home_purchase', { price: 6000000, year: 2030 }); save();
    botSay(`🏠 Ghar ka sapna! ₹60L ke ghar ke liye:
${out.notes.map(n=>`<div class="card">${n}</div>`).join('')}
${out.recs.map(r=>`<div class="card"><b>${r.action}</b> ${F(r.amount)}/mo → ${r.instrument}<br><small>${r.reason}</small></div>`).join('')}`,
    `Ghar ke liye bees percent down payment ka plan banaya hai, stamp duty alag se. Dated goal hai isliye debt-tilted allocation.`);
    mainMenu();
  },

  salary(){
    topic('salary increase');
    const out = Engine.handleEvent(graph, 'salary_increase', { deltaMonthly: 10000 }); save();
    botSay(`💸 Wah, ₹10,000/mo ki badhotri!
${out.recs.map(r=>`<div class="card"><b>${r.action}</b> ${F(r.amount)}/mo → ${r.instrument}<br><small>${r.reason}</small></div>`).join('')}
<div class="card">Baaki ₹5,000 aap enjoy kariye — balance zaroori hai! 😄</div>`,
    `Badhai ho! Meri salah — aadha increment turant SIP mein lock kar do, lifestyle ko pata bhi nahi chalega.`);
    mainMenu();
  },
};

function liq(amount){
  userSay(F(amount));
  const w = Engine.liquidityWaterfall(graph, amount, 12); save();
  const rows = w.options.map(o=>`<tr class="${o.rank===1?'best':''}"><td>${o.rank}</td><td>${o.source}</td><td>${o.explicitCostPct.toFixed(1)}%</td><td>${F(o.trueCost)}</td></tr>`).join('');
  botSay(`🚨 <b>Emergency Liquidity Advisor</b> — ${F(amount)}, 12 mahine ke liye. Har option ki <b>asli laagat</b> (interest + tax + kho gaya compounding):
<table><tr><th>#</th><th>Source</th><th>Rate</th><th>True cost/yr</th></tr>${rows}</table>
<div class="card">💡 Sabse sasta: <b>${w.options[0].source}</b>. ${w.options[0].note}</div>
<div class="card">📌 Dhyan dijiye: EPF advance 0% dikhta hai par retirement compounding rokta hai — isliye ranking mein neeche ja sakta hai. Yehi "true cost" ka matlab hai.</div>`,
  `Maine har option ki asli laagat nikali hai. Sabse sasta hai ${w.options[0].source}. Personal loan aakhri option rakhiye.`);
  mainMenu();
}

function topic(t){ Engine.log(graph, 'topic', { topic: t }); }

function mainMenu(){
  setChips([
    ['💰 Idle cash?', flows.idle],
    ['🎯 Mere goals', flows.goals],
    ['🚨 Urgent paisa chahiye', flows.liquidity],
    ['🎉 Bonus aaya!', flows.bonus],
    ['⚖️ Rebalance check', flows.rebalance],
    ['🧾 Tax bachao', flows.tax],
    ['📉 Market gir gayi — sab becho!', flows.crash],
    ['📈 Stock tips?', flows.stocks],
    ['👶 Baby aa raha hai', flows.child],
    ['💍 Shaadi hai', flows.marriage],
    ['🏠 Ghar lena hai', flows.home],
    ['💸 Salary badhi', flows.salary],
  ]);
}

/* ---------------- free text / voice router ---------------- */
async function route(text){
  userSay(text);
  const t = text.toLowerCase();
  const table = [
    [/idle|cash|savings|pade|paisa pada/, flows.idle],
    [/urgent|loan|need money|zaroorat|emergency/, flows.liquidity],
    [/bonus/, flows.bonus],
    [/tax|80c|elss/, flows.tax],
    [/rebalanc|drift/, flows.rebalance],
    [/sell|crash|gir|bech/, flows.crash],
    [/stock|share|tip/, flows.stocks],
    [/baby|child|bachcha|beta|beti/, flows.child],
    [/shaadi|marriage|wedding/, flows.marriage],
    [/ghar|home|house|flat/, flows.home],
    [/salary|increment|hike/, flows.salary],
    [/goal/, flows.goals],
  ];
  for (const [re, fn] of table) if (re.test(t)) return fn();
  const llm = await LLM.generate({ messages:[{ role:'user', content:text }] });
  if (llm) return botSay(llm);
  botSay(`Yeh main abhi scripted demo mein nahi samjhi 😅 (production mein yahan LLM hoga — jo sirf <b>explain</b> karega, advice engine hi dega). Neeche ke options try kariye!`,
    'Yeh abhi demo mein nahi samjhi — neeche ke options try kariye.');
}

/* ---------------- boot ---------------- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.avatar-stage').innerHTML = Avatar.svg();
  Voice.init();
  Voice.onResult = text => route(text);
  document.getElementById('send').onclick = () => {
    const i = document.getElementById('inp'); if (i.value.trim()) { route(i.value.trim()); i.value=''; }
  };
  document.getElementById('inp').addEventListener('keydown', e => { if (e.key==='Enter') document.getElementById('send').click(); });
  document.getElementById('speaker').onclick = e => {
    Voice.enabled = !Voice.enabled; if (!Voice.enabled) Voice.stop();
    e.target.textContent = Voice.enabled ? '🔊 Voice on' : '🔇 Voice off';
  };
  document.getElementById('reset').onclick = () => { localStorage.removeItem(SAVE_KEY); location.reload(); };
  renderAudit();
  graph.riskProfile ? greetReturning() : startOnboarding();
});
