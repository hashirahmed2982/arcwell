// Engagement models and FAQ. Deliberately no prices or ranges: every project is quoted
// individually after a free call, so leads of every size get in touch.

export const pricing = {
  seo: {
    title: "Engagement models and pricing",
    description:
      "Fixed-scope projects, monthly retainers or dedicated developers. Every project is quoted individually after a free call — for budgets of every size.",
  },
  eyebrow: "Engagement",
  heading: "A proposal built around your project — not a price list.",
  intro:
    "Every project is different, so we don't publish a rate card. Tell us what you need and we'll send a written proposal after a free call — whether you're testing an idea or replacing a whole system.",
  models: [
    {
      name: "Fixed-scope project",
      bestFor: "New apps, MVPs, websites and ERP with a clear goal",
      points: ["Scope, timeline and price agreed in writing", "Paid in milestones, after each demo", "Two-week sprints with live demos", "Free fixes period after launch"],
      cta: "Get a free quote",
      href: "/quote",
      featured: true,
    },
    {
      name: "Monthly retainer",
      bestFor: "Ongoing improvements, support and maintenance",
      points: ["A set number of hours each month", "Updates, fixes, hosting and new features", "Priority response from your team", "Flexible — adjust as you grow"],
      cta: "Book a call",
      href: "book",
      featured: false,
    },
    {
      name: "Dedicated developers",
      bestFor: "Agencies and teams that need extra hands",
      points: ["Full-time Flutter, React or Node.js developers", "Work in your tools and your hours", "Managed and code-reviewed by our leads", "Scale up or down monthly"],
      cta: "Hire developers",
      href: "/agencies",
      featured: false,
    },
  ],
  howHeading: "How we price a project",
  howSteps: [
    { title: "Free call", description: "30 minutes on your goals, users and constraints. No commitment." },
    { title: "Written proposal", description: "Scope, timeline, milestones and a fixed price — usually within 48 hours." },
    { title: "Pay per milestone", description: "You pay as each milestone is delivered and approved." },
    { title: "Grow at your pace", description: "Add features or move to a monthly plan when you're ready." },
  ],
  sizesHeading: "Projects of every size",
  sizesIntro: "Some clients start with a single feature, others with a full platform. We'll shape the plan to your budget.",
  sizes: [
    { title: "Start small", description: "A prototype, an MVP or one ERP module to prove the idea before investing more." },
    { title: "Build in phases", description: "Launch the core first, then add modules and features as the business grows." },
    { title: "Full product", description: "Design, mobile, web and backend delivered end-to-end by one team." },
  ],
};

export const faq = [
  {
    q: "How much will my project cost?",
    a: "It depends on what you need, so we don't guess before we understand it. After a free 30-minute call we send a written proposal with a fixed price. If your budget is limited, we'll suggest a smaller first phase rather than say no.",
  },
  {
    q: "How do you work across time zones?",
    a: "Our office hours overlap with the UK morning and the full Gulf working day. US clients get a daily written update and calls in their morning.",
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
    a: "Every project includes a free fixes period. After that, most clients move to a monthly support plan for updates, hosting and new features.",
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
