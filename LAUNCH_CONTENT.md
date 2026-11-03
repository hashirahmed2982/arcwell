# Content needed to launch

Everything marked **sample** is currently invented so you can see the design. Send the items below
(a reply, a doc or a shared folder is fine) and they'll be dropped into `/content`. When all of section A
and B are done, set `showSampleContent: false` in `content/site.ts`.

## A. Must have (the site can't go live without these)

| # | What | Where it shows | Notes |
|---|------|----------------|-------|
| 1 | **Domain** | Everywhere, SEO, emails | e.g. arcwell.digital |
| 2 | **Business email** | Footer, contact, forms | e.g. hello@yourdomain |
| 3 | **Cal.com or Calendly link** | "Book a call" buttons, embedded calendar | 30-min intro call |
| 4 | **WhatsApp business number** | Floating button, footer, contact | With country code |
| 5 | **LinkedIn company page URL** | Footer, contact | |
| 6 | **Formspree form ID** | All forms | Free at formspree.io; set in Vercel env vars |
| 7 | **Analytics choice** | Lead tracking | Plausible (recommended, no cookie banner) or Google Analytics ID |
| 8 | **Quoting promise** | Engagement page, quote form | The site shows no prices or timelines — confirm "written proposal usually within 48 hours" after the call, and the 30-minute free call length |
| 9 | **Case studies** — three real projects are written up anonymously (clients under NDA). Three real projects written up; outcomes added for two. Optional: an outcome for the agency website (e.g. more enquiries) and more projects | Work, home, solution pages | No names, URLs, cities or languages that could identify the clients |
| 10 | **Screenshots (optional)** — only if the NDA allows redesigned or blurred screens | Work pages | Otherwise the drawn mock-ups stay; they show no client branding |
| 11 | **Legal review** of privacy policy and terms | /privacy, /terms | Template text is there; confirm processors (Vercel, Formspree, Cal.com, analytics) |
| 12 | **Office hours** | "We're online" indicator, FAQ | Currently 10 am–7 pm PKT, Mon–Sat |

## B. Must replace or remove (currently sample)

| # | What | If you don't have it yet |
|---|------|--------------------------|
| 13 | ~~Stats~~ — done: 10+ projects, 6+ years, 4 countries | — |
| 14 | **Testimonials** — quote, name, role, company, permission | Leave empty — section hides |
| 15 | **Client names** you're allowed to show in "Trusted by" | Leave empty — row hides |
| 16 | **Review profiles** — Clutch / GoodFirms / Upwork links and ratings | Leave empty — badges hide |
| 17 | **Company registration** — SECP no., NTN, PSEB no. | Leave empty — line hides |
| 18 | **Demo apps** — names, 1-line descriptions, live URLs | Leave empty — section hides |
| 19 | **Agencies page** — confirm you offer a paid pilot and a non-solicitation clause | Edit wording in `content/agencies.ts` |
| 20 | **FAQ answers** — payment methods (bank / Wise / Payoneer), free-fixes period after launch, response times | Edit in `content/pricing.ts` |

## C. Nice to have (can follow after launch)

| # | What | Notes |
|---|------|-------|
| 21 | **Logo** final files (SVG) | Current mark is a placeholder |
| 22 | **Insights articles** | 3 sample posts exist — approve, edit or replace; then 2 a month |
| 23 | **More solution pages** | Which industries/services to target next (e.g. "logistics app", "restaurant POS") |
| 24 | **Lead webhook** | Google Sheet / HubSpot / Zapier URL if you want leads in a CRM as well as email |
| 25 | **Team** | Whether to show roles only (current) or real names/photos later |
| 26 | **Markets on the globe** | Currently London, Dubai, Riyadh, New York |
| 27 | **OG/social image** tweaks | Auto-generated per page; replace if you want a designed one |
