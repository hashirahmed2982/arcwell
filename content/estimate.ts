// Project estimate calculator. Gives a ballpark range and sends the answers to you as a lead.
// ⚠️ SAMPLE prices — tune these numbers to your real rates (USD).

export const estimate = {
  seo: {
    title: "Get a project estimate",
    description: "Answer five quick questions and get a ballpark price and timeline for your app, web platform or ERP.",
  },
  eyebrow: "Project estimate",
  heading: "Get a ballpark estimate in two minutes.",
  intro: "Answer five quick questions. We'll show you a price range and timeline, then follow up with a fixed quote.",
  steps: {
    type: {
      question: "What are you building?",
      options: [
        { id: "mobile", label: "Mobile app", hint: "iOS and Android", base: 10000, weeks: 8 },
        { id: "web", label: "Web app or SaaS", hint: "Portal, dashboard, platform", base: 12000, weeks: 8 },
        { id: "erp", label: "Custom ERP", hint: "Business software", base: 15000, weeks: 10 },
        { id: "website", label: "Website", hint: "Marketing or company site", base: 2500, weeks: 3 },
        { id: "design", label: "Design only", hint: "UI/UX in Figma", base: 4000, weeks: 4 },
      ],
    },
    features: {
      question: "Which features do you need?",
      hint: "Pick all that apply.",
      options: [
        { id: "auth", label: "User accounts and login", cost: 1000, weeks: 0.5 },
        { id: "payments", label: "Payments (Stripe, etc.)", cost: 2500, weeks: 1 },
        { id: "admin", label: "Admin dashboard", cost: 3000, weeks: 1.5 },
        { id: "chat", label: "Chat or messaging", cost: 3000, weeks: 1.5 },
        { id: "maps", label: "Maps and location", cost: 2000, weeks: 1 },
        { id: "notifications", label: "Push notifications", cost: 1000, weeks: 0.5 },
        { id: "integrations", label: "Third-party integrations", cost: 2500, weeks: 1 },
        { id: "reports", label: "Reports and analytics", cost: 2500, weeks: 1 },
        { id: "multilang", label: "Multiple languages (e.g. Arabic)", cost: 1500, weeks: 0.5 },
        { id: "offline", label: "Works offline", cost: 2500, weeks: 1 },
      ],
    },
    design: {
      question: "Where are you with design?",
      options: [
        { id: "none", label: "Starting from scratch", hint: "We'll design it", factor: 1.2 },
        { id: "wireframes", label: "We have wireframes", hint: "We'll polish them", factor: 1.1 },
        { id: "ready", label: "Designs are ready", hint: "Figma or similar", factor: 1 },
      ],
    },
    timeline: {
      question: "When do you need it?",
      options: [
        { id: "asap", label: "As soon as possible", hint: "Larger team, faster", factor: 1.2 },
        { id: "normal", label: "In 2–4 months", hint: "Standard pace", factor: 1 },
        { id: "flexible", label: "Flexible", hint: "Best value", factor: 0.95 },
      ],
    },
  },
  rangeSpread: 0.25, // shows estimate −0%/+25%
  resultNote: "This is a ballpark, not a quote. After a short call we send a fixed price, a timeline and a milestone plan.",
};
