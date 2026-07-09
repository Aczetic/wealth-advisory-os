# Feature List — Architecture Brainstorm

> The full surface area we need to design/build. Grouped into tracks so we can brainstorm
> one at a time. Each item: what it is + the key open question(s). Companion to
> `01-agentic-architecture.md`.

**Status legend**
`✅ designed` (exists in the mock) · `🟡 architected` (sketched in doc 01) ·
`🔴 open` (needs real brainstorm) · `⚪ new` (raised, not yet touched)

---

## Track A — Conversation surface (what the customer experiences)

- **Text conversation** — `✅ designed`. Concierge chat, AI leads, bubbles + inline cards.
  *Open Q:* do AI replies stream token-by-token / type in, or land as blocks?

- **Voice conversation (live)** — `✅ designed`. Real-time voice mode, sentient wave reacts
  to speech; everything spoken lands in the same chat thread, cards render inline.
  *Open Q:* barge-in (interrupt the AI mid-sentence)? half-duplex vs full-duplex?

- **Voice notes (async)** — `⚪ new`. Different from live voice: customer sends a recorded
  voice message; AI transcribes, replies (text and/or its own voice note). Fits low-literacy,
  low-bandwidth, "leave it and check later" usage.
  *Open Q:* is this a separate mode, or just "voice input in the text thread"?

- **"Why I'm suggesting this"** — `✅ designed`. The visible **Plan → Think → Act → Reason**
  loop: ticking checklist of the agent's tool calls, collapsing to a ✓ pill. Dual-use — it's
  both a trust affordance *and* the suitability audit trail.
  *Open Q:* how much reasoning do we expose vs. hide? per-step latency budget?

- **Cards / dynamic screen** — `✅ designed`. The screen composes itself from typed card
  payloads the agent emits (loan, goal, holding, invest-simulator). "Generative UI."
  *Open Q:* fixed card library the agent picks from, vs. genuinely generative layouts?
  How interactive can a card get (the invest-sim slider is the ceiling so far)?

- **Languages / TTS / STT** — `🟡 architected`. English now; Indic ASR+TTS later
  (Bhashini / Sarvam / AI4Bharat). Modular pipeline so it's a config, not a rebuild.
  *Open Q:* which languages in V1? translate-at-edges vs. reason-in-language?

---

## Track B — Intelligence & memory (the brain)

- **Memory** — `🟡 architected`. Structured financial knowledge-graph (goals, dependents,
  risk appetite, past recommendations + outcomes) + semantic recall. Felt through the
  conversation, never shown as a "memory" badge.
  *Open Q:* what's the fact schema? what's the write/reconcile logic? shared with the RM (see Track E).

- **Proactive engine** — `🟡 architected`. Nightly batch + event triggers surface insights
  so the AI *leads* ("I looked over your accounts…") instead of waiting.
  *Open Q:* how do we rank/throttle insights so it's helpful, not nagging?

- **Orchestration of the whole workflow** — `🟡 architected`. The conductor: routing a turn
  through memory load → agent loop → tools → compliance → stream out → memory write; and
  routing money-actions to durable workflows.
  *Open Q:* how much is deterministic state-machine vs. model-decided? this is where the
  RM handoff (Track E) has to be wired in.

---

## Track C — Cross-cutting (non-functional)

- **Latency** — `🔴 open`. Modest phones, uneven networks. The "working notes" buy us
  perceived-latency cover, but we still need real budgets.
  *Open Q:* target time-to-first-token? per-tool timeout? what degrades gracefully offline?
  what's cached on-device (last state, invest-sim compute is already client-side)?

---

## Track D — How real wealth management works (NON-AI domain brainstorm)

> Deliberately AI-free. Before we automate advice, we model what *good human* wealth
> advisory actually is. Kartik (PM + CA) leads this. This becomes the "product logic" the
> agent later executes.

Topics to brainstorm:
- **Discovery & risk profiling** — how you actually assess a customer (capacity vs. willingness).
- **Goal setting** — turning "I want to be safe" into fundable, dated goals.
- **Asset allocation** — the frameworks (age-based, goal-based, bucket strategy).
- **Product selection & suitability** — mapping goal + risk → the right instrument.
- **Recommendation logic** — what makes a recommendation *good* (and defensible).
- **Rebalancing & review cadence** — when/why you revisit, drift thresholds.
- **Life-event triggers** — marriage, child, home, job change, retirement.
- **Behavioral coaching** — stopping panic-selling, encouraging consistency (the real value).
- **Tax planning** — the CA angle: 80C, LTCG/STCG, harvesting, product wrappers.
- *Output:* a "wealth advisory playbook" the agent is grounded in.

---

## Track E — The open problem: AI ↔ Customer ↔ RM (the triad) `🔴 open`

> The hard, unsolved, high-value one. This is a **group activity** — up to three real
> identities in one relationship: the **Customer**, the **AI companion**, and the human
> **Relationship Manager (RM)**. How do they hand off seamlessly?

**Framing / first principles (seeds, not answers):**

- **One shared thread, one shared memory.** The conversation is a multi-participant object
  (roles: `customer`, `ai`, `rm`) — not a 1:1 chat. When the RM steps in, the customer sees
  "Priya (your RM) joined"; the RM instantly has full context because the memory-graph is
  shared. When the RM leaves, the AI resumes, aware of what was said/committed.

- **The AI/RM split can *be* the compliance line.** The AI gives **information &
  education**; the licensed **RM gives advice** (with liability). So a handoff isn't just UX
  — it's the regulatory architecture. When the AI approaches "advice," it loops in the human.

- **Three interaction modes to design:**
  1. *AI-led, RM-supervises* — AI handles, RM approves high-value actions.
  2. *RM-led, AI co-pilots* — AI briefs the RM, drafts replies, monitors the book.
  3. *Customer picks the channel* — "I want to talk to a person" at any time.

- **Handoff triggers (when does the RM get pulled in?):** high-value action, customer
  frustration/low AI confidence, regulatory need for a human, explicit customer request,
  or the RM proactively reaching out off an AI-surfaced insight.

- **RM console = AI as force-multiplier.** RM sees the AI's working notes, the memory graph,
  suggested replies, and a pre-meeting brief for every client. Reframes the AI from
  "replaces the RM" to "makes one RM feel like ten" — which is also the *adoption* story
  inside the bank (RMs won't sabotage a tool that makes them look good).

- **Attribution & audit.** Legally, who said what matters (AI info vs. RM advice). The audit
  trail must distinguish actors turn-by-turn.

**Open questions to brainstorm:**
- Warm handoff protocol — what's in the AI-generated brief to the RM?
- Async vs. live — RM won't always be available; how does the thread hold?
- Does the customer always know when it's AI vs. human? (transparency vs. seamlessness)
- One RM per customer, or a pool? how does the AI route to the right human?
- How does the RM *correct/override* the AI, and does that write back to memory?

---

## Suggested brainstorm order
1. **Track D** (real advisory model) — grounds everything else.
2. **Track E** (the triad) — decides orchestration + compliance shape.
3. Then finalize B (memory schema, orchestration) around D + E.
4. C (latency) and A open-questions as we build.
