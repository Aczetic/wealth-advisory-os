# Deck Direction — for Jyoti

Purpose: direction for preparing the prototype submission deck on the official IDBI
template (`deck/IDBI-submission-template.pptx`). Slide-by-slide asset mapping is in
`01-challenge-brief.md`. This note covers style, structure, differentiators, business
case, and roadmap — the judgment calls, not the mechanics.

## 0. Naming — you own it

**"ArthSakhi" and the avatar name "Asha" are working names only. Kartik has given you
naming authority for the startup, the product, and the avatar.** Suggested checks before
locking a name: meaningful in Hindi + acceptable in English; easy to say for a tier-2/3
customer; no obvious trademark/domain conflict (quick MCA/Trademark + domain search);
survives the writing-style test (credible on a PSU bank slide, not startup-cute); the
avatar's name should sound like a person customers would trust with money. Once chosen,
tell Kartik/Claude and we will rename across repo, PoC UI, and deck in one pass.

The reference proposal reviewed for this direction is saved at
`deck/reference/Udyam_Sehat_Card_Proposal.docx` (Modus AI founder's rough working for a
different IDBI theme — **internal reference only, do not redistribute or quote**).

Sources for this direction: the official template; a proposal document prepared by the
founder of Modus AI for a different IDBI theme (Udyam Sehat Card — reviewed for structure,
not copied); Kartik's instructions (2026-07-09).

---

## 1. Writing style — binding for all deck copy

The deck follows `docs/WRITING-STYLE.md` (executive, understated, minimum necessary
change). Practical consequences:

- No promotional vocabulary: avoid "seamless", "powerful", "transform", "leverage",
  "ecosystem", "journey". Prefer "identify", "estimate", "consolidate", "derive".
- Qualify every projected number: "estimated", "indicative", "subject to data availability".
- Functional headings and table titles, noun-based, easy to scan.
- Internal working names stay internal. "The moat", "killer feature", "steal-list" do not
  appear on slides. Feature names (below) may be branded; body copy stays sober.

## 2. Structural lessons to adopt from the Modus AI proposal

Four elements made that document effective. Adopt all four:

### 2a. A "differentiating capabilities" table — Capability | Why it moves the decision

Their strongest exhibit: each named capability paired with one sentence on why it changes
the evaluator's decision, not what it does. Ours (draft — trim to the best 4–5 for S3):

| Capability | Why it moves the decision |
|---|---|
| **AI-Native Financial Twin** — a memory + relationship graph of the customer's financial life (assets, liabilities, family obligations, conversations), built from bank data + AA with consent | Directly answers the problem statement's stated gap — "absence of comprehensive customer investment behaviour and spending habits". No fintech holds this data; only the bank can build this. |
| **Deterministic engine, audit-grade advice** — every recommendation carries action, amount, instrument, reason, rule ID + version, tax note; the AI explains but never decides | Converts a demo into a regulator-ready system (SEBI AI/ML expectations, RBI outsourcing norms). Most teams will show a chatbot; few will show an audit trail. |
| **Emergency Liquidity Advisor** — ranks all liquidity options (EPF advance, loan against FD/MF, deposit closure, personal loan) by estimated true cost, including foregone compounding and tax | No comparable feature exists in Indian retail apps; three of five options are IDBI lending products, so customer protection and bank revenue align. |
| **One Engine, Two Faces** — the same engine powers the customer avatar and an RM console (lead queue with conversation context, morning briefing, client 360) | Answers "scalable" twice: AI serves the mass segment, and RM productivity rises for the affluent segment. Positions AI as staff augmentation — the framing a PSU evaluation committee can approve. |
| **Goal glide paths** — allocation derived from risk profile and time-to-goal, de-risking automatically as the goal approaches | Demonstrates disciplined, suitability-linked methodology rather than generic fund suggestions. |
| **Responsible avatar** — refuses panic-selling, discloses AI status, records disagreement as advice given; vernacular, voice-note-first interaction | Pre-empts the mis-selling and consumer-protection questions a bank will ask first; the vernacular voice model is the financial-inclusion story. |

Recommendation: lead S3 with the Twin, the audit-grade engine, the Liquidity Advisor,
and One Engine Two Faces. The others appear in S4 (feature list).

### 2a-i. Memory is the lead differentiator — show the machinery, not the phrase

Kartik's direction (2026-07-09): assume **every serious team will say "unified database"
or "digital twin."** Those words alone will not differentiate. What no other team is
likely to show is a worked memory *system*. The deck should therefore spend real slide
estate (S4 or S5) on how memory actually operates, drawn from `docs/MEMORY-ARCHITECTURE.md`:

- **Graph-based memory** — one customer graph, five typed layers (identity, financial
  state, preferences/behaviour, interactions, decisions), not a flat profile table.
- **Relationship memory** — the household graph: dependents, obligations, spouse,
  employer. Show one concrete consequence: *a dependent parent raises the emergency-fund
  target and the insurance requirement — the numbers change because the graph knows.*
- **Event-based memory** — salary credit, FD maturity, bonus, life events trigger
  re-planning (Persistent Investment Intelligence).
- **Time- and topic-indexed recall** — the same memory reachable by date ("the 25 June
  discussion") and by subject ("gold — last discussed 5 May").
- **Governed memory** — bi-temporal (what we knew when advice was given), provenance-
  tagged, consent-scoped, customer-editable. This is the line generic twin pitches
  cannot say, and the one a bank's risk team will remember.

One effective exhibit: a single customer question answered twice — once by a "chatbot
with a database" (generic, correct, useless) and once by the memory graph (references
the family obligation, the last gold conversation, and the FD maturing next week).
The difference *is* the pitch.

### 2a-ii. Language commitment — 15+ languages, voice and text (Kartik, 2026-07-09)

The pitch commits to **support for 15+ Indian languages, in both voice and text**. Place
it in S4 (features) and repeat in S8 (technology). Three anchors make this credible
rather than aspirational:

1. **IDBI asked for it**: the bank's own 2022 digital-app RFP requires "minimum 15
   regional languages" — we are meeting their written requirement, not inventing one.
2. **Deployed precedent**: NH Bank (Korea) operates avatar kiosks in 110+ languages;
   Indic TTS/STT stacks (Sarvam AI, Bhashini, Google/Azure Indic) make 15+ practical today.
3. **The inclusion story**: voice in the customer's own language is what makes advisory
   usable for the tier-2/3, first-time-investor segment the problem statement describes —
   India's voice-note behaviour (voice = 22% of WhatsApp communications) shows the
   interaction pattern already exists.

Wording note (style guide): "supports 15+ Indian languages across voice and text,
rolled out in phases beginning with Hindi and English" — phased and factual, not
"seamlessly multilingual".

### 2b. A "flagship demo moment"

They scripted one moment the judges remember. Ours (for the 3-minute video and S10):

> A proactive insight flags idle cash → the customer asks, by voice, for ₹2 lakh urgently
> → the engine ranks five funding options by true cost, showing why the "free" EPF advance
> is not free → the customer asks for stock advice → the avatar declines (out of scope),
> hands off to the RM → cut to the RM console: the lead is already there, with context,
> risk profile and relationship value.

One continuous spine, four differentiators, under three minutes. Build the video around
this before decorating anything else.

### 2c. Business case framed on the problem statement's own outcomes

They mapped impact to the evaluator's own words. Ours should answer Track 01's three
stated gaps, with measurable (indicative) outcomes:

| Problem statement says | Our outcome | Indicative measure |
|---|---|---|
| "largely inaccessible to large number of customers" | Advisory available to every customer, not only those assigned an RM | Profiled-customer %, first-SIP conversion |
| "absence of … investment behaviour and spending habits" | Transaction data converted to advisory triggers via the Twin | Insight-to-action rate, idle-cash deployment |
| "personalized and scalable" | AI serves the base; RM capacity multiplied for the affluent tier | AUM per customer; RM interactions deflected (industry reference: ~50%); minutes saved per meeting (reference: ~30) |

Add the revenue view for S9/S12: CASA-to-AUM conversion, trail income, deposit-renewal
capture, lending cross-sell through the Liquidity Advisor. Label all projections
indicative; a CFA-reviewed slide with qualified numbers reads better to a bank than a
confident spreadsheet.

### 2d. Delivery roadmap as Phase | Focus | Outcome

Their time-bound roadmap table reads as a deployment plan, not a wish list. Ours:

| Phase | Focus | Outcome |
|---|---|---|
| Hackathon | End-to-end spine on sandbox APIs: twin, engine, avatar, RM view (PoC already runs with 36 engine tests) | Working prototype on IDBI sandbox data |
| Pilot (0–3 months) | **Insight-only shadow mode** inside GO Mobile+ for one customer segment; RM console for one cluster; consent and audit hardening | Advisory quality measured against RM decisions before any customer-facing recommendation |
| Scale (3–9 months) | AA integration live; Hindi voice production-grade; recommendation mode enabled; meeting copilot | Measured lift in SIP activation and RM productivity |
| Expand (9–18 months) | Additional languages; WhatsApp channel; lifecycle-fund partnerships; optional RIA-SIDD track; **app-wide contextual advisory (below)** | Bank-wide advisory coverage |

The **shadow-mode pilot** is the single most bank-credible idea in this table — the
system proves itself against human decisions before it touches a customer. Give it a
full sentence on S12, not a bullet fragment.

### 2d-i. Future roadmap spike: app-wide contextual advisory

Kartik's direction (2026-07-09) for S12: the module does not stay confined to a wealth
tab. Because the twin and engine sit behind the whole app, the assistant can surface
**in context, at the moment of intent**, anywhere in GO Mobile+:

| Where the customer is | What the assistant does |
|---|---|
| Searching for a bank statement | Locates and prepares the statement; offers the derived insight ("your Q1 spends were 18% higher — want the breakdown?") |
| Viewing account balance (balance unusually high) | Suggests, in place, deploying the surplus per the customer's standing strategy |
| Credit-card section (large purchase or dues) | Offers EMI conversion, or a lower-cost alternative — loan against MF/equity instead of revolving at card rates |
| Loan section | Prepay-vs-invest comparison before a prepayment; loan-against-FD before a new personal loan |
| FD booking screen | Shows the post-tax comparison with debt funds for the customer's slab before the customer commits |

Framing for the slide: *"Phase 4 extends the same engine and memory to every screen of
the bank's application — advisory becomes ambient, not a destination."* One line + the
table (trimmed to 3 rows if space demands). This lands as vision grounded in the same
architecture, not a feature wish list — the twin already knows the context; only the
surface changes.

## 3. Post-hackathon deployment plan (their strength; make it ours)

One slide-section (S12) covering: on-premise deployment in the bank's DC/DR on the
bank's own recommended stack (their 2022 RFP); PII redaction before any model call;
staged rollout through the bank's UAT and change process; a milestone-based commercial
structure consistent with PSU procurement (reference: their published payment pattern).
This tells the committee we understand how a bank actually buys and ships software.

## 4. What NOT to carry over from the Modus AI document

- Its spikes (Agentic KYB, ghost-entity detection) belong to credit decisioning — do not
  import terminology from a lending context into a wealth advisory deck.
- Its document format (14-section proposal) — our vehicle is the 15-slide template;
  depth lives in the GitHub repo, which S13 links to.

## 5. Working order (suggested)

1. Read `docs/ONBOARDING-JYOTI.md` end-to-end first (research + product grounding).
2. Draft S2–S4 text (idea, opportunity/USP, features) in the writing style; review with Kartik.
3. Storyboard the flagship demo moment with Afraz (video + S10 screenshots come from it).
4. Draft S9/S12 (business case + roadmap/deployment) — your CFA lens leads here.
5. Diagrams for S5/S7 with Afraz (twin → engine → two faces; architecture on the RFP stack).
6. Assemble on the template last; polish once, per minimum-necessary-change.

Open dependency: methodology numbers are pending Kartik's CA review — any slide showing
glide paths or thresholds must say "illustrative" until that sign-off.
