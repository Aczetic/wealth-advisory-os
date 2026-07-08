# Research: IDBI Bank — the client we're building for

Researched 2026-07-08. Discovery item 3 of 5. Do not re-research.

## Who IDBI is (and why it shapes the product)

- **Ownership (Mar 2025): LIC 49.24% + Govt of India 45.48% = 94.72%.** Effectively an
  LIC-owned bank. Implications: insurance-aware customer base, bancassurance rails
  (Ageas Federal Life — IDBI legacy JV), pension/retirement affinity, PSU-style
  procurement and risk appetite (judges will value deployability + low vendor risk).
- **Footprint:** ~2,100 branches, 3,700+ ATMs, 1 overseas (Dubai). Expanding products and
  underwriting in **tier-2/3 markets**; housing + gold loans are stated growth priorities
  (15% YoY target through 2026).
- **Retail-heavy book:** retail = 70% of gross advances; RAM (Retail+Agri+MSME) ≈ 72%.
- **Mass acquisition via govt schemes:** APY, PMSBY, PMJJBY enrolments are a stated
  acquisition avenue → large base of small-ticket, scheme-first, likely first-time investors.

**Customer sketch that falls out of this:** salaried/pensioner, tier-2/3 skew, FD-heavy,
insurance-aware (LIC), government-scheme enrolled, low prior MF exposure, likely
Hindi/vernacular-preferring. This is NOT the HDFC SmartWealth urban-affluent user —
it's exactly the "large number of customers" the problem statement says are unserved.

## IDBI's existing rails (what we integrate with, not rebuild)

- **GO Mobile+** (their mobile app): UPI/NEFT/IMPS, bill pay, deposit booking with
  rate/maturity view, PPF & SSA statements, IPO application, **demat account view**,
  and an existing basic **MF journey**. Purely transactional — no insights, no
  personalization, no advisory layer. → Our module has a clean integration surface
  and an obvious gap to fill.
- **Wealth shelf:** AMFI corporate distributor **ARN-0058**; RM-led wealth service with
  research-based guidance for affluent customers (validates our RM-escalation tier);
  depository services; **loan against units/shares exists as a product**; IDBI Capital
  (subsidiary) does broking + MF distribution. Note: IDBI's own AMC was divested —
  the bank distributes third-party MFs (open-architecture story, less conflict).

## Personas for the spec (draft)

1. **P1 — "FD Family" (primary):** 30–50, salaried/small-business, tier-2/3, savings +
   FDs + LIC policy + APY. Never bought an MF. Needs: vernacular, trust, small tickets,
   goal language (child education, house), gold affinity. → avatar in Hindi/regional,
   FD→MF migration journeys, gold round-ups, ₹500 SIPs.
2. **P2 — "Salaried climber":** 25–40, urban/semi-urban salary account, uses UPI heavily,
   has demat/IPO curiosity, EPF corpus building. Needs: surplus detection, tax saving
   (80C/ELSS), portfolio consolidation, liquidity help.
3. **P3 — "Pensioner/pre-retiree":** 50+, LIC-heavy, FD-laddering, APY/pension inflows.
   Needs: income planning, capital protection, SCSS/debt-fund guidance, nominee/estate
   hygiene. (LIC ownership makes this persona strategically dear to the bank.)

## The EPF thread (Kartik's lateral idea, pressure-tested)

**Mechanics correction:** there is no bank "loan against EPF." EPF can't be pledged;
liquidity from EPF is an **EPFO advance** — purpose-bound (medical/education/marriage/
housing), up to 90% of balance in specific cases, zero interest, no repayment,
auto-settled up to ₹5L, ~15–20 days to credit. EPFO 3.0 (2026) adds instant withdrawal
via **ATM/UPI**. EPFO is **not yet a FIP on the Account Aggregator framework** — so EPF
balance enters our system via user-linked UAN/passbook (interim) with AA integration
as roadmap when EPFO onboards.

**The upgraded feature — "Emergency Liquidity Advisor" (liquidity waterfall):**
When the engine detects a cash crunch (salary delay, balance dip, large upcoming spend),
the avatar ranks the customer's liquidity options by true post-tax, opportunity-cost-aware
cost — CA-grade framing:
1. EPF advance (0% interest BUT show retirement compounding loss at 8.25% p.a.)
2. **Loan against FD** (IDBI product; ~FD rate +1%; FD keeps earning)
3. **Loan against MF units/shares** (IDBI product — already on their shelf)
4. Breaking an FD (penalty + lost interest, quantified)
5. Personal loan (most expensive; IDBI product)

Why it's a winner: (a) no Indian competitor does liquidity-event advisory — apps only do
"invest more"; (b) it protects the customer's portfolio (genuine advisory ethos);
(c) options 2/3/5 are IDBI's own lending products → direct revenue line for the bank;
(d) it showcases the spending-data engine (crunch *detection*) that the problem statement
explicitly asks for. → Goes into spec as a flagship differentiator feature.

**Generalization (apply everywhere):** customer context → adjacent need → does IDBI have
a product for it → wire into engine. Same pattern gives: gold-loan awareness when gold
sits idle, LIC premium-due detection → cashflow planning, IPO application (existing app
feature) → equity readiness check, APY top-up → retirement gap.

## Sources

- https://en.wikipedia.org/wiki/IDBI_Bank · https://www.idbi.bank.in/idbi-bank-about-us.aspx
- https://dcf-model.com/blogs/history/idbins-history-mission-ownership (ownership %s)
- https://www.idbi.bank.in/mutual-funds.aspx (ARN-0058, loan against units/shares, RM wealth service)
- https://lemonn.co.in/blog/banking/idbi-bank-app-download-login-features-2026/ · https://apps.apple.com/us/app/idbi-bank-go-mobile/id1318206368 (GO Mobile+ features)
- https://www.bankbazaar.com/saving-schemes/loan-against-pf.html · https://cleartax.in/s/epfo-3-0-pf-withdrawal-atm-upi (EPF advance rules, EPFO 3.0)
