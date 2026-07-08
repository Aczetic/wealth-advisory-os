# Research: How Indian BFSI handles the advice-vs-distribution boundary (for D4)

Researched 2026-07-08. Feeds decision D4 in `00-STATE.md`. Do not re-research.

## What banks actually do

**HDFC Bank SmartWealth** — the closest comparable to what we're building (digital
investment app with personalized model portfolios):
- Legal wrapper: AMFI-registered MF Distributor (ARN 0005), APMI-registered PMS
  distributor, corporate agent for insurance. **Explicitly "not an investment advisor."**
- Disclaimer pattern: "recommendations for information purposes only... shall not be
  considered/deemed/contested as investment advice of any sort."
- Product framing: model portfolios = "curated investment baskets for **DIY investing**".
  Covers MF, equities, bonds, deposits. User "identifies their investment profile and
  invests appropriately" — i.e., suitability quiz + curated baskets, customer self-selects.

**SBI YONO** — "Financial Fitness" feature: consolidated view of deposits, loans,
investments, insurance, spending + "personalised financial **insights**". Insights
language, not advice. 96M+ user base, distribution rails.

**Kotak Cherry** — "one-stop digital platform for investments"; distribution/execution
posture, education framing ("aid learning, ensure transparency").

**Industry pattern:** Indian digital wealth platforms (incl. Kuvera etc.) are
overwhelmingly **execution/distribution-focused**; regulation is the explicit reason —
it "limits advisory depth, pushing most platforms into execution-only models."

## The regulatory rails

- **Robo/automated advice = RIA territory.** SEBI treats robo-advisors identically to
  human IAs; automated personalized advice requires RIA registration under the
  IA Regulations 2013.
- **Banks doing RIA:** must first get RBI permission, then register via a subsidiary or
  Separately Identifiable Department/Division (SIDD). Advisory must be strictly
  segregated from distribution/execution; fee-only, no commissions from the advised
  client. No mass-market Indian bank app runs this; it's reserved for private wealth.
- **SEBI AI/ML consultation paper (2025-06-20), "Guidelines for Responsible Usage of
  AI/ML in Indian Securities Markets"** — five pillars: model governance, investor
  protection/disclosure, testing framework, fairness & bias, data privacy & cybersecurity.
  Requires: disclosure of AI use to clients, senior management with technical expertise
  accountable for AI tools, model validation/documentation/interpretability. Using AI
  *increases* responsibility — the intermediary owns AI-generated output fully.

## Implication for us (recommendation on the table)

The industry answer to D4 is exactly the Posture A + C hybrid:
1. **Legal wrapper = distributor** (IDBI's existing ARN), HDFC-SmartWealth-grade
   language: "suitability-matched curated portfolios", "insights", "for information
   purposes" — never the word "advice" in-product.
2. **Suitability quiz gates everything** (AMFI code obligation + it's also good product).
3. **AA/external-holdings data used for analysis & allocation context only**;
   recommendations restricted to bank-distributed universe; external-holding questions
   trigger **RM/wealth-desk escalation** (Posture C tiering as lead-gen).
4. **Differentiator vs HDFC/SBI:** none of them are architected around SEBI's AI/ML
   governance pillars. We design the avatar stack to satisfy them natively
   (deterministic recommendation engine → auditable; LLM explains, never decides →
   interpretability; AI-use disclosure in onboarding; model versioning in audit log).
   RIA-via-SIDD shown as the bank's future roadmap, not the PoC.

## Sources

- https://www.hdfc.bank.in/useful-links/smartwealth-terms-and-conditions
- https://www.hdfc.bank.in/smartwealth
- https://www.business-standard.com/amp/companies/news/sbi-rolls-out-ai-powered-features-on-yono-expands-trade-finance-services-126070101278_1.html
- https://lawyervikasgupta.com/blog/sebi-rules-for-robo-advisory-platforms-in-india/
- https://www.ikigailaw.com/article/62/explainer-on-robo-advisors-and-the-law
- https://www.sebi.gov.in/sebi_data/attachdocs/1424862077270.pdf (SEBI IA Regs FAQ — SIDD, segregation)
- https://clovelegal.com/2025/07/29/sebis-approach-to-ai-and-ml-exploring-sebis-ai-ml-consultation-paper/
- https://drbgrpublications.in/wp-content/uploads/2025/Special-Issue/08_NC-142-A-study-on-Robo-Advisory-in-Action-Case-Study-Insights-of-the-Mutual-Fund-Market-in-India.pdf
