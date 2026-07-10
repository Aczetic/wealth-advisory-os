# Memory Architecture — the AI-Native Financial Twin

Customer financial state, relationships, preferences, and interaction history share a typed graph. This architecture extends the application’s Client Graph in `poc/engine.js`.

## 0. The thesis in one line

> We are not building a chatbot with memory bolted on. We are building an **AI-native twin
> of the customer's financial life** — a living graph that knows their money, the people
> and obligations around it, and the socio-economic + academic reality that shapes how
> they relate to money. The avatar (Asha) and the RM are two windows into the same twin.

Core architecture principle:
*"Creation of an AI-native twin for a customer who is aware about financial, socio-economic,
academic reality, family habits which drive anybody's relationship with money."*

---

## 1. Unified framework: ONE graph, typed layers, temporal index

Everything is one **Customer Graph** (extends the `Client Graph` already in `engine.js`).
It has two intertwined sub-graphs:

- **Memory graph** — what we know and when we learned/discussed it (facts + interactions).
- **Relationship graph** — the people, entities, and obligations around the customer.

Both are the same graph, different edge types. Nodes are typed; edges carry time + provenance.

### 1a. The five memory layers (decomposition)

| Layer | What it holds | Changes | Source | Built? |
|---|---|---|---|---|
| **L1 Identity / Twin substrate** | residency (resident/NRI), age-band, family structure (with whom they live), housing (rent/own/family), job, academics, socio-economic band | slow (life events) | onboarding convo + KYC/CKYC + AA | ⏳ new |
| **L2 Financial state** | income, spending, assets, liabilities, taxes, goals (the balance sheet + P&L) | continuous | AA · CBS · txn · ULI | ✅ `Client Graph` |
| **L3 Preferences / behaviour** | risk tolerance vs capacity, money values (safety↔growth), habits (spender/saver, panic-seller), product affinities (e.g. gold) | medium | inferred from convo + behaviour | ✅ partial (riskProfile) |
| **L4 Episodic / interactions** | every conversation, time-stamped and topic-tagged | append-only | avatar + RM | ✅ `interactions[]` |
| **L5 Decisions / advice** | what was recommended, accepted, rejected, acted on | append-only | engine | ✅ `recommendations[]` |

The **twin** = a queryable projection over L1–L5. The avatar reads/writes it
conversationally; the engine reads/writes it analytically; the RM sees a consented view.
(Same "one engine, two faces" principle, now extended to memory.)

### 1b. Relationship graph

The customer is not an island — money decisions are household decisions.

- **People nodes:** spouse, children (→ education/wedding goals), parents (→ dependents,
  possible reverse-support), siblings. Edges carry the *financial obligation* ("I fund
  Aarav's education", "I support my mother ₹8k/mo").
- **Entity nodes:** employer (salary node), the bank itself (products held), the RM,
  external institutions (other AMCs via AA).
- **Why it matters for advice:** dependents change risk capacity and insurance need;
  a working spouse (separate AA consent) changes household surplus; a dependent parent
  changes the emergency-fund target. The relationship graph *feeds the engine's numbers*,
  it is not decoration.

---

## 2. Memory dimensions

Retrieval is **multi-indexed** — the same memory is reachable three ways:

1. **Time-based** — day-wise trail: "25 Jun discussion, 26 Jun discussion." Powers
   "what did we talk about last week" and the audit timeline.
2. **Event-based** — anchored to life/money events: salary credit, FD maturity, bonus,
   marriage, job change. Powers proactive nudges (Persistent Investment Intelligence).
3. **Conversation/topic-based** — clustered by subject: *"gold — last discussed 5 May."*
   Powers "pick up where we left off on gold" even if 6 weeks passed.

**Short-term vs long-term is a function of salience + recency, not a separate store:**
- **Short-term / working memory:** current conversation + recent salient events (this
  month's salary, this week's FD). Kept hot in context.
- **Long-term / consolidated:** twin identity (L1), goals, stated values, past decisions.
  Retrieved on demand.
- The gold example is really **topic-scoped recency**: gold is long-term as a
  *preference* (L3) but its last *touchpoint* (5 May) is a recency signal that decides
  whether Asha proactively raises it again.

---

## 3. Cold start → enrichment (how the twin gets built)

**Cold start (Day 0):**
- **AA pull** → instant L2 financial picture (accounts, deposits, MF, insurance).
- **A few conversational questions** → L1 substrate. Example questions:
  - *"Aap kahaan rehte hain — apna ghar, kiraya, ya family ke saath?"* → housing tenure
  - *"Ghar mein kaun-kaun hai, kaun aap par depend karta hai?"* → dependents / relationship graph
  - *"Kya karte hain, kahaan tak padhaai hui?"* → job + academics → income-stability + literacy register
  - income cross-checked from AA (stated vs observed — flag mismatch, don't silently override)
- **Residency question is load-bearing** → resident vs NRI switches the entire product
  universe + tax logic (see Persona doc for Jyoti).

**Enrichment (every interaction):** each conversation appends to L4, may update L1/L3,
and the engine re-plans. The twin gets richer and advice gets sharper over time — this
is the retention moat (Cleo's memory = 20× engagement) and the answer to robo-1.0's
"blind spot" failure.

---

## 4. Design considerations

These are the hard parts. Flagged for the Jyoti brainstorm:

1. **Bi-temporal validity.** Every fact needs two timestamps: *when it's true in the world*
   vs *when we learned it.* Customer moved rent→owned, had a child, changed jobs — the twin
   must version facts, not overwrite. CA/audit reason: we must reconstruct *"what did we
   know when we gave that advice."* → memory is append-only with as-of validity.

2. **Salience + decay.** Not every memory deserves equal weight forever. A one-off remark
   ≠ a stated life goal. Without decay, Asha feels creepy (brings up trivia) or noisy.
   → salience score per node; decay curve; "forget gracefully."

3. **Provenance + confidence.** Every node tagged: `user-said | AA-derived | inferred |
   RM-noted`, with a confidence. **Inferred memories are never stated as fact without
   confirmation** — ties directly to anti-sycophancy + hallucination containment. "I think
   you prefer gold — sahi samajhi?" not "You prefer gold."

4. **Consent-scoped memory (DPDP + AA lifecycle).** Each memory carries a purpose + consent
   basis. AA data has purpose limitation and consent expiry — memory *derived* from AA must
   respect that lifecycle (decay/purge when consent lapses). Customer-facing **memory
   dashboard**: view / edit / delete (DPDP right to correction & erasure). This is a
   compliance-critical layer, not a feature.

5. **Shared vs private in the relationship graph.** If the spouse is also an IDBI customer,
   their AA data is a *separate* consent — household views must not leak across consent
   boundaries. Design the "household" as a consented join, not an assumed merge.

6. **Conflict resolution.** Stated income ₹95k but AA shows ₹1.1L average credit — which
   wins, and does Asha ask? Rule: observed data informs, stated data is confirmed, conflicts
   surface as gentle questions (never silent overrides).

7. **RM projection.** What the RM sees is a *consented projection* of the twin, not the raw
   graph. Two faces, one memory, different visibility scopes.

---

## 5. Data sources → which layer they feed

| Rail | What it is | Feeds | Use in our product |
|---|---|---|---|
| **AA (Account Aggregator / Sahamati)** | RBI consent framework: FIU pulls financial data (deposits, MF, insurance, holdings) from FIPs, purpose-limited & time-bound | **L2** financial state | core personalization; the twin's money picture |
| **ULI (Unified Lending Interface, RBI)** | Plug-and-play rails giving consent-based access to financial + non-financial data (KYC, land records, GST, AA) for frictionless credit | L2 liabilities + **lending capability** | powers Emergency Liquidity Advisor, prepay, loan-against-FD/MF underwriting; strong for tier-2/3 & agri persona |
| **OCEN (Open Credit Enablement Network)** | Open protocols letting a platform embed credit by connecting borrowers to lenders (bank as lender/LSP) | adjacent **product graph** | if IDBI offers embedded/sachet credit lines in-app; the "does the bank have a product?" chain |
| CKYC / DigiLocker | identity, academics, address | **L1** substrate | cold-start twin, NRI/residency, vulnerable-customer flags |

Accuracy note for the deck: AA = *data sharing*; ULI = *credit-enabling data access*;
OCEN = *credit distribution protocol*. Don't conflate them — a bank judge will notice.

**Field-level ground truth: `financial-database/`** — the inventory of all **1,731
fields** on these rails (`field-inventory/MASTER_field_inventory.csv`), parsed from the
official ReBIT/Sahamati XSDs and iSPIRT OCEN schemas, with sample post-consent payloads
in `source-specs/`. Every L1/L2 twin attribute we design should cite its source row there;
anything not in the inventory must come from conversation (L1 questions) or bank-internal
systems — that mapping IS the twin's data contract.

---

## 6. How the deck should show this (high-level machinery)

One diagram: **customer at the centre → Customer Graph (memory + relationship) → fed by
AA/ULI/OCEN/CKYC → two faces (Asha avatar + RM console) → deterministic engine acting on
the twin → audit trail.** Label the memory as "AI-native financial twin." Keep the
five layers and three retrieval indexes as a single clean exhibit; the detail lives here.

---
