import { sampleClients, sampleDemoApps, sampleRegistration, sampleReviews, sampleStats, sampleTestimonials } from "./samples";

// Global site settings. Edit these values — no component changes needed.

export const site = {
  name: "Arcwell Digital",
  legalName: "Arcwell Digital (Pvt) Ltd.",
  tagline: "Software built around your business.",
  description:
    "Arcwell Digital is a Karachi-based studio building mobile apps, web platforms and custom ERP for startups and growing businesses worldwide.",
  // TODO: replace with the final domain once purchased.
  url: "https://arcwell.digital",
  email: "hello@arcwell.digital",
  // TODO: replace with real links.
  bookCallUrl: "https://cal.com/arcwell/intro",
  whatsappUrl: "https://wa.me/920000000000",
  linkedinUrl: "https://www.linkedin.com/company/arcwell-digital",
  location: "Karachi, Pakistan",
  // Custom animated cursor (from the brief). Off by default for a more conventional, professional feel.
  customCursor: false,
  // PREVIEW ONLY: fills stats, testimonials, client logos, case-study results and demo apps with
  // invented sample content (content/samples.ts) so you can see the finished design.
  // Set to false before launch — sections then show only the real data below.
  showSampleContent: true,

  // Analytics: "plausible" (no cookie banner needed), "ga" (Google Analytics, shows a consent banner) or "none".
  // Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN or NEXT_PUBLIC_GA_ID to match.
  analytics: "plausible" as "plausible" | "ga" | "none",

  // Office hours in Karachi (PKT, UTC+5), used for the "we're online" indicator.
  hours: { timezone: "Asia/Karachi", label: "PKT", days: [1, 2, 3, 4, 5, 6], open: 10, close: 19 },

  // Company registration shown in the footer (leave empty to hide).
  registration: { secp: "", ntn: "", pseb: "" },
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "ERP", href: "/erp" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "For agencies", href: "/agencies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Shown in the scrolling marquee on the home page.
export const techStack = ["Flutter", "React", "Next.js", "Node.js", "Firebase", "Figma"];

// Short trust facts shown under the hero. Keep these factual.
export const assurances = [
  { title: "NDA from day one", description: "Every engagement starts under a signed NDA." },
  { title: "You own the IP", description: "Code and designs belong to you from day one." },
  { title: "UK & Gulf hours", description: "Our working day overlaps with yours." },
  { title: "Reply within 24 hours", description: "A clear answer and next steps, fast." },
];

// Markets we serve; drawn as arcs from Karachi on the hero globe. [label, latitude, longitude]
export const markets: [string, number, number][] = [
  ["London", 51.5, -0.12],
  ["Dubai", 25.2, 55.27],
  ["Riyadh", 24.71, 46.68],
  ["New York", 40.71, -74.0],
];
export const homeBase: [string, number, number] = ["Karachi", 24.86, 67.0];

// ---- Real data. Sections stay hidden while these are empty (unless sample content is on). ----

// Real numbers only. Example: { value: 40, suffix: "+", label: "Projects shipped" }
const realStats: { value: number; suffix?: string; label: string }[] = [];

// Real, approved quotes only.
const realTestimonials: { quote: string; name: string; role: string; company?: string }[] = [];

// Client names you have permission to show.
const realClients: string[] = [];

// Demo apps visitors can try: { title, description, tags, href }
const realDemoApps: { title: string; description: string; tags: string[]; href: string }[] = [];

// Review-platform profiles: { platform, rating, reviews, href }. Only list profiles that exist.
const realReviews: { platform: string; rating: string; reviews: string; href: string }[] = [];

const pick = <T,>(real: T[], sample: T[]) => (real.length ? real : site.showSampleContent ? sample : []);

export const stats = pick(realStats, sampleStats);
export const testimonials = pick(realTestimonials, sampleTestimonials);
export const clients = pick(realClients, sampleClients);
export const demoApps = pick(realDemoApps, sampleDemoApps);
export const reviews = pick(realReviews, sampleReviews);
export const registration =
  site.registration.secp || site.registration.ntn || !site.showSampleContent ? site.registration : sampleRegistration;
