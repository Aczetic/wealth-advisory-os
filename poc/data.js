/* ================================================================
   ArthSakhi PoC — synthetic data & market constants
   ALL DATA SYNTHETIC / INDICATIVE. Rates as of FY 2025-26, for demo.
   Loaded before engine.js (browser) / required by engine.js (Node).
   ================================================================ */

const CONSTANTS = {
  VERSION: 'DATA-1.0',
  rates: {
    epf: 0.0825,             // EPFO declared rate FY25-26
    fd: 0.068,               // indicative IDBI 1-3y FD
    loanAgainstFD: 0.078,    // FD + ~1%
    loanAgainstMF: 0.10,     // indicative LAS
    personalLoan: 0.135,     // indicative mid-range
    homeLoan: 0.084,
    fdBreakPenalty: 0.01,    // 1% on applicable rate
    savingsIdle: 0.0275,
  },
  expectedReturns: {          // long-run assumptions (DRAFT — CA review)
    equity: 0.12, hybrid: 0.10, debt: 0.07, gold: 0.08, liquid: 0.065,
  },
  inflation: { general: 0.06, education: 0.10, wedding: 0.08, property: 0.07 },
  tax: {
    ltcgEquityRate: 0.125, ltcgEquityExemption: 125000,
    stcgEquityRate: 0.20,
    sec80CLimit: 150000, sec24bLimit: 200000,
    slabAssumed: 0.30,       // marginal slab assumed for demo persona
  },
  thresholds: {
    emergencyMonths: 6,      // financial-health gate
    idleCashMonths: 2.0,     // buffer beyond which cash is "idle"
    driftPp: 5,              // rebalance trigger, percentage points
    termCoverMultiple: 12,   // income multiple for term insurance
  },
};

/* Mock approved product list (distributor universe). ALL NAMES SYNTHETIC. */
const FUNDS = [
  { id:'F-LM250', name:'LargeMidcap 250 Index Fund', class:'equity', risk:'high',
    expense:0.20, note:'Broad-market core equity (tracks Nifty LargeMidcap 250)' },
  { id:'F-FLEXI', name:'Flexi Cap Fund', class:'equity', risk:'high',
    expense:0.90, note:'Active diversified equity' },
  { id:'F-ELSS', name:'ELSS Tax Saver Fund', class:'equity', risk:'high',
    expense:0.85, lockinY:3, sec80C:true, note:'Equity with 80C benefit, 3y lock-in' },
  { id:'F-BAF', name:'Balanced Advantage Fund', class:'hybrid', risk:'medium',
    expense:0.75, note:'Auto equity-debt balancing, smoother ride' },
  { id:'F-GILT', name:'Gilt Fund (G-Sec)', class:'debt', risk:'low',
    expense:0.45, note:'Government securities across durations' },
  { id:'F-CORP', name:'Corporate Bond Fund', class:'debt', risk:'low',
    expense:0.35, note:'High-grade corporate debt' },
  { id:'F-LIQ', name:'Liquid Fund', class:'liquid', risk:'verylow',
    expense:0.15, note:'Parking + emergency tier-2' },
  { id:'F-GOLD', name:'Gold ETF FoF', class:'gold', risk:'medium',
    expense:0.50, note:'Gold exposure without lockers (D2 universe)' },
  { id:'F-TD2041', name:'Target 2041 Lifecycle Fund', class:'hybrid', risk:'auto',
    expense:0.55, targetYear:2041, equityTax:true,
    note:'Glide-path fund: growth now, auto de-risks toward 2041; equity taxation throughout' },
];

/* Bank shelf (IDBI products the engine can reference — synthetic terms) */
const BANK_PRODUCTS = {
  fd:            { name:'IDBI Fixed Deposit', rate: CONSTANTS.rates.fd },
  loanAgainstFD: { name:'IDBI Loan Against FD', rate: CONSTANTS.rates.loanAgainstFD },
  loanAgainstMF: { name:'IDBI Loan Against MF Units', rate: CONSTANTS.rates.loanAgainstMF },
  personalLoan:  { name:'IDBI Personal Loan', rate: CONSTANTS.rates.personalLoan },
  homeLoan:      { name:'IDBI Home Loan', rate: CONSTANTS.rates.homeLoan },
};

/* Synthetic persona: "Rohan" — P2 Salaried Climber (research-idbi-client.md) */
const PERSONA_ROHAN = {
  id: 'CUST-001',
  name: 'Rohan', age: 32, city: 'Kanpur', lang: 'hinglish',
  income: { salaryMonthly: 95000, salaryDay: 1, bonusExpected: 150000 },
  expenses: { monthly: 52000 },   // excl. EMI
  liabilities: [
    { id:'L-HOME', type:'homeLoan', name:'Home Loan', outstanding: 2200000,
      rate: 0.084, emi: 22000, remainingY: 14 },
  ],
  assets: {
    savingsBalance: 680000,   // above emergency target + buffer → idle-cash flow demos live
    fds: [ { id:'A-FD1', amount: 300000, rate: 0.068, maturesInDays: 20 } ],
    mf: [
      { id:'A-MF1', fundId:'F-FLEXI', class:'equity', value: 190000, gainLT: 32000 },
      { id:'A-MF2', fundId:'F-GILT',  class:'debt',   value: 50000,  gainLT: 3000 },
    ],
    epfBalance: 650000,
    goldValue: 0,
  },
  insurance: { termCover: 500000, health: true, licPremiumYr: 24000 },
  taxes: { sec80CUsed: 90000, regime: 'old' },
  goals: [
    { id:'G-EDU', name:"Aarav's education", targetYear: 2041, targetAmountToday: 2500000,
      inflation: 'education', priority: 1, fundedValue: 120000, sipMonthly: 6000 },
    { id:'G-CAR', name:'Car upgrade', targetYear: 2029, targetAmountToday: 900000,
      inflation: 'general', priority: 2, fundedValue: 80000, sipMonthly: 4000 },
  ],
};

if (typeof module !== 'undefined') module.exports = { CONSTANTS, FUNDS, BANK_PRODUCTS, PERSONA_ROHAN };
else Object.assign(globalThis, { CONSTANTS, FUNDS, BANK_PRODUCTS, PERSONA_ROHAN }); // top-level const is not a window property
