// Pricing, engagement models and FAQ.
// ⚠️ All prices below are SAMPLE figures — replace with your real rates before launch (see TODO.md).

export const currencies = [
  // rate = how many units of this currency per 1 USD. Update occasionally.
  { code: "USD", symbol: "$", rate: 1 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "AED", symbol: "AED ", rate: 3.67 },
  { code: "SAR", symbol: "SAR ", rate: 3.75 },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

/** Formats a USD amount in the chosen currency, rounded to a friendly number. */
export function money(usd: number, code: CurrencyCode) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const v = usd * c.rate;
  const step = v >= 10000 ? 500 : v >= 1000 ? 100 : 10;
  return `${c.symbol}${(Math.round(v / step) * step).toLocaleString("en-US")}`;
}

export const pricing = {
  seo: {
    title: "Pricing and engagement models",
    description: "Fixed-price projects, monthly retainers or a dedicated developer. Typical starting prices for apps, web platforms and custom ERP.",
  },
  eyebrow: "Pricing",
  heading: "Clear pricing, before we write a line of code.",
  intro: "Every project gets a fixed written quote after a free discovery call. These ranges help you plan.",
  models: [
    {
      name: "Fixed-price project",
      bestFor: "New apps, MVPs and websites with a clear scope",
      price: { from: 8000, unit: "per project" },
      points: ["Fixed scope, timeline and price", "Paid in milestones, after each demo", "Two-week sprints with live demos", "30 days of free fixes after launch"],
      cta: "Get an estimate",
      href: "/estimate",
      featured: true,
    },
    {
      name: "Monthly retainer",
      bestFor: "Ongoing improvements, support and maintenance",
      price: { from: 1500, unit: "per month" },
      points: ["A set number of hours each month", "Updates, fixes, hosting and new features", "Priority response within one business day", "Cancel with 30 days' notice"],
      cta: "Book a call",
      href: "book",
      featured: false,
    },
    {
      name: "Dedicated developer",
      bestFor: "Agencies and teams that need extra hands",
      price: { from: 2800, unit: "per developer / month" },
      points: ["Full-time Flutter, React or Node.js developer", "Works in your tools and your hours", "Managed and code-reviewed by our leads", "Scale up or down monthly"],
      cta: "Hire a developer",
      href: "/agencies",
      featured: false,
    },
  ],
  startingPrices: {
    heading: "Typical starting prices",
    note: "Final price depends on features, integrations and timeline. You always get a fixed quote first.",
    items: [
      { name: "Marketing website", from: 2500, weeks: "2–4 weeks" },
      { name: "Mobile app MVP (iOS + Android)", from: 12000, weeks: "8–12 weeks" },
      { name: "Web app or SaaS MVP", from: 15000, weeks: "8–14 weeks" },
      { name: "Custom ERP — core modules", from: 18000, weeks: "10–16 weeks" },
      { name: "UI/UX design only", from: 4000, weeks: "3–6 weeks" },
    ],
  },
};

export const faq = [
  {
    q: "How do you work across time zones?",
    a: "Our office hours (10 am–7 pm PKT) overlap with the UK morning and the full Gulf working day. US clients get a daily written update and calls in their morning.",
  },
  {
    q: "How do payments work?",
    a: "Projects are split into milestones. You pay a deposit to start, then each milestone after you've seen and approved the demo. We invoice in USD, GBP or AED by bank transfer, Wise or Payoneer.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do, from day one. We sign an NDA before discovery and an IP-assignment agreement with the contract. The code lives in your GitHub and your accounts.",
  },
  {
    q: "How will we communicate?",
    a: "You get one project manager, a shared Slack or WhatsApp channel, a weekly demo call and access to the task board. No chasing for updates.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 30 days of free fixes. After that, most clients move to a monthly support plan for updates, hosting and new features.",
  },
  {
    q: "Can you work with our existing team or code?",
    a: "Yes. We regularly take over existing Flutter, React and Node.js codebases, starting with a short code review and a plan.",
  },
  {
    q: "What don't you do?",
    a: "Core banking backends, SAP implementations or compliance-heavy financial systems. Fintech work is limited to front-ends that integrate with existing APIs or providers like Stripe.",
  },
];
