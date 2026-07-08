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

- **Kartik** — Product Manager + Chartered Accountant. Owns product, finance/tax/regulatory.
- **Afraz** — Engineer. Owns technical architecture, tech stack (LLM/TTS/STT), UI, integration. Onboarding: `docs/ONBOARDING-AFRAZ.md`.
- **Jyoti** — CFA L1 + BAF. Owns deck, AI logic/smart layer, tiered AI→RM switch, RM view, memory design. Onboarding: `docs/ONBOARDING-JYOTI.md`.

## Repo (collaboration)

- GitHub (**private**): https://github.com/iamkartik4793/arthsakhi-idbi-wealth
- `git clone` then read `README.md` → routes each teammate to their onboarding doc.
- Add Afraz & Jyoti as collaborators: repo Settings → Collaborators (or
  `gh repo edit --add-collaborator <user>`).
- `.claude/` is gitignored (local tooling). Memory files live outside the repo (personal).

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
| D4 | Advice posture: **distributor wrapper** (AMFI ARN, "curated portfolios/insights" language, never "advice"); AA data for analysis only, recommendations restricted to bank-distributed universe; out-of-universe needs **escalate to RM/wealth desk**; **SEBI AI/ML governance designed in natively** (deterministic engine decides, LLM explains, full audit trail); RIA-via-SIDD roadmap-only. Basis: `research/research-d4-bfsi-advice-posture.md` | ✅ Decided 2026-07-08 |
| D5 | Pitch lead: **data/behavior engine as the moat**; avatar is the interface/face of it | ✅ Decided 2026-07-08 |
| D6 | Advisor OS (RM-facing side, "one engine two faces"): how much in PoC scope? (a) roadmap-only, (b) avatar + one RM surface demoed [recommended], (c) full both sides | ⏳ Open — see `research/research-advisor-os.md` |
| D7 | Delivery mechanism: **hybrid, channel-agnostic** (native micro-SDK for mic/TTS/avatar canvas + server-driven conversational UI); GO Mobile+ = reference integration for PoC, but module must embed in any IDBI channel (new digital app per 2022 RFP, WhatsApp later) — see screens file + addendum | ⏳ Recommended — awaiting Kartik |
| D8 | Unifying architecture = **AI-native financial twin**: one Customer Graph (memory graph + relationship graph), 5 typed layers, 3 retrieval indexes (time/event/topic), consent-scoped. Extends the engine's Client Graph. Design in `docs/MEMORY-ARCHITECTURE.md` | 🔄 Framework set by Kartik; brainstorm with Jyoti pending |

## Done

- [x] Challenge researched; dates, stages, prize pool confirmed (see `01-challenge-brief.md`)
- [x] Folder structure + this STATE file created (2026-07-08)
- [x] D4 advice-posture research (`research/research-d4-bfsi-advice-posture.md`) — D4 decided
- [x] Global + India landscape scan (`research/research-landscape-products.md`) — precedents, gap analysis, 10-item feature steal-list for the spec (2026-07-08)

## Discovery checklist (gate: complete before writing 02-solution-spec.md)

- [x] Regulatory posture — how BFSI handles advice boundary (`research/research-d4-bfsi-advice-posture.md`)
- [x] Landscape scan — global + India products/startups, gaps, steal-list (`research/research-landscape-products.md`)
- [x] **Client research: IDBI Bank** (`research/research-idbi-client.md`) — LIC-owned (94.72% w/ GoI),
      tier-2/3 retail-heavy base, ARN-0058 distributor, GO Mobile+ is transactional-only,
      3 draft personas, + flagship feature idea: **Emergency Liquidity Advisor** (Kartik's
      EPF thought, upgraded — liquidity waterfall using IDBI's own loan products)
- [x] **Advisor OS research** (`research/research-advisor-os.md`) — Kartik's insight; Vise ($1B),
      Zocks/Jump agentic-OS wave, Morgan Stanley AI@MS precedent (98% adoption, 30 min/meeting,
      $64B NNA quarter); "one engine, two faces" architecture mapped; D6 scope decision open
- [x] **Failure analysis + Judge lens** (`research/research-failures-judge-lens.md`) — 5 robo-1.0
      failure causes each answered structurally by bank-embedding; judge lens = RBI outsourcing/
      data-residency/AI posture, staff-augmentation framing, integration-over-replacement
- [x] **GO Mobile+ screens + app portfolio** (`research/research-gomobile-screens.md` + addendum) —
      nav tree, 5 avatar entry points, app fleet is fragmented, D7 recommended
- [x] **IDBI's own 2022 Digital Bank App RFP** (`research/research-rfp-2022-baseline.md` + PDF saved as
      `research/source-rfp-2022-idbi-digital-bank.pdf`) — THE BASELINE: bank's written table stakes
      (wealth module W1–W6, spend analytics, chatbot, 15 languages, on-prem DC/DR, their tech
      stack). Spec must cover-and-exceed line by line. Pitch: "we're the intelligence layer
      your 2022 RFP's rails were waiting for"
- [ ] Submission form fields captured into `01-challenge-brief.md` (needs Kartik's registration)

Rule (Kartik, 2026-07-08): discovery before definition — always ask "what must inform this
artifact?" before writing it, and propose those steps proactively.

## Done (overnight 2026-07-09 + collaboration setup)

- [x] **Working PoC built & verified** (`poc/`) — avatar app + deterministic engine +
      RM console; 36/36 golden tests passing; all flows click-verified in browser.
      Run: `cd poc && node server.js`. Guide: `README-TEST.md`.
- [x] **v0.9 solution spec** (`03-solution-spec.md`) — methodology marked ⚠️CA pending Kartik.
- [x] **GitHub repo (private)** created + pushed: iamkartik4793/arthsakhi-idbi-wealth.
- [x] **Team onboarding docs** — `docs/ONBOARDING-AFRAZ.md`, `docs/ONBOARDING-JYOTI.md`.
- [x] **Memory architecture / AI-native twin** (`docs/MEMORY-ARCHITECTURE.md`, D8) — framework
      + 5 layers + 3 indexes + third-order gaps + AA/ULI/OCEN mapping; brainstorm-ready.

## Next action (do this one thing, completely)

1. **Kartik: register on Hack2skill — DEADLINE TODAY 2026-07-09** and capture submission
   form fields into `01-challenge-brief.md`. (Only hard blocker.)
2. **Add Afraz & Jyoti as GitHub collaborators** and share the repo + their onboarding docs.
3. **Jyoti brainstorm: memory** — run `docs/MEMORY-ARCHITECTURE.md` §7 agenda with Kartik.
4. **Kartik CA-review** the ⚠️CA methodology numbers in `03-solution-spec.md` /
   `poc/engine.js` (glide matrix, gate thresholds, suitability scoring, return/tax assumptions).
5. Confirm open decisions: **D6** (Advisor OS scope — rec: option b, already built),
   **D7** (delivery — rec: hybrid), **D8** (twin framework).
6. Then: `05-deck-outline.md` → deck (Jyoti), only after methodology is CA-signed.

## Repo layout (reorganized 2026-07-09; see README.md for the full annotated map)

- Root: `00-STATE.md` (this), `01-challenge-brief.md`, `02-spec-decomposition-map.md`,
  `03-solution-spec.md`, `spec-input-kartik-methodology.md`, `README.md`, `README-TEST.md`
- `research/` — all 8 research files + `source-rfp-2022-idbi-digital-bank.pdf`
- `financial-database/` — **Kartik's field inventory of India's open-finance rails**:
  `field-inventory/MASTER_field_inventory.csv` = 1,731 fields (AA 1,318 · OCEN 299 ·
  ULI 114) parsed from official ReBIT/Sahamati XSDs + iSPIRT OCEN schemas; sample
  post-consent payloads in `source-specs/` (vendored); availability research note in its
  `docs/`. **Primary tool for Jyoti's smart-layer/personalization work** — every twin
  attribute must trace to a row here or be declared conversational/bank-internal.
- `docs/` — onboarding (Afraz, Jyoti) + `MEMORY-ARCHITECTURE.md` (AI-native twin, D8)
- `poc/` — working demo + engine + 36 golden tests
- Still to create: `04-architecture.md` (Afraz), `05-deck-outline.md` → deck (Jyoti, last)
