# Research: Why Robo-Advisory 1.0 Failed + What IDBI's Judges Optimize For


## Part 1 — The robo-advisory graveyard, and why we're structurally different

**Global shutdowns:** MoneyOwl, Bloom, Hedgeable, Investec SmartWealth, Prospery,
TradingFront, WorthFM — "most robo-advisors died or were acquired in fire sales."
India: standalone robo-advisory never took off; Zerodha's own analysis ("Robo-advisors
are dead, long live robo-advisors") is the sharpest post-mortem.

**The five failure causes → our structural answer to each:**

| # | Why robo 1.0 died | Why bank-embedded avatar doesn't |
|---|---|---|
| 1 | **CAC too high vs low ticket sizes** — standalone robos paid to acquire customers yielding tiny revenue | CAC ≈ 0: IDBI's existing customers, inside the app they already use. Distribution is the bank's, not bought |
| 2 | **Revenue yield too low to sustain** — advisory fees on small AUM don't cover servicing | Bank monetizes the *relationship*: trail commission + deposit retention + loan cross-sell (Emergency Liquidity Advisor) + CASA stickiness — advisory is a margin-expander, not the only P&L |
| 3 | **RIA license = compliance nightmare**; in India robos can't automate rebalancing/tax-loss-harvesting, can't touch customer funds (need bank mandates) | D4 distributor posture needs no RIA; and the bank IS where the money sits — mandates, execution, debits are native rails, not a workaround |
| 4 | **Blind spots** — "robos never had visibility into users' other investments... without understanding one's financial life holistically, major blind spots" (Zerodha, verbatim) | The exact moat we lead with (D5): salary, spending, FDs, demat in-house + AA for the rest. We're the only actor who CAN see holistically |
| 5 | **Users still want a human** — flawed one-time risk quizzes, no trust, next-gen clients "want personalized advice and the opportunity to work with a human" | Avatar = human-like continuous conversation (not a form); behavioral risk profiling from real data; RM escalation + Advisor OS (D6) keeps real humans in the loop |
**Pitch slide writes itself:** "Robo-advisory 1.0 failed for five reasons. A bank-embedded
avatar structurally fixes all five — which is why this only works INSIDE a bank."

## Part 2 — Judge lens

**Hack2skill process (platform-level):** Stage 1 = idea screening on *idea clarity* and
*prototype quality*. Finale = live presentation + technical evaluation + judge Q&A.
Standard criteria family: innovation, feasibility, scalability, presentation, future
potential. → Stage-1 submission must be sharp enough to survive screening by clarity
alone; no fluff.

**IDBI/PSU-bank evaluator lens (what the bank-side judges will probe):**
1. **Deployability inside bank infrastructure** — RBI Master Direction on IT Outsourcing
   (2023) + Commercial Banks Outsourcing Directions (2025): board-approved policies,
   vendor due diligence, audit rights, exit clauses. Design answer: runs in bank's
   VPC/India region, LLM via private endpoint (e.g., Bedrock India), no customer data
   leaves bank perimeter, PII redaction before model calls.
2. **Data residency & DPDP** — operational data processed/stored outside India triggers
   reporting; payments data must be localized. Design answer: India-region everything.
3. **AI-specific regulatory posture** — RBI's proposed two-pronged AI approach (amend 7
   master directions incl. IT governance/outsourcing/customer service + AI-specific
   rules; FREE-AI committee direction) + SEBI AI/ML pillars (already in D4 design).
   Design answer: our audit-trail/deterministic-engine architecture answers both
   regulators natively.
4. **No outsourcing of "core" judgment** — bank can't outsource compliance/audit; human
   accountability chain must be visible → our RM escalation + senior-management model
   ownership maps to this.
5. **Cost-to-serve & staff story** — PSU context: RM productivity gains (Advisor OS) and
   staff-augmentation framing beat staff-replacement framing.
6. **Integration effort** — modular SDK into GO Mobile+, phased rollout, sandbox-first.
   Judges reward "works with what we have" over "replace your stack."

**What hackathon teams typically show vs what bank judges buy:** demo wow + model names
vs auditability, rollout plan, TCO, regulatory pre-clearance. We pitch the latter,
demo the former.

## Sources

- https://zerodha.com/z-connect/subtext/robo-advisors-are-dead-long-live-robo-advisors (failure post-mortem)
- https://datos-insights.com/blog/wrong-product-wrong-client-why-robo-advisors-are-not-the-silver-bullet-to-attracting-next-generation-clients
- https://hack2skill.com/event/hyperspace-hackathon (stage/judging pattern) · https://hello.hack2skill.com/
- https://taxguru.in/rbi/rbi-commercial-banks-managing-risks-outsourcing-directions-2025.html
- https://fidcindia.org.in/wp-content/uploads/2023/04/RBI-OUTSOURCING-OF-IT-SERVICES-10-04-23.pdf
- https://chambers.com/articles/a-framework-for-using-ai-in-the-indian-financial-sector (RBI AI approach)
