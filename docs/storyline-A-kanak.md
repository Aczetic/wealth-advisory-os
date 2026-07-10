# Storyline A — Kanak (metro young professional)

Live-demo profile + longitudinal storyline (Customer ⟷ Asha ⟷ RM). Owner: Jyoti.
Financial figures and tax, loan, and pension scenarios are illustrative. Profile fields map to
`financial-database/field-inventory/MASTER_field_inventory.csv`.

## 1. Profile (engine-loadable)

### L1 — identity
| Field | Value |
|---|---|
| Name / age | Kanak, 22 |
| Residency | Resident (→ becomes NRI at T+36mo — see final beat) |
| City / housing | Bangalore, rented (shared flat) |
| Occupation | First job, finance sector (analyst), salaried |
| Education | Commerce grad; plans UK MBA |
| Family | Parents in Indore (father runs a business, middle class), one sibling. Parents NOT dependent on her; minimal support flows either way |
| Dependents | None |

### L2 — financial state (Day 0)
| Field | Value |
|---|---|
| Income | ₹50,000/month salary (salary credit ~1st) |
| Expenses | ₹22K fixed; varies ₹22–25K by month (variance is realistic → powers spend-detection demo) |
| Surplus | ~₹25–28K/month |
| Holdings | ₹1,00,000 FD (parents opened it); savings account; **no MFs yet** |
| Liabilities | None |
| Goal | MBA in UK at T+36mo; cost ₹60L today → **~₹69L inflated @~5% education inflation** |

### L3 — preferences / behaviour
| Field | Value |
|---|---|
| Risk attitude | Moderate (steady growth) — but 3-yr goal date forces glide to safety |
| Money personality | Disciplined saver |
| Language | Hinglish |
| Channel / active time | Voice notes, late night → nudges scheduled evenings, never 11am |

### Persona mapping
GenZ/first-job + salaried-climber blend (see `brainstorm-prep-jyoti.md` §3).
Ticket sizes small→growing; explain-every-term-once register.

## 2. The goal math (the story's spine)

- 3 yrs × ₹25K/mo SIP @ ~12% ≈ ₹10.8L + ₹1L FD → **~₹12–13L own corpus by T+36**
- She self-funds ~20% of ₹69L. **Asha's value = honest funding mix, not magic savings:**

| Source | ~Amount | Notes |
|---|---|---|
| Own corpus | ~₹13L | margin money, deposits, flights, visa, initial living |
| Family contribution | ~₹10L | modest — "minimal support" (business family, Indore) |
| Education loan | ~₹45L | moratorium, 80E interest deduction |

- SIP set at ₹25K (not 28K) — worst-case expense months (₹25K) still covered. Disciplined-saver-proof.

## 3. Beats

| Beat | Life trigger | Asha (advisory moment → playbook) | RM lane |
|---|---|---|---|
| T0 | Downloads app after salary #3 | Discovery: Day-0 questions, AA pull spots FD + salary pattern | — |
| T+2w | — | **Emergency fund first** (~₹70K liquid, 3× expenses) before any SIP → discovery playbook | — |
| T+1mo | Buffer done | First SIP ₹25K/mo, moderate 60/40, max-3 curated funds with why | — |
| T+3mo | Mentions MBA dream in a midnight voice note | Goal created: ₹69L @ T+36; honest gap talk; glide path set; **memory: "aapne MBA bola tha"** | — |
| T+6mo | Indore trip + festival → ₹31K spend month | Gentle spend-variance nudge, no lecture (disciplined saver — trust her) | — |
| T+12mo | Salary hike to ₹58K | Step-up SIP +₹5K (climber playbook) | — |
| T+18mo | Market drops 15%; midnight voice note "sab bech doon?" | **Anti-sycophancy refusal** + context: goal is 18mo away, glide already de-risking; logged as advice | — |
| T+24mo | Applications begin; shortlists schools | Cost firms up; corpus check vs plan; education-loan pre-planning | **Handoff tier 2:** loan specialist call scheduled; context transfers (goal, corpus, timeline) |
| T+30mo | **Admit letter!** 🎓 | Funding mix finalized; glide completes → corpus now capital-protected | RM processes education loan ~₹45L; family-contribution beat (father's business cash cycle) |
| T+33mo | Needs ₹3–4L NOW (deposit, flights, visa) before loan disburses | **Loan-against-MF bridge** — don't redeem, borrow against units; cheaper than personal loan, corpus keeps compounding (cross-sell ⭐) | RM books LAMF (IDBI product) |
| T+36mo | Flies to UK | **Residency switch → NRI**: NRE/NRO conversation, universe flips (persona overlay live!); relationship continues abroad | RM: NRI desk intro (Dubai-branch capability story) |

**Memory callbacks to script:** T+3mo goal ← T0 discovery; T+18mo reassurance ← her
stated discipline; T+33mo bridge ← T+3mo goal + full corpus history; T+36 NRI ← everything.

## 4. Beat T0 — example conversation

Design notes: language asked FIRST, then Asha switches register; salary/expenses/FD
are **confirmed from bank data, never asked** (the "she already knows me" moment);
age from KYC (not asked); city=Bengaluru silently logs residency=Resident; ends by
landing the honest ₹60L→₹69L talk + emergency-fund-first → flows into beat T+2w.
Right panel builds the suitability audit record from her taps throughout.

> **Asha:** Hi Kanak! 👋 Main Asha — aapki financial saathi. Aapko better guide karne
> ke liye bas 2 minute ke kuch quick sawaal. Ready?
> **Kanak:** Sure!
> **Asha:** Sabse pehle — kis language mein baat karna pasand karengi?
> *(chips: English / Hindi / Hinglish / Regional)*
> **Kanak:** Hinglish
> **Asha:** Perfect, ab se Hinglish mein hi! 😊 Aap currently kis city mein rehti hain?
> **Kanak:** Bengaluru
> **Asha:** Nice! Aur wahan — apna ghar, rented, ya family ke saath?
> *(chips: Own / Rented / With family)*
> **Kanak:** Rented
> **Asha:** Koi aap par financially depend karta hai?
> *(chips: None / 1–2 / 3–4 / 5+)*
> **Kanak:** None
> **Asha:** Aur aap kaam kya karti hain?
> *(chips: Salaried / Own business / Student / Retired)*
> **Kanak:** Salaried — finance analyst. First job! 🎉
> **Asha:** Congratulations! 🥳 Ab ek cheez main pehle se dekh sakti hoon: har mahine
> ki 1 tareekh ko **₹50,000** salary aati hai, aur roughly **₹22–25K** kharch hota
> hai. Sahi hai?
> **Kanak:** Haan… bilkul sahi 😳
> **Asha:** Aur aapke naam pe ek **₹1 lakh ki FD** bhi hai. Iske alawa koi savings ya
> investment — kisi aur bank mein?
> **Kanak:** Nahi, bas wahi FD. Papa ne banwayi thi 😄
> **Asha:** Papa smart hain! Ab important sawaal — paison ke maamle mein aapke liye
> kya sabse zyada matter karta hai?
> *(chips: Protecting my money / Growing steadily / Maximizing long-term returns)*
> **Kanak:** Growing steadily.
> **Asha:** Aur last — koi bada goal jiske liye abhi se plan karna chahengi?
> **Kanak:** Yes! **MBA in UK**, agle 3 saal mein. Around ₹60 lakh ka kharcha. Abhi
> se planning karni hai.
> **Asha:** Kya goal hai, Kanak! 🎓 Ek honest baat: ₹60L aaj ka number hai — 3 saal
> mein education costs badhke **~₹69L** tak ho sakti hain. Par plan ban sakta hai:
> aapki apni savings + family + education loan, teeno milke. Aur pehla kadam
> investing *nahi* hai — pehle **emergency fund (~₹70K)** banayenge, phir SIP.
> Kal se shuru karein?
> **Kanak:** Chalo! 😍
