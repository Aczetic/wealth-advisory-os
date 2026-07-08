# Spec Decomposition Map — every question the spec must answer

Created 2026-07-08 after Kartik's second-order-thinking correction. This is the spec's
skeleton: each subsystem lists what's KNOWN (research done), OPEN questions, and HOW to
close (research / design / Kartik / sandbox). Work items get closed one at a time.
Status legend: ✅ known · 🔬 needs research · ✏️ needs design decision · 👤 needs Kartik · 🏦 needs sandbox/bank access

**METHOD (Kartik's, mandatory for every subsystem):** assume someone in the world is
already best-in-class at this exact thing → find them → extract WHY they win → package
the synthesis. No blank-page design. Every subsystem below carries a BENCHMARK line;
if a subsystem has no benchmark identified yet, that's the first work item for it.

| Subsystem | Best-in-world benchmark |
|---|---|
| A. Integration/delivery | Hana Bank OneQ (avatar in bank app); server-driven UI patterns (Airbnb/Swiggy) |
| B. Advisory methodology | PortfolioPilot (engine+explainer split); Vanguard/Wealthfront glide paths; Scripbox India methodology; Kartik's CA tax overlay |
| C. Data & integration | Fold/Setu (Indian txn categorization); Sahamati AA rails; INDmoney (aggregation UX) |
| D. Avatar persona/memory | Cleo 3.0 (voice+memory+personality); UneeQ deployment playbooks; Replika (memory), with guardrails |
| E. Language/speech | Sarvam AI / Bhashini (Indic); NH Bank (110-language avatar) |
| F. Trust/safety/consent | UK FCA Consumer Duty (vulnerable customers); SEBI AI/ML pillars; Sahamati consent UX |
| G. Economics/metrics | Range (RM-deflection metrics); AI-lab eval-harness practice (golden test cases) |
| H. PoC/demo strategy | Morgan Stanley AI@MS rollout (pilot→scale); hackathon-winner demo patterns |

**FLOOR for all subsystems:** IDBI's own 2022 Digital Bank App RFP (`research/research-rfp-2022-baseline.md`)
= the bank's written table stakes (wealth W1–W6, spend analytics, chatbot-ready, 15 languages,
on-prem DC/DR, their recommended tech stack). Every subsystem must cover its RFP lines, then exceed.

## A. Integration surface & delivery (Kartik Q1, Q2)

- ✅ GO Mobile+ feature list (transactional; deposits, demat view, basic MF journey, IPO)
- ✅ **Screen map reconstructed** (`research/research-gomobile-screens.md`, 2026-07-08): nav tree
  w/ confidence labels; 5 ranked avatar entry points (E1 deck-card … E5 RM deep-link);
  key finds: pre-login mPassbook already does manual expense categories (our seed),
  v3.5 added balance graphs, app is vendor-built (Snapwork), 3.7★ → crash isolation
  required. In-app verification deferred to sandbox (assumption log A1–A5 in file).
- ✏️ **Delivery mechanism decision (→ D7)**: hybrid recommended — native micro-SDK
  (mic/TTS/avatar canvas/auth bridge) + server-driven conversational UI. Rationale in
  screens file. Awaiting Kartik confirm.
- 🏦 Actual SDK contracts — only knowable post-shortlist in sandbox.

## B. Advisory methodology — the engine's brain (Kartik Q4) ← HEART OF SPEC

- ✅ Posture: deterministic engine, suitability-gated, distributor universe (D4)
- 🔬 **Which allocation framework**: study how Scripbox/HDFC/PortfolioPilot/robo-1.0
  actually construct model portfolios; strategic vs goal-horizon glide paths
- ✏️ **Our methodology stack** (Kartik's CA judgment central):
  1. Financial-health gate: emergency fund (X months?) → insurance gap → then investing
  2. Risk capacity (data-derived: income stability, dependents, liabilities) vs risk
     tolerance (questionnaire) — how combined, which overrides
  3. Goal math: inflation assumptions per goal type (education inflation ≠ CPI),
     required-return solver, SIP step-up logic
  4. Asset allocation matrix: risk bucket × horizon → equity/debt/gold %
  5. Fund selection within allocation: criteria (AUM floor, track record, rolling
     returns, expense ratio, concentration) — approved-list governance, refresh cadence
  6. Rebalancing triggers: drift %, tax-aware (LTCG threshold harvesting), exit loads
  7. Tax overlay: 80C/ELSS sequencing, debt-vs-FD post-tax comparison, LTCG budget use
- 👤 Kartik to validate/own methodology choices (this is the CA-differentiated core)

## C. Data & integration map (Kartik Q5)

- ✅ Scattered: bank CBS txns, AA framework, UAN passbook (EPF), demat exists in-app
- ✏️ **Consolidated source map** — for EACH: mechanism, freshness, consent, PoC availability:
  | Source | What it gives | Mechanism | Consent | PoC status |
  |---|---|---|---|---|
  | CBS/core banking | txns, balances, FDs, salary credits | internal API | bank T&C + DPDP | sandbox synthetic |
  | Card/UPI switch | spend categorization | internal | same | sandbox |
  | AA (Sahamati) | external bank/MF/insurance holdings | FIU integration | AA consent artefact | mock in PoC |
  | MF RTA (CAMS/KFin) CAS | MF holdings incl. external | CAS parse / RTA feed | customer-initiated | mock |
  | Demat (NSDL/CDSL via IDBI DP) | equity holdings | DP feed (in-house!) | existing mandate | sandbox? |
  | EPFO/UAN | EPF balance | passbook link (no AA yet) | user-linked | manual/mock |
  | KYC/CKYC | age, address, income band | internal | existing | sandbox |
  | LIC/insurance | policies, premiums (LIC = parent!) | 🔬 explore — bancassurance data-sharing feasible? | TBD | roadmap |
- 🔬 txn-categorization approach for Indian merchants (UPI narration parsing — build vs
  Fold/Setu-style APIs)

## D. Avatar experience — persona, memory, human-feel (Kartik Q3, Q6)

- ✅ Vendors known; Cleo proves voice+memory+personality = 20x engagement
- ✅ **Avatar spec patterns researched** (`research/research-avatar-spec-patterns.md`, 2026-07-08):
  Replika/C.AI (memory = attachment; anti-sycophancy + anti-dependency guardrails as
  pitchable differentiator), Wavelength (conversational onboarding → auditable suitability;
  swipeless curation = max 2-3 options), WhatsApp India (voice-note-first async model,
  15-30s replies, Hinglish table stakes). 7-point subsystem-D spec skeleton ready.
- ✏️ **Persona design**: name, age-coding, gender (or user choice?), attire, voice,
  Hinglish register, cultural trust signals for tier-2/3 (third-order: persona must ALSO
  pass PSU brand-committee approval — design a safe-but-warm default + variants)
- ✏️ **Memory architecture** (the "feels human" core):
  - Episodic: past conversations ("aapne pichhli baar beti ki padhai ke liye poocha tha")
  - Semantic profile: goals, family, risk events, preferences — structured, editable by
    customer (trust + DPDP right-to-correct)
  - Data-derived context: salary date, EMI dates, FD maturities → proactive timing
  - Continuity across channels: avatar ↔ RM handoff shares the same memory (D6 tie-in)
- ✏️ **Human-feel mechanics**: <1.5s voice-turn latency budget (drives whole tech stack),
  backchannel acknowledgments, remembers & follows up unprompted, emotional register
  rules (market-crash empathy script), imperfection by design (asks clarifying questions
  rather than omniscience — also a compliance feature)
- ✏️ Proactivity cadence: when may avatar initiate (FD maturity, surplus, LIC premium
  due)? Anti-spam budget (max N nudges/month), quiet hours, opt-out granularity

## E. Language & speech stack

- 🔬 Indic TTS/STT quality bake-off: Sarvam AI, Bhashini, Google/Azure Indic voices,
  ElevenLabs — Hindi first, roadmap for regional; code-switching (Hinglish) handling
- ✏️ Language strategy: launch English+Hindi, architecture ready for 8+ (NH Bank precedent)

## F. Trust, safety & consent UX

- ✅ Regulatory posture (D4), SEBI AI/ML pillars, RBI outsourcing constraints
- ✏️ Hallucination containment: avatar NEVER states numbers/products from LLM memory —
  all facts via tool calls to engine; refusal + escalation scripts
- ✏️ Vulnerable-customer design: P3 pensioners — larger fonts, slower speech, mandatory
  cooling-off + family-member option on large decisions (third-order: elder-mis-selling
  is THE reputational risk a PSU bank fears most)
- ✏️ Consent UX screens: DPDP purpose-wise consent, AA consent journey, AI-use disclosure —
  these are actual screens in the flow, not legal boilerplate
- ✏️ Market-crash playbook: proactive reassurance vs silence; what avatar may say

## G. Economics & metrics

- ✏️ Unit economics: LLM + TTS cost per conversation × projected conversations/customer/
  month → cost-to-serve vs RM cost (judges will ask; also third-order: cost ceiling
  shapes model choice — small model + tools beats big model free-form)
- ✏️ Success metrics: activation (profile completion), first-SIP conversion, AUM/customer,
  advice-acceptance rate, RM-deflection %, NPS; advice-quality eval harness (golden
  test cases the engine must pass — production-readiness proof)

## H. PoC & demo strategy

- ✏️ Build-vs-buy-vs-mock per component for PoC (avatar rendering: buy/open-source;
  engine: build — it's the moat; data: sandbox synthetic + mocked AA)
- ✏️ 3-minute demo script: which ONE journey shows engine+avatar+liquidity-advisor+RM
  handoff end-to-end (design demo BEFORE building — hackathon reality)
- 👤 D6 decision feeds this

## Suggested closure order (one at a time, as always)

1. 🔬 A: GO Mobile+ screen reconstruction (research, fast, unblocks delivery decision)
2. 🔬 D: avatar spec-pattern research (how Cleo/UneeQ/Hana spec persona+memory)
3. ✏️ B: advisory methodology design session WITH Kartik (the core; his CA judgment)
4. ✏️ C: data map finalization (mostly assembling knowns + LIC-data feasibility check)
5. ✏️ D/E/F: avatar persona + memory + safety design
6. ✏️ G/H: economics + demo strategy
→ then 02-solution-spec.md becomes an assembly job, not a thinking job.
