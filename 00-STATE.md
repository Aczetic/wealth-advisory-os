# PROJECT STATE — single source of truth

> **For any AI model or human picking this up:** read this file first, top to bottom.
> It tells you the goal, what's decided, what's done, and the exact next action.
> Update this file at the end of every working session. Keep it under ~150 lines.

## What this project is

Building a submission for **IDBI Innovate 2026** hackathon (Hack2skill platform),
**Track 01: Wealth Advisory / Conversational AI / Mobile Banking**.

- **Problem statement (verbatim):** Wealth management and advisory services remain
  fragmented and largely inaccessible to large number of customers. Absence of
  comprehensive customer investment behaviour and spending habits limits the ability
  to provide timely, personalized, data-driven guidance.
- **Expected outcome (verbatim):** AI-powered Digital Wealth Management (Avatar Based)
  Application which integrates into the bank's mobile application, to deliver
  personalized and scalable wealth advisory services through an intuitive digital interface.

Full challenge facts: see `01-challenge-brief.md`.

## Team

- **Kartik** — Product Manager + Chartered Accountant. Owns product, finance/tax/regulatory angles.
- **Tech friend** (being onboarded) — owns engineering.

## Operating rules (set by Kartik — do not violate)

1. Figure out the solution **to the last detail first**; deck comes last. No high-level fluff.
2. **One artifact at a time, completed fully.** Never start multiple files/workstreams in parallel.
3. Token-efficient: write tight, decision-oriented docs. No restating what's in other files.
4. Everything must stay **model-agnostic** (plain markdown) so GPT/Cursor/Claude can continue seamlessly.
5. Target is a **production-ready deployable solution**, not a hackathon demo hack.
6. Update this STATE file after every session: move items between Done/Next, log decisions.

## Hard deadlines

- **2026-07-09: registration + application deadline on Hack2skill** ← URGENT, register first
- 2026-08-21: event ends. Staged: idea submission → shortlist → sandbox build (APIs, synthetic data, cloud, mentors) → PoC.

## Decision log

| # | Decision | Status |
|---|----------|--------|
| D1 | Spec-first, deck-last workflow | ✅ Decided |
| D2 | Product universe for PoC: **MF-first + bank products (FD/RD) + gold** (gold via Gold ETF/MF route to stay on distribution rails) | ✅ Decided 2026-07-08 |
| D3 | Avatar: **lightweight 2D animated + voice** (lip-sync TTS, multilingual); photoreal only as roadmap if at all | ✅ Decided 2026-07-08 |
| D4 | Advice posture: **distributor wrapper** (AMFI ARN, "curated portfolios/insights" language, never "advice"); AA data for analysis only, recommendations restricted to bank-distributed universe; out-of-universe needs **escalate to RM/wealth desk**; **SEBI AI/ML governance designed in natively** (deterministic engine decides, LLM explains, full audit trail); RIA-via-SIDD roadmap-only. Basis: `research-d4-bfsi-advice-posture.md` | ✅ Decided 2026-07-08 |
| D5 | Pitch lead: **data/behavior engine as the moat**; avatar is the interface/face of it | ✅ Decided 2026-07-08 |
| D6 | Advisor OS (RM-facing side, "one engine two faces"): how much in PoC scope? (a) roadmap-only, (b) avatar + one RM surface demoed [recommended], (c) full both sides | ⏳ Open — see `research-advisor-os.md` |
| D7 | Delivery mechanism: **hybrid, channel-agnostic** (native micro-SDK for mic/TTS/avatar canvas + server-driven conversational UI); GO Mobile+ = reference integration for PoC, but module must embed in any IDBI channel (new digital app per 2022 RFP, WhatsApp later) — see screens file + addendum | ⏳ Recommended — awaiting Kartik |

## Done

- [x] Challenge researched; dates, stages, prize pool confirmed (see `01-challenge-brief.md`)
- [x] Folder structure + this STATE file created (2026-07-08)
- [x] D4 advice-posture research (`research-d4-bfsi-advice-posture.md`) — D4 decided
- [x] Global + India landscape scan (`research-landscape-products.md`) — precedents, gap analysis, 10-item feature steal-list for the spec (2026-07-08)

## Discovery checklist (gate: complete before writing 02-solution-spec.md)

- [x] Regulatory posture — how BFSI handles advice boundary (`research-d4-bfsi-advice-posture.md`)
- [x] Landscape scan — global + India products/startups, gaps, steal-list (`research-landscape-products.md`)
- [x] **Client research: IDBI Bank** (`research-idbi-client.md`) — LIC-owned (94.72% w/ GoI),
      tier-2/3 retail-heavy base, ARN-0058 distributor, GO Mobile+ is transactional-only,
      3 draft personas, + flagship feature idea: **Emergency Liquidity Advisor** (Kartik's
      EPF thought, upgraded — liquidity waterfall using IDBI's own loan products)
- [x] **Advisor OS research** (`research-advisor-os.md`) — Kartik's insight; Vise ($1B),
      Zocks/Jump agentic-OS wave, Morgan Stanley AI@MS precedent (98% adoption, 30 min/meeting,
      $64B NNA quarter); "one engine, two faces" architecture mapped; D6 scope decision open
- [x] **Failure analysis + Judge lens** (`research-failures-judge-lens.md`) — 5 robo-1.0
      failure causes each answered structurally by bank-embedding; judge lens = RBI outsourcing/
      data-residency/AI posture, staff-augmentation framing, integration-over-replacement
- [x] **GO Mobile+ screens + app portfolio** (`research-gomobile-screens.md` + addendum) —
      nav tree, 5 avatar entry points, app fleet is fragmented, D7 recommended
- [x] **IDBI's own 2022 Digital Bank App RFP** (`research-rfp-2022-baseline.md` + PDF saved as
      `source-rfp-2022-idbi-digital-bank.pdf`) — THE BASELINE: bank's written table stakes
      (wealth module W1–W6, spend analytics, chatbot, 15 languages, on-prem DC/DR, their tech
      stack). Spec must cover-and-exceed line by line. Pitch: "we're the intelligence layer
      your 2022 RFP's rails were waiting for"
- [ ] Submission form fields captured into `01-challenge-brief.md` (needs Kartik's registration)

Rule (Kartik, 2026-07-08): discovery before definition — always ask "what must inform this
artifact?" before writing it, and propose those steps proactively.

## Next action (do this one thing, completely)

1. **Kartik: register on Hack2skill TODAY (before 2026-07-09)** and capture the
   submission form's required fields into `01-challenge-brief.md`.
2. Work through `02-spec-decomposition-map.md` in its suggested closure order.
   DONE: GO Mobile+ screens, app portfolio + 2022 RFP baseline, avatar spec patterns
   (`research-avatar-spec-patterns.md` — voice-note-first model, anti-sycophancy,
   conversational onboarding, swipeless curation). NEXT: advisory-methodology design
   session WITH Kartik (subsystem B — the engine's brain), then data map (C).
3. Founder-mode gaps flagged to Kartik (2026-07-08): register NOW, lock tech friend's
   commitment, talk to 1 real IDBI RM/wealth person this week.
3. Kartik to decide **D6** (Advisor OS scope in PoC — recommendation: option b).
4. `02-solution-spec.md` is written only after the map's items are closed — it then
   becomes an assembly job, not a thinking job.

NOTE (2026-07-08): file map updated — `02-spec-decomposition-map.md` inserted; the
solution spec file will be `03-solution-spec.md` when its turn comes (renumber later
files accordingly).

## Planned file map (create only when its turn comes)

- `00-STATE.md` — this file
- `01-challenge-brief.md` — fixed challenge facts + submission form fields
- `02-solution-spec.md` — product spec (next up)
- `03-architecture.md` — technical architecture (after spec is locked)
- `04-compliance.md` — SEBI/AMFI/DPDP/AA compliance design (after spec)
- `05-deck-outline.md` → deck (last)
