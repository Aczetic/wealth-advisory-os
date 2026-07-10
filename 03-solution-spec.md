# Solution Spec — Wealth Advisory OS · Digital Wealth Management (IDBI Innovate 2026, Track 01)

Working prototype: `poc/` (see `README-TEST.md`). Thresholds, returns, and inflation rates are illustrative prototype assumptions.

## 1. One-liner

An avatar-led, engine-driven wealth advisory module inside IDBI's mobile app: the bank's
transaction data becomes a standing investment strategy per customer, delivered as a
voice-first Hinglish conversation with "Asha", with human RMs one tap away — guidance at
scale under the bank's existing distribution licence.

## 2. Why us / why now (from research — cite in pitch)

- White space: nobody in India combines bank-embedded + avatar + txn-data-driven +
  vernacular (`research/research-landscape-products.md`); Hana Bank proves the pattern in
  production; HDFC SmartWealth proves the legal wrapper.
- Robo 1.0's five causes of death are each structurally fixed by bank-embedding
  (`research/research-failures-judge-lens.md`).
- IDBI's own 2022 RFP specced the rails (risk profiling, MF lifecycle, spend analytics,
  chatbot, 15 languages) — we are the intelligence layer those rails were waiting for
  (`research/research-rfp-2022-baseline.md`, cover-and-exceed table W1–W6).

## 3. Personas (from `research/research-idbi-client.md`)

P1 FD Family (tier-2/3, first-time investor — vernacular, small tickets, gold) ·
P2 Salaried Climber (demo persona "Rohan") · P3 Pensioner/pre-retiree (vulnerable-customer
safeguards mandatory). LIC parentage → insurance-aware base, retirement affinity.

## 4. Product = ONE ENGINE, TWO FACES

### 4a. Customer face — Asha (avatar)
- **Persona:** one named, persistent advisor; voice/language chosen at onboarding then
  stable. 2D rigged avatar (D3) — no photoreal.
- **Interaction model:** voice-note-first async (India: voice = 22% of WhatsApp comms;
  15–30s spoken replies, detail in cards), Hinglish; live mode later. Chips + free text.
- **Conversational onboarding** (Wavelength pattern): suitability quiz as chat, mapped
  behind the scenes to an auditable SEBI-style record. ✅ in PoC
- **Memory:** Client Graph is the memory — episodic (topics), semantic (goals/family),
  data-derived (salary date, FD maturity). Referencing past conversations is the
  emotional core (Replika lesson). Memory dashboard: view/edit/delete (DPDP). ✅ PoC (episodic)
- **Guardrails:** anti-sycophancy (disagrees warmly, logs it — sell-all flow ✅ PoC),
  anti-dependency (no guilt nudges), always-on AI disclosure ✅, proactivity budget
  (max 3 standing insights ✅), vulnerable-customer mode for P3 (cooling-off, family
  option) — roadmap.
- **Swipeless curation:** never a catalog; max 3 options with reasons ✅ PoC.

### 4b. RM face — Advisor OS (D6 option b ✅ built)
Morning briefing (book-level insights), avatar-escalation lead queue with full context,
Client 360 from the same graph ✅ PoC (`rm.html`). Roadmap: meeting copilot (MS Debrief
pattern), tax-harvesting lists across book. Benchmarks: Morgan Stanley 98% adoption,
30 min/meeting; Range 50% message deflection (`research/research-advisor-os.md`).

## 5. The engine (`advisory-engine-methodology.md`)

- **Client Graph** (GRAPH-1.0): profile, income, expenses, assets, liabilities, insurance,
  taxes, goals, riskProfile, strategy, interactions, recommendations, events, escalations.
  One structure = avatar memory + engine context + RM handoff + audit trail. ✅ PoC
- **Persistent Investment Intelligence:** standing strategy per customer; state changes
  (salary credit, FD maturity, drift, tax window) → proactive insights. ✅ PoC
- **7 capabilities**, all ✅ in PoC: monthly capital allocation (ALLOC-1.0) · liquidation
  planning (LIQ-1.0 waterfall: EPF advance w/ opportunity cost, loan-vs-FD, loan-vs-MF,
  break-FD, personal loan) · rebalancing (REBAL-1.0, fresh-money-first, tax-aware) ·
  tax optimisation (TAX-1.0: 80C/ELSS gap, LTCG harvesting within ₹1.25L) · goal funding
  (goal-inflation-adjusted targets, SIP solver) · cash management (IDLE-1.0) ·
  event-based planning (EVT-1.0: salary/bonus/marriage/child/home).
- **Action taxonomy:** Buy · Sell · Redeem · Transfer · Rebalance · Harvest Loss ·
  **Prepay Loan** (PREPAY-1.0 post-tax comparison incl. 24b) ✅ PoC.
- **Glide paths** (GLIDE-1.0, Zerodha-Lifecycle-inspired): allocation = f(risk bucket,
  years-to-goal), linear de-risk inside 10y, capital-protection ≤1y. ✅ PoC
- **Financial-health gate** (GATE-1.0): emergency fund (6mo) → insurance (12x income) → then investing. ✅ PoC
- **Suitability** (SUIT-1.0): 6-question conversational assessment → 4 buckets;
  behavioral risk-capacity overlay from txn data = phase 2.
- **Audit:** every recommendation = {action, amount, instrument, reason, ruleId+version,
  goalId, taxNote} ✅ PoC, visible debug panel. Rules registry with versions ✅.
- **Golden tests:** 36 cases, `poc/tests/run-tests.js` ✅ — regression coverage for the prototype.

## 6. Compliance by design (D4 — `research/research-d4-bfsi-advice-posture.md`)

Distributor wrapper (ARN-0058), SmartWealth-grade language (never "advice" in-product ✅),
suitability gates everything ✅, AA data analysis-only / recommendations in-universe,
out-of-universe → RM escalation ✅, SEBI AI/ML pillars natively (deterministic engine +
LLM-explains-only + disclosure + versioned audit ✅), DPDP consent + memory dashboard,
RIA-via-SIDD roadmap-only.

## 7. Data map (subsystem C — summary)

PoC: synthetic. Pilot: CBS txns/balances/FD (internal API), demat (in-house DP), KYC.
Phase 2: AA/Sahamati (external holdings), RTA CAS, UAN passbook (EPF — no AA yet),
LIC bancassurance data (explore — parent-company moat). UPI narration categorization:
build vs Setu/Fold. Full table in `02-spec-decomposition-map.md` §C.

## 8. Tech architecture (constraints from IDBI's 2022 RFP)

Bank-recommended stack: React Native/Ionic front, Java Spring Boot/Node/Python
microservices, Oracle/Mongo, RabbitMQ, Kibana/Grafana, Finacle via bancs-connect ISO.
**On-prem DC/DR** → LLM via India-region/private endpoint; PII redaction pre-LLM.
Delivery = D7 hybrid: native micro-SDK (mic/TTS/avatar canvas/auth bridge) +
server-driven conversational UI; channel-agnostic (GO Mobile+ today, new digital app /
WhatsApp later). PoC stack (browser JavaScript + browser speech) is a deliberate
demo simplification; engine logic ports 1:1.

## 9. Language/speech

Launch English+Hindi (Hinglish register ✅ PoC via browser TTS); production TTS/STT:
Sarvam/Bhashini bake-off; architecture ready for 15 languages (RFP line + NH Bank precedent).

## 10. Business case & metrics

CASA→AUM conversion, trail income, FD-renewal capture, lending cross-sell via liquidity
advisor, RM productivity (30min/meeting benchmark), retention. Metrics: profile-completion,
first-SIP conversion, AUM/customer, advice-acceptance %, RM-deflection %, advisory NPS,
golden-test pass rate. Unit economics: small-model + tools + scripted flows keeps
cost-per-conversation in paise-to-few-₹ range — detail in map §G (open).

## 11. Phasing

PoC (✅ built) → Sandbox (real APIs, synthetic data, LLM in loop, Hindi TTS) →
Pilot (one segment, GO Mobile+ hybrid embed, RM console to one cluster) →
Scale (AA, 15 languages, WhatsApp channel, meeting copilot, RIA-SIDD optional).

## 12. Deployment considerations

Production deployment requires calibration of allocation matrices, financial-health thresholds, suitability scoring, return and inflation assumptions, and applicable tax rules. The prototype includes the customer avatar and an RM console; bank integrations and channel delivery are subsequent deployment phases.
