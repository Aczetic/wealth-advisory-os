# 🌅 Good morning Kartik — your product is ready to test

Built overnight (2026-07-09, ~03:30–04:30) from ALL our research + your methodology
input. **36/36 engine tests passing. Every flow click-verified in a real browser.**

## Run it (one command)

```bash
cd "/Users/macncheese/Documents/Claude/Projects/Digital Wealth Management/poc"
node server.js
```

Then open **http://localhost:8765** in Chrome (Chrome = mic + best voices).
No API keys, no npm install, no internet needed.

## What to try (in this order)

1. **Onboarding** — Asha asks 6 suitability questions as conversation, not a form
   (Wavelength pattern). Watch the right-side **Advice Audit Trail** panel: your answers
   become an auditable SEBI-style suitability record.
2. **The insight cards on top** — idle cash, FD maturing, drift. That's *Persistent
   Investment Intelligence*: the engine noticed these before you asked (your #5).
3. **💰 Idle cash?** — detects ₹88K idle, proposes glide-path deployment, max 3 curated
   funds with reasons (swipeless — no catalog).
4. **🚨 Urgent paisa chahiye → ₹2 lakh** — YOUR EPF idea as the Emergency Liquidity
   Advisor: every option ranked by TRUE cost (EPF advance shows retirement-compounding
   loss despite 0% interest). Personal loan never wins.
5. **🎉 Bonus aaya!** — health gate first, 80C fill second, then **prepay-vs-invest**
   post-tax comparison (24b deduction priced in — the CA feature).
6. **📉 Market gir gayi — sab becho!** — anti-sycophancy: Asha warmly REFUSES, explains
   why, logs the advice, offers RM. (Companion apps engineer agreement; we engineer honesty.)
7. **📈 Stock tips?** — out-of-universe → RM escalation with full context (D4 boundary
   as a feature).
8. **👶 / 💍 / 🏠 / 💸** — event-based planning: education @10% inflation with lifecycle
   glide path, wedding = short-horizon conservative, home down payment, salary step-up.
9. **Open RM Console** (link top-right) — ONE ENGINE, TWO FACES: your escalation appears
   in the lead queue with full context; morning briefing shows live Rohan insights next
   to a synthetic book; Client 360 reads the same graph Asha writes.
10. **Reload the page** — Asha remembers your last topic (episodic memory, localStorage).
11. **Type or speak free text** — "shaadi ke liye plan banao" routes correctly. 🎤 works
    in Chrome.
12. Run the engine tests yourself: `cd poc && node tests/run-tests.js` → 36 passing.

## What this PoC proves (the pitch, live)

- Deterministic engine decides; avatar only explains → auditable (SEBI AI/ML pillars)
- Client Graph = one structure for memory + engine + RM handoff (your #4)
- All 7 capabilities + action taxonomy incl. Prepay Loan working (your #1–#7)
- Glide-path allocation = f(risk, time-to-goal) (Zerodha Lifecycle inspiration)
- Keyless scripted flows now; `llm.js` is the pluggable slot for a bank-VPC LLM later

## Honest limitations (so you're not surprised)

- Conversation is scripted flows + keyword routing — the LLM slot is a stub by design
  (keyless). Free text outside known intents gets a graceful fallback.
- Methodology numbers (glide %s, thresholds, returns) are DRAFT — flagged for your CA
  review in `03-solution-spec.md`.
- Voice = browser TTS (robotic-ish); production = Sarvam/Bhashini per research.
- Single synthetic persona (Rohan); RM book is part-synthetic.

## Your morning checklist (before playing with the demo!)

1. 🚨 **REGISTER ON HACK2SKILL — DEADLINE IS TODAY, JULY 9** 🚨
2. Paste the submission form fields to me
3. Text your tech friend the commitment ask
4. Then play with the demo and mark up `03-solution-spec.md`
