# Research: Product & Startup Landscape — Digital Wealth / AI Advisory / Avatars

Researched 2026-07-08. Inspiration + differentiation input for `02-solution-spec.md`. Do not re-research.

## A. Bank-deployed avatars & AI assistants (closest to our exact brief)

| Player | What it is | What it proves for us |
|---|---|---|
| **Hana Bank (Korea) — Hana OneQ** | Conversational AI avatar inside the bank's mobile app; deep-learning driven; personalized investment insights & market trends, "like talking to a real advisor face-to-face" | **The exact product IDBI is asking for already exists in production in Korea.** Strongest single precedent — cite it. |
| **UBS "Digital Dani" (UneeQ)** | Digital-human avatar of UBS's chief economist delivering economic commentary to wealth clients | Avatar of a *credible persona* builds trust; scoped content (commentary, not advice) keeps compliance clean |
| **RBC NOMI (Canada)** | AI assistant in banking app; proactive personalized insights from behavioral/transaction data; auto-savings (NOMI Find & Save) | Proactive insights from bank txn data at scale — validates our data-engine moat thesis |
| **NH Bank (Korea) AI Banker** | Avatar kiosks, 24/7, 110+ languages | Multilingual avatar = financial-inclusion story; vernacular is our India angle |
| **SBI YONO Financial Fitness (India)** | Consolidated deposits/loans/investments/insurance/spending view + personalized insights | An Indian PSU bank is already moving this direction — IDBI needs this to compete; "insights" language precedent |
| **HDFC SmartWealth (India)** | DIY investing app, curated model portfolios, suitability quiz; distributor wrapper | Our legal/product template (see `research-d4-bfsi-advice-posture.md`) — but NO avatar, NO conversational layer, NO spending-data intelligence → our gap to exploit |

Avatar tech vendors: **UneeQ** (now the main digital-human player; stock avatars deployable in days, custom in 3–6 months; Soul Machines shut down Feb 2026), **NVIDIA ACE/digital-human stack**, **RAVATAR**, **AI Studios (DeepBrain)** — finance-specific avatar solutions. Validates our D3 call: lightweight rigged avatar + TTS lip-sync is the deployable middle; photoreal real-time is vendor-heavy.

## B. Global AI wealth startups (engine & UX inspiration)

| Player | Model | Steal this |
|---|---|---|
| **Range (US)** — $60M Series C Nov 2025, $100M+ total; Gradient (Google) backed | Flat-fee AI wealth platform; "Rai" AI advisor answers thousands of queries/month → 50% fewer messages to human advisors; $9.5B AUA | **The AI-handles-routine / human-handles-complex tiering is exactly our RM-escalation design** — now venture-validated at scale |
| **PortfolioPilot (US)** — $20–40B assets on platform | "Hybrid-AI": deterministic hedge-fund-style recommendation engine + AI explanation layer; user executes trades themselves | **Architecture twin of our D4 design** (engine decides, AI explains, customer executes). Their language: "analysis and recommendations, you stay in control" |
| **Arta Finance (US/SG)** — ex-Google founders | Digital family office for accredited investors; "AI Sidekick" portfolio copilot; tax-smart transitions | Premium tier inspiration; AI Sidekick = good name pattern for copilot framing |
| **Cleo (UK/US)** — 1M+ paid subs 2025 | Gen-Z AI money coach; Cleo 3.0 = two-way **voice**, long-term **memory**, personality; 20x engagement vs typical banking apps | **Personality + voice + memory = engagement moat.** An avatar with a remembered relationship ("aapne pichhle mahine bola tha...") is the retention story |
| **Magnifi (US)** | Conversational investment search: plain-language questions → structured fund comparisons | Natural-language fund discovery UX for our in-universe product search |
| **Nevis (US)** — Sequoia/ICONIQ, $40M | AI tools for human advisors (give RMs 80% of time back) | The B2B flip: our engine also powers an **RM console** — same brain, two faces. Strengthens bank business case |
| **Farther (US)** | Tech-enhanced human advisors, tax-intelligent | Tax-intelligence as a wealth feature (Kartik's edge maps here) |

## C. India wealthtech (competition + gap analysis)

| Player | Model | Gap we exploit |
|---|---|---|
| **INDmoney** | Super-app: track family finances, goals, MF/stocks/NPS; advisory via separate RIA unit (Finzoom) | Tracks everything but no bank relationship, no avatar, advice unit separate from execution |
| **Dezerv** | ₹2L-cr assets tracked, 500K users; expert-managed portfolios for affluent | Premium segment only; human-expert-led, not scalable to mass |
| **Scripbox** | Profitable, $2B+ AUM; personalized asset-allocation plans by risk appetite | Web/app DIY; no conversational layer, no bank data |
| **Jar** | 10M+ users; micro-savings → digital gold via transaction round-ups | Micro-savings behavioral hooks (round-ups, streaks) — steal for our gold + SIP nudges (D2 includes gold) |
| **Jupiter / Fi Money** | Neobanks; AA-integrated; auto-save "Pots"/FIT Rules (trigger-based saving); spend insights | Surplus-detection + auto-earmarking UX is proven in India; but they lack product depth & bank trust |
| **1 Finance** | Fee-only RIA, holistic planning | What full-RIA looks like in India — our roadmap tier, not PoC |
| **Kuvera, Groww, Zerodha Coin** | Execution-only direct-plan platforms | Zero advisory by design — the accessibility gap IDBI's problem statement describes |

**The white space (our pitch in one line):** Fintechs have the UX but not the customer's full financial life; banks have the data and trust but ship static DIY apps. Nobody in India has shipped a **bank-embedded, avatar-led, transaction-data-driven, vernacular advisory experience**. Hana Bank proves it works; HDFC proves the legal wrapper; Range/PortfolioPilot prove the AI architecture; Cleo proves the engagement model.

## D. Feature steal-list for the spec

1. Proactive surplus detection → auto-earmark to goals (RBC NOMI, Jupiter Pots)
2. Trigger-based micro-saving rules incl. gold round-ups (Fi FIT Rules, Jar)
3. Voice + personality + long-term memory in the avatar (Cleo 3.0)
4. Plain-language in-universe product search (Magnifi)
5. Deterministic engine + AI explainer, customer executes (PortfolioPilot) — matches D4
6. AI-first/human-escalation tiering with measurable RM deflection (Range: 50% fewer human messages)
7. Same engine powering an RM-facing console (Nevis) — phase-2 bank story
8. Tax-intelligent recommendations — ELSS/80C, LTCG harvesting, debt-vs-FD post-tax (Farther + CA edge)
9. Scoped avatar persona for market commentary (UBS Digital Dani) — low-risk content lane
10. Multilingual avatar as inclusion story (NH Bank 110 languages → our Hindi + regional roadmap)

## Sources

Range: https://www.range.com/blog/range-raises-60m · https://www.axios.com/pro/fintech-deals/2025/11/25/range-flat-fee-investment-advisor-scale-venture
PortfolioPilot: https://portfoliopilot.com/ · https://www.cnbc.com/2024/07/31/portfoliopilot-ai-powered-financial-advisor-has-20-billion-in-assets.html
Arta: https://artafinance.com/global/ai-for-wealth · Nevis: https://sequoiacap.com/article/nevis-bringing-ai-to-wealth-management/
Cleo: https://www.businesswire.com/news/home/20250729690058/en/Cleo-Becomes-the-First-AI-Money-Coach-That-Speaks-Thinks-and-Remembers
Avatars: https://www.fluid.ai/blog/top-10-ai-banking-avatars · https://www.digitalhumans.com/blog/the-best-digital-human-providers-platforms-comparison-rankings-2026
India: https://inc42.com/buzz/wealthtech-startup-dezerv-bags-inr-350-cr-to-expand-investment-solutions-suite/ · https://techcrunch.com/2024/07/07/investors-chase-wealthtech-startups-in-india-as-affluent-class-grows/ · https://startuptalky.com/best-digital-saving-apps/ · https://fi.money/guides/personal-finance/account-aggregator-framework-explainer-banking-finance-tech-fintech
