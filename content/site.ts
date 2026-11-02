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
  // Custom animated cursor (from the brief). Off by default for a more conventional, professional feel.
  customCursor: false,
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

// Short trust facts shown under the hero. Keep these factual.
export const assurances = [
  { title: "NDA from day one", description: "Every engagement starts under a signed NDA." },
  { title: "You own the IP", description: "Code and designs belong to you from day one." },
  { title: "UK & Gulf hours", description: "Our working day overlaps with yours." },
  { title: "Reply within 24 hours", description: "A clear answer and next steps, fast." },
];

// Markets we serve; drawn as arcs from Karachi on the hero globe. [label, latitude, longitude]
export const markets: [string, number, number][] = [
  ["London", 51.5, -0.12],
  ["Dubai", 25.2, 55.27],
  ["Riyadh", 24.71, 46.68],
  ["New York", 40.71, -74.0],
];
export const homeBase: [string, number, number] = ["Karachi", 24.86, 67.0];

// Real numbers only. Leave the array empty to hide the stats strip entirely.
// Example: { value: 40, suffix: "+", label: "Projects shipped" }
export const stats: { value: number; suffix?: string; label: string }[] = [];

// Hidden until real testimonials exist. Add objects to show the block.
export const testimonials: { quote: string; name: string; role: string }[] = [];
