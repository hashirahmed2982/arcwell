// Blog / insights. Each post becomes /insights/[slug].
// Body blocks: { p } paragraph, { h } heading, { list } bullet list, { quote } pull quote.
// ⚠️ These three posts are SAMPLE articles written for the preview — review, edit or replace them.

export type Block = { p: string } | { h: string } | { list: string[] } | { quote: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  author: string;
  body: Block[];
};

export const insights = {
  seo: { title: "Insights", description: "Practical notes on building apps, web platforms and ERP — from the Arcwell Digital team." },
  eyebrow: "Insights",
  heading: "Notes from the work.",
  intro: "Lessons from real projects: what to build first, what it costs and what to avoid.",
};

export const posts: Post[] = [
  {
    slug: "flutter-vs-native-for-startups",
    title: "Flutter vs native: what should a startup build its first app in?",
    excerpt: "One codebase or two? A practical comparison of cost, speed and quality for a first release.",
    category: "Mobile",
    date: "2026-10-14",
    readMinutes: 6,
    author: "Arcwell Digital team",
    body: [
      { p: "Most founders we talk to ask the same question in the first call: should we build native iOS and Android apps, or use Flutter? For a first release, the answer is almost always Flutter — but not always." },
      { h: "Cost and speed" },
      { p: "With native development you build and test everything twice. With Flutter one team ships both platforms from one codebase. In our projects that typically saves 30–40% of the budget and several weeks on the timeline." },
      { h: "Quality" },
      { p: "Flutter compiles to native code and draws its own interface, so animations are smooth and the app feels the same on every phone. Users can't tell the difference for typical business apps: bookings, marketplaces, dashboards, field-sales tools." },
      { h: "When native is the better choice" },
      { list: ["Heavy use of the newest platform features on day one (for example, the latest AR or health APIs).", "Apps that are mostly a thin layer on one platform, such as a watch app.", "You already have separate, experienced iOS and Android teams."] },
      { quote: "For a first version, speed to market and one clean codebase matter more than squeezing out the last 2% of native performance." },
      { p: "If you're unsure, a short discovery call is usually enough to decide. We'll tell you honestly if native is the better fit." },
    ],
  },
  {
    slug: "signs-your-business-has-outgrown-spreadsheets",
    title: "7 signs your business has outgrown spreadsheets",
    excerpt: "Spreadsheets are a great start. Here's how to tell when they've started costing you money.",
    category: "ERP",
    date: "2026-09-30",
    readMinutes: 5,
    author: "Arcwell Digital team",
    body: [
      { p: "Almost every business starts on spreadsheets, and that's fine. The problem is that the cost of staying on them grows quietly until it's bigger than the cost of moving off." },
      { h: "The signs" },
      { list: ["Stock in the sheet doesn't match stock on the shelf.", "Only one person really understands the master file.", "Invoices go out days after the order.", "You find out about late payments at month-end.", "Field staff phone or WhatsApp orders in.", "Each branch keeps its own version of the truth.", "Reports take a day to put together, and are out of date when they're done."] },
      { p: "If three or more of these sound familiar, a simple custom ERP will likely pay for itself within a year — mainly through fewer stock errors and faster invoicing." },
      { h: "Start small" },
      { p: "You don't need every module on day one. Start with the area that hurts most — usually inventory and invoicing — go live in weeks, and add modules as you grow." },
    ],
  },
  {
    slug: "how-to-brief-a-software-agency",
    title: "How to brief a software agency (and get an accurate quote)",
    excerpt: "The one-page brief that gets you a fixed price instead of a vague range.",
    category: "Process",
    date: "2026-09-12",
    readMinutes: 4,
    author: "Arcwell Digital team",
    body: [
      { p: "The quality of a quote depends on the quality of the brief. A good brief doesn't need to be long — one page is usually enough." },
      { h: "What to include" },
      { list: ["The problem, in one paragraph: who has it and what it costs them today.", "Who the users are, and what the first version must let them do.", "Must-have versus nice-to-have features.", "Any existing systems it needs to connect to.", "Your timeline and budget range — even a rough one.", "Examples of apps you like, and why."] },
      { quote: "Sharing a budget range isn't a negotiating mistake. It lets the agency tell you what's realistic for that money." },
      { p: "Don't have a brief yet? Our free quote form takes two minutes and gives us everything we need for a first call." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
