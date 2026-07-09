# IDBI Innovate 2026 — Challenge Facts (fixed reference, do not re-research)

Source: https://hack2skill.com/event/idbinnovate (+ press coverage, verified 2026-07-08)

## Event

- Organizer: IDBI Bank, on Hack2skill platform. Theme: "Build. Integrate. Transform."
- Runs 2026-06-09 → 2026-08-21. **Application deadline: 2026-07-13** (extended from 07-09).
- Prize pool: ₹15,00,000. Track winners + runners-up, plus a separate Novel Idea Track.
- Eligibility: experienced professionals, registered startups, fintechs.

## Stages

1. Register on Hack2skill (by 2026-07-13)
2. Submit solution/idea aligned to problem statement
3. Shortlisted teams get: sandbox banking APIs, synthetic datasets, cloud infrastructure, mentorship
4. Build & refine → PoC inside IDBI's sandbox ecosystem; top teams progress toward bank adoption

## Our track — Track 01: Wealth Advisory · Conversational AI · Mobile Banking

**Problem:** Wealth management and advisory services remain fragmented and largely
inaccessible to a large number of customers. Absence of comprehensive customer
investment behaviour and spending habits limits the ability to provide timely,
personalized, data-driven guidance.

**Expected outcome:** AI-powered Digital Wealth Management (Avatar Based) application
that integrates into the bank's mobile application, delivering personalized and
scalable wealth advisory through an intuitive digital interface.

## Prototype Submission Deck — official template (captured 2026-07-09)

Source: `Prototype Submission Deck _ IDBI Innovate.pptx` (Kartik's download; 15 slides,
S14–S15 blank). Prescribed structure and what we map to each slide:

| # | Template asks | We answer with |
|---|---|---|
| S1 | Team details (team name, leader, problem statement) | Kartik + Afraz + Jyoti; Track 01 statement |
| S2 | Brief about the idea | One-liner + five-point summary (`03-solution-spec.md` §1) |
| S3 | Opportunities: how different, how it solves, USP | White space + robo-1.0 five failures + "intelligence layer your 2022 RFP's rails were waiting for" |
| S4 | List of features | 7 capabilities + avatar + Advisor OS + liquidity advisor (spec §4–5) |
| S5 | Process flow / use-case diagram | Twin → engine → two faces flow (`docs/MEMORY-ARCHITECTURE.md` §6 exhibit) |
| S6 | Wireframes/mocks (optional) | PoC screenshots double as wireframes |
| S7 | Architecture diagram | Spec §8 on IDBI's own RFP stack (on-prem, engine/LLM split) |
| S8 | Technologies used | RFP-conformant stack + LLM/TTS choices (Afraz) |
| S9 | Estimated implementation cost (optional) | Unit economics + milestone model (map §G — to close) |
| S10 | Snapshots of the prototype | PoC screenshots (avatar app + RM console + audit panel) |
| S11 | Prototype performance report / benchmarking | 36/36 golden tests + engine determinism + latency notes |
| S12 | Additional details / future development | Phasing (spec §11) + RIA-SIDD roadmap |
| S13 | **Links: GitHub PUBLIC repo · 3-minute demo video · final product link** | ⚠️ see below |

**S13 implications (load-bearing):**
1. **Public GitHub repo required at submission** — ours is private. Plan: keep working
   private; at submission create a sanitized public mirror (or flip visibility after review).
2. **3-minute demo video** — map §H demo-script item is now a hard deliverable.
3. **Final product link** — PoC is static JS; can be hosted free (GitHub Pages/Vercel)
   so judges click and use it. High-impact, near-zero effort.
