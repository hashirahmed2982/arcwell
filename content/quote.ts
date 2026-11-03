// "Get a free quote" project planner. Collects the project brief as a lead — it never shows a price.
// The proposal and price are sent only after a call.

export const quote = {
  seo: {
    title: "Get a free quote",
    description: "Tell us about your app, web platform or ERP in two minutes. We'll reply within 24 hours and send a written proposal after a free call.",
  },
  eyebrow: "Free quote",
  heading: "Tell us about your project.",
  intro: "Five quick questions — about two minutes. We'll review your brief and reply within 24 hours.",
  steps: {
    type: {
      question: "What are you building?",
      options: [
        { id: "mobile", label: "Mobile app", hint: "iOS and Android" },
        { id: "web", label: "Web app or SaaS", hint: "Portal, dashboard, platform" },
        { id: "erp", label: "Custom ERP", hint: "Business software" },
        { id: "website", label: "Website", hint: "Marketing or company site" },
        { id: "design", label: "Design only", hint: "UI/UX in Figma" },
        { id: "team", label: "Extra developers", hint: "For your team or agency" },
      ],
    },
    features: {
      question: "Which features do you need?",
      hint: "Pick all that apply — or skip if you're not sure yet.",
      options: [
        { id: "auth", label: "User accounts and login" },
        { id: "payments", label: "Payments (Stripe, etc.)" },
        { id: "admin", label: "Admin dashboard" },
        { id: "chat", label: "Chat or messaging" },
        { id: "maps", label: "Maps and location" },
        { id: "notifications", label: "Push notifications" },
        { id: "integrations", label: "Third-party integrations" },
        { id: "reports", label: "Reports and analytics" },
        { id: "multilang", label: "Multiple languages (e.g. Arabic)" },
        { id: "offline", label: "Works offline" },
      ],
    },
    stage: {
      question: "Where are you right now?",
      options: [
        { id: "idea", label: "Just an idea", hint: "We'll help shape it" },
        { id: "wireframes", label: "Wireframes or a brief", hint: "Scope is taking shape" },
        { id: "designs", label: "Designs are ready", hint: "Figma or similar" },
        { id: "existing", label: "Existing product", hint: "Improve or take over" },
      ],
    },
    timeline: {
      question: "When would you like to start?",
      options: [
        { id: "now", label: "Right away", hint: "Within a few weeks" },
        { id: "soon", label: "In 1–3 months", hint: "Planning ahead" },
        { id: "exploring", label: "Just exploring", hint: "Gathering options" },
      ],
    },
  },
  budgetLabel: "Budget in mind? (optional)",
  budgetPlaceholder: "Fine to leave blank — we'll discuss it on the call",
  doneHeading: "Thanks — we've got your brief.",
  doneText: "We'll review it and reply within 24 hours. The quickest next step is a free 30-minute call — we'll send a written proposal straight after.",
};
