# Kartik's Methodology Input (2026-07-08 night) — CORE ENGINE REQUIREMENTS

Source: Kartik directly. This IS the subsystem-B design input. Engine and
onboarding/engagement/advisory/allocation must be planned around this. Binding.

## 1. Capability set (advisory engine must do all of these)

1. **Monthly Capital Allocation** — every month, decide where the investable surplus goes
2. **Liquidation Planning** — which asset to exit, when, in what order (tax/exit-load aware)
3. **Rebalancing** — drift detection + corrective actions
4. **Tax Optimisation** — harvesting, 80C sequencing, post-tax comparisons
5. **Goal Funding** — map money → goals, track funding %, catch-up logic
6. **Cash Management** — idle-cash detection, emergency buffer, sweep suggestions
7. **Event-Based Planning** — lifecycle triggers re-plan: salary increase, bonus,
   marriage, child, home purchase (also: job loss, inheritance — extend list)

## 2. Action taxonomy (every recommendation resolves to one of these)

Buy · Sell · Redeem · Transfer · Rebalance · Harvest Loss · **Prepay Loan**
(Note: Prepay Loan as first-class advisory action = CA thinking; engine must compare
prepayment vs investment on post-tax return — most robos never do this.)

## 3. Financial state model (the ontology)

Income · Spending/Expenses · Assets · Liabilities · Taxes
→ Engine reasons over the FULL balance sheet + P&L of the household, not just investments.

## 4. Client Graph (persistent data structure)

One graph per customer: assets, liabilities, preferences, risk profile, goals,
interactions (conversations), recommendations given (+ accepted/rejected), events.
= the avatar's memory + the engine's context + the audit trail, one structure.
(This unifies map §D memory architecture with the engine — same graph, avatar reads/
writes conversationally, engine reads/writes analytically, RM reads on handoff.)

## 5. Persistent Investment Intelligence (the operating loop)

Pattern: state change detected → opportunity identified → aligned suggestion.
Canonical example: "Salary credited, cash accumulates" → "I have idle cash because I
haven't decided" → AI suggests deployment aligned with user's strategy & risk profile.
Advisory ALIGNS AND EVOLVES with time and goals — a standing strategy per customer that
events perturb, not one-off recommendations. (This is why it's an advisor, not a store.)

## 6. Allocation inspiration: Zerodha Life Cycle Fund 2036 (target-date glide path)

Mechanics to absorb: goal has a TARGET YEAR → growth-tilted allocation early
(equity, Nifty LargeMidcap 250 tracking) → automatic conservative shift as target
approaches (G-Secs across durations, some commodities/arbitrage) → treated as equity
for taxation throughout → ₹100 minimum → "you pick the year, stay invested, it takes
care of the rest."
→ **Our engine: every GOAL gets a glide path** — allocation is a function of
(risk profile, time-to-goal), automatically de-risking as the goal nears. Target-date
funds themselves can be recommended where distributed; otherwise engine replicates the
glide with MF baskets. Discipline + tax-efficiency + no-active-management = the promise
to P1 "FD Family" persona in one sentence.

## Build implications (overnight PoC must reflect)

- Engine core = Client Graph + standing strategy + event loop (not request/response only)
- Each demo journey shows a capability: idle-cash detection (#6/#5), goal funding w/
  glide path (#5/#6), bonus event (#7), liquidity waterfall (liquidation planning #2),
  rebalancing drift alert (#3), ELSS/harvest suggestion (#4), prepay-vs-invest (#2 action)
- Every recommendation = {action from taxonomy, amount, instrument, reason, rule+version,
  goal linkage, tax note} logged to the graph
