# Agentic Architecture — AI Wealth Companion (IDBI)

Proposed architecture for financial tools, customer memory, conversation services, and bank integrations. Companion to the design handoff in `ui/`.

---

## What "agentic" means for this product (the thesis)

Three capabilities separate an *agent* from a chatbot:

1. **It perceives** — pulls the customer's real financial state, not canned answers.
2. **It leads** — proactively decides what's worth raising (the "AI initiates" posture).
3. **It acts** — proposes and, with a tap, *executes* (SIP mandate, refinance application) —
   not just talks.

Memory threads through all three. The **"working notes"** UI (the ticking checklist →
collapsible "Why I'm suggesting this") is not decoration — it's the **agent's tool-call
trace made visible**. That trace is the spine of the whole system.

---

## One turn, end to end (the concrete flow)

```
Voice/text in
  → ASR (vernacular) → Orchestrator
  → load: session (Redis) + customer memory-graph + product/compliance grounding
  → Agent loop (Claude): reason → call tools → each tool call streams a "working note"
       tools: get_accounts, get_holdings, compute_refinance, run_sip_projection …
  → draft answer + typed card payloads
  → Compliance layer: suitability check, inject disclosures, block "advice"/guarantees
  → stream out: text (→TTS→wave) + card payloads (client renders)
  → async: Memory-writer extracts new facts → updates graph
On "Set up this SIP" tap
  → durable workflow (Temporal): re-check suitability → eNACH mandate → order → confirm
```

---

## The stack, layer by layer

### 1. Reasoning / orchestration (the brain)
- **Claude on AWS Bedrock, Mumbai (ap-south-1)** — frontier reasoning *inside India* for
  RBI/DPDP residency. Non-negotiable for a bank.
- Keep the conversational loop **lean** — native tool-calling, thin state machine. Avoid
  heavy agent frameworks; a bank needs determinism and auditability, not free-form ReAct.

### 2. Tools = the plumbing
Every capability is a typed function the agent calls. Critically: **a tool's output
payload IS a card.** The agent emits *data*, never UI — the client decides how to render.
- **Read tools:** accounts, holdings, loans, market data.
- **Act tools:** create goal, place SIP order, start refinance.

### 3. Data backbone — the India unlock
- **Account Aggregator (AA) framework** via a TSP (Setu / Finvu / OneMoney) for
  consent-based pull of the customer's *whole* financial life: other banks, MF holdings
  (CAMS / KFintech), insurance. **This is the moat** — a companion that sees everything vs.
  a chatbot that only sees IDBI.
- Plus **IDBI core banking (Finacle) direct** for own-bank data.
- Execution engines as tools: **BSE StAR MF / NSE NMF-II** for SIPs (mandate via eNACH /
  UPI Autopay), bank LOS for loans.

### 4. Memory — the differentiator, built right
Not "dump conversations in a vector DB." A **structured financial knowledge graph**:
goals, dependents (e.g. Priya, college ~2028), risk appetite, stated preferences, past
recommendations *and their outcomes*, objections.
- `Postgres + pgvector` — structured facts + semantic recall.
- `Redis` — live session / short-term.
- An async **memory-writer** after each turn extracts, dedupes, and reconciles facts —
  like a real memory, not an append log.

### 5. Compliance-as-code (first-class service, not a prompt line)
Because "distributor, not advisor" is a hard regulatory line. Every output passes:
- Suitability engine (rules: risk profile → allowed products)
- Disclosure injector
- "Advice vs. information" classifier
- Prohibited-language filter (no guaranteed returns)
- Logs the rationale every time.

### 6. Voice pipeline
- **Bhashini / Sarvam AI / AI4Bharat** for Indic ASR + TTS (Indian, sovereign, strong on
  vernacular); Claude reasons in between.
- Stream TTS amplitude → drives the sentient wave.
- Modular so English-now, vernacular-later is a config change, not a rebuild.

### 7. Proactive engine (what makes it *lead*)
- Nightly batch over the data lake computes candidate insights per customer (refinance gap,
  goal drift, idle savings, overweight gold).
- Event triggers via Kafka (`salary_credited`, `fd_maturing`).
- Ranks, queues conversation openers. The difference between "waits for you" and "greets
  you with something useful."

### 8. Execution = durable workflows
Money actions run on **Temporal** — idempotent, auditable, survive failure,
human-in-the-loop confirm. Deliberately split from the fast conversational agent.

### 9. Transport
SSE / WebSocket, one typed event stream: `text_delta`, `tool_start`, `tool_done`, `card`,
`tts_audio`. The working-notes UI just subscribes to the tool events.

### 10. Observability & eval
- Trace every turn (Langfuse).
- **Deterministic tests for the financial math** (SIP / FV must be exact).
- LLM-judge for tone + compliance.
- Golden-conversation regression set.

---

## The non-obvious bets (where the leverage is)

1. **Account Aggregator = whole-financial-life** — the vision moat over any single-bank bot.
2. **Memory is a structured graph, not embeddings soup** — what makes "it remembers" real.
3. **The reasoning trace is dual-use** — the same "why I'm suggesting this" shown to the
   user *is* the regulator-facing suitability audit. One artifact, two jobs. A genuine
   compliance selling point.
4. **Fast agent vs. durable money-workflow split** — the safe way to let an agent touch money.
5. **Compliance-as-code** — turns the scariest risk into a system property.
6. **Tool output IS the card contract** — agent emits data, client renders; clean separation.

---

## Agentic maturity ladder (so we don't boil the ocean)

- **V0 (submission / demo):** scripted-ish agent, mocked tools, *real* invest-sim + *real*
  memory graph (small), no execution. Sells the whole vision cheaply.
- **V1 (pilot):** real *read* tools (AA + Finacle read-only), real memory, proactive
  insights, human-in-loop — but money actions **deep-link into IDBI's existing app flows**
  rather than executing.
- **V2 (scale):** Temporal execution, vernacular voice, full compliance service,
  multi-product.

---

## Open decisions — to align on

- **Execute in-app, or hand off to existing IDBI flows** for money movement?
  *(Lean: hand off in V1 — faster, lower risk.)*
- **Own-bank data first, or AA whole-life from day one?** *(Speed vs. differentiated vision.)*
- **Bedrock cloud vs. on-prem** — will IDBI InfoSec allow a Mumbai-region cloud, or demand
  on-prem? *(Changes model options a lot.)*
- **Vernacular in V1 or V2?**

---

## Next candidates to go deep on

- One **architecture diagram** for the deck.
- **Memory-graph schema** (entities, facts, write/reconcile logic).
- **Agent loop + tool contract** (typed tool → card payload spec).
- **Compliance engine** (suitability rules + disclosure + audit).
