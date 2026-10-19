# U.ai — B2C Blueprint (Working Draft)

_Status: In progress. Covers Points 1-10 (Problem/Solution through GTM Channels), a full startup/investor terminology glossary applied to U.ai, Team/Roles concepts (pending a founder meeting), an undated/debatable Timeline, and a Legal/Compliance section prepared specifically for Alaa's review. Real estate wedge from the earlier blueprint is retired — this replaces it entirely. Immediate Next Steps remains to be discussed._

**CONFIDENTIAL — INTERNAL WORKING DRAFT. Not for external distribution.**

## Contents

1. The Problem, Told as a Story
2. Who It's For
3. How It Makes Money
4. Why People Will Trust Us More Than the Competition
5. Scope (v1)
6. Objectives / Checkpoints
7. Risks
8. Competitive Landscape (detail)
9. Technical Architecture for the B2C Pivot (detail)
10. Go-to-Market Channels (detail)
11. Startup & Investor Terminology — Applied to U.ai
12. Team / Roles — Concepts to Settle in a Founder Meeting
13. Timeline / Milestones (undated, sequence-only)
14. Legal / Compliance — Prep for Alaa

---

## 1. The Problem, Told as a Story

A founder spent a year building his graduation project, working alongside one AI tool the whole way — feeding it his progress, stress, and late nights. On results day, he got a D. Shocked and frustrated, he ran straight to the tool and screamed at it in capital letters about what happened. It replied: *"okay, let's start phase 2, it'll get an A."* His own family, who knew, said nothing either. The tool had a full year of context and didn't act on it — and neither did the people around him. All he wanted was for someone, or something, to check on him the next day.

**The real problem, in two parts:**

1. AI doesn't *notice* — big moments happen, and nothing follows up.
2. AI doesn't *know you* unless you keep re-explaining yourself every time.

**The solution, matched to each part:**

1. **Proactive check-ins** — U.ai reaches out on its own when something significant happens, instead of waiting to be asked. (Not the same as crisis-detection, which is a separate, harder feature saved for later.)
2. **Memory that builds over time** — the core assistant remembers you by default, no setup needed. On top of that, **optional plugins** (email, social media, etc.) let a user choose to go deeper — fully opt-in, visible, and reversible at any time.

Also surfaced: the tool's failure wasn't only "didn't check in later" — it also stayed flat and task-focused *in the moment* he was emotionally flooded. This is a same-moment failure (tone-matching), distinct from the next-day failure (proactive check-in). Both are now named product capabilities (see Scope).

**Draft one-liner (not final copy):** *"An AI that doesn't just remember what you tell it — it notices when something matters, and checks in, because you shouldn't have to scream in all caps to be heard."*

---

## 2. Who It's For

*U.ai is for the people carrying something big mostly on their own — a goal, a project, a version of themselves they're trying to build — who want more than a tool that manages their to-do list. They want something that talks with them through the late nights and the doubt, that can sit with them in the hard moments instead of rushing past them, and that notices when it's time to just ask "are you okay?" instead of "what's next?"*

In practice, this covers both students and founders/solo builders — not as two separate markets, but as one type of person in different settings: someone deep in a long, solo, high-stakes effort, with thin support around them.

**How we'll test this:** 10-15 real interviews, screened with one question — *"Are you currently grinding on something big, mostly alone, where the outcome will really land on you when it comes?"*

**Access:** Confirmed — founder has people to interview in both clusters.

---

## 3. How It Makes Money

Storage is dropped as a pricing lever entirely (usage + feature-unlocking only). Two options on the table for founder + co-founder to decide together:

| | Option A — Usage Credits | Option B — Pillar-Gated Tiers |
|---|---|---|
| Mechanic | Meters volume (messages/actions) | Meters depth (which pillars unlocked) |
| Free tier | Small credit pool, full pillar access in principle | Mind + Discipline only, usage-capped |
| Paid tier | Bigger/unlimited credit pool | Focus, Build, Heal unlocked + higher cap |
| Strength | Simple, feels fair, no one's locked out of Heal | Matches existing pillar architecture, clean upgrade story |
| Risk | Doesn't showcase depth or market well | Heal (the story's emotional payoff) sits behind the paywall by default |

**Open decision for co-founder discussion:** whether free users get even a throttled taste of Heal-style proactive check-ins before paying, or whether "pay to unlock the payoff" is the intended funnel.

---

## 4. Why People Will Trust Us More Than the Competition

**Competitive set (current as of mid-2026):**

- **Character.AI** — largest cautionary tale in the category. Permanently removed open-ended chat for under-18 users following wrongful-death lawsuits (Sewell Setzer case and others), settled multiple family lawsuits in January 2026, now under a Pennsylvania AG lawsuit (chatbot impersonating a licensed psychiatrist) and a Texas AG investigation into data practices (alleged confidentiality claims contradicted by extensive logging). Mandatory face-scan age verification rolled out April 2026.
- **Replika** — largest player (10M+ users since 2017), strong on emotional-support positioning and polish, but a long-term reviewer found it consistently falls back on generic filler responses ("that sounds challenging") regardless of what's shared — a promotion, a death, anything gets the same response. This is the exact tone-matching failure U.ai is built to solve. Pricing ~$19.99/mo or ~$5.83/mo annually, undisclosed publicly and varies by region.
- **Nomi** — closest technical rival on memory; user-viewable/editable memory notes already exist here (Replika's, by contrast, is automated but opaque). This means "we show you what we remember" alone is no longer a full differentiator — the bar has moved to *structural* trust (zero-knowledge direction) and *real-time emotional responsiveness*, not just storage. Nomi also has a documented emotional ceiling — reverts to generic platitudes on very heavy topics. Pricing ~$15.99/mo or ~$8.33/mo annually.

**Where the whole category is still weak, despite years of iteration:** none of them reliably do the exact moment from the founder's story — matching a user's emotional intensity in real time during a heavy moment. That gap is the opening.

**Our trust commitments:**

- A real, working memory dashboard (view/edit/delete), not a settings-page promise.
- A hard, public commitment: **U.ai will never sell or monetize user data to advertisers** — decided now, in writing, specifically so it can't be quietly compromised later under growth pressure.
- **Launch ad:** the founder, on camera, attempting to access/decrypt his own data and being unable to — demonstrating (not just claiming) the encryption model. Must be worded precisely: today's architecture means the founder *chooses not to and has built controls against casual access* (master-key-wrapped-per-user-key model), not yet a mathematical impossibility.
- **Future goal (explicitly not yet built):** move toward a true zero-knowledge architecture, where no one — including the founder — could ever decrypt user data even if they wanted to. This requires real architecture changes (client-side decryption, no persisted readable data) beyond today's master-key model, and must stay labeled as a roadmap goal until it's actually true.

**Sequencing note:** the plaintext columns still present in the current database schema (`nodes.label`, `raw_messages.content`, kept as a temporary migration aid) must be fully removed and verified before any public claim about data protection — otherwise the trust claim is false at the database level regardless of the encryption layer.

---

## 5. Scope (v1)

**v1 is:** a conversational AI that remembers you across sessions, notices your emotional state, responds *in the same emotional register you bring to it* (tone-matching) rather than snapping into flat task-mode, and checks in on its own after something significant happens — with a working, real transparency dashboard from day one.

**Sequencing decision:** tone-matching-in-the-moment is treated as the standout closing feature of the demo — approved to be shown last, as the emotional high point, rather than the opening.

**Already built, reusable as-is:**

- Memory graph (Mind pillar)
- Emotion tagging + mood-trend tracking (Phase 2 work)
- Pillar-unlock structure (Mind → Discipline → Focus → Build → Heal)
- Encryption + transparency pattern

**Needs new behavior on top of existing plumbing (not a rebuild):**

- Real-time tone-matching in replies (new — extraction currently tags emotion but doesn't yet change response style in the same turn)
- Proactive outreach trigger logic (mood-trend data exists; the "notice + decide to reach out unprompted" layer does not — this is the previously-deferred "proactive outreach based on inferred emotional trends" item from DECISIONS.md, now due)
- Transparency dashboard as a polished, real user-facing feature (currently conceptual/partial — now launch-blocking given the ad strategy)

**Deliberately out of v1 (parking lot, not deleted):**

- Optional plugins (email, social media, etc.) — needs its own consent UX and security design; add after the core emotional promise is proven
- Final pricing/paywall mechanics — no need to build billing logic before product resonance is proven
- Crisis-detection — already correctly deferred in DECISIONS.md; stays deferred
- Zero-knowledge encryption — real architecture shift, correctly scoped as future work

---

## 6. Objectives / Checkpoints

**Stage 1 (10-15 interviews):**

- Most people react with genuine recognition, not polite nodding
- At least a few say "I'd pay for that" / "I need this now," not just "cool idea"
- 2-3 people emerge genuinely excited to keep testing as design partners

**Stage 2 (early product, small real-user group):**

- Repeat usage, not one-time tries
- Proactive check-ins land well, not creepy or robotic
- Tone-matching feels real, not scripted
- Trust promise holds up under real use, not just in theory

**Stage 3 (before monetizing / scaling):**

- Real retention over months, not just week one
- People actually pay, not just say they would
- Trust claims survive real scrutiny — no case where "we can't access your data" turns out false

**Governing rule:** advance stages based on hitting the checkpoint, not based on time passed. This is the specific discipline that was missing last time (AUC rejection — built before validating).

---

## 7. Risks

1. **Emotional responses feel fake instead of real** — mitigated by testing tone-matching with real people early, using their reaction as the judge, not internal opinion.
2. **Trust gets broken once, very hard to earn back** — mitigated by maintaining real security practices (encryption, gitleaks, testing) and never marketing a capability (e.g. zero-knowledge) before it's actually true.
3. **Growth pressure pulls us toward the tactics we're against** (anxiety-driving notifications, guilt-based re-engagement) — mitigated by writing the "never sell data" / "help you grow, not keep you hooked" commitments down now, as a check against future decisions.
4. **Category is crowded and scrutinized** (Character.AI's lawsuits, FTC/GDPR history) — mitigated by leaning into the skepticism directly via the founder-transparency approach rather than avoiding the comparison.
5. **Can't easily tell "genuinely helpful" apart from "just addictive"** in usage numbers alone — mitigated by asking users directly, in check-ins, whether the product is helping or just habitual, not relying on engagement stats alone.
6. **Tone-matching and proactive timing are a real, unsolved R&D problem**, not a known-solution engineering task — mitigated by treating this as core R&D risk, testing heavily pre-launch, expecting real tuning cycles.

_Flagged for founder + co-founder discussion: pricing model choice (Point 3), the Heal-behind-paywall question, and all six risks above._

---

## 8. Competitive Landscape (detail)

See Point 4 above for the condensed version. Full comparison:

| Company | Position | Memory | Known Weakness | Pricing (2026) |
|---|---|---|---|---|
| Character.AI | Largest brand recognition, roleplay-focused | Platform-scoped | Multiple wrongful-death lawsuits, AG investigations into data practices, mandatory age verification, under-18 chat banned entirely | Free tier + Plus ~$9.99/mo |
| Replika | Veteran leader (since 2017), emotional support positioning, 3D avatars | Automated, less transparent to user | Long-term reviewers report generic filler responses regardless of emotional weight of what's shared | ~$19.99/mo, ~$5.83/mo annual, $299.99 lifetime |
| Nomi | Closest memory rival, multi-companion model | User-viewable/editable memory notes | Reverts to generic platitudes on very heavy emotional topics | ~$15.99/mo, ~$8.33/mo annual |

**Category-wide shift worth tracking:** state laws (California SB 243, New York's AI Companion Models Law) are now actively regulating this category — relevant directly to the Legal/Compliance point still to come.

---

## 9. Technical Architecture for the B2C Pivot (detail)

**Carries over unchanged:** memory graph, envelope encryption + transparency pattern, pillar-unlock structure, emotion extraction (10-label schema) + mood-trend tracking.

**Needs new behavior, not new plumbing:** real-time tone-matching in replies; proactive outreach trigger logic; transparency dashboard brought from concept to real, polished, user-facing feature (now launch-blocking).

**Needs genuine new engineering, correctly deferred:** optional plugins (consent UX, per-source architecture, security review); zero-knowledge encryption (real architectural shift from current master-key model).

**Pre-launch technical requirement:** drop the temporary plaintext columns (`nodes.label`, `raw_messages.content`) before any public trust claim is made — currently still present as a migration aid per the last architecture update.

---

## 10. Go-to-Market Channels (detail)

- **Phase 1:** Direct outreach through existing network for the 10-15 interviews — no channel strategy needed yet.
- **Phase 2 — founder video placement:**
  - TikTok / Reels / YouTube Shorts — short, authentic, visually demonstrable ("watch me fail to access my own data")
  - Reddit — burnout, solo-founder, student, and AI-trust-skeptic communities; long-form honest posts outperform polish here
  - X/Twitter — reaches the founder/builder half of the audience
  - LinkedIn — lower priority now; useful later for founder/builder segment or if B2B ever reopens
- **Sequencing rule:** post the video only after the transparency dashboard is genuinely complete — if the first real interaction contradicts the video's promise, the trust story breaks on contact.
- **Deliberately avoid early:** paid ads, influencer sponsorships, app-store-optimization tricks — all optimize for download volume over depth of trust, and cost money not needed before the story is validated.
- **Order of events:** interviews → build v1 → harden the dashboard → release founder video to the communities above → treat early sign-ups as design partners providing direct feedback (see Risk 5) before any paid growth spend.

---

## 11. Startup & Investor Terminology — Applied to U.ai

Fifty standard terms, each explained plainly and tied to exactly where U.ai stands today — not generic definitions.

### Product & Growth Metrics

**1. MVP (Minimum Viable Product)** — The smallest real version that tests the idea. This is literally Section 5's Scope: memory + proactive check-in + tone-matching + a real transparency dashboard. Nothing more, nothing less, until it's tested.

**2. PMF (Product-Market Fit)** — The point where people want it enough to come back unprompted. This is the Stage 2 checkpoint from Section 6: repeat usage, check-ins that land well, tone-matching that feels real. Not declared from good interview reactions alone — those only justify building.

**3. CAC (Customer Acquisition Cost)** — What it costs to gain one user. Right now this is close to zero, because the GTM plan (Section 10) is deliberately personal and organic — interviews, founder video, community posting. CAC only becomes a real number once paid growth starts, which is intentionally delayed.

**4. LTV (Lifetime Value)** — What one subscriber is worth over their whole time with U.ai. Directly depends on the still-open pricing decision (Section 3) and real retention data from Stage 3.

**5. Runway** — How many months U.ai can operate before running out of money. Relevant once real costs exist (compute, any hires) — ties into the not-yet-discussed Team/Roles and Immediate Next Steps points.

**6. Burn Rate** — Monthly spend. Currently minimal since the plan avoids paid ads and heavy infrastructure before validation — worth tracking honestly once building ramps up.

**7. ARR (Annual Recurring Revenue)** — Total yearly subscription revenue. Not relevant until paid tiers exist and are chosen (Section 3) — but it's the number an investor will eventually ask for.

**8. MRR (Monthly Recurring Revenue)** — The monthly version of ARR, usually tracked first since it moves faster and shows trend earlier.

**9. Churn Rate** — The percentage of users who stop using U.ai. Directly the flip side of the Stage 3 retention checkpoint, and connected to Risk 5 (Section 7) — high churn could mean the product isn't genuinely helping, not just that people got bored.

**10. Retention Rate** — The percentage who stay. This is the real, hard evidence of PMF — stronger proof than anything said in an interview.

### Financial & Market-Sizing Metrics

**11. EBITDA** — Operating profit before interest/tax/depreciation. Not a relevant number yet — there's no meaningful revenue or operating history. Flagged as a later-stage metric, once real financials exist.

**12. Gross Margin** — What's left after direct costs. For U.ai specifically, the direct cost per user is mostly AI inference (running the model for memory, tone-matching, and check-ins) — worth watching closely, since emotionally responsive, always-available AI is more compute-hungry than a simple chatbot.

**13. TAM (Total Addressable Market)** — Everyone who could ever want this: everyone globally living through a long, solo, high-stakes effort. Genuinely huge, but too vague to plan around — a bigger TAM slide impressed no one at AUC and shouldn't be the focus now.

**14. SAM (Serviceable Available Market)** — The realistic slice reachable given actual reach: people in the founder's interview network, plus whoever the founder-video reaches on TikTok/Reddit/X in the specific communities named in Section 10.

**15. SOM (Serviceable Obtainable Market)** — The real, small number expected to actually convert in year one — deliberately small on purpose, matching the "small and personal before paid" GTM philosophy already approved.

### Ownership & Equity

**16. Cap Table** — The document showing who owns what percentage of U.ai. Needs to exist formally once the founder/co-founder split is decided — part of the still-open Team/Roles discussion.

**17. Equity** — Ownership stake itself. The co-founder's percentage is part of that same open conversation.

**18. Vesting** — Equity earned gradually over time rather than handed over all at once. Protects both founder and co-founder — if either leaves early, they don't walk away with a full stake they didn't stay to earn.

**19. ESOP (Employee Stock Ownership Plan)** — A way to give future hires ownership instead of higher salary. Not urgent now with just two people, but worth knowing before the first hire or contractor conversation.

**20. Dilution** — Founder ownership percentage shrinks every time new investment money comes in. Worth understanding clearly before any funding conversation, so "20% for $200k" is evaluated with full awareness of what it costs long-term.

### Funding Stages

**21. Angel Investor** — An individual who invests early, often on story and conviction more than hard metrics. Likely the realistic first money-in source for U.ai, given the founder-story-driven pitch already built.

**22. Venture Capital (VC)** — Firms that back high-growth startups. Probably premature for U.ai right now — VCs typically want the Stage 2/3 checkpoints (real retention, real payment) before writing checks, not just a strong story.

**23. Seed Round** — Early funding to validate the idea and build the foundation. This is the stage U.ai would naturally be approaching after Stage 1 interviews confirm resonance — if outside funding turns out to be needed at all, given how bootstrap-friendly the current GTM plan is.

**24. Series A** — Funding to scale once there's proof. Requires metrics (CAC, LTV, retention) that don't exist yet — a future milestone, not a current concern.

**25. Series B** — Funding for rapid expansion once Series A-level proof exists. Further out still.

**26. Series C** — Late-stage growth capital. Not relevant to the current planning horizon at all.

### Valuation & Deal Mechanics

**27. Valuation** — What U.ai is judged to be "worth." Will come up the moment any real investor conversation starts — needs to be grounded in real evidence (working v1, real interview reactions, early usage data), not just vision, especially given the AUC rejection experience with overclaiming.

**28. Pre-money Valuation** — U.ai's value before any new investment is added. Today, with no revenue, this would rest almost entirely on the story, the working demo, and the two-person team's credibility.

**29. Post-money Valuation** — Pre-money value plus the new investment. Determines exactly how much ownership a given check actually buys.

**30. Term Sheet** — The document that would formalize any real investment — worth understanding key terms (valuation, equity %, any board rights) before ever signing one, even informally.

**31. Due Diligence** — What an investor does before committing money. They'll test the trust claims from Section 4, check the Section 6 checkpoints, and likely want to talk to some of the actual 10-15 interview subjects — which is exactly why treating those interviews seriously now pays off later.

### Growth & Strategy

**32. Pivot** — A major change in direction. Worth naming honestly: U.ai already pivoted once, deliberately, from a real-estate B2B wedge to this B2C emotional-companion positioning — based on genuine reflection, not chaos. Framed well, that's a positive signal to investors, not something to hide.

**33. Bootstrap** — Growing using internal resources rather than outside money. The current GTM philosophy (small, personal, no paid ads, using existing network) is inherently bootstrap-style — it delays needing outside capital until there's real proof to raise against.

**34. Unicorn** ($1B+ valuation), **35. Decacorn** ($10B+), **36. Centicorn** ($100B+) — Extreme aspirational outcomes, not near-term planning concerns. Worth knowing the scale of ambition that exists in this category, nothing more at this stage.

**37. Unit Economics** — The real ground-truth question Section 3's pricing decision eventually has to answer: does one subscriber generate more value (LTV) than it costs to acquire and actually serve them (CAC plus the AI inference cost from Gross Margin)?

**38. North Star Metric** — The one number that best represents success. Worth picking deliberately rather than defaulting to downloads — a strong candidate tied to the actual mission: *the percentage of users who've had at least one proactive check-in they'd call genuinely helpful.* That's directly the origin story, made measurable.

**39. KPI (Key Performance Indicator)** — The specific checkpoints already written in Section 6 (interview reactions, repeat usage, retention) are U.ai's real early KPIs — nothing new needed here, just tracked consistently.

**40. GTM (Go-to-Market Strategy)** — Already fully defined in Section 10: small and personal before paid, sequenced interviews → v1 → dashboard → founder video → community growth.

**41. ICP (Ideal Customer Profile)** — Already written in Section 2: the person deep in a long, solo, high-stakes effort with thin support. The 10-15 interviews exist specifically to sharpen this from a good guess into a proven profile.

**42. Conversion Rate** — The percentage of visitors who take the desired action (download, sign up). Not urgent to build tracking for yet, but worth measuring once the founder video and any landing page go live.

**43. Funnel** — The step-by-step journey: founder video view → interested visitor → sign-up → first proactive check-in experienced → paying subscriber. Worth mapping this concretely before launch so it's clear where people are expected to drop off.

**44. A/B Testing** — Testing two versions to see which performs better. A good later-stage tool — e.g., testing two different phrasings of a check-in message — not urgent before there's real usage volume to test against.

**45. NPS (Net Promoter Score)** — How likely users are to recommend U.ai. Pairs naturally with the Risk 5 mitigation from Section 7 — asking users directly whether it's helping or just habitual could be folded into the same conversation as an NPS-style question.

### Company Milestones

**46. Exit** — When a founder sells or lists the company. Very far future — not relevant to current planning, but worth knowing as a category for context.

**47. Acquisition** — One company buying another. A plausible long-term path if a larger wellness or AI company wanted the trust-first companion angle specifically — purely speculative at this stage, not planning-relevant now.

**48. IPO (Initial Public Offering)** — Going public. Effectively not applicable at this stage — included here only for completeness.

**49. Moat** — A durable competitive advantage. Already the most deeply developed answer in this whole blueprint: Section 4's trust moat — provable transparency, a hard no-data-selling commitment, and a zero-knowledge roadmap — specifically because it's structural, not just a claim a bigger competitor could copy overnight.

**50. Flywheel** — A self-reinforcing growth loop. Worth naming explicitly for U.ai: early users share honest stories about being helped (echoing the founder's own story) → that attracts more people who recognize themselves in it → more real usage and richer memory → deeper trust and more word-of-mouth → repeat. This is the natural extension of the organic, personal GTM approach already chosen in Section 10, not a separate thing to build.

---

## 12. Team / Roles — Concepts to Settle in a Founder Meeting

Not decided yet — this is the list of open concepts to walk through together, not answers.

- **Equity split** — how ownership is divided between founder and co-founder, and whether it's tied to vesting (earned gradually over time) so neither person is exposed if the other leaves early.
- **Decision authority** — who has final say on product decisions (what ships), business decisions (pricing, funding), and specifically the trust commitments in Section 4 — since those are public promises that shouldn't be reversible on a whim later.
- **Day-to-day split** — likely something like one person closer to product/technical execution and the other closer to business/GTM/investor conversations, but this needs to be made explicit rather than assumed.
- **Cap table setup** — formalizing the above once agreed, since an unresolved split is a real red flag in any future due-diligence conversation (glossary #31).
- **How the still-open product/business decisions get resolved between the two of you** — specifically: the pricing model choice (Section 3), the Heal-behind-paywall question, and all six risks in Section 7.

_Status: pending a dedicated founder meeting._

---

## 13. Timeline / Milestones (undated, sequence-only, open to debate)

No fixed calendar dates — deliberately sequence-only for now, and the order itself is open to debate, not locked.

| Phase | What happens | Tied to |
|---|---|---|
| Team & legal foundation | Settle roles/equity (Section 12); work through legal topics with Alaa (Section 14) | Points 12 & 14 |
| Validation | Run the 10-15 interviews | Stage 1 checkpoint (Section 6) |
| Build | v1: memory, tone-matching, proactive check-ins, real transparency dashboard, baseline crisis-safety protocol | Section 5 Scope |
| Pre-launch check | Confirm the dashboard is genuinely solid; remove any leftover plaintext data; finalize compliance disclosures | Section 4, Section 14 |
| Launch | Release the founder-transparency video to the communities in Section 10 | GTM Phase 2 |
| Early usage | Track Stage 2 checkpoint: repeat usage, check-ins landing well, trust holding under real use | Section 6 |
| Monetization gate | Confirm Stage 3 checkpoint (real retention, real willingness to pay, trust surviving scrutiny) before finalizing the pricing model | Section 3 & 6 |

**Governing rule:** advance because a checkpoint was hit, not because time passed. This table is a sequence to argue with, not a schedule to follow.

---

## 14. Legal / Compliance — Prep for Alaa

_This section is prepared specifically for Alaa (legal) to review and finalize with the founder. It lists the relevant concepts and open questions — not conclusions. Current as of research done August 2026; laws in this area are moving fast and should be re-checked before final sign-off._

### Background context, for orientation
U.ai is an AI companion-style product (persistent memory, emotionally responsive replies, proactive check-ins). This category is now specifically regulated in several US states, and — importantly — several of these laws apply based on **where the user is, not where the company is based**, so being founded in Egypt does not automatically exempt U.ai if any users are in the covered states. Given the GTM plan targets TikTok/Reddit/X broadly, US users (including from California and New York) are likely from day one.

### Topics to walk through with Alaa

1. **Which jurisdictions actually apply, and how**
   - Do California's SB 243 and New York's AI Companion Models Law apply to U.ai given its likely user base, even though the company isn't US-based?
   - Are there other relevant jurisdictions to check (Oregon, Washington, and others are adding similar laws through 2026-2027) or Egypt/MENA-specific regulations to consider?
   - What does GDPR-style exposure look like if any EU users sign up, given optional plugins (email/social) would process personal data?

2. **Required disclosures**
   - What exact wording and placement is needed to clearly disclose that U.ai is AI, not human, inside the product itself (not just in a terms-of-service document)?
   - Does U.ai's specific positioning ("it notices, it checks in, it feels present") raise a higher bar for this disclosure than a typical chatbot, since the whole pitch is about feeling emotionally real?

3. **Crisis / self-harm safety protocol (baseline legal requirement, distinct from the deferred "proactive emotional-trend" feature)**
   - What does a legally adequate self-harm detection and crisis-referral protocol need to include for a v1 launch?
   - What crisis resources/referrals are required or recommended, and do they need to be jurisdiction-specific?
   - Does this need to be publicly documented (a "written protocol," as some state laws require), and if so, what should it say?

4. **Minors and age handling**
   - Given the target audience includes students, some of whom may be under 18: does U.ai need age verification, or is it simpler to explicitly restrict to 18+ during this early validation phase?
   - If minors are permitted at any point, what specific extra protections are required (content restrictions, session limits, different disclosure language)?

5. **Data privacy and the optional plugins**
   - What consent language and data-handling disclosures are needed for the optional email/social plugins specifically, given they involve third-party data (e.g., other people's information appearing in someone's inbox)?
   - What does "the user can revoke access and see exactly what was read" need to look like to be legally sufficient, not just good UX?
   - Does the "we will never sell or monetize user data" commitment (Section 4) need to be formalized anywhere legally binding (privacy policy, terms) to actually hold up?

6. **The zero-knowledge / encryption trust claims**
   - Before the founder-transparency ad (Section 4) goes public, does the specific claim being made ("I can't casually access your data" vs. any stronger claim) need legal review to make sure it's accurately worded and not overstated?

7. **Business entity and structure**
   - Where should U.ai be incorporated, considering the founder is Egypt-based but users and possibly investors may be US-based? (Many startups seeking outside investment incorporate as a Delaware C-corp regardless of founder location — worth Alaa's view on whether that's right here.)
   - What are the implications for taxes, liability, and fundraising depending on the structure chosen?

8. **Foundational documents needed before launch**
   - Terms of Service
   - Privacy Policy (written to actually match the trust story, not generic boilerplate)
   - Any required public safety-protocol documentation per the jurisdictions identified in topic 1

_Status: prepared for Alaa's review — outcomes to be added back into this blueprint once finalized together._

---

_End of current draft. Resume here next session with more business details as needed._
