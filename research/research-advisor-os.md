# Research: Advisor Operating System — the RM-facing side

Researched 2026-07-08. Architecture premise: customer avatar alone is half the product;
RMs need an AI analyst too ("Advisor OS": CRM, portfolio analysis, goal planning, meeting
copilot, tax insight).

## The category is real and hot

**Vise** — AI portfolio management for advisors. $128–172M raised (Sequoia, Ribbit,
Founders Fund), ~$1B valuation. Full-stack: personalized portfolio construction (ETFs,
direct indexing, factor models), automated rebalancing, tax-efficient trading, reporting,
model management. Positioning: the advisor stays the relationship owner; Vise is the
investment engine behind them.

**The "Agentic OS" wave** — Jump, Zocks, Zeplyn, Mili, CogniCor. Started as AI meeting
notetakers; by 2026 rebranded as **agentic operating systems that orchestrate the whole
advisor stack** — from a meeting transcript they open accounts, harvest tax losses,
identify wallet share, detect referral moments, update CRM. Zocks: $45M Series B
(Lightspeed, QED), $65M total, 5,000+ firms. Per Ezra Group's 2026 buyer's guide,
**70% of RIAs now use AI for meeting documentation** — the #1 AI use case among advisors.

**Nevis** (from `research-landscape-products.md`) — Sequoia/ICONIQ, $40M; thesis: AI won't
replace advisors, it gives them 80% of their time back.

## The precedent that wins the pitch: Morgan Stanley "AI @ MS"

The world's biggest wealth manager built a comparable advisor operating system internally:
- **AI @ MS Assistant** (2023): GenAI chatbot over MS's 350K+ research docs.
  **98% of FA teams adopted.** Query time: 30 minutes → seconds.
- **AI @ MS Debrief** (2024): meeting copilot — with client consent, records, summarizes,
  drafts follow-up email, auto-writes the note into Salesforce. ~30 min saved per meeting.
- Attributed business impact: record **$64B net new assets in a single quarter**, credited
  partly to advisor AI productivity.

→ For IDBI judges: "Morgan Stanley proved advisor AI moves AUM. We give IDBI's RMs the
same capability, built on the same engine as the customer avatar."

## Architecture insight: ONE ENGINE, TWO FACES

The customer avatar and the Advisor OS are not two products. Same core services —
customer data platform, insight engine, risk profiling, recommendation engine, tax
intelligence, audit trail — rendered through two interfaces:

| Engine service | Customer face (avatar) | RM face (Advisor OS) |
|---|---|---|
| Insight engine | "You have ₹40K idle this month" | Morning briefing: "12 clients have idle surplus; 3 FDs maturing this week" |
| Risk profiling | Conversational suitability quiz | Client risk dashboard + drift alerts |
| Recommendation engine | Curated portfolio for the customer | Pre-meeting proposal pack, next-best-action per client |
| Tax intelligence | "ELSS can save you ₹15K" | Tax-harvesting opportunity list across the RM's book |
| Conversation layer | Voice/chat avatar | Meeting copilot: consented recording → summary → CRM note → draft follow-up |
| Escalation | "Let me connect you to your RM" | **Qualified-lead queue with full context handoff** (the two faces meet here) |

Five components mapped: Client CRM = briefing + auto-notes into bank CRM;
Portfolio Analysis = book-level dashboards; Goal Planning = shared plan visible to both
customer and RM (continuity!); Meeting Copilot = Debrief pattern; Tax Insight = harvesting
lists (CA edge).

## Why this doubles the business case for IDBI

1. **Scalability answer #2**: avatar serves the millions; Advisor OS multiplies the
   existing RM force for the affluent tier. Both from one engine build.
2. **Cost-to-serve**: Range's data (50% fewer human messages) + MS's data (30 min/meeting)
   = quantifiable RM capacity gain.
3. **Change management**: PSU bank staff adoption is a known risk; giving RMs a tool that
   makes THEM look good turns the union/staff story from threat to upgrade.
4. **Continuity moat**: customer talks to avatar at 11pm; RM sees the full context at 10am.
   No fintech competitor can offer that handoff.

## Sources

- https://vise.com/ · https://research.contrary.com/company/vise · https://www.crunchbase.com/organization/vise-ai
- https://wealthtechtoday.com/2026/05/08/ai-notetakers-financial-advisors-2026/ (Agentic OS trend, 70% adoption)
- https://www.zocks.io/press/zocks-raises-45m-series-b-to-accelerate-ai-powered-automation-for-financial-advisors
- https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch · https://openai.com/index/morgan-stanley/ · https://reruption.com/en/knowledge/industry-cases/morgan-stanleys-ai-debrief-98-advisor-adoption-boost
