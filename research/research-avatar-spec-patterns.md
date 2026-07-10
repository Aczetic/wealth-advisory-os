# Research: Avatar Spec Patterns — companion AI, AI-native dating, Indian voice behavior

Researched 2026-07-08. Closes map subsystem D research item. Sources: Replika/Character.AI
analyses, Wavelength/Sitch (AI-native dating), WhatsApp India voice-note data.

## 1. Companion AI (Replika vs Character.AI) — what creates attachment, and what to refuse

**The attachment driver is MEMORY, not model quality.** Replika = one ongoing relationship
+ persistent model of the user (interests, emotional patterns, relationship history) →
deep attachment. Character.AI historically didn't persist memory across sessions — users
report "two-hour personal conversation, next day it knows nothing" as the single biggest
betrayal moment. → **Spec: persistent user model is non-negotiable; the avatar referencing
past conversations IS the product's emotional core.**

**One persona beats many.** Replika's single evolving companion >> C.AI's character zoo
for relationship depth. → Spec: ONE named, consistent advisor persona per customer
(customer may pick voice/language/gender at onboarding, but it stays stable after).

**The dark side — what we explicitly design AGAINST (and pitch as a feature):**
- Engagement-optimized *mirroring/affirmation* correlates with LTV in companion apps —
  i.e., sycophancy is deliberately engineered. In a FINANCIAL advisor this is toxic:
  an avatar that agrees with the customer's bad idea (panic-sell, crypto FOMO, skipping
  emergency fund) is mis-selling with a friendly face.
  → **Spec: anti-sycophancy scripts** — warm but honest; "I hear you, but as your
  advisor I have to show you what this costs" + disagreement is logged as advice given.
- Character.AI + Google settled teen-harm lawsuits (early 2026); Replika fined €5M
  (Italy/GDPR: transparency, legal basis). → Spec: always-visible AI disclosure,
  DPDP-grounded legal basis, no emotional-dependency mechanics (no guilt nudges,
  no "I missed you"), engagement capped by utility framing. For a PSU bank this
  anti-addiction stance is a *pitchable differentiator*, not a limitation.
- **Memory transparency dashboard**: customer can view/edit/delete what the avatar
  remembers (fixes Replika's fine, satisfies DPDP right-to-correction, builds trust).

## 2. AI-native dating (Wavelength, Sitch) — onboarding & curation patterns

- **Conversation AS data collection**: Wavelength builds your profile from a 2-minute
  voice/text chat, not a form. → **Spec: risk profiling & goal discovery happen
  conversationally** — the avatar chats ("what are you saving for? what would you do if
  your ₹1L investment dropped to ₹80K for six months?"), and answers map behind the
  scenes to a structured, auditable SEBI-style suitability questionnaire. Form rigor,
  conversation feel. (Compliance note: keep the structured mapping — auditors need it.)
- **Intent-setting step**: user explicitly states what they value before matching.
  → Spec: "money values" step at onboarding (safety vs growth, family goals) — both
  signal and suitability documentation.
- **"Swipeless" = the system filters, not the user.** Dating's third wave kills the
  swipe-fatigue; ours kills fund-list fatigue. → **Spec: never show a fund catalog;
  show max 2–3 curated options with reasons + one "why not others" expander.**
- Voice reveals signal beyond stated answers ("the rhythm of how someone speaks").
  → Use cautiously: conversational signals may *flag* profile inconsistencies for
  re-confirmation, never silently override stated answers. Disclose all inference.

## 3. WhatsApp India voice behavior — the interaction model

Data: India is the most voice-message-heavy market on earth — voice = 22% of WhatsApp
comms in India vs 14% global; 62% of Indian users send voice notes weekly; average
voice note ≈ 18 seconds; driver = multilingual reality (voice transcends typing/
literacy/script barriers). Gen Z/millennial usage 71%/62%.

**Spec implications (big):**
1. **Async voice-note model, not phone-call model.** Indians already talk to a mic in
   short bursts. Push-to-talk voice notes to the avatar + short spoken replies feels
   native; a live-call paradigm feels foreign and latency-fragile. (Also relaxes our
   <1.5s latency constraint for the non-live mode — voice-note replies can take 3–5s.)
2. **18-second norm** → avatar spoken replies target 15–30s; anything longer becomes
   a card + "want me to explain more?" Never lecture.
3. **Hinglish code-switching is table stakes**, not a roadmap item (also RFP's 15-language
   line). Voice-first design doubles as the financial-inclusion story.
4. WhatsApp itself is a delivery channel later (RFP already lists WhatsApp integration).

## Consolidated: subsystem D spec skeleton (ready for assembly)

1. One named, persistent advisor persona; customer picks voice/language at onboarding
2. 3-layer memory (episodic conversations / semantic profile / data-derived events)
   + explicit past-reference behavior + memory transparency dashboard
3. Conversational onboarding → auditable suitability mapping (Wavelength pattern)
4. Voice-note-first interaction (push-to-talk, 15–30s replies, Hinglish), live mode second
5. Anti-sycophancy + anti-dependency guardrails, always-on AI disclosure (pitch as
   "responsible avatar" — directly answers SEBI AI/ML + C.AI/Replika cautionary tales)
6. Swipeless curation: 2–3 options max, reasons attached
7. Proactivity budget (from map §D) + event-triggered voice-note nudges

## Sources

- https://digitalhumancorp.com/en/research/best-ai-companion-app-2026 · https://medium.com/@billhongmoney/i-compared-every-ai-companions-memory-system-most-of-them-are-faking-it-1803d6d0243c (memory systems)
- https://www.emergentmind.com/topics/character-ai-c-ai · https://www.aicompanionpick.com/replika-ai-latest-news-2026 (engagement mechanics, lawsuits/fines)
- https://www.antler.co/blog/why-we-invested-in-wavelength · https://www.heywavelength.com/ (conversation-as-profile, swipeless)
- https://jestycrm.com/blog/whatsapp-usage-statistics-2026-by-jesty-crm · https://hyperleap.ai/blog/whatsapp-statistics-india-2026 (India voice-note data)
