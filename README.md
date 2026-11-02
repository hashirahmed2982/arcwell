# Arcwell Digital — website

Company site for **Arcwell Digital** — *Software built around your business.*

Next.js (App Router) + TypeScript + Tailwind CSS v4, exported as a static site (`out/`) and deployable to Vercel.
Animation: Framer Motion (UI + page transitions), GSAP + ScrollTrigger (scroll storytelling), Lenis (smooth scroll), React Three Fiber / Three.js (3D hero).

## Design

Warm and editorial rather than "tech": paper background (`#f5f1ea`), ink text, a single cobalt accent and a clay
highlight, set in Instrument Serif (headlines) and Geist (body). The home page reads as a short story in chapters —
the problem, what we build, code to product, why us, how we work, selected work — ending on "the next chapter is yours".
The 3D hero is a matte ceramic arch (the "arc" in Arcwell) with the phone standing in its opening.

Colours and fonts live in `app/globals.css` (`@theme`). In headings from `/content`, wrap words in `*asterisks*`
to set them in the italic accent.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck
```

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

- **Stats strip** and **testimonials** are hidden until you add real entries in `content/site.ts`.
- **Case study images**: put files in `public/work/` and list them in that study's `images` array. Until then a drawn placeholder screen is shown.

## Environment variables

Copy `.env.example` to `.env.local` (and add the same vars in Vercel → Project → Settings → Environment Variables):

- `NEXT_PUBLIC_FORMSPREE_ID` — the contact form posts to `https://formspree.io/f/<id>`, which emails each submission to you. No database.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — optional; enables Plausible analytics.

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
