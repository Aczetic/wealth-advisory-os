# Advisory Design Guide

Data sources, customer segmentation, advisory playbooks, and customer journeys.

## Financial data and customer context

### 1. Data sources for personalization: AA · OCEN · ULI
Full treatment in `docs/MEMORY-ARCHITECTURE.md` §5. Short version:
- **AA** = consent-based *financial data* sharing → the twin's money picture.
- **ULI** = RBI rails for consent-based *credit-enabling* data access → powers the
  liquidity/lending features.
- **OCEN** = open protocol for *credit distribution* → embedded-credit option.
- Keep these rails distinct: AA = share data,
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

## Advisory playbooks and journeys

1. **Playbook library** — the product is an **Advisory OS banks embed in their own apps**, and it must
   **close the thread** — a conversation ends in a *completed action*, never in "go check that
   menu." So the playbook isn't only "how a great wealth manager works" anymore. Five families:

   | # | Family | Covers | Example situations |
   |---|---|---|---|
   | 1 | **Advisory craft** (the original core — start here) | discovery, risk profiling, goal planning, asset allocation, product suitability, rebalancing, behavioural coaching | "should I invest more?"; market-crash hand-holding; SIP step-up |
   | 2 | **Execute the advice** | what happens after the customer says **yes** — confirmation, order placement, failure branches, post-trade follow-up | MF lumpsum/SIP end-to-end; FD booking; liquidity-waterfall execution |
   | 3 | **Banking context** | asks where advisory meets everyday banking — answer, then add the advisory hook | "show my balance" (→ idle-cash moment); "I need a loan" (→ cheapest-*suitable*-credit path: LAMF/LAFD before personal loan); CIBIL guidance (score → improvement plan → monitoring) |
   | 4 | **Proactive reach-outs & cross-sell** (bank-initiated — this is the bank's revenue case) | data-triggered moments where *the engine opens* the conversation | FD maturing; salary bump; idle balance ≥ threshold; SIP lapsed; goal off-track |
   | 5 | **RM collaboration** | when/why AI hands to human, what context transfers, RM's next-best-action | out-of-universe ask; vulnerable customer; high-value moment; customer asks for a human |

   **Write every playbook as a *procedure the agent runs*, not an essay.** The
   agent executes it step-by-step in conversation. Break each situation into discrete **steps**
   and the **to-&-fro** (what it asks, how the customer might answer, how it branches).
   Flowchart / SOP, not textbook chapter. The template, expanded for close-the-thread:

   | Part | What goes here |
   |---|---|
   | **Trigger** | when this playbook fires — a customer utterance ("should I invest more?") OR a data signal (idle balance; FD matures in 15 days). Family-4 triggers are always data signals |
   | **Gather** | what it needs first — split *known from data* vs *must-ask*; the exact question(s) to ask |
   | **Branches** | for each likely customer answer → the next step (this is the to-&-fro) |
   | **Rule** | the decision logic — if X and Y → recommend Z (thresholds, glide, suitability gate) |
   | **Recommend** | the output + the one-line *why* (this feeds "Why I'm suggesting this") |
   | **Execute** | the close-the-thread step: confirm intent → action happens (order placed, application filed) → **failure branches** (payment fails, cut-off missed, eligibility declined) → completion message. Treat the mechanics as a black box that succeeds or fails — the API contract is Kartik/Aczetic's side, not yours |
   | **Record** | what gets written to memory/twin after this interaction + the one-line audit entry |
   | **Follow-up** | what Asha proactively says/checks later (T+1: "order allotted"; T+30: "first SIP debited — here's how it went"). These follow-ups are exactly the memory-payoff beats your storylines need |
   | **Escalate** | the condition that hands to the RM + what context transfers with it |

   **Family-4 extras** — each reach-out also needs **Guardrails**: eligibility check, suppression
   rules (frequency cap, quiet hours, back-off after a decline), and channel. And one posture
   rule that is our moat: **a cross-sell only fires if the suitability engine would recommend it
   anyway** — the bank gets cross-sell volume *because* the customer can trust that Asha never
   pushes. Never write a reach-out that a good human advisor wouldn't initiate.

   Rule of thumb: if a step can't be written as "agent does / agent asks / customer answers /
   agent branches," it's too vague — sharpen it until it can. That's what makes it runnable.
   Depth order if time runs short: family 1 fully, then 2 and 4 (they're the demo + business
   case), then 3, then 5.
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
   the **RM handoffs** (when/why the human steps in, what context transfers), how the
   **twin updates** each time, **at least one completed transaction** (advice → yes → executed
   → follow-up beat later), and **at least one bank-initiated reach-out** (family-4 playbook)
   that lands as helpful, not spammy. Every advisory moment should map to a step in your playbook
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

Tax scenarios distinguish residency, treaty eligibility, and tax regime; prototype examples use illustrative assumptions.
