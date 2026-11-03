// Case studies. One object per project, anonymised unless the client approves naming them.
// Real projects first. While site.showSampleContent is on, invented sample projects from
// content/samples.ts are added after them so the grid looks full.
import { site } from "./site";
import { sampleCaseStudies, sampleCaseStudyDetails } from "./samples";

export type MockKind = "erp" | "mobile" | "web" | "albmap" | "cardcove";

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

const realCaseStudies: CaseStudy[] = [
  {
    slug: "albmap",
    title: "AlbMap — business and event discovery for Albania",
    clientType: "Startup · Mobile, web and admin",
    summary: "One API powering an iOS and Android app, a three-language website and an admin portal.",
    challenge:
      "Local businesses and events in Albania were scattered across social media and outdated listings. The client wanted one place to discover them on a map — and a way for business owners to list themselves and post events without going through anyone.",
    solution:
      "We built a Flutter app for iOS and Android, a Next.js website in English, German and Albanian, a Next.js admin portal, and one Node.js + MySQL API behind all three. Owners submit businesses and events; admins review them in an approval queue; visitors browse a live map, save favourites, leave reviews and mark events they're interested in.",
    result:
      "Three products now run on a single API and database. Sign-in works with email, Google, Facebook and Apple, the app keeps working offline from its local cache, and listings only go public after an admin approves them.",
    metrics: [
      { value: "3", label: "Products on one API — app, website, admin" },
      { value: "3", label: "Languages: English, German, Albanian" },
      { value: "iOS + Android", label: "From one Flutter codebase" },
    ],
    tech: ["Flutter", "Next.js", "Node.js", "MySQL", "Firebase"],
    mock: "albmap",
    accent: ["#eef4f1", "#0f766e"],
    images: [],
  },
  {
    slug: "card-cove",
    title: "Card Cove — B2B portal for wholesale digital gift cards",
    clientType: "B2B · Web platform",
    summary: "Corporate clients order gift-card codes in bulk from a prepaid wallet, delivered instantly and encrypted.",
    challenge:
      "Card Cove sells digital gift cards and vouchers to corporate clients in bulk. Orders, wallet top-ups and code delivery were handled by hand — slow for clients and risky for high-value codes.",
    solution:
      "A client portal and an admin portal in Next.js, on a Node.js + MySQL API. Clients top up a prepaid wallet, see products with their own pricing and place bulk orders. Codes come from stock or a supplier API, are stored encrypted and arrive by email in a password-protected file. Admins approve top-ups, manage products, clients and pricing, and run reports.",
    result:
      "Ordering, top-ups and code delivery now run in one audited system with two-factor sign-in and ten built-in reports — from real margin and inventory to receivables ageing and best sellers.",
    metrics: [
      { value: "10", label: "Built-in business reports" },
      { value: "AES-256", label: "Encryption for every stored code" },
      { value: "2 portals", label: "Client and admin, on one API" },
    ],
    tech: ["Next.js", "React", "Node.js", "MySQL"],
    mock: "cardcove",
    accent: ["#f3f1fb", "#4f46e5"],
    images: [],
  },
];

export const caseStudies: CaseStudy[] = site.showSampleContent
  ? [...realCaseStudies, ...sampleCaseStudies].map((c) => ({ ...c, ...sampleCaseStudyDetails[c.slug] }))
  : realCaseStudies;

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
