// Case studies. One object per project, anonymised unless the client approves naming them.
// Real projects first. While site.showSampleContent is on, invented sample projects from
// content/samples.ts are added after them so the grid looks full.
import { site } from "./site";
import { sampleCaseStudies, sampleCaseStudyDetails } from "./samples";

export type MockKind = "erp" | "mobile" | "web" | "discovery" | "b2bportal";

export type CaseStudy = {
  slug: string;
  title: string;
  clientType: string;
  summary: string; // one-line result shown on cards
  challenge: string;
  solution: string;
  result: string;
  tech: string[];
  mock: MockKind; // which placeholder screen to draw until real screenshots exist
  accent: [string, string]; // [card background tint, accent colour]
  // Paths under /public, e.g. "/work/distribution-erp-1.webp". Empty = use placeholder mock.
  images: string[];
  metrics?: { value: string; label: string }[]; // headline results shown on the detail page
};

export const work = {
  seo: {
    title: "Work",
    description: "A few of the products we've designed and built. Some client names are kept private under NDA.",
  },
  heading: "Work",
  intro: "A few of the products we've designed and built. Some client names are kept private under NDA.",
  labels: { challenge: "Challenge", solution: "Solution", result: "Result", tech: "Tech", back: "All work", next: "Next project" },
  demoHeading: "Try our demo apps",
  demoIntro: "Products we built to show how we work. Click around — nothing you do here is saved.",
};

// Both clients are under NDA: no names, locations, URLs or other identifying details.
const realCaseStudies: CaseStudy[] = [
  {
    slug: "local-discovery-platform",
    title: "Business and event discovery platform for a city-guide startup",
    clientType: "Startup · Mobile, web and admin · Live",
    summary: "One API powering an iOS and Android app, a multilingual website and an admin portal — live in production.",
    challenge:
      "Local businesses and events were scattered across social media and outdated listings. The client wanted one place to discover them on a map — and a way for business owners to list themselves and post events without going through anyone.",
    solution:
      "We built a Flutter app for iOS and Android, a multilingual Next.js website, a Next.js admin portal, and one Node.js + MySQL API behind all three. Owners submit businesses and events; admins review them in an approval queue; visitors browse a live map, save favourites, leave reviews and mark events they're interested in.",
    result:
      "All three products are live and run on a single API and database. Sign-in works with email, Google, Facebook and Apple, the app keeps working offline from its local cache, and listings only go public after an admin approves them.",
    metrics: [
      { value: "3", label: "Products on one API — app, website, admin" },
      { value: "iOS + Android", label: "From one Flutter codebase" },
      { value: "Live", label: "Completed and running in production" },
    ],
    tech: ["Flutter", "Next.js", "Node.js", "MySQL", "Firebase"],
    mock: "discovery",
    accent: ["#eef4f1", "#0f766e"],
    images: [],
  },
  {
    slug: "b2b-gift-card-portal",
    title: "B2B ordering portal for a digital gift-card distributor",
    clientType: "B2B · Web platform · Live",
    summary: "Corporate clients order gift-card codes in bulk from a prepaid wallet, delivered instantly and encrypted.",
    challenge:
      "The client sells digital gift cards and vouchers to corporate buyers in bulk. Orders, wallet top-ups and code delivery were handled by hand — slow for buyers and risky for high-value codes.",
    solution:
      "A client portal and an admin portal in Next.js, on a Node.js + MySQL API. Buyers top up a prepaid wallet, see products at their own pricing and place bulk orders. Codes come from stock or a supplier API, are stored encrypted and arrive by email in a password-protected file. Admins approve top-ups, manage products, buyers and pricing, and run reports.",
    result:
      "Ordering, top-ups and code delivery now run live in one audited system with two-factor sign-in and ten built-in reports — from real margin and inventory to receivables ageing and best sellers.",
    metrics: [
      { value: "10", label: "Built-in business reports" },
      { value: "AES-256", label: "Encryption for every stored code" },
      { value: "2 portals", label: "Client and admin, on one API" },
    ],
    tech: ["Next.js", "React", "Node.js", "MySQL"],
    mock: "b2bportal",
    accent: ["#f3f1fb", "#4f46e5"],
    images: [],
  },
];

export const caseStudies: CaseStudy[] = site.showSampleContent
  ? [...realCaseStudies, ...sampleCaseStudies].map((c) => ({ ...c, ...sampleCaseStudyDetails[c.slug] }))
  : realCaseStudies;

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
