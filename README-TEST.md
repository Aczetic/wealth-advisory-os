# Running Wealth Advisory OS

Run the customer-facing avatar, advisory engine, and relationship manager console. Recommendations are calculated from customer profiles using versioned rules, with an audit trail for each decision.

## Run it (one command)

```bash
cd poc
node server.js
```

Then open **http://localhost:8765** in Chrome (Chrome = mic + best voices).
Browser voice support depends on your browser and available voices.

## What to try (in this order)

1. **Onboarding** — Asha asks 6 suitability questions as conversation, not a form
   (Wavelength pattern). Watch the right-side **Advice Audit Trail** panel: your answers
   become an auditable SEBI-style suitability record.
2. **The insight cards on top** — idle cash, FD maturing, drift. That's *Persistent
   Investment Intelligence*: the engine noticed these before you asked.
3. **💰 Idle cash?** — detects ₹88K idle, proposes glide-path deployment, max 3 curated
   funds with reasons (swipeless — no catalog).
4. **🚨 Urgent paisa chahiye → ₹2 lakh** — The EPF scenario as the Emergency Liquidity
   Advisor: every option ranked by TRUE cost (EPF advance shows retirement-compounding
   loss despite 0% interest). Personal loan never wins.
5. **🎉 Bonus aaya!** — health gate first, 80C fill second, then **prepay-vs-invest**
   post-tax comparison (24b deduction priced in).
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
12. From the repository root, run the engine tests: `node poc/tests/run-tests.js` → 36 passing.

## Working capabilities

- Deterministic engine decides; avatar only explains → auditable (SEBI AI/ML pillars)
- Client Graph = one structure for memory + engine + RM handoff
- All 7 capabilities + action taxonomy incl. Prepay Loan working
- Glide-path allocation = f(risk, time-to-goal) (Zerodha Lifecycle inspiration)
- A separate language-model interface keeps conversation services separate from financial calculations

## Implementation scope

- Conversation uses predefined workflows and intent matching. External language-model integration is not implemented; unsupported requests receive a fallback response.
- Allocation percentages, thresholds, and returns are illustrative prototype assumptions
  documented in `03-solution-spec.md`.
- Voice = browser TTS (robotic-ish); production = Sarvam/Bhashini per research.
- Single synthetic persona (Rohan); RM book is part-synthetic.
