// Case studies. One object per project, anonymised unless the client approves naming them.
// IMPORTANT: the projects below are PLACEHOLDERS following the brief's template. While
// site.showSampleContent is on, they are filled with sample details from content/samples.ts.
// Replace them with real projects and real, measurable results before launch (see TODO.md).
import { site } from "./site";
import { sampleCaseStudies, sampleCaseStudyDetails } from "./samples";

export type MockKind = "erp" | "mobile" | "web";

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
    slug: "distribution-erp",
    title: "Inventory and sales ERP for a distribution company",
    clientType: "Distribution · ERP",
    summary: "One system replacing a dozen Excel sheets.",
    challenge: "Stock and orders tracked across Excel sheets, with frequent errors.",
    solution: "A custom ERP with inventory, sales, invoicing and a mobile app for field staff.",
    result: "Placeholder — add a real, measurable outcome (time saved, users, rating, launch date).",
    tech: ["Flutter", "Next.js", "Node.js"],
    mock: "erp",
    accent: ["#eef2f9", "#2453e6"],
    images: [],
  },
  {
    slug: "booking-app",
    title: "Booking app for a services startup",
    clientType: "Startup · Mobile app",
    summary: "iOS and Android from a single Flutter codebase.",
    challenge: "Placeholder — describe the client's problem in one or two sentences.",
    solution: "Placeholder — a Flutter app for iOS and Android with bookings, payments via Stripe and push notifications.",
    result: "Placeholder — add a real, measurable outcome (time saved, users, rating, launch date).",
    tech: ["Flutter", "Firebase"],
    mock: "mobile",
    accent: ["#f1f5f9", "#0f766e"],
    images: [],
  },
  {
    slug: "saas-dashboard",
    title: "Analytics dashboard for a SaaS platform",
    clientType: "SaaS · Web app",
    summary: "A customer portal and admin dashboard in Next.js.",
    challenge: "Placeholder — describe the client's problem in one or two sentences.",
    solution: "Placeholder — a customer portal and admin dashboard built with React and Next.js.",
    result: "Placeholder — add a real, measurable outcome (time saved, users, rating, launch date).",
    tech: ["React", "Next.js", "Node.js"],
    mock: "web",
    accent: ["#f3f1fb", "#4f46e5"],
    images: [],
  },
];

export const caseStudies: CaseStudy[] = site.showSampleContent
  ? [...realCaseStudies, ...sampleCaseStudies].map((c) => ({ ...c, ...sampleCaseStudyDetails[c.slug] }))
  : realCaseStudies;

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
