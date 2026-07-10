# Engineering Guide

Architecture, interfaces, and integration considerations for Wealth Advisory OS.

## Application and reference documents

1. **Run the PoC** — `README-TEST.md`: `cd poc && node server.js` → http://localhost:8765.
   Then `node poc/tests/run-tests.js` → 36/36 passing.
2. **`poc/engine.js`** — the deterministic advisory engine (the moat). Client Graph, 7
   capabilities, action taxonomy, glide paths, full audit trail. This logic ports 1:1 to
   production; the PoC's browser-JS wrapper does not.
3. **`research/research-rfp-2022-baseline.md`** + `research/source-rfp-2022-idbi-digital-bank.pdf` §8 — IDBI's
   own mandated stack & constraints (below).
4. **`docs/MEMORY-ARCHITECTURE.md`** — the Customer Graph you'll be persisting.

## Binding architecture constraints (from IDBI's 2022 RFP — non-negotiable for a bank judge)

- **Bank-recommended stack:** React Native / Ionic (front); **Java Spring Boot / Node /
  Python** microservices; Oracle / MySQL / MSSQL or Mongo / Cassandra; RabbitMQ / ActiveMQ;
  Kibana / Grafana / Prometheus; SwaggerHub; **Finacle CBS via "bancs-connect" (ISO
  messaging)**.
- **On-prem DC/DR deployment** → LLM must run via **India-region / private endpoint**
  (e.g. bank-VPC Bedrock/Claude or on-prem model); **PII redaction before any model call**.
- Security: PCI-DSS/PA-DSS, RBI Digital Payment Security Controls, OWASP Mobile Top 10, VAPT.
- Integrations named in RFP: NSDL, UIDAI, NPCI, CAMS, KFintech. Add **AA (Sahamati), ULI,
  OCEN** per `docs/MEMORY-ARCHITECTURE.md` §5.

## Architecture design

- **D4/D5 — engine/LLM split:** the deterministic engine *decides*; the LLM *only explains*
  and converses. Never let the LLM compute a number or name a product — it calls engine
  tools. This is the SEBI AI/ML-compliance backbone and the anti-hallucination design.
  `poc/llm.js` is the interface reserved for external language-model integration.
- **D3 — avatar:** lightweight 2D rigged (no photoreal). PoC uses inline SVG + CSS
  (`poc/avatar.js`); production can use Rive/Lottie or a vendor (UneeQ) behind the same
  interface.
- **D7 — delivery: hybrid, channel-agnostic** — thin native micro-SDK (mic / TTS / avatar
  canvas / auth bridge) + **server-driven conversational UI** so we ship without waiting on
  bank app-release cycles. GO Mobile+ = reference integration; must also drop into the new
  digital app (per 2022 RFP) and WhatsApp later. See `research/research-gomobile-screens.md` addendum.
- **Voice (your call to finalize):** production TTS/STT bake-off — **Sarvam AI, Bhashini,
  Google/Azure Indic**, ElevenLabs. Hindi first, Hinglish code-switching, architecture ready
  for 15 languages (RFP line). Interaction model = **voice-note-first async** (India: voice =
  22% of WhatsApp comms), which relaxes live-latency needs — see
  `research/research-avatar-spec-patterns.md`. The current application uses the browser Web Speech API.

## Integration responsibilities

- Re-implement `engine.js` as production microservices on the RFP stack (the logic + the 36
  golden tests are your spec — keep them green).
- Design the Customer Graph persistence (graph DB vs relational + graph layer — see
  `MEMORY-ARCHITECTURE.md`; bi-temporal validity & consent-scoping are v1 requirements).
- Own the LLM/TTS/STT integration behind the existing interfaces (`llm.js`, `voice.js`).
- Own AA / ULI / OCEN integration surfaces.
- Own the security/on-prem deployment story for the pitch (bank judges score this heavily).
