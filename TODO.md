# TODO before launch

## Must replace (placeholders)

- [ ] **Domain**: `site.url` and `site.email` in `content/site.ts` (currently `arcwell.digital` / `hello@arcwell.digital`)
- [ ] **Cal.com link**: `site.bookCallUrl` (currently `https://cal.com/arcwell/intro`)
- [ ] **WhatsApp number**: `site.whatsappUrl` (currently `https://wa.me/920000000000`)
- [ ] **LinkedIn company page**: `site.linkedinUrl`
- [ ] **Formspree form ID**: set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel (form shows a "not connected" message until then)
- [ ] **Analytics**: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (or swap in Google Analytics)

## Case studies (`content/work.ts`)

The three case studies are **placeholders** following the brief's template. Their challenge, solution and
**result** fields say "Placeholder" and must be replaced with real projects and real, measurable outcomes.

- [ ] `distribution-erp` — real title, challenge, solution, result
- [ ] `booking-app` — real title, challenge, solution, result
- [ ] `saas-dashboard` — real title, challenge, solution, result
- [ ] Optional 4th case study and 1–2 demo apps

## Placeholder images (screenshots needed)

Each case study currently shows an HTML-drawn mock screen. Add 2–3 screenshots per project
(client branding blurred or redesigned), saved as compressed WebP around 1600×1100, in `public/work/`,
and list them in that study's `images` array:

- [ ] `public/work/distribution-erp-1.webp`, `-2.webp`, `-3.webp` (ERP dashboard + field-staff mobile app)
- [ ] `public/work/booking-app-1.webp`, `-2.webp`, `-3.webp` (phone screens)
- [ ] `public/work/saas-dashboard-1.webp`, `-2.webp`, `-3.webp` (browser screens)
- [ ] ERP page hero device mock-up (`app/erp/page.tsx`) — swap the drawn mock for a real ERP screenshot
- [ ] Final logo (current mark is a placeholder arc icon in `components/ui/Logo.tsx` and `public/icon.svg`)

## Hidden until real data exists

- [ ] **Stats strip** — add real numbers to `stats` in `content/site.ts`
- [ ] **Testimonials** — add real quotes to `testimonials` in `content/site.ts`

## After deploy

- [ ] Run Lighthouse on mobile for every page (target 90+, minimum 85)
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Check the Open Graph previews (LinkedIn Post Inspector)
