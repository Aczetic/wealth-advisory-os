# Welcome Jyoti 👋 — get up to speed, then own the intelligence + deck

You're driving: **the deck/story, the advisory intelligence (how a great wealth manager
actually works), the persona + memory *rules*, and the AI→RM escalation *policy*.** The
engineering *build* — the smart-layer, memory infrastructure, and the RM console — sits with
Afraz; you give him the spec, he builds it. This doc gets you fully context-loaded, then
points you at exactly where you plug in. Kartik (PM+CA) owns product/finance/tax; you + Kartik
own the story and the finance intelligence.

> **Scope note (re-lane):** your strength is finance + narrative, not plumbing — so stay on
> the *domain* side (what advice, what to remember, when to escalate) and hand the *build*
> side to Afraz. RM view = you define what an RM needs to see; Afraz builds the screen.

## Read in this order (≈45 min, all in this repo)

1. **`00-STATE.md`** — single source of truth: the whole project's status, every decision
   (D1–D7) with rationale, and what's open. Start here, always.
2. **`01-challenge-brief.md`** — the IDBI Innovate 2026 problem statement & rules (Track 01).
3. **`research/research-landscape-products.md`** — global + India competitors; the white space we own.
4. **`research/research-d4-bfsi-advice-posture.md`** — the compliance spine (distributor vs RIA;
   why we never say "advice" in-product). Your CFA lens matters most here.
5. **`research/research-idbi-client.md`** — who IDBI's customer actually is (LIC-owned, tier-2/3,
   FD-heavy) + the Emergency Liquidity Advisor idea.
6. **`research/research-rfp-2022-baseline.md`** — IDBI's OWN 2022 tender = our table stakes. The
   "we're the intelligence layer your rails were waiting for" pitch line lives here.
7. **`research/research-advisor-os.md`** — the RM-facing side (Morgan Stanley precedent). This is
   your RM-view brief.
8. **`research/research-failures-judge-lens.md`** — why robo-1.0 died + what bank judges score on.
9. **`03-solution-spec.md`** — the assembled product spec (methodology marked ⚠️CA = pending
   Kartik review).
10. **`docs/MEMORY-ARCHITECTURE.md`** — the AI-native twin. **This is your brainstorm
    starter with Kartik** (see its §7 agenda).
11. **Run the PoC** — `README-TEST.md`. Click every flow. The deck must match what the
    product actually does; the PoC is your ground truth.

## Your brief (from Kartik) — mapped to where it lives

### 1. Data sources for personalization: AA · OCEN · ULI
Full treatment in `docs/MEMORY-ARCHITECTURE.md` §5. Short version:
- **AA** = consent-based *financial data* sharing → the twin's money picture.
- **ULI** = RBI rails for consent-based *credit-enabling* data access → powers the
  liquidity/lending features.
- **OCEN** = open protocol for *credit distribution* → embedded-credit option.
- ⚠️ Don't conflate them in the deck — a bank judge will catch it. AA = share data,
  ULI = enable credit underwriting, OCEN = distribute credit.

**⭐ Your primary tool: `financial-database/`** (Kartik built this from the official specs):
- `field-inventory/MASTER_field_inventory.csv` — **all 1,731 fields** actually available
  on the three rails (AA 1,318 · OCEN 299 · ULI 114) with type, allowed values, required
  flag, and source schema. When you design the smart layer / twin, every "we know X about
  the customer" claim must trace to a row in this CSV — that's how the deck survives a
  technical judge asking "where does that data actually come from?"
- `docs/ULI-OCEN-AA-data-availability.md` — the research note: who provides what, consent
  mechanics, refresh frequency.
- `source-specs/sahamati-aa-standards/` includes **sample XML payloads per FI type** —
  i.e., what a deposit/MF/insurance record *actually looks like* post-consent. Great for
  making the deck's data story concrete.
- Caveats (from its README): ULI rows are indicative (RBIH gates specs behind onboarding);
  on AA, schema existence ≠ live FIPs (EPF/credit-card/PPF schemas exist but aren't live —
  check sahamati.org.in/data-fi-types-available-on-aa). Both caveats are worth a footnote
  in the deck — showing we know the difference reads as diligence.
- Map fields → twin layers: AA transactions/deposits → L2 financial state; KYC-ish
  identity fields → L1; the engine consumes both (see `docs/MEMORY-ARCHITECTURE.md` §1a).

### 2. Understanding of IDBI products (for advisory)
- IDBI is an **AMFI distributor (ARN-0058)**; distributes 3rd-party MFs (its own AMC was
  divested → open-architecture story). Shelf includes FD/RD, **loan-against-FD**,
  **loan-against-MF-units/shares**, personal & home loans, demat, insurance (LIC parent +
  Ageas Federal legacy). Details in `research/research-idbi-client.md`.
- The engine already maps "customer need → IDBI product" (the liquidity waterfall uses
  loan-against-FD/MF). Extend this chain for every advisory moment.

### 3. Personas — and how treatment differs (your logic to formalize)
Personas drafted in `research/research-idbi-client.md`. The big axes:

| Axis | What changes in the advisory |
|---|---|
| **NRI vs Resident** | **Biggest switch.** NRI = FEMA regime: NRE (repatriable, India-tax-free interest) / NRO (taxable, ~30% TDS) / FCNR accounts; repatriation limits; FATCA restricts some AMCs for US/Canada NRIs; DTAA on tax; PPF/small-savings restrictions. IDBI has a **Dubai branch + NRI products** → strategic. The twin must capture residency Day 0 and switch the whole product universe + tax logic. |
| **Life stage** | GenZ (micro-investing, gold round-ups, first job, low ticket) · Millennial (goals: home/child/wedding, EMIs, tax, step-up SIPs) · Pensioner/old (capital protection, income, SCSS, health, estate/nominee, + **vulnerable-customer safeguards**: slower pace, cooling-off, family option). |
| **Goal-based** | cuts across all — the engine already does goal-inflation-adjusted glide paths. |

Residency + life-stage live in the twin's **L1 identity layer** (`MEMORY-ARCHITECTURE.md`)
and *drive* the engine. Your job: formalize the persona → treatment rules so the deck can
show "one twin, right advice for NRI vs GenZ vs pensioner."

## Your deliverables & where to start

- **Deck** — your primary deliverable, on the official IDBI template. Everything you need
  is in `deck/`: the template (`IDBI-submission-template.pptx`), your direction brief
  (`DECK-DIRECTION-JYOTI.md` — style rules, differentiator table, flagship demo moment,
  business-case framing, roadmap format), and the slide-by-asset mapping in
  `01-challenge-brief.md`. All deck copy follows `docs/WRITING-STYLE.md` (binding).
  Still: internalize the research first so the deck has no fluff (Kartik's rule).
- **Advisory playbook (your biggest lever)** — how a *great human* wealth manager actually
  works, AI aside: discovery, risk profiling, asset allocation, product suitability, when to
  rebalance, behavioural coaching, tax. This grounds everything else. Your CFA + equity-research
  lane. Draft it; Kartik CA-reviews.
- **Persona + memory *rules*** — the domain logic: persona → treatment, and what the twin
  remembers/forgets and why (you've already drafted this well — finish it). *Rules only*; the
  memory infrastructure/schema is Afraz's build. Co-input to `docs/MEMORY-ARCHITECTURE.md`.
- **AI→RM escalation *policy*** — *when* AI hands to a human and *what context transfers*
  (the compliance + lead-gen feature; D4 in `00-STATE.md`). You define the policy; Afraz wires it.
- **Deck / story** — your primary deliverable (see below).

**Hand to Afraz (you spec, he builds):** the smart-layer / LLM wiring (`poc/engine.js`,
`app.js`), the memory infrastructure, and the **RM console** (`poc/rm.html`) — for RM view you
define *what an RM needs to see* (`research/research-advisor-os.md` is your brief), he builds the screen.
**Send to Kartik before final:** anything tax (NRI/DTAA/regime) — draft it, he confirms.

## House rules (please keep)
- **`00-STATE.md` is the source of truth** — read it at the start of every session, update it
  at the end. Any teammate (or AI) can pick up from it.
- One artifact at a time, finished fully. Plain markdown, model-agnostic.
- Discovery before deck: for anything new, ask "who's the best-in-world at this?" first —
  we synthesize proven pieces, we don't design from blank paper.
