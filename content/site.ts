// Global site settings. Edit these values — no component changes needed.

export const site = {
  name: "Arcwell Digital",
  legalName: "Arcwell Digital (Pvt) Ltd.",
  tagline: "Software built around your business.",
  description:
    "Arcwell Digital is a Karachi-based studio building mobile apps, web platforms and custom ERP for startups and growing businesses worldwide.",
  // TODO: replace with the final domain once purchased.
  url: "https://arcwell.digital",
  email: "hello@arcwell.digital",
  // TODO: replace with real links.
  bookCallUrl: "https://cal.com/arcwell/intro",
  whatsappUrl: "https://wa.me/920000000000",
  linkedinUrl: "https://www.linkedin.com/company/arcwell-digital",
  location: "Karachi, Pakistan",
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "ERP", href: "/erp" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Shown in the scrolling marquee on the home page.
export const techStack = ["Flutter", "React", "Next.js", "Node.js", "Firebase", "Figma"];

// Real numbers only. Leave the array empty to hide the stats strip entirely.
// Example: { value: 40, suffix: "+", label: "Projects shipped" }
export const stats: { value: number; suffix?: string; label: string }[] = [];

// Hidden until real testimonials exist. Add objects to show the block.
export const testimonials: { quote: string; name: string; role: string }[] = [];
