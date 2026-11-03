# Arcwell Digital — website

Company site for **Arcwell Digital** — *Software built around your business.*

Next.js (App Router) + TypeScript + Tailwind CSS v4, exported as a static site (`out/`) and deployable to Vercel.
Animation: Framer Motion (UI + page transitions), GSAP + ScrollTrigger (scroll storytelling), Lenis (smooth scroll), React Three Fiber / Three.js (3D hero).

## Design

Clean and professional: white and cool-grey surfaces, deep navy text (`#0b1b33`) and one blue accent (`#2453e6`),
set entirely in Geist. The home page tells the story in numbered sections — 01 The challenge, 02 Services,
03 Engineering, 04 Why us, 05 Process, 06 Case studies — then closes with the call to action.
The hero pairs a product composition (ERP dashboard + phone that types code and becomes an app) with a
dotted 3D globe showing arcs from Karachi to the markets in `content/site.ts`.

Colours and fonts live in `app/globals.css` (`@theme`). In headings from `/content`, wrap words in `*asterisks*`
to show them in the accent colour. The custom cursor from the brief is available but off (`customCursor` in `content/site.ts`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck
```

## Lead capture

- **Forms** (contact, estimate, checklist) go through `lib/leads.ts`: emailed via Formspree and optionally POSTed to a
  webhook (Google Sheet, HubSpot, Zapier). Each lead includes where the visitor came from (UTM tags / referrer, first touch).
- **Events** tracked in Plausible or GA: Lead, Book call click, WhatsApp click, Email click, Estimate click, Estimate completed.
- **Pages:** `/estimate` (calculator), `/pricing`, `/agencies`, `/solutions/*` (SEO landing pages), `/insights/*` (blog),
  `/resources/erp-readiness-checklist` (email-gated), `/privacy`, `/terms`.
- **Also:** embedded booking calendar and "we're online" indicator on Contact, FAQ with structured data,
  review badges, WhatsApp button and a sticky mobile "Get an estimate" bar.

See `LAUNCH_CONTENT.md` for the content needed before launch.

## Edit copy without touching components

All text lives in `/content`:

| File | What it controls |
| --- | --- |
| `content/site.ts` | Name, domain, email, Cal.com / WhatsApp / LinkedIn links, nav, tech marquee, **stats** and **testimonials** |
| `content/home.ts` | Home page: hero, services, why us, process, CTA |
| `content/services.ts` | Services page |
| `content/erp.ts` | ERP page |
| `content/work.ts` | Work page and **case studies** (each one becomes `/work/[slug]`) |
| `content/about.ts` | About page |
| `content/contact.ts` | Contact page and form labels |
| `content/pricing.ts` | Engagement models, starting prices, currencies, FAQ |
| `content/estimate.ts` | Estimate calculator questions and prices |
| `content/agencies.ts` | White-label page for agencies |
| `content/solutions.ts` | SEO landing pages (services and industries) |
| `content/insights.ts` | Blog posts |
| `content/resources.ts` | ERP checklist and free workflow review |
| `content/legal.ts` | Privacy policy and terms (template — get it reviewed) |
| `content/samples.ts` | Sample content shown while `showSampleContent` is on |

- **Stats strip** and **testimonials** are hidden until you add real entries in `content/site.ts`.
- **Case study images**: put files in `public/work/` and list them in that study's `images` array. Until then a drawn placeholder screen is shown.

## Environment variables

Copy `.env.example` to `.env.local` (and add the same vars in Vercel → Project → Settings → Environment Variables):

- `NEXT_PUBLIC_FORMSPREE_ID` — the contact form posts to `https://formspree.io/f/<id>`, which emails each submission to you. No database.
- `NEXT_PUBLIC_LEAD_WEBHOOK_URL` — optional; also sends each lead as JSON to a Sheet/CRM webhook.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_ID` — analytics (match `analytics` in `content/site.ts`).

## Deploy to Vercel

Import the repo in Vercel; the Next.js preset works as is (`output: "export"` is set in `next.config.ts`). Then connect the domain and update `site.url` in `content/site.ts`.

## Structure

```
app/               routes, per-page metadata, opengraph-image.tsx per route, sitemap.ts, robots.ts
components/home    home page sections (hero, bento, code-to-product, timeline, …)
components/motion  SmoothScroll (Lenis+GSAP), Cursor, Magnetic, Reveal, WordReveal, CountUp
components/three   HeroScene (R3F particle field)
components/ui      Button, Logo, device frames and placeholder screens
content/           all copy
lib/               SEO helper, OG image template, GSAP setup, hooks
```

## Performance and accessibility guardrails

- The WebGL hero loads after the page is idle, renders fewer particles on mobile and pauses when off screen.
- `prefers-reduced-motion` turns off smooth scroll, the 3D scene, the custom cursor, pinning and reveal animations; all content stays visible.
- Custom cursor only appears on fine pointers (mouse); touch devices play the bento micro-animations on scroll instead of hover.
- Skip link, focus styles, semantic landmarks, labelled form fields.
