export type ServiceKey = "mobile" | "web" | "erp" | "design";

// In headings, wrap words in *asterisks* to show them in the accent colour.
export const home = {
  seo: {
    title: "Arcwell Digital — Software built around your business",
    description:
      "Mobile apps, web platforms and custom ERP systems — designed and built by a senior team that delivers on time.",
  },
  hero: {
    eyebrow: "Software studio · Karachi, Pakistan",
    headline: "Software built around your business.",
    subtext:
      "Mobile apps, web platforms and custom ERP systems — designed and built by a senior team that delivers on time.",
    primaryCta: "Book a free call",
    secondaryCta: { label: "See our work", href: "/work" },
    servingLabel: "Working with clients across",
  },
  // Narrative section after the hero. Words darken as the visitor scrolls.
  story: {
    chapter: "01 — The challenge",
    text: "Most growing businesses run on a patchwork of spreadsheets, messaging groups and tools that don't talk to each other. Data gets lost, work is duplicated and decisions slow down.",
    turn: "We replace that patchwork with software designed around how your business actually works.",
  },
  services: {
    chapter: "02 — Services",
    heading: "What we build",
    intro: "Four disciplines, one senior team — from first wireframe to production.",
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
  codeToProduct: {
    chapter: "03 — Engineering",
    heading: "Designed and *engineered* under one roof.",
    subtext: "Every line of code maps to something your team uses every day. No hand-offs between agencies, no lost context.",
  },
  why: {
    chapter: "04 — Why us",
    heading: "Why Arcwell Digital",
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
    chapter: "05 — Process",
    heading: "How we work",
    steps: [
      { title: "Discovery", description: "We learn your business, users and goals." },
      { title: "Scope and estimate", description: "A clear plan with timeline and pricing." },
      { title: "Design", description: "You approve every screen before development." },
      { title: "Build", description: "Two-week sprints with a live demo after each." },
      { title: "Launch and support", description: "We go live, train your team and keep improving." },
    ],
  },
  featuredWork: {
    chapter: "06 — Case studies",
    heading: "Featured work",
    linkLabel: "All case studies",
  },
  techHeading: "Technologies we work with",
  cta: {
    headline: "Have a project in mind?",
    subtext: "Tell us what you're building. We'll reply within 24 hours.",
    button: "Book a free call",
  },
};
