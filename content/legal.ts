// Privacy policy and terms. ⚠️ TEMPLATE TEXT — have a lawyer review before launch,
// and update the company details, analytics tool and processors to match what you actually use.
import type { Block } from "./insights";

export const legalUpdated = "2026-11-03";

export const privacy: { title: string; description: string; body: Block[] } = {
  title: "Privacy policy",
  description: "How Arcwell Digital collects, uses and protects personal data.",
  body: [
    { p: "Arcwell Digital (Pvt) Ltd. (\"we\", \"us\") respects your privacy. This policy explains what personal data we collect through this website, why, and your rights. It is written to meet the UK GDPR, the EU GDPR and the UAE PDPL." },
    { h: "What we collect" },
    { list: ["Details you send us through our forms: name, email, company, project details and, if you choose to share it, a budget.", "How you found us: referring website and campaign tags (for example, utm_source), stored in your browser.", "Anonymous usage statistics through our analytics provider."] },
    { h: "Why we use it" },
    { list: ["To reply to your enquiry and prepare a proposal (legitimate interest / pre-contract steps).", "To send a resource you asked for, such as a checklist (consent).", "To understand which pages and channels are useful (legitimate interest)."] },
    { h: "Who we share it with" },
    { p: "We use trusted processors to run this website: Vercel (hosting), Formspree (form delivery), Cal.com (call booking) and Plausible Analytics (cookie-free statistics). We never sell your data or use it for advertising." },
    { h: "How long we keep it" },
    { p: "Enquiries are kept for up to 24 months, or for the length of any contract with you plus the period required by law." },
    { h: "Your rights" },
    { p: "You can ask to access, correct, delete or export your data, or object to how we use it, by emailing hello@arcwell.digital. You can also complain to your local data protection authority (in the UK, the ICO)." },
    { h: "Cookies" },
    { p: "Our analytics are cookie-free. If we ever use cookies for analytics, we'll ask for your consent first through a banner." },
  ],
};

export const terms: { title: string; description: string; body: Block[] } = {
  title: "Terms of use",
  description: "Terms for using the Arcwell Digital website.",
  body: [
    { p: "By using this website you agree to these terms. If you don't agree, please don't use the site." },
    { h: "Information on this site" },
    { p: "Nothing on this site is an offer or a quote. A project starts only once both parties sign a written agreement with a fixed scope and price." },
    { h: "Intellectual property" },
    { p: "The content and design of this website belong to Arcwell Digital (Pvt) Ltd. Client work shown in case studies is shown with permission or anonymised; it belongs to the respective clients." },
    { h: "Demo apps" },
    { p: "Demo apps are provided as-is for evaluation. Don't enter real personal or business data into them." },
    { h: "Liability" },
    { p: "We aim to keep this site accurate but don't guarantee it is free of errors. To the extent allowed by law, we aren't liable for losses arising from use of the site." },
    { h: "Governing law" },
    { p: "These terms are governed by the laws of Pakistan, unless a signed agreement with you says otherwise." },
  ],
};
