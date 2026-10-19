**OSTA**

**أوسطى**

Master Reference Report

Market · Business Model · Money · Trust · Product · Technology · Roadmap

_An Egyptian home-services marketplace connecting homeowners_

_with independent craftsmen through open bidding_

**Version 1.0 · 19 September 2026**

Team: Wezza (Technology) · Jana (Technology) · Omar (Data) · Daw (Marketing)

_Confidential — contains sections marked internal_

# **How to read this document**

This is the single consolidated reference for Osta. It gathers everything produced so far — the concept note, the environment and market research, the competitor and technology research, the technical planning report, the live engineering snapshot, the payments implementation guide, and the strategic discussions on growth, hiring, trust and money — into one document that can be read end to end without any other file open.

It is written to serve two readers at once.

| **Reader**                     | **What to read**                                                                      | **What to skip**                 |
| ------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------- |
| An investor or outside partner | Parts I and II in full — market, model, money, trust, product, roadmap, risk.         | Everything marked INTERNAL ONLY. |
| The founding team              | All of it. The internal sections are where the unresolved and the uncomfortable live. | Nothing.                         |

**INTERNAL ONLY — remove this section before sharing outside the team.**

Sections carrying the red bar above are internal: open bugs, unresolved decisions, technical debt, and honest assessments of what is not yet true. Delete those sections before the document leaves the team. Everything else is safe to share.

## **A note on honesty**

Two conventions are used deliberately throughout. First, nothing is described as done because code was written — done means implemented, tested and verified, and where that is not the case the document says so. Second, where a figure comes from desk research rather than our own measurement, the source is named underneath it. Where a number is an assumption, it is labelled as an assumption. There are no invented financial figures anywhere in this document.

# **Contents**

**PART I — THE BUSINESS**

1\. Executive summary

2\. The concept

3\. Market environment

4\. Competitive landscape

5\. The business model

6\. Money: how Osta actually gets paid

7\. Payments infrastructure and the PSP decision

8\. Trust and safety — the real product

9\. Operations, team and hiring

10\. Go-to-market and marketing

11\. Grow it or sell it — the strategic question

12\. Fundraising posture

13\. Legal, regulatory and brand

**PART II — PRODUCT AND TECHNOLOGY**

14\. Product architecture — the three interfaces

15\. Technology stack

16\. Build status as of 19 September 2026

17\. Data model and security architecture

18\. Business rules and state machines

19\. Known defects, gotchas and technical debt

20\. Open decisions register

**PART III — EXECUTION**

21\. Roadmap and timeline

22\. Metrics that matter

23\. Risk register

24\. Immediate next actions

**APPENDICES**

A. Source register

B. Glossary

# **PART I**

<br/>**The Business**

# **1\. Executive summary**

Osta is a two-sided marketplace connecting Egyptian homeowners with independent craftsmen — plumbers, electricians, carpenters, tinsmiths, painters and appliance technicians — through an open bidding model rather than fixed dispatch pricing. A customer describes a job; matching craftsmen submit competing quotes; the customer compares and chooses. The model is closer to inDrive than to a traditional booking app.

## **The opportunity in one paragraph**

Egypt's home services market was valued at roughly \$1.88 billion in 2025 and is projected to reach about \$5.11 billion by 2034, growing at around 11.6% a year, with repair and maintenance the largest and fastest-growing segment. Almost all of that demand is currently served informally — through neighbours, doormen, Facebook groups and word of mouth. The opportunity is not to take share from existing apps, which occupy a small fraction of the market; it is to capture demand that is currently invisible, unregulated and unmeasured.

_Source: Deep Market Insights, Egypt Home Services Market Size & Outlook, 2025–2033._

## **What we have concluded**

| **Question**                           | **Position**                                                                                                                                     | **Confidence**                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| Business model                         | Open bidding marketplace, not a managed workforce. Supply onboards itself, which is the only viable path on a small budget.                      | High — decided                      |
| Payment between customer and craftsman | Cash, documented in the app but not held by it. Under 8% of Egyptian online purchases use a digital wallet at checkout.                          | High — evidence-backed              |
| How Osta earns                         | Prepaid craftsman credits, charged at the moment the customer accepts a quote — not commission reported after the job on the craftsman's honour. | Medium — needs craftsman validation |
| Trust                                  | Human vetting on the ground plus visible in-product signals. Trust is the product, not a feature of it.                                          | High                                |
| First hire                             | A salaried Operations Manager, not an equity-holding COO.                                                                                        | Medium — depends on the person      |
| Grow or sell                           | Build to grow. The exit option stays open at no cost and requires no decision today.                                                             | High                                |
| Launch shape                           | One or two Cairo neighbourhoods, capped craftsman supply, PWA not native app.                                                                    | High — decided                      |

## **Where we actually are**

The platform is further along technically than a pre-launch startup usually is, and further behind commercially. Identity, authentication, KYC verification, admin multi-factor login, audit logging and row-level security are production-quality and heavily tested. The core marketplace loop — post a job, bid on it, select a bid, verify arrival by passcode, mark complete — is now built and verified end to end against a live database. What does not exist: payments of any kind, commission collection, ratings computation, reconciliation, notifications, a deployed production URL, working SMS to real Egyptian phone numbers, and a single real customer.

**The one sentence that matters most**

We have built a great deal of the machine and almost none of the business. The next milestone that changes anything is not a feature — it is the first ten real jobs completed by real craftsmen for real customers who paid real money.

## **The three decisions that most need closing**

1. The commission mechanism (Section 6). Commission-on-honour will not collect. This needs deciding before any payment work starts.
2. The payment service provider (Section 7, decision D-4). Paymob is the front-runner. Everything payment-related is blocked behind it.
3. The production KYC workflow (Section 20, decision D-1). We are running the free, weaker Didit workflow. That is acceptable for testing and not acceptable at launch.

# **2\. The concept**

## **2.1 What Osta is**

Osta — أوسطى, Egyptian Arabic for "master craftsman" — is a marketplace where a homeowner posts a job with photos and a description, craftsmen who match the category and area submit price quotes, and the homeowner compares and selects one. Payment for the work itself happens in cash between the two parties. Osta earns from the craftsman side, not from the customer.

Launch categories: plumbing (سباكة), electrical (كهرباء), carpentry (نجارة) and tinsmithing (سمكرة), with painting, air-conditioning and appliance repair already seeded in the database and ready to enable.

## **2.2 The full intended flow**

| **Step**     | **What happens**                                                                                      | **Built?**       |
| ------------ | ----------------------------------------------------------------------------------------------------- | ---------------- |
| 1\. Post     | Customer posts a job: category, description, photos/video, area, address, urgency, scheduled arrival. | Yes              |
| 2\. Match    | Craftsmen whose categories and areas match see the job in a live feed.                                | Yes              |
| 3\. Bid      | Craftsmen submit a price quote, optionally as a voice note for those who do not read comfortably.     | Yes              |
| 4\. Select   | Customer compares quotes and selects one. All competing quotes are rejected atomically.               | Yes              |
| 5\. Arrive   | A one-time arrival passcode proves the person at the door is the person from the app.                 | Yes              |
| 6\. Complete | Both parties confirm the work done; the server compares their answers independently.                  | Placeholder only |
| 7\. Pay      | Cash between the parties; Osta collects its own fee separately.                                       | No               |
| 8\. Rate     | Two-way rating, one per direction per job, immutable.                                                 | Display only     |
| 9\. Account  | Commission and performance tracking.                                                                  | No               |

## **2.3 Why bidding rather than fixed prices**

Fixed pricing requires knowing what a job costs before anyone has seen it. In Egyptian home repair that is rarely knowable — "the tap is leaking" can be a five-minute washer change or a half-day pipe replacement. Fixed pricing therefore forces either an inspection visit, which is expensive, or a price band wide enough to be meaningless.

Bidding pushes that judgement to the person qualified to make it, and it does something a fixed-price model cannot: it produces price data. Every quote submitted, accepted or rejected teaches us what a job type actually costs in a given neighbourhood. After a few thousand jobs that dataset is more valuable than the app.

The cost of bidding is complexity. It is worth being explicit that no competitor in this market ships a real-time bidding engine: FilKhedma is fixed-price, and El-Herafey resolves price through chat rather than as structured, comparable data. Our bidding flow is a genuine differentiator and simultaneously the highest-risk part of the build.

## **2.4 Constraints we are working inside**

- Effectively zero starting budget. Nothing in the plan may depend on capital we do not have.
- The technical team is not full-time on Osta — there is a parallel product (u.ai) competing for the same hours.
- Demand must be validated before any paid infrastructure or native app development.
- The craftsman side must work for people with low text literacy. This is a design constraint, not an accessibility afterthought.

# **3\. Market environment**

## **3.1 Size and growth**

| **Measure**                           | **Figure**                                       | **Horizon** |
| ------------------------------------- | ------------------------------------------------ | ----------- |
| Egypt home services market            | ~\$1.88 billion                                  | 2025        |
| Egypt home services market, projected | ~\$5.11 billion                                  | 2034        |
| Implied annual growth                 | ~11.6%                                           | 2025–2034   |
| Largest and fastest-growing segment   | Repair and maintenance — exactly Osta's category | —           |
| Global on-demand home services        | \$5.97 billion → \$19.65 billion                 | 2025 → 2033 |

_Source: Deep Market Insights; Technavio Home Services Market Growth Analysis 2026–2030; Straits Research, Online On-Demand Home Services Market Report._

The global figure matters as a directional signal: the shift from informal, word-of-mouth hiring toward app-based booking is accelerating worldwide, not only here. Egypt is a small share of the global market but growing faster than the mature markets that dominate it.

## **3.2 What the numbers do and do not say**

**Read the market figure carefully.**

The \$1.88 billion is the whole home services market — overwhelmingly informal, cash, and untouched by any app. The addressable slice for a bidding marketplace in one or two Cairo neighbourhoods in year one is a rounding error against that number, and any plan that treats the headline figure as a revenue base is not credible.

The correct use of this number is directional: the category is large, growing at double digits, and structurally unorganised. That is what makes it attractive. It is not a forecast.

## **3.3 Digital infrastructure — not a barrier**

| **Indicator**                             | **Figure (early 2026)**                       |
| ----------------------------------------- | --------------------------------------------- |
| Mobile subscriptions                      | ~125.6 million (112.6% penetration)           |
| Active mobile internet subscriptions      | ~94.4 million                                 |
| Overall internet penetration              | ~82.7% (~98.2 million users)                  |
| Smartphone ownership among internet users | over 94%                                      |
| 4G coverage                               | ~98%                                          |
| Mobile data speed                         | Lower half of global rankings — design for it |

_Source: Cairo Scene (Q1 2026); DataReportal, Digital 2026: Egypt; EMarketer/Global Media Intelligence; World Data._

Both sides of the marketplace almost certainly have a capable smartphone and mobile data. This supports the progressive web app approach, and it reinforces the requirement to design for low bandwidth and older devices — particularly on the craftsman side, where the hardware is likely to be older.

## **3.4 Consumer behaviour — research online, pay in cash**

Ministry of Communications survey data shows the share of Egyptian internet users searching online for goods and services rose from about 63.3% to 72.7% between 2019/2020 and the latest survey, and the share actually completing an online purchase rose from about 17.8% to 50.1% over the same period. Cash on delivery nevertheless remains the most common payment method for those transactions.

_Source: Cairo Scene, citing the MCIT Household ICT Survey._

**The implication, stated plainly**

Egyptians research online and pay in cash. That combination argues for heavy investment in online presence, reviews and visible social proof — because people are actively looking before they commit — while keeping the money itself offline. Both halves of that sentence are strategy.

# **4\. Competitive landscape**

## **4.1 Who is in the market**

| **Platform**                             | **Model**                                                                          | **Technology**                                                                           | **Payments**                                                               | **What we learn**                                                                                                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FilKhedma<br><br>(Egypt)                 | Managed, vetted workforce. Fixed pre-set prices, no bidding. App plus call centre. | Native iOS and Android; marketing site historically WordPress/PHP with Angular detected. | Cash or card direct to the technician on completion. No wallet, no escrow. | The funded benchmark. Founded 2014; angel → Algebra Ventures/Glint seed → Cairo Angels bridge; acquired by SweepSouth in 2021. Headline metric to investors was a 75%+ repeat order rate — not downloads. |
| El-Herafey / Herafy<br><br>(Egypt)       | Open marketplace with multi-craftsman comparison and in-app chat and calling.      | Native Android and iOS, typically outsourced small-dev-shop builds.                      | Entirely off-platform. Price agreed in chat, paid in cash.                 | Our closest functional twin — but price lives in a chat thread, not as structured data. Multiple near-identical clones exist regionally, so the base app is not a moat.                                   |
| FLIX / Home Fix /<br><br>Service Booking | Simple fixed-price booking.                                                        | Plain PHP web app on Railway — confirmed live. No native app.                            | Presumed cash on completion.                                               | Direct precedent for our PWA-first instinct: skip app-store friction, ship cheap, iterate.                                                                                                                |
| B8ak — بيتك<br><br>(Saudi/Bahrain)       | Full-range home and beauty services plus an in-app product store, 30-day warranty. | Native apps only, est. 2015, still actively updated as of Jan 2026.                      | In-app booking and payment, warranty-backed.                               | Went to a real funded build only after winning a startup competition and closing a \$2M seed in 2018. Recent user complaints centre on dispute handling — an operational warning, not a technical one.    |

_Source: Public sources — app stores, Crunchbase, ZoomInfo/BuiltWith-style scans, company sites, live URLs. Treat exact tooling as directional._

## **4.2 The two competing philosophies**

The market splits cleanly. The managed-workforce model (FilKhedma) vets, tests and onboards technicians like an in-house team and charges fixed prices. It produces consistent quality and requires significant upfront capital for recruiting and training. The open-marketplace model (El-Herafey) lets supply onboard itself and scales on almost no budget, at the cost of needing a strong trust layer to replace centralised vetting.

Osta follows the open-marketplace model. That is a capital decision as much as a product one — and it means the trust layer is not optional. Everything in Section 8 exists because we chose this model.

## **4.3 The five things this research actually tells us**

1. Nobody over-built at launch. Every serious player started web-first or templated-native and invested in a heavier stack only after demand was proven. This validates our Phase 0 → Phase 1 sequencing.
2. Nobody ships real-time bidding at MVP. Ours would be a genuine differentiator and is the single highest-risk feature in the plan.
3. Everybody keeps payment off-platform. FilKhedma and El-Herafey both still settle in cash years in. Only B8ak — funded, multi-country — has in-app payment. Building in-app payment for MVP would put us ahead of the entire local market and behind on everything that matters.
4. Trust is the asset that got bought. SweepSouth acquired FilKhedma for its "technology and operational expertise", and B8ak's differentiator is a warranty. Neither is a CRUD app.
5. The base app is not defensible. Multiple near-identical Herafy clones from different dev shops prove that post-job-get-quotes-pick-one is easy to build. Our defensibility has to come from the trust layer, the data and retention — not the software.

**The metric that should govern everything**

FilKhedma raised money and eventually sold on a 75%+ repeat order rate. Not downloads, not GMV, not registered craftsmen. From Phase 0 onward, repeat usage is the number we optimise for and the number we report.

# **5\. The business model**

## **5.1 The two sides and what each one wants**

|                   | **Customer**                                                                                   | **Craftsman**                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Wants             | A trustworthy person, a fair price, and not to be cheated or endangered.                       | A steady flow of real jobs without paying for leads that go nowhere.                                    |
| Fears             | A stranger in the home; being overcharged; work done badly with no recourse.                   | Wasted travel; customers who haggle after the work; paying for nothing.                                 |
| What we give them | Verification, visible history, an arrival passcode, a record of the agreed price, a guarantee. | Qualified nearby jobs, a price he sets himself, a rating he can build on, and protection from disputes. |
| What we ask for   | Nothing. The customer never pays Osta.                                                         | A small fee, paid up front as credits, charged when a customer accepts his quote.                       |

## **5.2 Why the customer pays Osta nothing**

It would be technically easy to add a booking fee. It would also be the fastest way to kill adoption in a market where the alternative — asking the doorman for a plumber — is free. The customer's job is to show up, use the platform and come back. Charging the supply side is standard in this category and is what every local comparable does.

This has a second consequence worth naming: because the customer is not a paying party, customer-side growth is pure cost until it produces craftsman-side revenue. Section 22 sets out how we measure that.

## **5.3 Unit economics — the shape, not the numbers**

**The figures below are placeholders for a model, not estimates. Real numbers come from Phase 0.**

The economics of this business reduce to four quantities, and we do not yet know any of them with confidence:

| **Quantity**                 | **Why it decides the business**                                                                                                     | **How we will learn it**                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Average job value            | Determines whether a percentage fee or a flat fee makes sense. At EGP 300 a percentage is not worth collecting; at EGP 1,500 it is. | Phase 0 job log — every quoted and agreed price recorded.     |
| Jobs per craftsman per month | Determines whether a subscription is affordable to him and worthwhile to us.                                                        | Phase 0, then the live platform.                              |
| Repeat rate per customer     | The single number that decides whether this is a business or a lead-generation treadmill.                                           | Tracked from the first job; FilKhedma's 75% is the benchmark. |
| Leakage rate                 | What share of relationships move off-platform after first contact. Directly reduces lifetime value.                                 | Recorded per job from Phase 0 — already in the data schema.   |

Until Phase 0 produces those four numbers, any financial projection is fiction. What we can say structurally is that the model has near-zero marginal cost per job, no inventory, no fleet and no payroll on the supply side — which is why it can work on a small budget, and also why it is easy for someone else to copy.

## **5.4 Revenue lines beyond the core fee**

- Priority placement for top-rated craftsmen — natural, cheap to build, and it reinforces quality rather than undermining it.
- Subscription tiers for craftsmen once volume is real (Section 6).
- An arranged-transport add-on for craftsmen without reliable transport, charged as a small fee or split with the customer.
- Corporate and building-management accounts — invoiced, higher value, better margins, and an entirely different sales motion. Worth exploring in year two.
- Materials and parts — B8ak's in-app store model. Far down the road, and only with real logistics.

# **6\. Money: how Osta actually gets paid**

This is the most consequential unresolved question in the business, and the one most often discussed in the wrong terms. The usual framing — "online payments or cash?" — collapses four different problems into one. They are separate, they have different answers, and only one of them decides whether Osta is a company.

## **6.1 The four money flows**

|     | **Flow**                | **Who pays whom**        | **The actual risk**                                               |
| --- | ----------------------- | ------------------------ | ----------------------------------------------------------------- |
| A   | The work itself         | Customer → Craftsman     | Customer overcharged, or craftsman not paid.                      |
| B   | Osta's revenue          | Craftsman → Osta         | Leakage — we are never paid at all. This is the one that matters. |
| C   | Disputes and guarantees | Osta → the wronged party | We hold no money, so we pay from our own pocket.                  |
| D   | No-shows                | Nobody — time is lost    | Craftsman travels for nothing and blames the platform.            |

## **6.2 Flow A — cash between customer and craftsman**

Cash, at launch and for the foreseeable future. The evidence is unambiguous: fewer than 8% of online purchases in Egypt use a digital wallet at checkout, credit card penetration is under 10% of the population, and cash-based settlement dominates. Every local competitor still settles in cash years into operation. Requiring online payment would lose most customers at the final step, in exchange for solving a problem they do not have.

_Source: EasySellApp (2026); ResearchAndMarkets; competitor observation — see Section 4._

### **Cash does not mean undocumented**

The distinction that matters is between holding the money and recording the transaction. We do not need to hold a single pound to protect both sides. We need evidence, and we already have most of the mechanisms built:

| **Evidence**                            | **What it proves**                                                         | **Status**                |
| --------------------------------------- | -------------------------------------------------------------------------- | ------------------------- |
| Agreed price locked at quote acceptance | What was agreed, when, visible to both, unchangeable afterwards.           | Built                     |
| Arrival passcode                        | That the craftsman arrived, and when.                                      | Built and tested          |
| Before and after photos                 | The condition of the work. Protects the craftsman as much as the customer. | Partly — job media exists |
| Dual-party reconciliation               | What work was actually done, from two independent answers.                 | Specified, not built      |
| Cash-paid confirmation by both parties  | That payment happened — and gives us real transaction volume data.         | Proposed, not built       |

**Recommended addition**

Add a simple two-sided "paid in cash" confirmation. It costs almost nothing to build, closes the evidence chain, and produces a real GMV figure — which is the number an investor will ask for first and which we currently have no way to know.

## **6.3 Flow B — the one that decides everything**

### **The trap in the current plan**

The plan as written in the concept note is: the job finishes, the craftsman reports what it was worth, and he pays a commission through a Fawry or InstaPay link. Consider the actual moment. A plumber has just finished a job and has EGP 800 in cash in his pocket. His phone asks him to declare it and send back EGP 80. Nobody is watching. The customer does not care.

Some will pay, out of decency or to protect their account. Many will not, and they will not refuse openly — they will mark the job cancelled or say the customer changed their mind. We will not even know which revenue we lost. Worse, the honest craftsmen subsidise the dishonest ones, notice, and stop being honest. That is the failure mode of every honour-based commission system.

**Recommendation: do not build commission-on-completion, in any phase. It is not a stepping stone to a better model — it teaches the supply side that not reporting works.**

### **The three real options**

| **Model**                   | **How it works**                                                                                                   | **Leakage risk**                         | **Build effort** | **Verdict**          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ---------------- | -------------------- |
| Commission after completion | Craftsman reports the job value and pays a percentage via a payment link.                                          | Very high — depends entirely on honesty  | Low              | Reject               |
| Prepaid credits             | Craftsman tops up a wallet via Vodafone Cash, InstaPay or a Fawry code. Credits are consumed by platform activity. | None — we are paid before the job exists | Medium           | Recommended          |
| Monthly subscription        | A flat monthly fee for access to leads in his area.                                                                | None                                     | Low              | Later — or as a tier |

### **The refinement that removes the honesty problem entirely**

Within the prepaid model there is a choice: charge per bid submitted, or per job won. Charging per bid is simpler and earns more, but it penalises a craftsman for quoting on work he does not get. Charging per job won is fairer and is what craftsmen will prefer — and it appears to reintroduce the honesty problem, because we would need to know he won.

Except that we do know. The customer accepts the quote inside the application. That moment is a server-side event under our control, not a self-report.

**The recommendation, precisely stated**

Prepaid craftsman credits, deducted automatically at the moment the customer accepts the quote — not at completion, and not on self-declaration.

This is fair to the craftsman (he pays only when he wins work), it is impossible to evade (the charge happens on our server), and it requires no payment licence, no escrow and no handling of customer money. The build is a wallet balance column, a top-up confirmation flow, and a deduction inside the existing atomic quote-selection transaction that is already written.

### **Secondary benefits worth naming**

- It self-regulates bid spam. A craftsman with finite credits chooses which jobs to quote on, which raises quote quality for customers.
- It is a familiar mental model. Topping up to use a service is exactly how Egyptians already treat phone credit.
- It makes revenue predictable and pre-collected, which improves both cash flow and the fundraising story.
- It gives us a natural lever — credit pricing per category or area — without renegotiating anything.

### **The launch sequence**

1. Free for the first 60 to 90 days. Not generosity — it is how the first fifty craftsmen are persuaded to use the app at all.
2. Show the credit cost in the interface from day one, marked as waived, so nothing changes conceptually when charging begins.
3. Switch on charging once craftsmen are receiving real jobs and would miss them if access stopped.
4. Introduce subscription as an alternative for high-volume craftsmen who prefer a predictable monthly cost.

**Open validation item: sit with five to ten craftsmen and test whether prepaying to bid is acceptable. This is an afternoon of work and it de-risks the entire revenue model. The environment research already lists craftsman interviews as an open primary-research item.**

## **6.4 Leakage — the structural leak that never fully closes**

Even with prepaid credits, a real leak remains. A customer and a craftsman meet once through Osta, exchange numbers, and every job for the next three years happens on WhatsApp. We were paid once for a relationship worth twenty jobs. This is the single biggest structural risk in home-services marketplaces and there is no clean fix. There are, however, four honest mitigations:

- Mask phone numbers during the job. This is a safety feature and a commercial one — make exchanging real numbers genuinely inconvenient.
- Make the platform worth more than the shortcut: the guarantee, dispute support, the record of agreed price, the rating history. A customer who values those comes back. One who does not was never going to pay us anyway.
- Price for it. Assume roughly one paid transaction per customer–craftsman pair, not five. If we get more, that is upside rather than a broken model.
- Measure it from job one. The Phase 0 data schema already carries an on-platform / leaked flag. If leakage is 80% we need to know in month three, not year two.

## **6.5 Flow C — disputes, and the cost nobody budgets**

Section 8 recommends a guarantee, and it is the strongest trust signal available to us. It also has a direct cost, and with cash settlement and no escrow there is no held money to draw on — Osta pays from its own pocket.

Budget it explicitly as a dispute fund, with bounds set in advance rather than decided under pressure:

- A small fixed monthly allocation, reviewed monthly.
- A cap per job and a cap per customer per quarter, published in the terms.
- A payout rate that is tracked as an operating metric. Roughly one claim in fifty jobs suggests the model works; one in ten means the vetting is failing, not the guarantee.

A related idea worth holding for later rather than launch: a refundable craftsman security deposit held from his wallet, released when he leaves in good standing and drawn on for damage he caused. It is powerful for trust and gives bad actors something to lose — but it is also a real barrier to signing up craftsmen who have no spare cash, which is most of them at the start.

## **6.6 Flow D — no-shows**

Small but corrosive: the customer books, the craftsman crosses Cairo, nobody is home. He has lost two hours and his transport money, and he blames the platform.

A cancellation fee requires payment rails we do not have. A rating consequence does not. The customer confirms the appointment window in the app; a no-show affects the customer's own rating, which the two-way rating system already supports by design. Craftsmen accept this readily, and it costs nothing to implement.

## **6.7 Summary of the money position**

| **Decision**                  | **Position**                                                                       | **Status**                               |
| ----------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------- |
| Customer pays craftsman       | Cash, documented in-app, not held by Osta.                                         | Decided                                  |
| Osta's revenue                | Prepaid credits deducted at quote acceptance. Free for 60–90 days.                 | Recommended — needs craftsman validation |
| Commission on honour          | Rejected outright.                                                                 | Recommended                              |
| Card / InstaPay for customers | Optional, later, for large jobs and absent customers only.                         | Deferred                                 |
| Escrow                        | Year two at the earliest, and only if card volume justifies the compliance burden. | Deferred                                 |
| Dispute fund                  | A budgeted line item with published caps, from launch.                             | To be sized                              |
| No-show handling              | Rating consequence, not a fee.                                                     | Recommended                              |
| Leakage                       | Mitigate, price for it, and measure it from job one.                               | Ongoing                                  |

# **7\. Payments infrastructure and the PSP decision**

Section 6 concluded that customer-side card payments are not needed at launch. This section covers what we will need when that changes, and what the environment already supports — because the craftsman-to-Osta top-up flow in Section 6.3 does need real payment rails, even though the customer flow does not.

## **7.1 The payments environment**

| **Indicator**                      | **Figure**                                                      |
| ---------------------------------- | --------------------------------------------------------------- |
| Egypt mobile payments market       | ~\$84.9 billion (2025), projected ~\$137.2 billion by 2031      |
| InstaPay transactions              | Crossed 100 million in 2025 (launched by the CBE in 2022)       |
| Telco wallets                      | ~46 million active, processing EGP 943 billion in Q2 2025 alone |
| Fawry                              | 250,000–382,000+ retail agent locations; 35+ million users      |
| Digital wallets at online checkout | Under 8% of online purchases                                    |
| Credit card penetration            | Under 10% of the population                                     |

_Source: Mordor Intelligence; Thunes; XPay (2026); ResearchAndMarkets; EasySellApp (2026)._

**The gap between infrastructure and behaviour**

The rails are excellent and improving fast. Usage for services transactions is not. That gap is the whole argument for our sequencing: build on the rails for the craftsman top-up flow, where a single motivated user tops up occasionally, and leave the customer alone with cash, where friction at checkout costs us the transaction entirely.

## **7.2 What the craftsman top-up flow actually needs**

The prepaid credit model needs the craftsman to be able to move money to us. Three routes, and they are not mutually exclusive:

| **Route**                  | **How it works for the craftsman**                                               | **What we need**                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Fawry code                 | He pays cash at any of hundreds of thousands of kiosks using a reference number. | A Fawry merchant relationship; reference generation and a reconciliation webhook.                     |
| InstaPay / wallet transfer | He transfers from his own bank app or telco wallet.                              | At minimum a receiving account plus manual reconciliation; ideally a PSP that confirms automatically. |
| Card                       | He pays by card through a hosted checkout.                                       | A PSP — see below.                                                                                    |

At the smallest possible scale, a receiving account plus manual reconciliation by the operations manager is viable for the first fifty craftsmen and costs nothing to set up. It does not scale past that, and it should be treated as a deliberate temporary measure with a known replacement date, not as the plan.

## **7.3 The PSP decision (D-4)**

This decision blocks all payment work. The guidance from the payments implementation guide is clear and worth restating:

| **Provider** | **Strength**                                                                            | **Documented capabilities**                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Paymob       | Strongest first choice for a developer-led custom build.                                | Hosted checkout, embedded checkout (Pixel), APIs, mobile SDKs, cards, 3-D Secure, webhooks, card tokenisation and saved cards. |
| Fawry Accept | Best if we also want the wider Fawry ecosystem — relevant given the cash-kiosk network. | Online gateway, card payments, plugins, recurring payments, tokenisation, auth/capture, split payment, reporting.              |
| CIB Pay Now  | A direct bank-acquiring relationship.                                                   | E-commerce gateway for websites and mobile apps; onboarding requires full business and legal documents.                        |

The recommendation is to request commercial and technical proposals from all three rather than choosing on reputation, and to compare on total fees, settlement timing, supported card types, 3-D Secure behaviour, refunds, tokenisation, mobile SDK quality, support, and our specific business category. Section 20 of the payments guide contains the full list of questions to send a provider before signing; Section 19 lists the fee components to ask about, because there is no single universal card fee.

## **7.4 Non-negotiable payment security rules**

If and when we accept cards, the following are not preferences:

- Never ask for or store a card PIN. A PIN is not the credential for an online card purchase. Authentication happens through 3-D Secure — an OTP, a bank app approval or biometrics — inside the issuer's flow, never in a field we control.
- Never store CVV/CVC after authorisation. PCI SSC expressly prohibits it.
- Never trust a browser saying "payment successful". The server-to-server webhook is the source of truth, and its signature must be verified.
- Never build our own card vault. Use the provider's tokenisation for saved cards.
- Recalculate the amount server-side. Never accept an amount from the client.
- Use idempotency so a duplicated webhook cannot charge or fulfil twice.

Using a hosted or provider-controlled embedded checkout materially reduces our PCI DSS scope — but it does not eliminate our responsibility to select a compliant provider, keep the agreements in place and monitor their compliance. The correct question to ask a provider is which SAQ applies to our exact integration.

## **7.5 When escrow becomes worth the trouble**

Escrow — Osta holding the money until the customer confirms completion — is the cleanest possible answer to trust and the cleanest possible commission mechanism. It also means holding money that is legally not ours, which is a regulatory question rather than an engineering one, under the CBE's 2025 licensing rules for payment service providers and operators.

| **Scenario**                                                    | **Escrow worth it?** | **Why**                                                                         |
| --------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------- |
| Small job, EGP 200–600                                          | No                   | Provider fees alone consume the margin, and the friction costs us the customer. |
| Large job, EGP 3,000+                                           | Eventually yes       | Here the customer actively wants protection and will accept a card to get it.   |
| Customer not present (booking for parents, a tenant, an office) | Yes                  | A genuine pain point that cash cannot solve. Small segment, high value.         |
| Corporate / building management                                 | Different product    | Invoice and bank transfer, not escrow. Better margins, different sales motion.  |

Sequence: cash now, card as an option for large jobs later, escrow only once card volume justifies the compliance work. Any marketplace split-payment structure must also be confirmed with the provider and with legal counsel, since it changes the regulatory picture.

# **8\. Trust and safety — the real product**

**The premise of this entire section**

At the start, the ground team is not an expense sitting beside the product. It is the product.

Our application does not do anything a WhatsApp group cannot do. What we are actually selling is one sentence: the person standing in your home has been checked. If that sentence is not true, there is no business here — only an app.

## **8.1 The ground team**

Two or three people whose job is to physically meet every craftsman before approval. This is deliberately manual and deliberately does not scale.

| **Check**                                     | **What it catches**                                   | **Who does it**                      |
| --------------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| Document verification                         | A forged or borrowed national ID.                     | Didit KYC — automated, already built |
| Person matches document                       | Someone using another person's verified identity.     | A human, in person                   |
| Workshop or address exists                    | A craftsman with no fixed base and no accountability. | A human, on site                     |
| Tools are real                                | Someone who is not actually in the trade.             | A human, visually                    |
| Trade questions answered                      | Competence — the thing no document proves.            | A human, in conversation             |
| First one or two jobs shadowed or followed up | Behaviour in a customer's home.                       | A human, by visit or phone call      |

### **Cap supply on purpose**

Fifty craftsmen we trust are worth more than five hundred we do not. Launch in one district — Maadi or Nasr City — not across Cairo. A capped, hand-checked supply is the only way the trust claim is true at the start, and it has a second benefit: a dense supply in a small area produces fast response times, which is what customers actually judge us on.

This approach is replaced later by ratings data, once there is ratings data. It is not a permanent operating model; it is how the first version of trust gets built before the system can build it.

## **8.2 Making the customer feel safe**

**We must never claim 100% safety. Over-promising and then suffering one bad incident is far worse than promising less. What we can deliver is the feeling of control — which is most of what safety actually is.**

| **Mechanism**                                                        | **What it does for the customer**                                                                                                     | **Status**                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Visible verification badge, date, photo, completed-job count, rating | A profile that looks checked is reassuring before anyone is in the house.                                                             | Partly built              |
| Arrival passcode                                                     | The person at the door is provably the person from the app. This is our strongest trust feature and should be marketed, not buried.   | Built and tested          |
| Before and after photos on every job                                 | Protects both sides, and signals that somebody is watching.                                                                           | Partly built              |
| Masked phone numbers                                                 | The customer's real number never reaches the craftsman. This matters enormously for women booking alone — a large part of the market. | Specified, not built      |
| A human on the phone                                                 | A visible WhatsApp number or hotline during the job. People here trust a person answering more than an app.                           | Operational — not a build |
| A guarantee we can honour                                            | For example: if the job is not right within 7 days, we send someone back free. Small, cheap, bounded.                                 | Policy decision           |
| Saying exactly what we check                                         | A short honest page beats the words "trusted and safe". Specificity is what persuades.                                                | Content task              |

### **Why the guarantee is worth its cost**

It is the single most convincing trust signal available to us precisely because it costs us money. Anyone can claim to be careful; only a business that believes its own vetting will offer to pay when it fails. Section 6.5 sets out how to bound it so that it is a budget line rather than an open liability.

## **8.3 What we must not do**

**Do not describe the service as "insured" unless we have actually bought insurance. In Egypt that is a real product with a real cost, and claiming it falsely is the kind of thing that ends a company.**

- Do not imply a rating is live while nothing is computing it. A small "based on completed jobs" caption is enough honesty and costs nothing.
- Do not put a home address or an arrival passcode into a notification. This is already a standing privacy rule in the product spec.
- Do not expose phone numbers, exact addresses, private media, internal notes or payment information where they are not needed.
- Do not let in-app calling reveal either party's real number.

## **8.4 The warning from B8ak**

B8ak has been live for over a decade and its recent user complaints cluster around dispute handling — property damage with no accountability. That is an operational failure, not a technical one, and it is the failure mode most available to us. A dispute workflow in the admin panel is not an administrative nicety; it is the mechanism by which the trust promise is kept when something goes wrong. It should be treated as first-class product work.

# **9\. Operations, team and hiring**

## **9.1 The team today**

| **Person** | **Role**               | **Owns**                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------- |
| Wezza      | Technology — tech lead | Craftsman interface and its endpoints; shared schema; joint owner of the admin panel. |
| Jana       | Technology             | Customer interface and its endpoints; joint owner of the admin panel.                 |
| Omar       | Data                   | Data strategy, metrics, schema discipline, the pricing and leakage dataset.           |
| Daw        | Marketing              | Trust-building, growth, positioning, launch channel strategy, craftsman recruitment.  |

Because the customer and craftsman applications write to the same core tables, the schema and API contract must be agreed jointly before work splits — otherwise the two builds drift apart. This has been the working convention and should stay one.

## **9.2 COO or Operations Manager?**

These are different jobs and the difference is expensive.

|         | **Chief Operating Officer**                                          | **Operations Manager**                                                             |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Level   | Co-founder level.                                                    | Senior salaried hire.                                                              |
| Expects | Equity, a voice in strategy, and a business that is already running. | A salary and a clear remit.                                                        |
| Does    | Builds and runs the whole operating function across cities.          | Chases craftsmen, handles complaints, manages the ground team, keeps supply alive. |
| Costs   | Typically 5–15% of the company.                                      | A monthly salary. No dilution.                                                     |

**Recommendation**

Hire the Operations Manager now. Hire a COO only when there are two or three cities and the founders can no longer hold the operation together personally. Giving away a material share of the company to solve "somebody needs to follow up" is an expensive way to solve follow-up.

The exception is a specific person: someone who would genuinely carry the business, who knows the Egyptian informal-labour world from the inside, and whom we would trust with the company. For that person, COO is the right call — with proper vesting, four years with a one-year cliff. The value is in the person, not the title.

**Non-negotiable either way: whoever takes the role must be full-time on Osta. Parts of the founding team have other commitments; the operation cannot also be part-time, or it will simply not happen.**

## **9.3 What the operations function actually does at launch**

- Recruit and vet craftsmen — the ground team of Section 8.1 reports here.
- Answer the phone. A visible human during a job is a trust mechanism, and at launch it is also our best source of product feedback.
- Chase the loop: a job posted with no bids, a craftsman who stopped responding, a customer who did not come back. At small volume this is manual and it is what keeps the marketplace alive.
- Handle disputes against the published guarantee, and record every one.
- Reconcile craftsman top-ups manually until the PSP integration replaces that (Section 7.2).
- Feed Omar's dataset: every job outcome, every leak, every price.

## **9.4 Company formation**

Registration runs through GAFI. Indicative reported costs for a small entity: state registration roughly \$100–\$300, LLC minimum capital often around \$1,000+, legal and consultancy support \$500–\$1,500, and annual license fees in the \$100–\$500 range depending on activity type.

_Source: USE Multiplier, Registering a Company in Egypt: Employers Guide 2026; Remitly, Doing Business in Egypt 2026._

This matters on two timelines. A registered entity is a prerequisite for any PSP or acquiring relationship, and it is normally a prerequisite for an investor to put money in. It is not a prerequisite for Phase 0.

# **10\. Go-to-market and marketing**

## **10.1 The channel picture**

| **Platform**                 | **Egyptian reach (mid-2026)**                                                           | **Priority for Osta**                     |
| ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------- |
| Facebook                     | ~61–63 million users (51–53% of the population), skewed male (~58%), concentrated 25–34 | Primary — paid and organic                |
| Facebook Groups specifically | Already the default channel for informal neighbourhood service recommendations          | Primary — organic, highest intent         |
| Instagram                    | ~23.5–24 million (~20%)                                                                 | Secondary                                 |
| LinkedIn                     | ~18 million                                                                             | Low — except for corporate accounts later |

_Source: NapoleonCat, Social Media Users in Egypt, June–July 2026; DataReportal, Digital 2026: Egypt._

Egypt is also an unusually cheap market to advertise in regionally: reported CPMs of \$1.50–\$3.00 against \$8–\$15 in Saudi Arabia, with Facebook and TikTok acquisition costs reported 60–70% below Gulf equivalents. A hyper-local launch across one or two neighbourhoods does not need a large budget to achieve meaningful reach.

_Source: EasySellApp (2026)._

## **10.2 The strategy**

1. Retention over acquisition. FilKhedma's investor case was a 75%+ repeat order rate. Optimise and report on repeat usage from Phase 0 onward, not downloads.
2. Lead with social proof, not discounts. Real before-and-after photos and real ratings. Discounts buy a first job from someone who will not return; proof buys trust from someone who will.
3. Hyper-local launch. One or two neighbourhoods, to control early quality and build word of mouth before scaling. This is the same discipline as capping supply, applied to demand.
4. A referral programme from day one. A discount on a first job for both referrer and referee. In a category driven by neighbourhood recommendation, this is the mechanism the market already uses.
5. Recruit supply personally before advertising demand. An empty marketplace that receives customers is worse than no marketplace — it burns the impression once.

## **10.3 Budget posture**

No committed number has been set, and this needs sizing. The shape recommended is a small fixed monthly paid-ads test budget from soft launch onward in the chosen neighbourhoods, iterated on, rather than a single large upfront spend — consistent with the validate-before-scaling pattern used throughout this plan. Two questions need answering together: the rough monthly number for the first two to three months post-launch, and whether it comes from an angel round or from team funds before any raise closes. The second question determines how urgent the investor conversation in Section 12 really is.

# **11\. Grow it or sell it — the strategic question**

## **11.1 The short answer**

We do not have to choose today, and acting as though we do will hurt us. The things that make Osta worth buying are exactly the things that make it worth keeping: customers who come back, craftsmen who stay, clean data, and revenue that is actually collected. Nobody buys a marketplace for its code — FilKhedma was bought for its technology and operational expertise together, and its headline number was retention.

## **11.2 What this means in practice**

- From now until roughly year two: build to grow. Nothing is lost by doing so. Every unit of trust built is an asset under either strategy.
- The sell decision arrives when somebody knocks — a regional player entering Egypt, a large maintenance or real-estate company wanting the craftsman network, or a competitor.
- One thing genuinely does depend on the answer, and it should be settled now: how we take money. Building to sell fast means raising large, spending fast, growing untidily and exiting. Building to keep means moving slower, diluting less, and reaching profitability district by district.

**Given the size of the team and that not everyone is full-time, the second path is substantially more realistic — and it still ends in an acquisition if one comes.**

## **11.3 The uncomfortable part**

**There is nothing to sell at "finished".**

A half-built marketplace with zero transactions is worth roughly what it costs to rebuild — which is very little, particularly given that multiple near-identical Herafy clones already demonstrate the base application is easy to build.

Value appears only after the first few thousand completed jobs, because that is when the data, the retention curve and the craftsman network become real. That part cannot be skipped, and no buyer will permit skipping it.

# **12\. Fundraising posture**

## **12.1 Timing, against our own comparables**

Both of the closest comparables raised after validation existed, not before. FilKhedma raised having established a real repeat-order metric. B8ak went to a funded build only after winning a startup competition and closing a \$2M seed in 2018. Approaching investors before our own Phase 0 checkpoint means arriving with no usage data at all.

The recommendation is to start informal conversations now — they take time and cost nothing — while holding the formal ask until there is real data to show: job volume, price data, repeat-contact rate, and the leakage number.

## **12.2 What we would be raising for**

The ask currently mixes two different uses, and separating them matters:

| **Use**                                  | **Is it actually blocked on money?**                                | **What money would buy**                                                          |
| ---------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| MVP product build                        | No. Phase 1 is scoped as a lean build the current team can execute. | Speed — hiring help, or the technical team going full-time off other commitments. |
| Marketing and launch spend               | Yes. There is no internal budget line for it at all.                | The actual bottleneck.                                                            |
| Ground operations and the first ops hire | Yes.                                                                | The trust layer of Section 8, which is the product.                               |

An ask tied to a specific milestone — funds the Phase 1 build plus 90 days of hyper-local marketing and ground operations in one or two neighbourhoods — is easier to raise and cheaper on dilution than an open-ended growth ask.

## **12.3 What a serious investor will ask for that we do not yet have**

- GMV, or any measure of transaction value flowing through the platform. Section 6.2 proposes the cash-confirmation mechanism that would produce it.
- Repeat rate. Nothing currently computes it.
- Craftsman retention and activity — how many are active weekly, not how many registered.
- Leakage rate, which is the honest version of lifetime value in this category.
- A collected-revenue figure, not a theoretical commission rate.

**Every item on that list is a Phase 0 and early Phase 1 measurement task, not a fundraising task. Building the ability to answer them is the real preparation for a raise.**

# **13\. Legal, regulatory and brand**

## **13.1 The regulatory precedent that matters**

Egypt has no dedicated law for home-services marketplaces. The closest precedent is Law No. 87 of 2018, created specifically to regulate ride-hailing applications after a dispute with traditional taxi drivers. It required platforms to obtain an operating licence — reportedly around EGP 30 million for five years — and required individual drivers to pay an annual licensing fee and submit to background checks and vehicle inspections.

_Source: Oxford Business Group; Research and Markets, Egypt Ride-Hailing & Shared Mobility Market; Fairwork, Egypt Joins the Fairwork Project._

**What this tells us**

There is real precedent for the Egyptian state regulating app-based labour platforms once they reach meaningful scale — typically triggered by pressure from the informal sector being disrupted. For us that pressure would plausibly come from craftsmen's associations, or from complaints about unlicensed or unsafe electrical and plumbing work.

This is not an immediate concern at MVP stage. It should be tracked as we scale, and legal counsel should be engaged before any large funding round or national expansion. Do not over-invest in legal structure prematurely; do not pretend the risk is absent.

## **13.2 Payment regulation**

The Central Bank of Egypt issued licensing and registration rules for Payment System Operators and Payment Service Providers in June 2025, under the Central Bank and Banking System Law No. 194 of 2020. For an ordinary merchant the practical implication is favourable: we do not need to become a payment institution to sell our own services online. We contract with an appropriate bank or provider and satisfy their merchant onboarding, KYC, commercial-registration, tax, settlement and compliance requirements.

This changes if we hold money on behalf of others — which is exactly what escrow and marketplace split-payouts mean. That is the regulatory reason, beyond the commercial one, that escrow is deferred.

**This document is not legal advice. Before going live with any payment flow, the business model, entity structure, service category, currency, cross-border exposure, refund policy and data-processing arrangements must be confirmed with Egyptian legal and compliance counsel and with the chosen provider.**

## **13.3 The brand name — an open item**

Egypt's trademark system operates under Law No. 82 of 2002, administered by the Egyptian Trademarks and Industrial Designs Office, with Egypt participating in the Madrid Protocol. The filing fee is reported at around EGP 100 per class, with formal examination and a distinctiveness and prior-mark search before publication in the Trademark Gazette.

A definitive check of whether "Osta" is already registered in a conflicting class was not possible through general web search — both the Egyptian Trademarks Office database and the WIPO Global Brand Database require a structured search.

**Action: run a formal name search through the Egyptian Trademarks Office or a local IP agent before public launch or any meaningful marketing spend, in parallel with checking domain and social handle availability. Low cost, low effort, and renaming after brand investment is far more expensive than checking now.**

# **PART II**

<br/>**Product and Technology**

# **14\. Product architecture — the three interfaces**

Osta is three distinct products sharing one database. Treating them as one product with three skins has been explicitly rejected, because the craftsman interface has a design constraint the other two do not.

| **Interface** | **Language**                                          | **Design posture**                                                                       | **Owner**              |
| ------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- |
| Customer      | Bilingual — Arabic RTL and English LTR, with a toggle | Rich. Filtering, comparison, history, referrals.                                         | Jana                   |
| Craftsman     | Arabic only, no toggle                                | Minimal. Large tap targets, icon-led, minimal text, voice-note and read-aloud fallbacks. | Wezza                  |
| Admin         | English today; bilingual is the stated target         | Dense operational tooling.                                                               | Wezza and Jana jointly |

## **14.1 Why the craftsman interface is Arabic-only and minimal**

This is a low text-literacy accommodation, not a shortcut. A meaningful share of independent craftsmen in Egypt do not read comfortably. Three concrete consequences follow, and all three are already built or committed:

- Read-aloud on job descriptions — text-to-speech reading the Arabic description, so a craftsman can understand a job without reading it.
- Voice-note quotes — a craftsman can record a spoken quote instead of typing, feeding the same submission endpoint as a numeric price. This was shipped after being found recorded but silently discarded.
- Icon-led navigation with large tap targets and minimal text throughout.

FilKhedma reached the same conclusion from the other direction: it runs a call centre alongside its app as a deliberate low-tech-literacy channel. The accommodation is not optional in this market.

## **14.2 Feature inventory by interface**

### **Customer**

Language toggle; job posting with photo, video, description and area; category browsing; craftsman profile view with ratings and past work; general broadcast request; bid comparison by price, rating and reviews; craftsman selection; two-way rating; job history; search and filters; referral programme; commission or payment view; notifications.

### **Craftsman**

Profile setup with categories and photos; live job feed of nearby matching requests; quick numeric bid entry; voice-note quote option; WhatsApp/SMS alerts for new jobs; job status tracker; two-way rating of the customer; payment and credit view; portfolio upload; icon-based navigation.

### **Admin — the company's operating system, not a moderation tool**

Connection tracker linking customer, craftsman and job; craftsman verification approve/reject; user management; full job activity log; category management; dispute flagging and resolution; commission and payment status; the data dashboard covering pricing, leakage and demand; manual override to reassign or cancel; content moderation; help centre; support ticket routing; contact log.

**Only a fraction of the admin list above exists today. See Section 16.**

# **15\. Technology stack**

| **Layer**            | **Choice**                                                    | **Note**                                                                                                |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Framework            | Next.js 16.3.4, App Router, Turbopack                         | Middleware is named proxy.ts in Next 16, not middleware.ts                                              |
| Language             | TypeScript, strict                                            |                                                                                                         |
| UI library           | React 19.2.8                                                  |                                                                                                         |
| Backend              | Supabase — Postgres, Auth, Storage, Realtime                  | Free tier covers MVP scale; a real relational DB from day one                                           |
| Internationalisation | next-intl 4.x, messages/{ar,en}.json                          | Admin is deliberately outside next-intl                                                                 |
| Validation           | Hand-written pure validators                                  | zod is installed but not the pattern in use — pure validators import cleanly into both routes and tests |
| Styling              | Vanilla CSS plus inline style objects                         | No Tailwind, no CSS-in-JS. Design tokens live in globals.css                                            |
| Testing              | Vitest 4 with React Testing Library, jsdom                    |                                                                                                         |
| KYC vendor           | Didit                                                         | Server-mediated, not the vendor browser SDK                                                             |
| Object storage       | Supabase Storage (MinIO supported in code, never provisioned) | See decision D-3                                                                                        |
| Admin MFA            | otplib 13 — TOTP with encrypted secrets at rest               |                                                                                                         |
| PWA                  | Hand-rolled manifest.json and service worker                  | next-pwa is NOT installed                                                                               |
| Deployment target    | Vercel                                                        | Not yet deployed — see Section 16                                                                       |

There is no client state library. React local state plus server components only — Zustand is not installed, despite older documentation implying otherwise.

## **15.1 The design system**

Three colours with three specific jobs, defined once as CSS custom properties and never hardcoded on a screen:

| **Colour** | **Reserved for**                                                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Emerald    | Primary brand colour — primary actions, active navigation, links.                                                                                                                                  |
| Gold       | Premium, success and confirmation — success states, ratings, earnings, completed statuses.                                                                                                         |
| Royal blue | Only moments when the app is reading or deciding something on its own — ID scanning, the OCR-confirm screen, the read-aloud control, chatbot bubbles. Appearing anywhere else is a sign of misuse. |
| Off-white  | The light-mode base — deliberately not stark white.                                                                                                                                                |

Typography: Cairo for Arabic headings, Almarai for Arabic body (rounded, legible at small sizes — the craftsman accommodation depends on this as much as on layout), Plus Jakarta Sans for Latin headings, Work Sans for Latin body. Motion marks real state changes only, and everything respects prefers-reduced-motion.

## **15.2 Why a progressive web app rather than native**

| **Reason**                    | **Detail**                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| No app-store cost or friction | Google Play \$25 one-off; Apple \$99/year plus review delay on every change.                           |
| Instant updates               | No forced user update cycle — critical while iterating weekly.                                         |
| Zero download friction        | A link, not an install decision for an unproven product.                                               |
| Lower device requirements     | Relevant for older, lower-spec phones on the craftsman side.                                           |
| Precedent                     | FLIX runs as a plain web app on cheap hosting; FilKhedma went native only after institutional funding. |

The trade-offs are real and planned around: push notifications are weaker and inconsistent on iOS, supplemented with WhatsApp or SMS alerts; GPS and camera access are less smooth than native, acceptable at MVP; and some users trust a "real app" more than a website — a growth-stage problem, not an MVP one. Native apps follow once demand is validated and revenue or funding exists, mirroring FilKhedma's own trajectory.

# **16\. Build status as of 19 September 2026**

**INTERNAL ONLY — remove this section before sharing outside the team.**

This section is the honest engineering position. It supersedes the FULL_CONTEXT snapshot dated 17 September, which predates the last two build rounds.

## **16.1 Headline state**

| **Measure**            | **Value**                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| Test suite             | 932 tests across 34 files, all passing                            |
| Type-check and lint    | Clean — 0 errors                                                  |
| Migrations             | Through ...0018, all applied to the live remote project, no drift |
| Database               | Live Supabase cloud project                                       |
| Deployed environment   | NONE. No Vercel project, no staging, no production                |
| Continuous integration | NONE. No GitHub Actions, no pre-commit hooks                      |
| Real users             | Zero                                                              |

## **16.2 What is genuinely done**

| **Area**                                     | **State**                                                                                                                               |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Identity, phone-OTP authentication, sessions | Production quality, heavily tested                                                                                                      |
| One account = one role                       | Enforced at the database level by triggers that fire even for the service role — a real invariant, not a convention                     |
| Craftsman KYC via Didit                      | Server-mediated, HMAC-verified webhooks, idempotent, with an outbound-poll fallback                                                     |
| ID archive and retention policy              | Implemented: 90 days for rejected/abandoned, account lifetime for approved, 30 days after deactivation overriding both                  |
| Admin login                                  | Email, password and mandatory TOTP. No session exists until the second factor verifies. MFA cannot be switched off — blocked by trigger |
| Audit logging                                | Append-only by application convention, with a read-only viewer UI                                                                       |
| Row-level security                           | Enabled on every table, with live integration tests proving denial                                                                      |
| Job posting and discovery                    | Built, including the craftsman live feed with read-aloud                                                                                |
| Bidding                                      | Built, including voice-note quotes                                                                                                      |
| Quote selection and assignment               | Built and atomic — a concurrency test proves exactly one of two simultaneous selections wins                                            |
| Arrival passcode                             | Built. Hash-only, show-once with regenerate, arrival-anchored expiry, brute-force lockout that regeneration cannot bypass               |
| Completion                                   | A simple "mark complete" placeholder — real reconciliation is not built                                                                 |
| Support tickets                              | Craftsman-side submission built, with RLS                                                                                               |

## **16.3 What does not exist**

| **Missing**                               | **Consequence**                                                                               | **Blocked by**                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Payments and commissions of any kind      | No revenue mechanism exists in the product at all.                                            | D-4 (PSP) and the Section 6 model decision |
| Dual-party reconciliation                 | Completion is a single button, so there is no dispute-proof record of what was done.          | Empty price catalogue — no seed data       |
| Ratings computation and performance tiers | Ratings display exists; nothing computes the number behind it.                                | Depends on reconciliation                  |
| Notifications — push, WhatsApp or SMS     | Craftsmen have no reason to open the app, which is fatal to a live feed.                      | D-7 — WhatsApp Business API vs Twilio SMS  |
| A deployed production URL                 | Nothing can be tested by anyone outside a developer machine.                                  | Nothing — this is simply undone            |
| Working SMS to real Egyptian numbers      | Real users cannot log in. Only the Supabase test number works, and it expires 1 January 2027. | Twilio credentials never configured        |
| Admin panel beyond verification and audit | The operations team has no tooling.                                                           | In progress — workstream 07                |
| Masked phone numbers                      | A committed trust and anti-leakage feature that does not exist.                               | Not scheduled                              |
| Price catalogue data                      | The table exists and is empty. Reconciliation cannot be built without it.                     | Needs Phase 0 pricing data                 |

**The single most urgent gap**

Notifications. A craftsman job feed that nobody is told about is a feed nobody reads. Every other missing item can wait a sprint; this one determines whether the marketplace functions at all once real jobs start arriving.

# **17\. Data model and security architecture**

**INTERNAL ONLY — remove this section before sharing outside the team.**

## **17.1 Core tables**

| **Table**                   | **Holds**                                                                                                   | **Notable**                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| users                       | Customer profiles — phone (unique), name, area, language preference, rating average                         | Rating is 0–10, not 0–5                                                             |
| craftsmen                   | Craftsman profiles — phone, name, category UUIDs, areas, photos, rating, completed jobs, verification flags | Cannot self-approve: the insert policy blocks setting verified_flag                 |
| categories                  | The six seeded trades, with stable slugs                                                                    | Category IDs are UUIDs — never hardcode one                                         |
| price_catalog               | Service names, base prices, labour durations                                                                | EMPTY — no seed data                                                                |
| jobs                        | The job — description, media, address, area, status, assignment, scheduled arrival, passcode hash           | Passcode is bcrypt-hashed only; the reversible copy was deliberately removed        |
| quotes                      | One bid — price, message, voice note path, status                                                           | UNIQUE (job_id, craftsman_id): one bid per craftsman per job                        |
| ratings                     | Two-way scores 1–10 with comments                                                                           | UNIQUE (job_id, direction) — duplicate prevention is structural, not code           |
| commissions                 | Agreed price, commission amount, method, link, provider transaction, status                                 | Schema exists; no application code touches it                                       |
| reconciliation_selections   | Each party's independent list of completed services                                                         | Immutable by construction — no UPDATE or DELETE policy exists at all                |
| audit_log                   | Append-only record of who did what                                                                          | No client policies whatsoever — unreachable from any browser                        |
| support_tickets             | Craftsman-raised issues                                                                                     | Insert and select own only; no client update or delete                              |
| admins + admin_\*           | Admin accounts, TOTP secrets, backup codes, sessions, login attempts                                        | No client policies; service-role access only                                        |
| craftsman_kyc_verifications | Vendor session, status, decisions, review trail                                                             | Deny-all to clients — a session ID is a key into the vendor's copy of a national ID |
| craftsman_id_archives       | Osta's own copy of submitted ID images                                                                      | Deny-all. Stores an opaque object key only — never a URL, never bytes               |

## **17.2 The security posture, in plain language**

- Row-level security is enabled on every table, and live integration tests prove denial rather than assuming it.
- Identity always comes from the session, never from a request body.
- All business logic is server-side. The frontend is never the authority for prices, commissions, job status, ratings or eligibility.
- Craftsman verification has two independent gates — the vendor decision and a human admin decision — and the verified flag additionally requires both at the database-trigger level. A suspension overrides everything.
- The reconciliation design is deliberately paranoid: two separately stored rows compared by the server. The frontend can never tell the backend that both sides agreed.
- ID documents are never referenced from any table a customer can read. This is why verification lives in its own deny-all tables.
- Every secret is scanned for in the test suite by name and by value, and adding a new environment variable fails the build until it is classified as secret or public-by-design.

## **17.3 Privacy rules that bind the product**

- Minimise collection. The OCR-confirm screen displays ID fields transiently from the vendor payload and adds no new persisted personal-data columns.
- Never expose phone numbers, exact addresses, private media, internal notes or payment information unnecessarily.
- Notifications must never carry a home address or an arrival passcode.
- In-app calling must not reveal either party's real number.

# **18\. Business rules and state machines**

## **18.1 Job lifecycle**

open → quoted → assigned → in_progress → reconciliation → payment_pending → completed, with disputed branching off reconciliation and cancelled reachable from any state.

Everything up to completed is now reachable in the built product, with reconciliation and payment_pending standing in as a single completion action until workstream 04 replaces them.

## **18.2 Quote selection — why it must be atomic**

On selection the server must, as one indivisible operation: verify the job is still open, verify the quote belongs to it, verify the craftsman is eligible, set the job to assigned with the craftsman attached, mark the quote accepted, reject every competing quote, and generate the arrival passcode. Two simultaneous selections must not both succeed.

This is implemented as a row-locked Postgres transaction rather than a sequence of client calls, and a concurrency test fires two simultaneous selections and asserts exactly one wins with the other receiving a clean already-assigned error. This is also where the credit deduction of Section 6.3 belongs when it is built — inside the same transaction.

## **18.3 Arrival passcode**

| **Property**    | **Rule**                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Storage         | Bcrypt hash only. The reversible encrypted copy was removed entirely, so no previously issued passcode remains recoverable.                              |
| Display         | Shown once at generation with a clear warning. Regeneration invalidates the old code and issues a new one — a password reset, never a password recovery. |
| Validity window | Anchored to scheduled arrival, plus or minus two hours, computed inside the same row-locked transaction.                                                 |
| Lower bound     | Added deliberately: without it a craftsman assigned next week's job could verify today from home, and the code would stop meaning "arrival".             |
| Wording         | Too-early is worded as "too early", not "wrong code", so a craftsman does not burn a regenerate.                                                         |
| Lockout         | Brute-force lockout per job. Regenerating does not clear an active lockout — otherwise it would be a lockout-bypass amplifier.                           |
| Never           | Never logged, never in a URL, never exposed to admins, never in a notification.                                                                          |

**Open product question: passcode direction. Today the craftsman enters the code. The alternative is the homeowner confirming on their own screen. This is an unresolved product call, not a technical one.**

## **18.4 Ratings and performance tiers — specified, not built**

Scores run 1–10 in both directions, only between parties to a completed job, immutable, one per direction per job enforced by the database.

| **Tier**        | **Monthly criterion**              | **Consequence**                               |
| --------------- | ---------------------------------- | --------------------------------------------- |
| Top             | Score above 7 more than four times | Priority in search and matching; bonus payout |
| Standard        | Consistently 5–7                   | Normal                                        |
| Underperforming | Score below 5 more than four times | Demoted, reduced allocation, admin review     |

**The monetary bonus amount is decision D-6 and is deliberately unresolved. No financial formula should be invented for it.**

Note also the display convention already shipped: the 0–10 average is rendered as a five-star display by halving it, with a "based on completed jobs" caption so nothing implies a live number while no computation exists.

## **18.5 Reconciliation — specified, not built**

Both parties independently select the services completed from a price-catalogue-derived checklist. The server compares two separately stored rows. Identical means reconciled and payment may proceed; different means disputed, payment blocked, support escalation. Neither party may see the other's selection before submitting, and editing a price-catalogue row must never retroactively change what a past job reconciled to.

## **18.6 Commissions — specified, not built**

Calculated server-side only, and only after completion and successful reconciliation. Cash tips are permitted and deliberately not tracked. Section 6 argues that this design should be superseded by prepaid credits charged at quote acceptance, which is both simpler and structurally collectible.

# **19\. Known defects, gotchas and technical debt**

**INTERNAL ONLY — remove this section before sharing outside the team.**

This project has a documented history of bugs that were invisible to both code review and the test suite and were found only by opening a browser. That is why visual verification is a standing convention, and why this list exists.

## **19.1 Platform traps that will waste hours**

| **Trap**                                                   | **Symptom**                                                                                                                                      | **Cause**                                                                                                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Service worker serves stale client code in development     | The page looks updated, the server log shows the new response, the browser runs the previous client branch. Nothing in the console indicates it. | The hand-rolled service worker caches the client bundle while server HTML stays fresh. Unregister the worker and clear caches — a hard reload alone is not always enough. |
| HSTS latches Chrome onto <https://localhost>               | Every <http://localhost> navigation is rewritten to https, and fails with ERR_FAILED rather than a 404.                                          | HSTS sent over plain HTTP is cached for two years. Now production-only. Invisible to curl, fetch and the test suite.                                                      |
| 127.0.0.1 is a different origin from localhost             | HTML paints, inputs accept typing, no state updates, every button inert — with no browser console error.                                         | Next.js blocks the HMR endpoint, the Turbopack runtime never bootstraps and React never hydrates. The warning goes only to the dev log file.                              |
| Hydration mismatch makes submit buttons silently inert     | Clicking does literally nothing, no error.                                                                                                       | A disabled attribute computed differently on server and client. Both login forms use a hydration-safe hook.                                                               |
| next-intl redirects POST /api/... into a nonexistent route | A confusing JSON parse error from a 404 HTML page.                                                                                               | Without the bypass in proxy.ts, an un-prefixed POST is 307'd to a locale-prefixed API path with no handler.                                                               |
| Camera denied in the KYC modal                             | Verification fails with cameraAccessDenied.                                                                                                      | The site-wide permissions policy has an empty camera allowlist, which denies even self. A scoped override delegates to the vendor domain.                                 |
| Didit HTTP 400 that looks like a bad payload               | Every KYC session fails with what reads as a malformed request.                                                                                  | It is an empty vendor balance — "not enough credits". This already cost one full debugging session.                                                                       |

## **19.2 Real debt to pay down**

- Append-only audit logging is an application convention, not a database guarantee. No client can reach the table, and no code mutates it — a test asserts this — but the service-role key can delete rows and nothing in the schema prevents it. Either add a before-delete-or-update trigger or stop describing it as append-only.
- Two routes in the protected-route list do not exist (craftsman jobs and craftsman bids).
- The environment file defines the app URL twice, the second with a leading space. The later definition usually wins — a latent wrong-redirect trap.
- Orphaned voice-note files remain if a bid fails after upload. Belongs with the bidding workstream cleanup.
- There is no rate limit on passcode regeneration itself. Bounded in practice, since it only churns the requester's own code.
- There is no admin-audited override path for a stuck passcode, and lockout is per-job only.
- MinIO is the code default for the ID archive but has never been provisioned; only Supabase Storage has been exercised. See D-3.
- The retention purge is implemented and runnable but nothing schedules it. A Vercel cron entry is the intended fix and requires the deployment that does not yet exist.

## **19.3 Two bugs found in passing, worth noting as a pattern**

During the last fix-up round, two defects surfaced that nobody was looking for: the jobs listing endpoint had been silently broken since an earlier migration because an unguarded select hit a column-level revoke — invisible because nothing called it — and a server-only module carrying the service-role client was leaking into the client bundle through one shared helper import.

**The lesson worth institutionalising**

Both were found because someone verified rather than assumed. The project convention — never mark something done because code was written, and say what proved it — is earning its keep. Keep it.

# **20\. Open decisions register**

**INTERNAL ONLY — remove this section before sharing outside the team.**

## **20.1 Technical decisions**

| **#** | **Decision**                     | **State**                                                                                                                                                                  | **Blocks**                                                   |
| ----- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| D-1   | Production KYC workflow          | Decided for now: stay on the free Didit workflow. It is a weaker, simpler check set. Still blocking before real launch.                                                    | Launch credibility                                           |
| D-2   | ID archive retention             | Resolved and implemented. Cron not yet scheduled.                                                                                                                          | Nothing                                                      |
| D-3   | Production archive backend       | Open. MinIO is the code default and was never provisioned; Supabase Storage is what has been exercised. Setting Supabase for the first deploy is the pragmatic resolution. | Deployment                                                   |
| D-4   | Payment service provider         | Open. Paymob is the front-runner. Proposals should be requested from Paymob, Fawry Accept and CIB.                                                                         | All payment work                                             |
| D-5   | Acceptance rules beyond identity | Open. The extension point is built and deliberately empty.                                                                                                                 | Nothing yet                                                  |
| D-6   | Top-performer bonus amount       | Open. Fixed fee or percentage. No financial formula is to be invented.                                                                                                     | Ratings tiers                                                |
| D-7   | Notification channel             | Open. WhatsApp Business API versus Twilio SMS. WhatsApp has stricter approval and cost overhead; Twilio is faster to stand up but costs per message.                       | The whole notification layer — currently the most urgent gap |
| D-8   | Continuous integration           | Open. The remote exists; GitHub Actions is not configured.                                                                                                                 | Release confidence                                           |
| D-9   | One role per account             | Resolved. Mutually exclusive and database-enforced.                                                                                                                        | Nothing                                                      |

## **20.2 Business decisions still open**

| **Decision**                                     | **Position in this document**                                 | **Needs**                                                   |
| ------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Commission mechanism                             | Prepaid credits at quote acceptance (Section 6.3)             | Craftsman validation interviews, then a build decision      |
| Credit or subscription pricing                   | Not set — depends on average job value                        | Phase 0 price data                                          |
| Guarantee terms and dispute fund size            | Recommended with caps (Sections 6.5, 8.2)                     | A number the team commits to                                |
| Operations hire — manager or COO                 | Operations Manager now (Section 9.2)                          | A decision, and a candidate                                 |
| Launch neighbourhoods                            | One or two, not city-wide                                     | Selection — this has been open since the first concept note |
| Whether small maintenance companies may register | Deferred to a later phase                                     | A decision when supply quality is understood                |
| Marketing budget                                 | A small fixed monthly test budget                             | A number, and a source for it                               |
| Passcode direction                               | Craftsman enters today; homeowner-confirms is the alternative | A product call                                              |
| Trademark clearance for "Osta"                   | Unresolved — requires a structured search                     | An IP agent or a direct office search                       |

# **PART III**

<br/>**Execution**

# **21\. Roadmap and timeline**

## **21.1 The phase model**

| **Phase** | **What it is**                                                                                                                                                   | **Goal**                                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Phase 0   | Manual validation. WhatsApp Business intake plus a structured sheet. The team manually matches requests to 5–10 personally recruited craftsmen. Cash throughout. | Confirm real demand and observe how craftsmen actually price and negotiate — before relying on a line of product code. |
| Phase 1   | The PWA MVP. Automated posting, bidding, selection, arrival, completion, admin oversight.                                                                        | Prove the loop works unattended, and produce the metrics of Section 22.                                                |
| Phase 2   | Revenue on, notifications live, admin tooling real, reconciliation and ratings computed.                                                                         | Become a business rather than a demonstration.                                                                         |
| Phase 3   | Native apps, additional districts, card payments for large jobs, corporate accounts.                                                                             | Scale what is proven.                                                                                                  |

Phase 0 deserves emphasis because it is easy to skip once the software works. The software working is not evidence that anyone wants it.

## **21.2 The planned timeline**

**The dates below come from the planning documents produced in early September. Engineering has moved faster than the plan in places and slower in others — treat them as the committed shape, not as a status report.**

| **Date**          | **Milestone**                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| 15 September 2026 | Phase 0 live with real users                                                                         |
| 29 September 2026 | Phase 0 → Phase 1 go / no-go checkpoint                                                              |
| 6 October 2026    | Phase 1 technical foundation complete                                                                |
| 20 October 2026   | Craftsman and customer interfaces built in parallel                                                  |
| 3 November 2026   | Real-time bidding — the riskiest feature — built and testable                                        |
| 10 November 2026  | Notifications and commission links                                                                   |
| 24 November 2026  | Admin panel v1                                                                                       |
| 1 December 2026   | QA and hardening — bug bash, low-end device and low-bandwidth testing                                |
| 2 December 2026   | Phase 1 soft launch — re-onboard Phase 0 craftsmen and users onto the PWA in the same neighbourhoods |
| 15 December 2026  | Public launch decision, on two weeks of live data                                                    |

## **21.3 Workstream status**

| **#** | **Workstream**                                 | **State**                                                                     |
| ----- | ---------------------------------------------- | ----------------------------------------------------------------------------- |
| 01    | Job posting and discovery                      | Done and verified                                                             |
| 02    | Bidding and quotes                             | Done, including voice notes                                                   |
| 03    | Assignment and arrival passcode                | Done and hardened                                                             |
| 04    | Completion, price catalogue and reconciliation | Not started — placeholder in place                                            |
| 05    | Ten-star ratings and tiers                     | Display only                                                                  |
| 06    | Commission tracking                            | Not started                                                                   |
| 07    | Admin panel beyond verification                | In progress — dashboard counts, verification queue, ticket list, job overview |
| 08    | Notifications                                  | Blocked on D-7 — the most urgent gap                                          |
| 09    | Payments                                       | Blocked on D-4                                                                |
| 10    | Account roles                                  | Done                                                                          |
| 11    | Verification hardening                         | Partly done — archive backend and a real end-to-end vendor run remain         |

## **21.4 The critical path to a real launch**

1. Deploy. Nothing can be tested by anyone outside a developer machine until there is a URL.
2. Configure real SMS. Without working Twilio credentials, no real Egyptian phone can log in. The test number expires on 1 January 2027 and its failure will look exactly like a broken login.
3. Resolve D-7 and build notifications. A live feed nobody is told about does not function.
4. Decide the revenue mechanism and build it. Until then there is no business, only a service.
5. Switch to a production KYC workflow (D-1), and top up the vendor balance before switching — a zero balance fails in a way that looks like a code bug.
6. Schedule the retention purge. The policy is documented and runnable but nothing triggers it, which means it is not actually in force.

# **22\. Metrics that matter**

Omar's data discipline from Phase 0 onward is what makes everything else in this document measurable. Every request should be structured as data from day one — service type, area, agreed price, punctuality, and whether the job closed on-platform or leaked off it — so there is no costly restructuring later.

| **Metric**                                | **Definition**                                                             | **Why it is on this list**                                                                        |
| ----------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Repeat rate                               | Share of customers who post a second job within 90 days.                   | The number FilKhedma raised and sold on. If this is low, nothing else matters.                    |
| Leakage rate                              | Share of customer–craftsman pairs whose next job happens off-platform.     | The honest version of lifetime value in this category.                                            |
| Quote fill rate                           | Share of posted jobs that receive at least one quote within a target time. | Measures whether supply density is sufficient. A job with no bids is a customer lost permanently. |
| Time to first quote                       | Median minutes from posting to first bid.                                  | What customers actually experience as "does this work".                                           |
| Craftsman weekly activity                 | Share of approved craftsmen who bid at least once in a week.               | Registered craftsmen is a vanity number; active ones are supply.                                  |
| Average agreed price by category and area | Median of accepted quote prices.                                           | Sets credit pricing, and becomes a genuine data asset over time.                                  |
| Collected revenue                         | Money actually received, not commission theoretically owed.                | The distinction Section 6 exists to protect.                                                      |
| Dispute and payout rate                   | Claims per hundred completed jobs, and cost per claim.                     | Tells us whether the vetting works and whether the guarantee is affordable.                       |
| Verification pass rate and time           | Share of craftsman applications approved, and days to decision.            | Vetting that is too slow starves supply; too loose destroys trust.                                |

**One discipline worth stating**

Downloads, registrations and app-store ratings are not on this list on purpose. They move early, they feel good, and they have no relationship to whether this business works.

# **23\. Risk register**

| **Risk**                                                         | **Likelihood**                       | **Impact**                         | **Mitigation**                                                                                                                             |
| ---------------------------------------------------------------- | ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Revenue never collects — craftsmen do not report or do not pay   | High if commission-on-honour is used | Fatal                              | Prepaid credits charged server-side at quote acceptance (Section 6.3).                                                                     |
| Leakage — relationships move to WhatsApp after first contact     | Certain to some degree               | High                               | Masked numbers, platform-only guarantees, price for one paid transaction per pair, measure from job one.                                   |
| Supply starvation — not enough craftsmen in the launch district  | Medium                               | Fatal to the launch                | Cap the district, recruit personally, do not advertise demand before supply exists.                                                        |
| A trust incident — theft, damage, or worse, in a customer's home | Low but non-zero                     | Existential for the brand          | Human vetting, arrival passcode, photo record, bounded guarantee, a real dispute workflow, and never claiming more safety than we deliver. |
| Team bandwidth — the technical team is not full-time             | High                                 | High — schedule slip               | Descope aggressively; the operations hire removes non-technical load from founders.                                                        |
| Notification channel never resolved                              | Medium                               | High                               | Close D-7. Twilio SMS is faster to stand up if WhatsApp approval drags.                                                                    |
| Regulatory intervention as we scale                              | Low near-term, real long-term        | High                               | Track the ride-hailing precedent; engage counsel before a large round or national expansion.                                               |
| Brand name conflict                                              | Unknown — unchecked                  | Medium, rising with spend          | Run the trademark search now, before marketing investment.                                                                                 |
| A clone copies the product                                       | High — the base app is easy to build | Medium                             | Compete on trust, data and retention, not on features. This is already the strategy.                                                       |
| Free KYC workflow admits a bad actor                             | Medium                               | High                               | Resolve D-1 before launch; human vetting is the compensating control in the meantime.                                                      |
| Test phone number expires 1 January 2027                         | Certain                              | Medium — looks like a broken login | Configure real Twilio credentials well before the date.                                                                                    |

# **24\. Immediate next actions**

## **24.1 This week**

| **Action**                                                         | **Owner**   | **Why now**                                                                       |
| ------------------------------------------------------------------ | ----------- | --------------------------------------------------------------------------------- |
| Interview 5–10 craftsmen on prepaid credits and acceptable pricing | Daw + Wezza | De-risks the entire revenue model in an afternoon. Already an open research item. |
| Lock the launch neighbourhood                                      | Daw + Omar  | Open since the first concept note and blocking recruitment.                       |
| Deploy to Vercel                                                   | Wezza       | Nothing can be tested by anyone until there is a URL.                             |
| Run the trademark and domain search                                | Daw         | Cheap now, expensive after brand spend.                                           |
| Close D-7 — notification channel                                   | Wezza       | The most urgent functional gap in the product.                                    |

## **24.2 Next 30 days**

- Request PSP proposals from Paymob, Fawry Accept and CIB; close D-4.
- Build the craftsman wallet: balance, top-up confirmation, and deduction inside the existing quote-selection transaction — with charging switched off.
- Configure real Twilio credentials so real Egyptian numbers can log in.
- Complete admin panel slice A: dashboard counts, verification queue, ticket list, job overview.
- Hire the Operations Manager and stand up the ground vetting team.
- Size and commit the dispute fund and publish the guarantee terms.
- Schedule the retention purge as a deployment cron.

## **24.3 Next 90 days**

- Seed the price catalogue from Phase 0 and Phase 1 pricing data, then build dual-party reconciliation.
- Build ratings computation and performance tiers — with D-6 resolved first.
- Build masked phone numbers.
- Switch on craftsman credit charging at the end of the free period.
- Resolve D-1 and move to the production KYC workflow, with the vendor balance topped up first.
- Stand up continuous integration (D-8).
- Reach a public launch decision on two weeks of live data.

**The closing thought**

Everything in this report is downstream of one fact: we have built a great deal of the machine and almost none of the business.

The engineering is unusually disciplined for a company at this stage — 932 passing tests, database-enforced invariants, a real security posture. None of that is what will decide whether Osta works. What decides it is whether fifty craftsmen in one Cairo district trust us enough to top up an account, whether the customers they serve come back a second time, and whether we can collect our own money.

Those three questions are answerable within ninety days, and none of them require another feature.

# **Appendix A · Source register**

## **Internal documents consolidated into this report**

- Introduction to Osta — concept, competitive landscape, phased rollout, monetisation, data and marketing strategy.
- OSTA Environment Research Vol. 1 — Mohamed Haitham El Daw, Head of Marketing, September 2026.
- Osta Competitor Tech & Launch-Strategy Research — September 2026.
- Osta Technical Planning Report — three interfaces, ownership split, backend build steps, stack reasoning.
- Online Visa / Debit Card Payments — Egypt implementation guide, research dated 31 August 2026.
- docs/FULL_CONTEXT.md — engineering snapshot, 17 September 2026.
- Build and fix-up prompt records with verification outcomes — 17–18 September 2026.

## **External sources cited**

| **Topic**                         | **Sources**                                                                                                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Market size and growth            | Deep Market Insights, Egypt Home Services Market Size & Outlook 2025–2033; Technavio Home Services Market Growth Analysis 2026–2030; Straits Research, Online On-Demand Home Services Market Report                                     |
| Competitors                       | App store listings; Crunchbase; ZoomInfo/BuiltWith-style scans; company sites; live URLs                                                                                                                                                |
| Regulation                        | GAFI; USE Multiplier, Registering a Company in Egypt 2026; Remitly, Doing Business in Egypt 2026; Oxford Business Group; Research and Markets, Egypt Ride-Hailing & Shared Mobility Market; Fairwork                                    |
| Payments environment              | Mordor Intelligence, Egypt Mobile Payments Market Analysis; Thunes, Egypt's Payments Transformation; XPay (2026); ResearchAndMarkets; EasySellApp (2026)                                                                                |
| Payments technical and compliance | Central Bank of Egypt PSO/PSP licensing rules (June 2025); Visa Secure / EMV 3-D Secure; PCI SSC (PCI DSS v4.0.1, CVV storage, outsourcing, e-commerce integration guidance); Paymob developer documentation; Fawry Accept; CIB Pay Now |
| Connectivity                      | Cairo Scene (Q1 2026); DataReportal, Digital 2026: Egypt; EMarketer/Global Media Intelligence; World Data                                                                                                                               |
| Marketing and social              | NapoleonCat, Social Media Users in Egypt June–July 2026; DataReportal; EasySellApp (2026)                                                                                                                                               |
| Consumer behaviour                | MCIT Household ICT Survey, via Cairo Scene                                                                                                                                                                                              |
| Trademark                         | IP-Coster, Trademark in Egypt; Alyafi IP Group, Egyptian Trademark Gazette                                                                                                                                                              |

_All external figures are desk research from public sources and are reported as found. Where sources disagree, a range is given rather than a single figure. None of them has been independently verified by us, and none should be treated as a substitute for the primary research listed in Section 24._

# **Appendix B · Glossary**

| **Term**         | **Meaning**                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Osta / أوسطى     | Egyptian Arabic for "master craftsman" — and the product name.                                                        |
| Open bidding     | A customer posts a job and multiple craftsmen submit competing price quotes, as opposed to a fixed dispatch price.    |
| Leakage          | A customer and craftsman who met through the platform doing later jobs off it, so the platform earns nothing.         |
| PWA              | Progressive Web App — a website that behaves like an app, installable to the home screen, with no app store involved. |
| KYC              | Know Your Customer — here, verifying a craftsman's national identity document through a vendor (Didit).               |
| RLS              | Row Level Security — database-enforced rules about which rows each user may read or write.                            |
| TOTP / MFA       | Time-based one-time password; multi-factor authentication. Mandatory for admin accounts.                              |
| PSP              | Payment Service Provider — the regulated company that processes card payments on a merchant's behalf.                 |
| 3-D Secure       | The additional authentication step on an online card payment — an OTP, bank app approval or biometric.                |
| PCI DSS          | The payment card industry security standard that governs how card data may be handled.                                |
| Escrow           | Holding the customer's payment until the job is confirmed complete, then releasing it.                                |
| Reconciliation   | Both parties independently confirming what work was done, compared server-side.                                       |
| Arrival passcode | A one-time code proving the craftsman at the door is the one assigned in the app.                                     |
| Phase 0          | Manual validation over WhatsApp and a structured sheet, before the product is relied upon.                            |
| GMV              | Gross Merchandise Value — the total value of work transacted through the platform.                                    |

_End of document · Osta Master Reference Report v1.0 · 19 September 2026_