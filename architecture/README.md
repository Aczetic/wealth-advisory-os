# architecture/

Technical architecture brainstorm — how the Wealth Companion works as a *whole agentic*
product (stack, plumbing, orchestration). Complements the product/strategy docs at repo
root (`00-STATE.md`, `03-solution-spec.md`) and the memory deep-dive
(`docs/MEMORY-ARCHITECTURE.md`).

## Files
- `01-agentic-architecture.md` — the stack, layer by layer (reasoning, tools, data backbone,
  memory, compliance-as-code, voice, proactive engine, execution, transport, eval); the
  non-obvious bets; the V0→V2 maturity ladder; open decisions.
- `02-feature-list.md` — full feature surface grouped into tracks (A conversation surface,
  B intelligence/memory, C latency, D real advisory model [non-AI], E the AI↔Customer↔RM
  triad). Suggested brainstorm order at the bottom.

## Related, elsewhere in the repo
- `docs/MEMORY-ARCHITECTURE.md` — the AI-native financial twin (memory + relationship graph).
- `poc/` — runnable engine + customer avatar app + **RM console** (`rm.html`): "one engine,
  two faces," the concrete seed of Track E (the triad).
- `ui/` — the design handoff + interactive mock of the customer conversation screen.
