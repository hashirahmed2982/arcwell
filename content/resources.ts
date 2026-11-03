// Lead magnets: free resources exchanged for an email address.

export const erpChecklist = {
  slug: "erp-readiness-checklist",
  seo: {
    title: "ERP readiness checklist",
    description: "A free 15-point checklist to tell whether your business is ready for a custom ERP, and which modules to start with.",
  },
  eyebrow: "Free resource",
  heading: "Is your business ready for an ERP?",
  intro: "A 15-point checklist we use with clients to decide whether a custom ERP makes sense, and which modules to build first.",
  formHeading: "Get the checklist",
  formNote: "We'll also email you a copy. No spam — one follow-up at most.",
  sections: [
    {
      title: "Operations",
      items: [
        "Stock counts regularly differ from what the records say.",
        "Orders arrive through phone calls, WhatsApp or paper.",
        "Invoices go out more than a day after delivery.",
        "Purchasing is done from memory, not reorder levels.",
        "More than one location or warehouse holds stock.",
      ],
    },
    {
      title: "Finance",
      items: [
        "Month-end closing takes more than three days.",
        "Late payments are noticed at month-end, not on the due date.",
        "Customer credit limits aren't enforced automatically.",
        "Sales, stock and accounts live in separate files or tools.",
        "Owners can't see today's cash position without asking someone.",
      ],
    },
    {
      title: "People and growth",
      items: [
        "Only one or two people understand the main spreadsheets.",
        "Field or sales staff need information while away from the office.",
        "Attendance and payroll are calculated by hand.",
        "You plan to open a new branch or product line within a year.",
        "Reports take more than an hour to put together.",
      ],
    },
  ],
  scoring: [
    { min: 0, max: 4, label: "Not yet", text: "Spreadsheets are probably still fine. Revisit this in six months." },
    { min: 5, max: 9, label: "Getting there", text: "Start with one or two modules — usually inventory and invoicing." },
    { min: 10, max: 15, label: "Ready now", text: "A custom ERP will likely pay for itself within a year." },
  ],
};

export const workflowReview = {
  heading: "Free 20-minute ERP workflow review",
  text: "Show us how you run stock, sales and accounts today. We'll tell you what to automate first — even if you never hire us.",
  cta: "Book a free review",
};
