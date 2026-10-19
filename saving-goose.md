# Saving Goose

**Your money, guarded.**
A free money-tracking app with a goose in glasses that guards your budget, and roasts you when you don't.

Designed & developed by **Abdelrahman Hossam, AOM Tech**
© 2026 Abdelrahman Hossam. All rights reserved.

| | |
|---|---|
| **Live app** | https://saving-goose.vercel.app |
| **Current version** | 2.1 |
| **Source code** | GitHub, private repo: `abdelrahmanhossam01/saving-goose` |
| **Hosting** | Vercel (free Hobby plan), auto-deploys from GitHub |
| **Usage stats** | Vercel → saving-goose → Analytics |
| **Price** | Free |
| **Languages** | English and Egyptian Arabic |

---

## 1. Why it exists

Saving Goose started as a personal tool. The goal was simple: know where the money goes every month, save first, and stop running out before payday. Budgeting apps felt like spreadsheets with a login screen, so Saving Goose was built to be quick to use (one tap to log a payment), honest (it shows exactly where you stand), and fun enough to keep using (golden eggs, streaks, and a goose with opinions).

It is the first of several apps planned under AOM Tech.

---

## 2. How to install

No App Store needed. It installs straight from the browser and updates itself.

**iPhone**
1. Open https://saving-goose.vercel.app in **Safari** (not Chrome)
2. Tap **Share** → **Add to Home Screen**
3. Keep **"Open as Web App"** switched ON → **Add**
4. Open it from the home screen

**Android**
1. Open the link in **Chrome**
2. Tap **Install app** (or menu ⋮ → Install app)
3. Open it from the home screen

On first launch, the setup questions build the budget automatically.

---

## 3. Features

### Setup (first launch, 6 screens)
1. **Language** (English / العربية), **text size** (Normal / Large / Extra large), name, currency (EGP, SAR, AED, KWD, USD, EUR, GBP)
2. **Money**: monthly income, savings percentage slider, payday
3. **Spending categories**: 14 toggles (rent & bills, groceries, going out, eating out, transport, car & fuel, gym, sports, subscriptions, phone, shopping, family, side project, smoking). Money is split between them automatically and always adds up exactly
4. **Make it yours**: up to 2 one-tap quick buttons (cigarette pack, coffee, ride, lunch, snack, fuel), week start day, light/dark theme
5. **How should I talk to you?**: goose personality (Savage roaster / Tough love / Gentle coach), roast topics, warning levels (50/75/90/100%), check-in reminders (every 1, 2, or 3 hours, with from/until times)
6. **Big goal**: name and amount, with a suggested 3-month emergency fund, plus a plan summary

Setup can be redone anytime from the menu, and it pre-fills with the current plan.

### Dashboard
- Balance card with the goose portrait (its ring color and mood change as you spend) and a speech bubble with live advice or roasts
- **10 golden eggs** representing the month's budget. They crack as money is spent
- Line under the eggs: *Spent X · % used · Left X*, plus eggs left and days to payday
- **4 tiles**: Spent today, Safe to spend today, Left this week, Golden eggs saved (each opens its page)
- **Golden egg collection** with streaks
- **Insights**
- **Spending trend chart** with Month and Daily views, ideal pace, budget line, safe zone, and touch tooltips
- Check-in status, install hint, and the 3 most recent payments

### Menu (☰) and pages
- Dashboard, Payments, Budget & categories, Savings & goal, History, Reminders, Privacy & safety
- "Make it yours": Money plan, Roast lines, Redo setup, Language switch, Text size, Backup & restore
- The version number and signature are shown at the bottom

### Logging money
- **I paid**: amount, category, optional note
- **I didn't pay**: a no-spend check-in
- **Quick buttons**: one tap logs a fixed-price item
- **Undo**: a gold Undo button appears on the confirmation for 5 seconds
- Edit or delete any payment
- **Search** across all payments ever logged (by note, category, or amount), with a total
- **Recurring payments**: bills like gym, phone, and subscriptions log themselves on their day each month. On/off per bill, never duplicated, never early

### Golden egg collection (monthly rewards)
- Finish a month **within budget** and you collect a **golden egg**
- At month end: a big egg drops in with confetti and a message that fits the streak (special messages at 1, 2, 3, 6, and 12 months)
- The dashboard shelf shows the last 12 months: gold eggs for wins, cracked eggs for missed months, and a pulsing outline for the current month
- Current streak, best streak, and this month's status (On track / At risk / Lost)
- A missed month shows a comeback message, and says so if a streak was broken

### Insights
- Pace compared with last month ("30% less than last month")
- Top spending category and its share of the total
- Number of no-spend days this month
- Biggest spending day

### Savings and goal
- "Move to savings" button for the monthly goal
- A big goal with progress and an estimated arrival date
- Withdrawals are logged with a reason. Emergencies get understanding; anything else gets a stern goose
- Leftover money at month end can be moved into savings with one tap

### The goose and its roasts
- 3 personalities: **Savage roaster**, **Tough love** (keeps family out of it), **Gentle coach** (no roasting)
- Roast topics: Dad & Mom jokes, Money shaming, Life choices
- Built-in roasts for: almost broke (90%), money's gone, every payment after that, and category limit blown (with a different roast per category)
- **Roast editor**: switch off any built-in roast, write your own with live placeholders (`{name}`, `{left}`, `{days}`, `{perday}`, `{over}`, `{budget}`, `{category}`, `{spent}`, `{limit}`, `{cur}`), edit, delete, and test
- **Roast packs**: "Share my roasts" exports a file, and "Import roast pack" adds someone else's (duplicates are skipped)
- All built-in roasts are general and not about any specific person. Personal roasts can be kept private through a personal roast pack

### Reminders
- Check-in notifications ("Did you pay for anything?") at the chosen hours
- They get sharper when the budget is nearly gone
- Test button and a reminder history
- Note: on iPhone, web apps can only notify while the app is open or recently used

### Language and accessibility
- Full **English** and **Egyptian Arabic**: every screen, button, message, notification, date, and roast (the Arabic roasts are written in Egyptian dialect, not literally translated)
- Arabic switches the whole layout **right-to-left**, with a matching Arabic font (Baloo Bhaijaan 2) and currency words (جنيه, ريال...)
- **Text size**: Normal / Large / Extra large, designed with older users in mind
- Light, dark, or match-the-phone theme
- Respects the phone's "Reduce motion" setting
- Screen-reader labels on buttons and controls

### Motion and polish
- Numbers count up, tiles rise in one after another, eggs pop in, the chart line draws itself
- Sheets slide up with a spring, the menu slides in, buttons press down
- The goose gently floats, and confetti (with little golden eggs) plays on wins
- The top bar and bottom buttons stay fixed while scrolling
- Messages appear above the bottom buttons with the goose's face

### Data tools
- **Backup**: export and restore a JSON file (validated and size-limited on restore)
- **Spreadsheet export**: all payments as a CSV file for Excel or Google Sheets
- **Delete all my data**: permanently wipes everything (you must type DELETE to confirm)
- Month history is archived automatically

### Home-screen shortcuts (Android)
Long-press the app icon to get **I paid** and **I didn't pay**.

---

## 4. Privacy and security

**Data**
- No accounts, no servers, no ads, and no personal tracking
- Everything a user types stays **only on their phone** (browser local storage). The developer cannot see it
- The app asks the phone for protected storage so it isn't cleared automatically

**Anonymous usage counting (added in v2.1)**
- Vercel Web Analytics counts visits: no cookies and no personal information
- It sees only that someone opened the app, their rough country, and device type
- This is disclosed on the in-app Privacy & safety page, in English and Arabic

**Security measures**
- All user text is displayed safely and can never run as code
- Backup and roast-pack files are fully validated: size limits, protection against "prototype pollution", and type and length checks on every field
- Spreadsheet export blocks formula injection
- Security headers (`vercel.json`):
  - Content Security Policy: the app can only talk to its own site, so data can't be sent anywhere else
  - Can't be embedded in other websites (blocks look-alike pages)
  - No camera, microphone, location, or payment access
  - HTTPS enforced, no referrer leaks
- No secrets, keys, or passwords anywhere in the code
- The GitHub repository is private. The published code has comments stripped and carries a copyright notice

**Tested attacks (all blocked):** a booby-trapped backup file, an oversized file, sending data to another website, and a malicious roast pack.

**Honest limits**
- Like every website, the app's code is downloaded to the phone to run, so a developer can view it. Protection is legal (copyright) plus the stripped code
- Data lives only on the phone: losing the phone without a backup means losing the data. The app reminds users to back up monthly
- On iPhone, the app should be installed to the home screen. If it's only used in a Safari tab, Safari may clear the data after weeks of not being opened

---

## 5. How it's built

| Part | Details |
|---|---|
| App type | Progressive Web App (PWA): installable, works offline |
| Code | A single `index.html` file (HTML, CSS, and JavaScript, no frameworks) |
| Offline | Service worker (`sw.js`) caches the app. Navigation is network-first, so updates arrive immediately |
| Storage | Browser `localStorage`: `saving-goose-v1` (main data), `saving-goose-v1-archive` (past months), `saving-goose-v1-reminders` |
| Translation | A dictionary plus pattern rules, applied live to the screen. Arabic roasts are separate, hand-written sets |
| Hosting | Vercel, deployed automatically from GitHub on every commit |
| Headers | `vercel.json` (security headers, cache rules, the `/home-screen` rewrite) |
| Analytics | Vercel Web Analytics (`/_vercel/insights`) |

**Files in the repository**
- `index.html`: the whole app
- `sw.js`: offline engine
- `manifest.webmanifest`: app name, icons, and home-screen shortcuts
- `vercel.json`: security headers and routing
- `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon.png`: icons (the goose)

---

## 6. Updating the app

1. Change the files, and **increase `APP_VERSION`** in `index.html` (for example `"2.1"` → `"2.2"`)
2. Upload the changed files to GitHub (**Add file → Upload files → Commit changes**)
3. Vercel deploys automatically within seconds (the commit shows ✓ 1/1)
4. Users' phones update themselves: the next time the app is opened or brought back to the front, it shows *"Updating Saving Goose to version X…"* and reloads

If `sw.js` changes, also bump its cache name (for example `saving-goose-v10` → `v11`).

---

## 7. Checking usage

Vercel → **saving-goose** → **Analytics**

| What you see | What it means |
|---|---|
| **Visitors** | Different people who opened the app |
| **X online** | People using it right now |
| Pages → **/home-screen** | Opens from the installed app. The best measure of real installs |
| Pages → **/** | Opens from a browser link, usually first visits |
| **Referrers** | Where people came from (for example linkedin.com) |

Free plan: 50,000 events per month and 30 days of history. If the limit is reached, counting pauses until the next month with no charge. The Hobby plan is for personal, non-commercial use; if AOM Tech starts charging for apps, Vercel Pro is required.

---

## 8. Version history

| Version | What changed |
|---|---|
| **1.0** | Launch: budget tracking, golden eggs, spending chart, roasts, month rollover, backup, reminders, installable app |
| **1.x** | Setup wizard; custom roasts; personalization (quick buttons, personality, alerts, week start, theme) |
| **1.x** | Dashboard with ☰ menu and separate pages; motion and animations; fixed top and bottom bars; golden egg collection with streaks |
| **1.6** | Checks for updates every time the app opens; version shown in the menu |
| **1.7** | Security hardening, Privacy & safety page, delete-all-data, protected storage, security headers |
| **1.8** | Undo, recurring payments, insights, payment search, CSV export, home-screen shortcuts |
| **1.9** | General (non-personal) roasts, roast packs, copyright notice, comments stripped from published code |
| **2.0** | English / Egyptian Arabic with right-to-left layout, text size option, Arabic roasts |
| **2.1** | Anonymous visitor counter; home-screen opens counted separately |

**Testing before each release:** 54 core checks, 18 feature checks, 4 attack tests, a roast-pack test, and a full Arabic scan of every screen, run under the production security headers.

---

## 9. Ideas for later

- Optional cloud sync between devices (for example, through an account)
- Shared budgets for couples or families
- Home-screen widget showing today's safe-to-spend
- Yearly summary ("Your 2026 with the goose")
- More languages
- A custom domain (for example `savinggoose.app`)
- Publishing to app stores

---

*Saving Goose is the first of many apps coming from AOM Tech.*
