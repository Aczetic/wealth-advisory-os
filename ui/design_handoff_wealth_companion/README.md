# Handoff: IDBI AI Wealth Companion

## Overview
A conversational, concierge-style wealth-advisory module that lives **inside the IDBI Bank mobile app** (not a standalone app). An AI advisor — represented by a calm avatar/orb presence — leads a guided conversation: the customer mostly *responds* rather than navigates. Key recommendations surface as **swipeable, sometimes-interactive cards**. The customer can talk to it in **voice mode**, where a sentient light wave reacts to speech. Posture is always "here's what suits you," never authoritative advice (the bank is a distributor, not a registered advisor).

This document describes **one screen**: the main conversation, plus its **voice mode** overlay.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look and behavior. They are **not production code to copy directly.**

- `Wealth Companion.dc.html` — the design. It is a "Design Component" (`.dc.html`): a template + a small `class Component` logic block, rendered by the bundled `support.js` runtime. Treat the runtime as scaffolding, not something to port.
- `support.js` — the prototype's rendering runtime. **Do not port this.** It only exists to make the `.dc.html` open in a browser.
- `image-slot.js` — a drag-and-drop image placeholder used for the advisor avatar in the prototype. In production this is just "a circular avatar `<img>`."

**Your task:** recreate this UI in IDBI's existing mobile environment (React Native, native Android/iOS, Flutter, or web — whatever the app uses) using its established components, navigation, and networking patterns. The design is deliberately self-contained (a module you enter and leave), so it should drop into the app as a single feature/route.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, and the two signature animations (breathing avatar ring, voice-reactive wave) are final and intended to be matched closely. Copy is placeholder-realistic (see "Content" per component) — final copy will come from the AI backend at runtime.

Target device: **mobile, one-handed, English only.** Designed at a 392×844 logical viewport (iPhone-class); must scale gracefully to modest Android phones. Minimum touch target 44px.

---

## Screen: Conversation (default)

### Layout (top → bottom)
1. **Status bar** (system) — mirrored in the prototype only; use the real OS status bar.
2. **Header** — fixed. Back chevron (left, 36px hit area), centered identity block: circular **advisor avatar (66px)**, name **"Your AI Wealth Manager"**, and a status line (mint dot + "Online").
3. **Conversation scroll area** — vertically scrollable, fills between header and composer. Contains chat bubbles and inline card groups. **Scrollbar hidden.**
4. **Composer** — fixed at bottom, above the OS home indicator. A pill input with, left→right: `+`, "Ask me anything…" field, `₹` circle button, mic icon, and a **cloudy-orb button** (tap → enter voice mode).

### Chat bubbles
- **AI (left):** background `rgba(6,32,50,0.5)`, border `1px rgba(255,255,255,0.05)`, text `#e7eef4`, radius `20px 20px 20px 6px`, padding `13px 16px`, max-width 82%, font 14.5px / line-height 1.5. Fade-up entrance (opacity 0→1, translateY 8px→0, 0.5s).
- **User (right):** background `rgba(255,255,255,0.13)`, border `1px rgba(255,255,255,0.14)`, text `#f2f7fb`, radius `20px 20px 6px 20px`, right-aligned.

### Recommendation cards
Cards appear **inline in the AI's turn** as a horizontally **swipeable row** (scroll-snap, snap to center, ~266px wide, 14px gap, scrollbar hidden, bleeds to screen edges). There are two visual classes:

**A. Read-out cards** (dark navy panels) — background `linear-gradient(158deg, rgba(10,38,60,0.85), rgba(7,28,45,0.72))`, border `1px rgba(255,255,255,0.08)`, radius 24px, padding `26px 24px`. Header row = uppercase label (`#a9c4d6`, 12px, letter-spacing 0.4px) + a status dot. Metrics use **Space Grotesk**; positive/savings values in mint `#7fdcc4`, warnings via gold dot `#f3c26a`.
   - **Home Loan:** Rate `9.15%`; "You could save" `₹3.2L` (mint); primary button "Explore refinance".
   - **Goal · Europe Trip:** Saved `₹1.1L` / Goal `₹4L`; progress bar 27% (mint→light-blue gradient); "On track · ETA Feb 2028".
   - **Gold Holdings:** Current `₹2.3L` / Allocation `12%`; note chip "Suggested range 5–10% · slightly overweight".

**B. Interactive highlight card** ("If I invest") — visually distinct: background `linear-gradient(158deg, rgba(12,46,62,0.92), rgba(8,30,47,0.8))`, border `1px rgba(127,220,196,0.42)` (teal highlight, **no glow**), radius 24px, padding `26px 24px 24px`.
   - Top row: "If I invest" + live amount `₹{monthly}/mo` (Space Grotesk 26px).
   - **Slider:** range 5,000–50,000, step 1,000. Track 5px; filled portion mint `#7fdcc4` up to current value, remainder `rgba(255,255,255,0.18)`; thumb 32px white radial gradient.
   - **Term pills:** `5 yrs / 10 yrs / 15 yrs`. Selected = solid white bg `rgba(255,255,255,0.9)` + text `#12547d`; unselected = `rgba(255,255,255,0.07)` + text `#a9c4d6`.
   - **Output:** "It would grow to" + big figure (Space Grotesk 34px) + a **delta pill**: `↑ ₹X vs ₹15k/mo` on mint bg when ahead, `↓ …` on gold bg when behind.
   - Footnote: "Illustrative · assumes ~11% p.a. Not a guarantee." (`#6f8a9c`, 11px) — **compliance-relevant, keep.**

---

## Screen: Voice mode (overlay on same screen)
Entered by tapping the cloudy-orb button in the composer; exited via the white ✕ button. **It is the same conversation screen** — the chat stays; only these change:
1. **Avatar shows live state:** two expanding pulse rings around the 66px avatar (`ring` keyframe: scale 1→1.8, opacity .55→0, 2.6s, staggered). Status line reads **"Listening…"**.
2. **Sentient light wave:** a soft, filled, blurred waveform anchored just above the composer that **animates continuously and swells with the speech envelope** — rises during speech, flattens near the bar in pauses. (In the prototype the envelope is simulated; in production, drive its amplitude from real mic input level and/or TTS playback amplitude.)
3. **Composer swaps** to voice layout: "Type instead…" field + mic button + white **✕** (exit) button.

### Wave animation spec (to reproduce)
- Two stacked filled paths for depth: `data-wave-fill` (opacity 0.24, blur 3px) over `data-wave-fill2` (opacity 0.14, blur 7px, slightly larger amplitude + phase offset). Fill uses a **horizontal** multi-stop gradient: `#4fc3ff → #7f9cf7 → #9a8bf7 → #5ad0c4 → #7fdcc4`. **No stroke/border line.**
- Per-frame path (requestAnimationFrame): baseline y≈122 in a 360×150 viewBox; each x-sample `y = base − A·(0.6·sin(0.035x + 2.2t + φ) + 0.4·sin(0.075x + 1.35t + 1.5φ))`, path closed to the bottom edge and filled.
- Amplitude `A = 4 + env·62`, where `env` (0–1) is the speech envelope. Replace the simulated `env` with **real audio amplitude** in production.

---

## Interactions & Behavior
- **Slider drag** → recompute future value + delta live (see Calculations).
- **Term pill tap** → set term, recompute.
- **Cloudy-orb button** → set `live = true` (voice mode). **✕** → `live = false`.
- **Card row** → horizontal swipe with center snap.
- **"Explore refinance" button** → (prototype no-op) should route to the refinance flow.
- **Bubble/card entrance** → fade-up 0.5s.
- **Avatar** → gentle breathing (scale 1↔1.05, 4.5s) at rest; pulse rings when live.

## State Management
Prototype state (in `class Component`): `monthly` (₹, default 20000), `years` (default 10), `live` (bool, default false). In production you'll additionally need:
- **Conversation state:** ordered list of turns (role: ai | user; payload: text and/or card group). The AI **leads** — the first turns are advisor-initiated.
- **Card payloads:** typed models (loan, goal, holding, invest-simulator) the backend emits so the client renders the right card. The client owns the *interactive* recomputation for the invest card (pure function, no round-trip).
- **Voice session:** mic permission, ASR (speech→text, user's language), TTS playback, and a live **amplitude value** feeding the wave.

## Calculations (invest-simulator card)
Future value of a monthly SIP, monthly-compounded:
```
i = annualRate / 12            // prototype uses annualRate = 0.11
n = years * 12
FV = P * ((1 + i)^n - 1) / i * (1 + i)
delta = FV(monthly) - FV(15000)   // comparison baseline = ₹15,000/mo
```
Formatting (Indian): `≥ ₹1cr → ₹X.XXCr`, else `₹X.XL` (lakhs, 1 decimal). Amounts use `toLocaleString('en-IN')`.
> The 11% rate and the ₹15k baseline are **prototype assumptions** — confirm real product values/disclaimers with the business + compliance before shipping.

## When/how cards appear (product logic for the dev to implement)
The prototype hard-codes one illustrative flow. Real behavior should be **backend-driven**: the advisor decides, per user context, which insight to raise and emits the matching card type. Guidance:
- One insight per AI turn; lead with the finding in a short sentence, then the card(s).
- Group related cards into one swipeable row; keep it to ~3.
- The invest-simulator card is the **response** pattern — surface it when the user expresses intent to invest/save more, so they can explore by nudging rather than typing.
- Keep the surface calm: no dashboards, no disclosure overflow. Only the compliance footnote on projections.

## Design Tokens
**Colors**
- App background (screen): `linear-gradient(168deg, #12547d, #0d436a 46%, #082f4a)`; page behind phone `#04121c`.
- Text: primary `#f2f7fb` / `#e7eef4`; secondary `#a9c4d6`, `#9fb6c6`, `#8fabbf`; muted `#6f8a9c`.
- Accent mint (positive/savings): `#7fdcc4`. Accent gold (warning dots): `#f3c26a`.
- AI bubble `rgba(6,32,50,0.5)`; user bubble `rgba(255,255,255,0.13)`.
- Read-out card `rgba(10,38,60,0.85)→rgba(7,28,45,0.72)`; highlight card border `rgba(127,220,196,0.42)`.
- Wave gradient stops: `#4fc3ff, #7f9cf7, #9a8bf7, #5ad0c4, #7fdcc4`.

**Typography**
- UI / chat: **Instrument Sans** (400/500/600).
- Numbers / display / labels: **Space Grotesk** (400–700).

**Radii:** bubbles 20px (one corner 6px), cards 24px, composer pill 28px, chips/pills 99px.

**Spacing:** card padding 26×24; bubble padding 13×16; card gap 14px; composer gap ~11px.

**Motion:** fade-up 0.5s ease; avatar breathe 4.5s; pulse ring 2.6s; wave via rAF (~60fps).

## Assets
- **Advisor avatar:** a circular photo/illustration of a warm, relatable Indian advisor persona. Not included — supply a real asset (the prototype uses a drag-drop placeholder). Recommended ≥132px square for retina at 66px.
- **Icons** (plus, mic, rupee ₹, chevron, close, settings, signal/wifi/battery) are inline SVGs in the prototype — replace with the app's existing icon set.
- **Fonts:** Instrument Sans + Space Grotesk (Google Fonts) — or the app's licensed equivalents.

## Files
- `Wealth Companion.dc.html` — the design (open in a browser to interact: drag the slider, tap term pills, tap the orb to enter voice mode).
- `support.js` — prototype runtime only (do not port).
- `image-slot.js` — avatar placeholder helper (do not port; use a normal avatar image).
