# Welcome Jyoti 👋 — get up to speed, then own the intelligence + deck

You're driving **three things**: the **advisory playbook** (how a great wealth manager
actually works), **finishing the persona** work, and **3–4 varied AI demo walkthroughs** that
showcase what Asha can do. That's the whole scope — go deep on these, ignore everything else.
This doc gets you context-loaded, then points you at exactly where you plug in. Kartik owns
product/finance/tax; you + Kartik own the finance intelligence and the story.

> **Scope note:** your strength is finance + narrative — stay entirely on that. The engineering
> build (smart-layer, memory infrastructure, RM console) simply isn't your concern; don't spend
> a minute on it.

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
9. **`03-solution-spec.md`** — the assembled product spec (methodology marked ⚠️Kartik = pending
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

## Your deliverables — just these three (go deep, ignore the rest)

1. **Advisory playbook (your biggest lever)** — how a *great human* wealth manager actually
   works, AI aside: discovery, risk profiling, asset allocation, product suitability, when to
   rebalance, behavioural coaching. Your CFA + equity-research lane. This grounds everything.
   Draft it; Kartik reviews.

   **⚠️ Critical — write it as a *procedure the agent runs*, not an essay.** The agent will
   execute this playbook step-by-step, in conversation. So every advisory situation must break
   into discrete **steps** and the **to-&-fro** (what it asks, how the customer might answer,
   how it branches). Think flowchart / SOP, not textbook chapter. Use this shape per situation:

   | Part | What goes here |
   |---|---|
   | **Trigger** | when this playbook fires (idle balance detected; customer asks "should I invest more?") |
   | **Gather** | what it needs first — split *known from data* vs *must-ask*; the exact question(s) to ask |
   | **Branches** | for each likely customer answer → the next step (this is the to-&-fro) |
   | **Rule** | the decision logic — if X and Y → recommend Z (thresholds, glide, suitability gate) |
   | **Recommend** | the output + the one-line *why* (this feeds "Why I'm suggesting this") |
   | **Escalate** | the condition that hands to a human |

   Rule of thumb: if a step can't be written as "agent does / agent asks / customer answers /
   agent branches," it's too vague — sharpen it until it can. That's what makes it runnable.
2. **Finish the persona** — complete the persona → treatment logic and the memory *rules* that
   go with it (you've already drafted this well in `docs/brainstorm-prep-jyoti.md` — just close
   it out). Co-input to `docs/MEMORY-ARCHITECTURE.md`.
3. **Two detailed storylines (the demo spine)** — NOT short one-off scripts. **Two deep,
   longitudinal narratives** that follow one customer over months/years, showing how the
   relationship — and Asha's memory — *compounds*. Immersive and realistic: a saga, not a
   snippet. Each runs across **three perspectives that interact: Customer ⟷ Asha (AI) ⟷ RM.**

   The two customers (locked):
   - **A — young metro professional, first finance job** (name TBD). Earns X, spends Y;
     aspiration: study abroad. Starts investing small; over time the goal firms up → needs a
     study-abroad plan (family contribution + an education loan) and a **loan-against-mutual-fund**
     moment (cross-sell). Investing evolves as the plan firms. Multi-month arc.
   - **B — ~45, government officer, rural** (name TBD). Planning the 48→60 window: child's
     marriage, then retirement. Money today sits in **FD + post office**; the arc is the savings
     conversation + gradual migration to a goal-based plan. Multi-year arc.

   Structure each as a **timeline of beats** (T0 → +1mo → +3mo → life events…). At each beat,
   show the three lanes:

   | Beat (when) | Life trigger | Customer | Asha (AI) — the advisory moment | RM — what they see/do |

   Make sure each storyline shows: Asha's **memory paying off** (callbacks to earlier beats),
   the **RM handoffs** (when/why the human steps in, what context transfers), and how the
   **twin updates** each time. Every advisory moment should map to a step in your playbook
   (deliverable 1) — so writing these two stories *tests* your playbook end-to-end.
   (`ui/wealth-companion-mock.html` shows the target look/feel of a single beat.)

   **These are LIVE-DEMO profiles, not just stories.** Each persona = a complete, realistic
   financial profile — identity, income, monthly spends, holdings (FD / MF / post-office),
   liabilities, family/dependents, goals — that loads into the engine, so on stage you can
   actually *talk to Asha as this customer* and she produces real recommendations. That live
   run is what proves well-rounded capability (far stronger than slides for a bank panel).
   The storyline is the script; the profile is what makes it run. Ground the numbers in real
   fields (`financial-database/field-inventory/MASTER_field_inventory.csv`) so the data is
   defensible, and shape the profile to the engine's Client Graph (`03-solution-spec.md` §5).

**One rule — send to Kartik before final:** anything tax (NRI/DTAA/regime) — draft it, he confirms.

## House rules (please keep)
- **`00-STATE.md` is the source of truth** — read it at the start of every session, update it
  at the end. Any teammate (or AI) can pick up from it.
- One artifact at a time, finished fully. Plain markdown, model-agnostic.
- Discovery before deck: for anything new, ask "who's the best-in-world at this?" first —
  we synthesize proven pieces, we don't design from blank paper.
