# Research: GO Mobile+ Screen Reconstruction (Subsystem A)

Researched 2026-07-08 from public sources (official IDBI pages, bank's features PDF,
App Store v3.5 listing, walkthrough articles). Confidence: 🟢 = stated by IDBI/official,
🟡 = inferred. In-app verification happens post-shortlist in sandbox.

## Reconstructed navigation tree

```
PRE-LOGIN ZONE 🟢 (no auth needed)
├── mPassbook 🟢 — stored txns, keyword tagging, EXPENSE CATEGORIES + PIE CHARTS,
│                  PDF export  ← IDBI's only "insights" feature today; it's manual
├── Product info & interest rates 🟢
├── Loan/investment calculators 🟢
├── ATM/branch locator, phone banking 🟢
└── Login (Customer ID + MPIN; activation via debit card / netbanking creds) 🟢

POST-LOGIN
├── HOME 🟢
│   ├── Account card-deck (swipe/swivel between accounts, balances) 🟢
│   ├── Customizable quick-action icons (user picks frequent options) 🟢
│   ├── Bottom menu tray (favorite shortcuts) 🟢
│   ├── Personalization: selfie/gallery wallpaper, seasonal themes 🟢
│   └── NEW v3.5 (Jun 2026): Average Balance tracking with graphs 🟢
├── Accounts: balance, details, mini-statement, full statement (PDF), PPF & SSA statements 🟢
├── Payments: self/3rd-party transfer, NEFT, IMPS, UPI, Remit Abroad (v3.5) 🟢
├── Bills & Recharge: billers, mobile/DTH, credit-card bill pay 🟢
├── Deposits: FD/RD booking, view rate & maturity while booking, FD locking (v3.5) 🟢
├── Investments 🟡 (grouping inferred; features confirmed individually):
│   ├── Mutual Fund journey (exists; basic) 🟢
│   ├── Demat: holdings, txn details, nomination, income updation 🟢
│   └── IPO application (incl. HNI category) 🟢
├── Cards: debit card controls (on/off, limits, intl), credit card view/manage 🟢
├── Service requests: cheque book, stop cheque, etc. 🟢
└── More > Settings > Personalize Menu 🟢

App quality context: iOS rating 3.7★ (180 ratings); complaints = OTP/activation failures,
statement errors 🟢. Android package = com.snapwork.IDBI → app is VENDOR-BUILT
(Snapwork Technologies) 🟢 — integration counterpart is a vendor codebase, not an
in-house team.
```

## What this means for us (second-order readouts)

1. **IDBI is already inching toward insights** — manual expense tagging (mPassbook) and
   v3.5's average-balance graphs. Pitch line: "the bank has the seeds (categories,
   balance graphs); we grow them into an intelligence layer." Not greenfield → less
   scary to judges; our engine auto-categorizes what mPassbook makes users tag by hand.
2. **Vendor-built app (Snapwork)** changes the delivery calculus: shipping native code
   into someone else's vendor codebase is slow/political. Argues strongly for
   **hybrid delivery**: thin native shell (voice capture, avatar render surface,
   auth handoff) + server-driven UI/webview for flows → we iterate without app releases.
3. **App stability is mediocre (3.7★)** — our module must be crash-isolated (if avatar
   fails, app unaffected) and cannot worsen app size/perf materially (app already 132MB).
4. **Existing pre-login zone is a gift**: a pre-login "meet your advisor" demo mode
   (education-only, zero PII) is consistent with the app's existing structure — great
   for adoption funnel AND for the hackathon demo.

## Avatar entry points (ranked)

| # | Entry point | Moment | Why it wins |
|---|---|---|---|
| E1 | Persistent avatar card in the home card-deck + floating bubble | every session | Deck is THE home pattern; avatar becomes "one more card" = native-feeling |
| E2 | Contextual hooks on existing screens | FD maturity view, avg-balance graph, mPassbook categories, MF journey, post-IPO | Intercept moments of existing intent ("FD maturing — want to compare options?") — advice arrives in context, not as a destination |
| E3 | Post-login greeting (first N sessions + event-triggered) | login | Onboarding + proactive nudge delivery (respecting anti-spam budget, map §D) |
| E4 | Pre-login education mode | before auth | Zero-PII demo lane; regulatory-light; doubles as judges' demo |
| E5 | Deep-link from RM/SMS/WhatsApp | campaign | RM sends "discuss with your advisor" links (D6 two-faces tie-in) |

## Delivery mechanism (decision input, map §A ✏️)

Recommendation: **hybrid** — native micro-SDK (mic, TTS playback, avatar canvas via
Lottie/Rive lightweight rig, secure session bridge) + server-driven conversational UI.
Rationale: vendor codebase (minimize native surface), slow PSU release cycles (server-side
iteration), crash isolation (3.7★ app), 2D-rig avatar per D3 keeps payload small.
Full native module and pure-webview both rejected (former: too much vendor friction;
latter: voice latency + avatar jank).

## Assumption log (verify in sandbox)

- A1: Investments items sit under one section (inferred) — actual IA may differ
- A2: MF journey depth unknown (transaction-only vs any guidance) — assumed transaction-only
- A3: No existing chat/bot in app (none found in any source) — assumed absent
- A4: Snapwork remains the app vendor currently — package name evidence only
- A5: Server-driven UI acceptable within bank's security policy — needs bank confirmation

## Bank application portfolio

**No — IDBI runs a fragmented app fleet:** GO Mobile+ (flagship retail), PayWiz (UPI),
Abhay (card control), PayApt (payments), mPassbook (being merged into GO Mobile+
pre-login), IDBI Direct / Smart Nivesh + IDBI Direct Portfolio (IDBI Capital broking).
The bank's own channel fragmentation mirrors the problem statement's word "fragmented" —
usable pitch point.

**The 2022 Digital Bank App RFP (IDBI-Bank/ITD/VMG/RFP/22-23/27, 12-Aug-2022, 114 pp):**
IDBI tendered a NEW digital banking application "targeted at the millennial customer
segment," explicitly scoped to include:
- Wealth Management module: risk-profile questionnaire → "suggest relevant investment
  options as per user risk profile", full MF lifecycle (list/compare/buy/redeem/SIP
  mandates), portfolio IMPORT by fetching CAS/statements from user's email, capital-gains
  statements from CAMS/KFintech
- Spend Analytics: card-spend tracking + visualization
- Chatbot/live-chat/WhatsApp integration readiness; **minimum 15 regional languages**
- Architecture "flexible to make the digital banking app the super app of the bank in
  the Future"; integrations: NSDL, UIDAI, NPCI, CAMS, KFintech
No public launch found as of Jul 2026 (GO Mobile+ remains flagship, now 11 languages +
AI fraud detection per 2025 reviews) → RFP either absorbed into GO Mobile+ upgrades,
in-flight, or stalled.

**Strategic readout:**
1. IDBI's own 2022 RFP proves the bank ALREADY WANTS everything our solution needs as
   plumbing (risk profiling, MF rails, spend analytics, chatbot, 15 languages) — but a
   2022 RFP could only buy rails, not intelligence. **Pitch line: "Your 2022 digital-app
   RFP specced the rails. We are the intelligence layer those rails were waiting for."**
2. The hackathon brief says "integrates into the bank's mobile application" — app
   UNNAMED. Do not marry the spec to GO Mobile+: design the module **channel-agnostic**
   (D7 hybrid: native micro-SDK + server-driven UI already gives this) so it embeds in
   GO Mobile+ today, the new digital app when it lands, and WhatsApp/web later.
   GO Mobile+ remains the reference integration for the PoC/demo.
- RFP source: https://www.idbi.bank.in/notices-Adv/pdf/RFP-Digital-Bank-and-Branch-Digitisation.pdf

## Sources

- https://www.idbi.bank.in/go_mobile_app_android_version.aspx (official: home deck, tray, personalization, pre-login)
- https://www.idbi.bank.in/pdf/GO-mobile-plus-Features.pdf (mPassbook: tagging, categories, pie charts)
- https://apps.apple.com/us/app/idbi-bank-go-mobile/id1318206368 (v3.5 notes, rating, complaints)
- https://lemonn.co.in/blog/banking/idbi-bank-app-download-login-features-2026/ · https://upstox.com/banking/idbi-bank-mobile-banking-how-to-activate-login-registration-app/ (feature walkthroughs)
