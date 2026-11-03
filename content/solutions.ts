// SEO landing pages: one per service or industry people search for. Each becomes /solutions/[slug].
// Add more by copying an entry. Keep each focused on one search phrase (the `title`).

export type Solution = {
  slug: string;
  group: "Services" | "Industries";
  navLabel: string;
  title: string; // page H1 and SEO title — match how people search
  description: string; // meta description and intro
  problems: string[];
  deliverables: { title: string; description: string }[];
  caseStudy?: string; // slug from content/work.ts
  mock: "erp" | "mobile" | "web";
  faq: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "hire-flutter-developers",
    group: "Services",
    navLabel: "Hire Flutter developers",
    title: "Hire Flutter developers for iOS and Android",
    description:
      "Senior Flutter developers who ship native-quality iOS and Android apps from one codebase. Fixed-price projects or dedicated developers, NDA from day one.",
    problems: [
      "Hiring a senior Flutter developer locally takes months and costs a fortune.",
      "Two separate native teams double your budget and your bugs.",
      "Freelancers disappear halfway through, and nobody reviews their code.",
    ],
    deliverables: [
      { title: "One codebase, two stores", description: "iOS and Android from one Flutter codebase, with native performance." },
      { title: "Store submission", description: "App Store and Play Store setup, review and release handled for you." },
      { title: "Analytics and crash monitoring", description: "Firebase Analytics and Crashlytics from day one." },
      { title: "Dedicated or project-based", description: "Hire a full-time developer monthly, or hand us a fixed-scope project." },
    ],
    caseStudy: "booking-app",
    mock: "mobile",
    faq: [
      { q: "Is Flutter good enough for a production app?", a: "Yes. Flutter compiles to native code and is used in production by BMW, Google Pay and Alibaba. For most business apps it's indistinguishable from fully native." },
      { q: "Can I hire one Flutter developer full-time?", a: "Yes, from one month at a time. They work in your tools and hours, and our leads review their code." },
    ],
  },
  {
    slug: "mvp-development-for-startups",
    group: "Services",
    navLabel: "MVP development",
    title: "MVP development for funded startups",
    description:
      "Launch your MVP fast with a senior product team: design, mobile, web and backend under one roof, at a fraction of US and UK rates.",
    problems: [
      "Your runway is measured in months, and hiring a full team takes most of it.",
      "Agencies quote six figures for a first version you'll rewrite anyway.",
      "You need investors to see a real product, not a prototype.",
    ],
    deliverables: [
      { title: "Discovery and scope", description: "We cut the feature list down to what proves your idea." },
      { title: "Design first", description: "Clickable Figma prototype you can test with users and show investors." },
      { title: "Build in sprints", description: "Two-week sprints with a live demo after each one." },
      { title: "Launch and iterate", description: "Store release, analytics and a plan for version two." },
    ],
    caseStudy: "booking-app",
    mock: "mobile",
    faq: [
      { q: "How fast can you launch an MVP?", a: "It depends on the features you need first. After a free call we agree the scope and a timeline in writing, and we usually suggest the leanest first release that proves your idea." },
      { q: "Will we own the code?", a: "Yes. The code is in your GitHub from day one and the IP is assigned to you in the contract." },
    ],
  },
  {
    slug: "erp-for-distributors",
    group: "Industries",
    navLabel: "ERP for distributors",
    title: "Custom ERP software for distributors and traders",
    description:
      "Inventory, orders, invoicing and a mobile app for field sales — one system built around how your distribution business actually works.",
    problems: [
      "Stock numbers in Excel never match what's in the warehouse.",
      "Field staff phone orders in at the end of the day, and invoices go out late.",
      "Off-the-shelf ERP is expensive, rigid and your team won't use it.",
    ],
    deliverables: [
      { title: "Inventory and warehouse", description: "Live stock across warehouses, reorder alerts and batch tracking." },
      { title: "Orders and invoicing", description: "From order to invoice in minutes, with credit limits and payment tracking." },
      { title: "Field sales app", description: "Your sales team takes orders on their phones and sees live stock." },
      { title: "Reports", description: "Sales by customer, product, area and salesperson — in real time." },
    ],
    caseStudy: "distribution-erp",
    mock: "erp",
    faq: [
      { q: "How long does an ERP take?", a: "We start with the modules you need most so you go live quickly, then add the rest in phases. You get a written timeline after a free call." },
      { q: "Can you import our existing Excel data?", a: "Yes. Data migration from spreadsheets or your old system is part of every ERP project." },
    ],
  },
  {
    slug: "pharmacy-inventory-software",
    group: "Industries",
    navLabel: "Pharmacy software",
    title: "Pharmacy inventory and POS software",
    description:
      "Batch and expiry tracking, point of sale, purchasing and reports for single pharmacies and chains — built around your workflow.",
    problems: [
      "Expired stock is found too late, after it's already a loss.",
      "Each branch keeps its own records and nothing adds up.",
      "Generic POS software doesn't understand batches, expiries or schedules.",
    ],
    deliverables: [
      { title: "Batch and expiry tracking", description: "Alerts before stock expires, FEFO picking and returns to suppliers." },
      { title: "Point of sale", description: "Fast billing with barcode scanning, discounts and receipts." },
      { title: "Multi-branch", description: "Stock transfers and consolidated reports across all branches." },
      { title: "Purchasing", description: "Purchase orders, supplier ledgers and automatic reorder levels." },
    ],
    caseStudy: "distribution-erp",
    mock: "erp",
    faq: [{ q: "Does it work if the internet goes down?", a: "Yes. The POS keeps working offline and syncs when the connection is back." }],
  },
  {
    slug: "school-management-system",
    group: "Industries",
    navLabel: "School management system",
    title: "School management system for schools and institutes",
    description:
      "Fees, attendance, exams, results and a parent app — one system for single schools and multi-campus groups.",
    problems: [
      "Fee records live in registers and spreadsheets, so defaults are noticed late.",
      "Parents call the office for attendance and results.",
      "Each campus runs its own way, and head office can't see the whole picture.",
    ],
    deliverables: [
      { title: "Fee management", description: "Fee plans, vouchers, online payments, reminders and defaulter reports." },
      { title: "Attendance and timetable", description: "Daily attendance with same-day alerts to parents." },
      { title: "Exams and results", description: "Marks entry, report cards and progress over time." },
      { title: "Parent app", description: "Fees, attendance, results and announcements in one app." },
    ],
    caseStudy: "school-management",
    mock: "web",
    faq: [{ q: "Can it handle multiple campuses?", a: "Yes. Each campus has its own data, and head office gets consolidated reports." }],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
