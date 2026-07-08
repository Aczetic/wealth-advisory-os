# ArthSakhi — AI Digital Wealth Advisory for IDBI (IDBI Innovate 2026, Track 01)

An **avatar-led, engine-driven wealth advisory module** that embeds into IDBI's mobile
app. The bank's own transaction data becomes a **standing investment strategy per
customer**, delivered as a voice-first Hinglish conversation with "Asha" — with human RMs
one tap away. Guidance at scale, under the bank's existing distribution licence.

> **Working proof-of-concept included** (`poc/`) — runnable, no API keys, 36/36 engine
> tests passing. See `README-TEST.md`.

---

## 👥 Team & tracks

| Who | Role | Owns | Start here |
|---|---|---|---|
| **Kartik** | PM + CA | product, finance/tax/compliance, methodology | `00-STATE.md` |
| **Afraz** | Engineer | architecture, stack (LLM/TTS/STT), UI, integration | `docs/ONBOARDING-AFRAZ.md` |
| **Jyoti** | CFA L1 + BAF | deck, AI logic / smart layer, AI→RM switch, RM view, memory | `docs/ONBOARDING-JYOTI.md` |

**Everyone:** read **`00-STATE.md`** first — it's the single source of truth (status, all
decisions D1–D7, what's open). Read it at the start of each session; update it at the end.

---

## What's in here

```
00-STATE.md                     ← SOURCE OF TRUTH: status, decision log, next actions
01-challenge-brief.md           ← IDBI Innovate 2026 problem statement & rules
02-spec-decomposition-map.md    ← every open question by subsystem (with benchmarks)
03-solution-spec.md             ← assembled product spec (v0.9)
spec-input-kartik-methodology.md← the engine's required capabilities (binding)

research-landscape-products.md  ← global + India competitors, the white space
research-d4-bfsi-advice-posture.md ← compliance spine (distributor vs RIA)
research-idbi-client.md         ← who IDBI's customer is + Emergency Liquidity Advisor
research-rfp-2022-baseline.md   ← IDBI's own 2022 tender = our table stakes
research-advisor-os.md          ← the RM-facing side (Morgan Stanley precedent)
research-avatar-spec-patterns.md← memory/persona/voice patterns (Cleo, Wavelength, WhatsApp)
research-failures-judge-lens.md ← why robo-1.0 died + how bank judges score
research-gomobile-screens.md    ← IDBI app fleet + delivery mechanism
source-rfp-2022-idbi-digital-bank.pdf ← IDBI's actual 114-page tender (primary source)

docs/ONBOARDING-AFRAZ.md        ← engineer's route in
docs/ONBOARDING-JYOTI.md        ← logic/deck owner's route in
docs/MEMORY-ARCHITECTURE.md     ← the AI-native financial twin (memory + relationship graph)

poc/                            ← runnable proof-of-concept (see README-TEST.md)
  engine.js                     ← deterministic advisory engine (the moat)
  tests/run-tests.js            ← 36 golden test cases
  index.html / app.js / avatar.js / voice.js / llm.js   ← customer avatar app
  rm.html                       ← RM console (one engine, two faces)
README-TEST.md                  ← how to run the PoC + what to try
```

---

## Run the PoC (no keys, no install)

```bash
cd poc
node server.js          # → http://localhost:8765   (open in Chrome for voice + mic)
node tests/run-tests.js # → 36 passed, 0 failed
```

---

## The idea in five points

1. **Data moat** — the bank sees salary, spending, idle balances, FDs; fintechs don't.
   That becomes advisory triggers (the "spending habits" the problem statement names).
2. **AI-native financial twin** — a memory + relationship graph that knows the customer's
   money *and* the socio-economic/family reality that shapes it (`docs/MEMORY-ARCHITECTURE.md`).
3. **Engine decides, avatar explains** — deterministic, auditable recommendations
   (SEBI AI/ML-ready); the LLM never computes advice.
4. **Compliant by design** — distributor posture, suitability-gated, out-of-scope needs
   escalate to a human RM (the boundary is a lead-gen feature).
5. **One engine, two faces** — the same brain powers the customer avatar and the RM console.

---

## Status

Discovery complete; decisions D1–D7 mostly locked (see `00-STATE.md`); v0.9 spec + working
PoC done. Open: methodology CA-review (Kartik), memory brainstorm (Jyoti+Kartik), deck.
Synthetic data only — **not investment advice.**
