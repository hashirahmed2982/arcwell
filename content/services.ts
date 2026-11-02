export const services = {
  seo: {
    title: "Services",
    description:
      "Mobile apps in Flutter, web apps in React and Next.js, custom ERP, UI/UX design and ongoing support — from sketch to launch.",
  },
  heading: "Services",
  intro: "Everything you need to take an idea from sketch to launch — and keep it running.",
  items: [
    {
      id: "mobile",
      title: "Mobile apps (Flutter)",
      description: "Native-quality iOS and Android apps from one codebase.",
      deliverables: ["Designs", "App", "App Store and Play Store submission", "Analytics", "Crash monitoring"],
    },
    {
      id: "web",
      title: "Web apps and websites (React, Next.js)",
      description: "Customer portals, SaaS platforms, admin dashboards and marketing sites.",
      deliverables: ["Responsive build", "Hosting setup", "SEO basics"],
    },
    {
      id: "erp",
      title: "Custom ERP and business software",
      description: "See the ERP page.",
      link: { label: "Explore ERP", href: "/erp" },
      deliverables: [] as string[],
    },
    {
      id: "design",
      title: "UI/UX design",
      description: "User flows, wireframes, high-fidelity Figma designs and a reusable design system.",
      deliverables: ["User flows", "Wireframes", "High-fidelity Figma designs", "Design system"],
    },
    {
      id: "support",
      title: "Support and maintenance",
      description: "Monthly plans for updates, fixes, hosting and new features.",
      deliverables: ["Updates", "Fixes", "Hosting", "New features"],
    },
  ],
  outOfScope:
    "We don't build core banking backends, SAP implementations or compliance-heavy financial systems. Fintech work is limited to front-ends that integrate with existing APIs or providers like Stripe.",
};
