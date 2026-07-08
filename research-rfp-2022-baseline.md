# IDBI's 2022 Digital Bank App RFP — Our Bare-Minimum Baseline

Source: `source-rfp-2022-idbi-digital-bank.pdf` (saved in this folder; IDBI-Bank/ITD/VMG/
RFP/22-23/27, 12-Aug-2022, 114pp). Distilled 2026-07-08. **Kartik's framing: this is
indicative of what we must offer as bare minimum** — it's the bank's own written
definition of table stakes. Spec must COVER every relevant line, then EXCEED it.

## Use Case 1: "Digital Banking Application for Millennials" — scope

**Financial services (phase 1):** savings a/c opening (digital KYC → virtual debit card),
help & support, debit-card servicing (virtual card, limits, freeze, PIN), FD/RD
book/renew/close, bill payments (BBPS), fund transfer (UPI/NEFT/IMPS/RTGS, scan & pay,
FASTag), credit-card application integration, **wealth management services**.

**Non-financial:** **spend analytics**, statements/MAB view, beneficiary mgmt module
(API-first, consumable by other channels), centralized authentication module
(OTP/biometric/FaceID, rule-based, low-code), centralized limit management (rule-based,
low-code). Admin module: bank staff configure limits, cooling periods, user journeys,
dynamic reports.

## Wealth Management requirements (p92) — verbatim distillation + our exceed

| # | RFP asked (2022) | Our exceed (2026) |
|---|---|---|
| W1 | Import/track portfolio by fetching statements (holdings/txn/capital-gains) from user's registered email + MF depositories (CAMS/KFin) | Same + AA framework (regulated, consent-based, real-time) + bank's own CBS/demat data — email-parse becomes fallback |
| W2 | Assign risk profile from questionnaire responses | Questionnaire + BEHAVIORAL risk capacity from txn data (income stability, surplus pattern); drift re-profiling |
| W3 | "Suggest relevant investment options as per user risk profile" | Full deterministic advisory engine: goal-based, tax-aware, suitability-audited, explainable — not a static mapping |
| W4 | Fetch/display all MFs from AMC | Curated approved-list w/ governance + plain-language avatar search (Magnifi pattern) |
| W5 | MF purchase/redeem, SIP register/modify/cancel, SIP mandates | Same rails + goal-linked SIPs, step-up logic, liquidity advisor (loan-vs-redeem) |
| W6 | Show scheme details, compare funds | Avatar explains comparisons conversationally in user's language |

## Spend Analytics requirements (p24, p92-93) + our exceed

RFP: visualize spends by category/merchant/time; filter; **"provide cross-sell/upsell
opportunities for the bank's different products"**; track card spends.
→ Ours: auto-categorization incl. UPI narration parsing; surplus/crunch DETECTION
(events, not dashboards); proactive advisory triggers; the cross-sell line = the bank
already wants next-best-action — we make it advisory-grade and compliant.

## Platform requirements that bind our architecture

- **Tech stack (bank-recommended, p25):** Frontend: React Native / Ionic / Angular/Vue.
  Middle tier: microservices — Java Spring Boot, NodeJS, Python. Logging: Kibana/
  Grafana/Prometheus. Data: Oracle/MySQL/MSSQL or MongoDB/Cassandra. MQ: RabbitMQ/
  ActiveMQ. API docs: SwaggerHub. → **Spec our services on exactly this stack** —
  signals "we read your standards."
- **Deployment: ON-PREMISE, Bank's DC + DR** (p24) → LLM strategy must support
  private/on-prem or India-region VPC endpoints; confirms judge-lens finding.
- Chatbot/live-chat/WhatsApp integration readiness (p93 area); **min 15 regional
  languages**; accessibility (diverse abilities); **super-app-flexible architecture**;
  integrations: NSDL, UIDAI, NPCI, CAMS, KFintech, social media; Finacle CBS
  ("bancs connect" ISO messaging) — IDBI runs Finacle + TCS BaNCS (broking).
- Security: PCI-DSS/PA-DSS, RBI Digital Payment Security Controls, OWASP Mobile Top 10,
  VAPT, on-prem PCI certification support.
- PSU procurement pattern (p22): milestone payments 10% PO → 10% BRD → 40% go-live →
  20/10/10% at 3/6/12-month satisfactory operation; 3% performance bank guarantee.
  → Business-model slide should offer milestone-based engagement; bank buys this shape.

## Strategic use

1. **Pitch:** "Your 2022 RFP specced these rails. We are the intelligence layer they
   were waiting for" — W1–W6 table shown as RFP-asked vs we-deliver.
2. **Spec:** every RFP wealth/analytics line becomes a base requirement; architecture
   doc conforms to the bank's own stack + on-prem constraint.
3. **Credibility:** quoting their RFP numbers/pages in the submission shows we did
   homework no other team will have done.
