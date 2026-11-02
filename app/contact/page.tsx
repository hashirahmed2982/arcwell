import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({ ...contact.seo, path: "/contact" });

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "WhatsApp", value: "Message us", href: site.whatsappUrl, external: true },
  { label: "LinkedIn", value: "Arcwell Digital", href: site.linkedinUrl, external: true },
  { label: "Call", value: contact.bookCall, href: site.bookCallUrl, external: true },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pt-48">
      <div aria-hidden className="dot-bg absolute inset-x-0 top-0 -z-10 h-[600px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal><p className="chapter mb-6">Contact</p></Reveal>
          <WordReveal text={contact.headline} highlight={["together"]} className="font-display text-balance text-5xl leading-[1.04] md:text-[4.25rem]" />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{contact.subtext}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="eyebrow mb-4 mt-14">{contact.otherHeading}</h2>
            <ul className="divide-y divide-line border-y border-line">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="text-muted">{l.label}</span>
                    <span className="flex items-center gap-2 font-medium transition-colors group-hover:text-accent">
                      {l.value} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
