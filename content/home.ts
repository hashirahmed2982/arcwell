export type ServiceKey = "mobile" | "web" | "erp" | "design";

export const home = {
  seo: {
    title: "Arcwell Digital — Software built around your business",
    description:
      "Mobile apps, web platforms and custom ERP systems — designed and built by a senior team that delivers on time.",
  },
  hero: {
    eyebrow: "A software studio in Karachi, Pakistan",
    headline: "Software built around your business.",
    subtext:
      "Mobile apps, web platforms and custom ERP systems — designed and built by a senior team that delivers on time.",
    primaryCta: "Book a free call",
    secondaryCta: { label: "See our work", href: "/work" },
  },
  // Narrative chapter shown after the hero. Words light up as the visitor scrolls.
  story: {
    chapter: "Chapter one — the problem",
    text: "It usually starts with a spreadsheet. Then a WhatsApp group, a notebook by the till and three apps that don't talk to each other. Somewhere along the way, the tools stopped fitting the business.",
    turn: "That's where we come in.",
  },
  services: {
    chapter: "Chapter two — what we build",
    heading: "Four things we do, *properly.*", // wrap words in *asterisks* for the italic accent
    items: [
      {
        key: "mobile" as ServiceKey,
        title: "Mobile apps",
        description: "Flutter apps for iOS and Android from one codebase. Launch faster, spend less.",
      },
      {
        key: "web" as ServiceKey,
        title: "Web apps and websites",
        description: "Fast, modern platforms, dashboards and sites built with React and Next.js.",
      },
      {
        key: "erp" as ServiceKey,
        title: "Custom ERP and business software",
        description:
          "Accounting, inventory, sales, HR and reporting in one system, built around how your business actually works.",
      },
      {
        key: "design" as ServiceKey,
        title: "UI/UX design",
        description: "Research, wireframes and polished interfaces your users will enjoy.",
      },
    ],
  },
  why: {
    chapter: "Chapter four — why us",
    heading: "Why teams *choose* Arcwell Digital",
    items: [
      { title: "Experienced team", description: "We've shipped large-scale apps used by thousands of businesses." },
      { title: "Built for you", description: "Custom software, not one-size-fits-all." },
      { title: "Clear process", description: "Fixed scope, weekly demos, no surprises." },
      { title: "You own it", description: "Your code and IP belong to you from day one." },
      {
        title: "Great value",
        description: "A Pakistan-based team that overlaps with Gulf and UK hours, at a fraction of Western rates.",
      },
      { title: "Long-term support", description: "We stay with you after launch." },
    ],
  },
  process: {
    chapter: "Chapter five — how we work",
    heading: "How we *work*",
    steps: [
      { title: "Discovery", description: "We learn your business, users and goals." },
      { title: "Scope and estimate", description: "A clear plan with timeline and pricing." },
      { title: "Design", description: "You approve every screen before development." },
      { title: "Build", description: "Two-week sprints with a live demo after each." },
      { title: "Launch and support", description: "We go live, train your team and keep improving." },
    ],
  },
  codeToProduct: {
    chapter: "Chapter three — from code to product",
    heading: "We don't just design it. We *build* it.",
    subtext: "Every line on the left becomes something your team can use on the right.",
  },
  featuredWork: {
    chapter: "Chapter six — selected work",
    heading: "Featured *work*",
    linkLabel: "All case studies",
  },
  techHeading: "Built with tools we know inside out",
  cta: {
    headline: "Have a project in mind?",
    subtext: "Tell us what you're building. We'll reply within 24 hours.",
    button: "Book a free call",
  },
};
