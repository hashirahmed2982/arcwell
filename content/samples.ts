// SAMPLE CONTENT — for previewing the design only.
// Every name, number and quote below is invented. Shown only while `site.showSampleContent` is true.
// Before launch: set it to false and add real data to content/site.ts and content/work.ts (see TODO.md).

import type { CaseStudy } from "./work";

export const sampleStats = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 6, label: "Countries served" },
  { value: 92, suffix: "%", label: "Clients who come back" },
];

export const sampleTestimonials = [
  {
    quote:
      "We went from twelve spreadsheets to one system our warehouse team actually likes using. The weekly demos meant there were no surprises — what we saw on Friday is what went live.",
    name: "Imran Siddiqui",
    role: "Operations Director",
    company: "Northgate Distribution",
  },
  {
    quote: "They shipped our iOS and Android apps in eleven weeks, on budget. Communication was better than with agencies we've used in London.",
    name: "Sarah Whitfield",
    role: "Co-founder & CEO",
    company: "Tendly Health",
  },
  {
    quote: "Arcwell works as an extension of our team. We hand over the Flutter work with confidence and our clients never notice the seams.",
    name: "Omar Al-Harbi",
    role: "Managing Partner",
    company: "Dune Studio, Riyadh",
  },
  {
    quote: "Clear scope, honest estimates and a team that answers in our working hours. Our dashboard launched a week early.",
    name: "James Porter",
    role: "Head of Product",
    company: "Ledgerline",
  },
];

// Wordmarks for the "Trusted by" row. Fictional companies.
export const sampleClients = ["Northgate", "Tendly", "Ledgerline", "Dune Studio", "Al-Noor Traders", "Brightpath Schools", "Kestrel Foods"];

// Extra detail merged into the case studies in content/work.ts.
export const sampleCaseStudyDetails: Record<string, Partial<CaseStudy>> = {
  "distribution-erp": {
    summary: "Order-to-invoice time cut from two days to three hours.",
    challenge:
      "A distributor with 1,200 retail customers tracked stock and orders across a dozen Excel sheets. Stock counts were often wrong, invoices went out late and field staff phoned orders in at the end of the day.",
    solution:
      "A custom ERP covering inventory, sales, invoicing and accounts, plus a Flutter app for 40 field staff to take orders on the spot and see live stock.",
    result:
      "Order-to-invoice time fell from two days to three hours. Stock discrepancies dropped by 85% in the first quarter, and every field order now reaches the warehouse instantly.",
    metrics: [
      { value: "3 hrs", label: "Order to invoice, down from 2 days" },
      { value: "−85%", label: "Stock discrepancies" },
      { value: "40", label: "Field staff on the mobile app" },
    ],
  },
  "booking-app": {
    summary: "Launched on iOS and Android in 11 weeks, rated 4.8★.",
    challenge:
      "A UK health-services startup needed patient booking on iOS and Android before its seed round closed — with a small budget and a fixed launch date.",
    solution:
      "One Flutter codebase for both platforms, with bookings, Stripe payments, reminders and medical records, plus an admin dashboard for clinic staff.",
    result:
      "Both apps went live in 11 weeks. The app holds a 4.8★ rating and handled 15,000 bookings in its first six months.",
    metrics: [
      { value: "11 wks", label: "From kickoff to App Store" },
      { value: "4.8★", label: "Average store rating" },
      { value: "15k", label: "Bookings in six months" },
    ],
  },
  "saas-dashboard": {
    summary: "A new customer portal that cut support tickets by 40%.",
    challenge:
      "A billing SaaS company's customers could not see their own usage or invoices, so every question became a support ticket.",
    solution:
      "A self-service customer portal and internal admin dashboard in Next.js, connected to the existing billing API, with role-based access and exports.",
    result: "Support tickets fell 40% within two months, and page loads are under a second on mobile.",
    metrics: [
      { value: "−40%", label: "Support tickets" },
      { value: "<1s", label: "Page load on mobile" },
      { value: "2,300", label: "Active customer accounts" },
    ],
  },
  "school-management": {
    summary: "Fees, attendance and results for 3 campuses in one system.",
    challenge:
      "A school group with three campuses ran fees, attendance and exam results on paper registers and separate spreadsheets for each campus.",
    solution:
      "A school management system with fee collection, attendance, results and a parent app, rolled out campus by campus.",
    result: "Fee collection is now 95% on time, and parents get attendance alerts the same morning.",
    metrics: [
      { value: "3", label: "Campuses on one system" },
      { value: "95%", label: "Fees collected on time" },
      { value: "2,800", label: "Students" },
    ],
  },
};

export const sampleCaseStudies: CaseStudy[] = [
  {
    slug: "school-management",
    title: "School management system for a group of three campuses",
    clientType: "Education · ERP",
    summary: "",
    challenge: "",
    solution: "",
    result: "",
    tech: ["Next.js", "Node.js", "Flutter"],
    mock: "web",
    accent: ["#eff6f3", "#0f766e"],
    images: [],
  },
];

// Demo apps visitors can try (brief: "1–2 demo apps of your own").
export const sampleDemoApps = [
  {
    title: "Retail ERP demo",
    description: "Inventory, sales and invoicing for a small distributor. Log in as a manager and explore.",
    tags: ["ERP", "Next.js"],
    href: "#",
  },
  {
    title: "Clinic booking app",
    description: "Book, pay and manage appointments. Available as a web preview of the Flutter app.",
    tags: ["Mobile", "Flutter"],
    href: "#",
  },
];

// Review-platform badges (invented ratings).
export const sampleReviews = [
  { platform: "Clutch", rating: "4.9", reviews: "12 reviews", href: "#" },
  { platform: "GoodFirms", rating: "5.0", reviews: "8 reviews", href: "#" },
  { platform: "Upwork", rating: "Top Rated", reviews: "100% Job Success", href: "#" },
];

export const sampleRegistration = { secp: "0123456", ntn: "1234567-8", pseb: "Z-00000" };
