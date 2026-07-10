# Customer Memory Design

Question sets, retention rules, customer segments, and relationship-manager handoff.

## 1. Day-0 question set (minimum viable twin)

Format: tap-to-answer option chips in conversation (banded choices, minimal typing) —
7 questions + 2 data confirmations, ~2 minutes. Order matches the live script
(`storyline-A-kanak.md` §4, beat T0), which is the reference implementation.

| # | Question | Options | Feeds |
|---|---|---|---|
| 1 | Preferred language — asked FIRST | English / Hindi / Hinglish / regional | communication profile; Asha switches register immediately (demo moment) |
| 2 | Which city do you currently live in? | free text | L1 — **residency logged silently** (Indian city → Resident; foreign city → NRI branch: universe + FEMA/tax switch) |
| 3 | Living status | own home / rented / with family | L1 housing |
| 4 | People financially dependent on you | none / 1–2 / 3–4 / 5+ | relationship graph seed |
| 5 | What do you do? | salaried / own business / student / retired | L1 — income stability |
| — | **Confirm** income + expenses from bank data ("₹50K aati hai, ₹22–25K kharch hota hai — sahi hai?") | yes / correct me | L2 — stated-vs-observed rule; the "she already knows me" wow moment |
| — | **Confirm** known holdings + ask: "koi aur savings/investments — kisi aur bank mein?" | free text | L2 — captures out-of-bank assets (AA consent hook) |
| 6 | Which matters more? | protect money / steady growth / max long-term returns | L3 risk attitude |
| 7 | Any big goal you'd like to plan for? | free text (education / home / wedding / retirement…) | first goal → engine plans from day 1; closes with honest goal math + emergency-fund-first |

**Principle: never ask what the bank already knows.** Age → KYC (never asked).
Income/expenses/holdings → observed, then confirmed — never asked cold.
Optional question: financial support outside own income (yes/no) —
or let it surface naturally in the family conversation later.


## 2. Salience: fade vs stay

Principle: **fading = Asha stops raising it; nothing is ever deleted** (append-only
memory, audit requires reconstructing what we knew when advice was given).

| Fades (loses salience) | Stays (permanent profile) |
|---|---|
| Completed short-term goals | The financial twin itself (all layers) |
| Throwaway queries ("today's gold price") | Long-term goals |
| One-time questions | Day-0 answers (identity substrate, L1) |
| Non-recurring events (a bonus, a one-off return figure) | Client / financial / risk profile |
| | Spending habits & investment behaviour (L3) |
| | Previous financial decisions (L5) |

Promotion rule: **the event fades, the pattern it reveals is promoted.**
- Bonus in March = event, fades → "receives a bonus every March" = habit, stays
  (and triggers a proactive nudge next February).
- Completed car goal = fades from conversation → "completed a goal, never missed
  a SIP" = investment behaviour, stays.

Additional memory attributes:
- Stays: family/relationship graph + obligations (changes the numbers), nominee/estate;
  rejections **with reason** (prevents re-pitching); Asha's refusals (panic-sell
  declined = advice given → permanent audit record).
- Fades: unconfirmed inferences — **decay speed depends on provenance**
  (user-said = slowest, AA-derived = self-refreshing, AI-inferred = fastest);
  what-if simulations never acted on.

Third bucket — **stays, but with expiry/review date** (governed memory):
| Item | Why it can't be "forever" |
|---|---|
| AA-derived data | consent expiry → purge/refresh is a legal requirement (DPDP/AA) |
| Risk profile | SEBI expects periodic suitability re-assessment |
| Income / job | true until it changes — re-confirm on cadence, never assume |
| Contact / address / KYC | refresh on schedule, never assume current |

Retention considerations:
- Stays: communication profile — language preference, voice-notes vs chat/text,
  most-active time of day (nudges land when the customer actually looks at the
  phone; never ask twice — the "sakhi feeling");
  life-event timeline (married/child/job-change — versioned, never overwritten);
  consent records themselves (permanent audit).
- Fades: single-chat moods — but per the promotion rule, a *pattern* of market
  anxiety is L3 behaviour → stays, and tunes Asha's tone (lead with reassurance).



## 3. Persona × memory

Personas from `research-idbi-client.md` (P1–P3) + GenZ + the NRI overlay. All switches
live in L1 (captured Day 0) and drive the engine.

| Persona | Product universe | Tone & pace | Memory prioritizes | Safeguards |
|---|---|---|---|---|
| **GenZ / first job** | ₹500 starter SIPs, gold round-ups, liquid-fund emergency starter; ELSS once taxable | casual Hinglish, learning-first — explain every term once | first-salary date; which concepts already explained (never re-explain, never assume) | tiny tickets only; habit-building over returns; no leverage |
| **Salaried climber (P2)** | step-up SIPs, ELSS/80C, goal glide paths, loan-against-MF for liquidity | efficient, data-backed, app-native | EMIs, bonus cycle, tax regime, job changes | EMI/income ratio watch — flag over-extension before recommending more investing |
| **FD Family (P1 — primary)** | FD→MF migration starting with conservative hybrid/debt, gold MF, RD, child-goal SIPs | vernacular, trust-first, family-goal language, small steps | family obligations, gold affinity, festival/wedding spend cycles | never push risk; hard suitability gate; simple-language register |
| **Pensioner (P3)** | capital protection: SCSS, FD laddering, debt funds, SWP for monthly income; health cover awareness | slower pace, respectful, patient; repeat key numbers | pension credit dates, medical spends, nominee/estate status, dependent spouse | **vulnerable-customer set**: cooling-off before big decisions, offer family involvement, no long lock-ins, large decisions → RM (tier 3) |
| **NRI (overlay on any of the above)** | switches to NRE/NRO/FCNR universe; NRI-eligible MFs only (FATCA excludes some AMCs for US/Canada); **no PPF/SCSS/small savings**; DTAA-aware tax notes | English default; time-zone-aware nudges (most-active-time memory) | residency country + FATCA status, repatriation needs, India-visit dates, remittance patterns, family in India | cross-border tax always → RM tier 2 (never AI-answered); repatriation limits stated, not assumed |

Key line for the deck: **one twin, five switches — same engine, right advice for
everyone.** Residency is an overlay, not a persona: an NRI GenZ and an NRI pensioner
both exist; L1 stores both dimensions.



## 4. AI→RM handoff

Dividing line: NOT "personalized vs generic" — goal-based curation within IDBI's
shelf stays with the AI (that's the product). The line is **inside vs outside the
distributed universe, and routine vs human-judgment.**

AI handles (SEBI distributor posture): curated IDBI-shelf recommendations (MF/FD/RD/
gold) from client profile; goal-based glide paths; market/stock *news* as information
(never stock recommendations).

**Escalation triggers (WHEN):**
1. Out-of-universe ask — specific stocks, non-distributed products (D4 boundary)
2. Customer asks for a human
3. Distress + big decision (panic-sell → refuse first, then offer RM)
4. High-value moment / affluent-tier customer (= the lead-gen feature)
5. Vulnerable customer + large irreversible decision (pensioner safeguard)
6. Complex judgment: inheritance, NRI cross-border tax, estate planning

**Context that TRANSFERS (RM never starts cold):**
- risk profile + suitability record; goals + progress
- conversation summary + the specific triggering ask
- recent recommendations incl. rejections *with reason* (no re-pitching)
- relationship/book value (PoC already does this)

**Stays PRIVATE:**
- raw transcripts (RM gets summary only?)
- emotional inferences → surface as a "handle with reassurance" flag, not a profile
- anything outside the consent purpose — RM sees a consented projection, not the raw twin

**The tiers (it's a *tiered* switch):**
| Tier | Channel | For |
|---|---|---|
| 1 | in-app chat, general RM | quick out-of-scope questions |
| 2 | scheduled call-back | complex, not urgent (NRI tax, inheritance) |
| 3 | wealth-desk specialist / branch | affluent tier, large decisions |

Trigger type → tier. (High-value moment → Tier 3 = the lead-gen pipe.)

**Round trip:** RM notes flow back into the twin (provenance `RM-noted`) — Asha
knows what the human discussed; customer never repeats themselves in either direction.

**Handoff etiquette & governance:**
- consent at the moment: "Shall I share your profile so you don't repeat yourself?"
- Asha goes quiet on the escalated topic until the RM resolves it (no dueling advisors)
- handoff = audit event: log when, why, exactly what was shared
- failure path: no RM available → promised call-back time, Asha follows up if missed


## 5. Capturing family obligations conversationally

Question: "Ghar mein kaun aap par depend karta hai?" — obligations as
edges in the relationship graph; they change emergency-fund + insurance numbers.

## 6. Third-order items: v1 vs roadmap

Deployment considerations: bi-temporal versioning + consent-scoped memory are likely
v1 (bank non-negotiables); salience/decay tuning can phase in.
