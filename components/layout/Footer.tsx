import Link from "next/link";
import { nav, registration, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { erpChecklist } from "@/content/resources";
import { Logo } from "@/components/ui/Logo";
import { ReviewBadges } from "@/components/ui/ReviewBadges";

export function Footer() {
  const links = "text-muted transition-colors hover:text-ink";
  const reg = [registration.secp && `SECP Reg. No. ${registration.secp}`, registration.ntn && `NTN ${registration.ntn}`, registration.pseb && `PSEB ${registration.pseb}`].filter(Boolean);
  const cols = [
    { title: "Company", items: nav.map((n) => ({ label: n.label, href: n.href })) },
    { title: "Solutions", items: solutions.map((s) => ({ label: s.navLabel, href: `/solutions/${s.slug}` })) },
    {
      title: "Resources",
      items: [
        { label: "Get an estimate", href: "/estimate" },
        { label: "Pricing", href: "/pricing" },
        { label: "ERP readiness checklist", href: `/resources/${erpChecklist.slug}` },
        { label: "Insights", href: "/insights" },
      ],
    },
  ];
  return (
    <footer className="border-t border-line bg-paper-2 pb-20 md:pb-0">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs leading-relaxed text-muted">Mobile apps, web platforms and custom ERP for startups and growing businesses worldwide.</p>
          <ul className="mt-6 space-y-2 text-[15px]">
            <li><a href={`mailto:${site.email}`} className={links}>{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={links}>WhatsApp</a> · <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className={links}>LinkedIn</a></li>
            <li className="text-muted">{site.location}</li>
          </ul>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="eyebrow mb-5">{c.title}</p>
            <ul className="space-y-3 text-[15px]">
              {c.items.map((i) => <li key={i.href}><Link href={i.href} className={links}>{i.label}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x border-t border-line py-8">
        <ReviewBadges compact />
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-line py-6 text-sm text-muted lg:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName}{reg.length ? ` · ${reg.join(" · ")}` : ""}</p>
        <p className="flex gap-5">
          <Link href="/privacy" className={links}>Privacy</Link>
          <Link href="/terms" className={links}>Terms</Link>
          <span>NDA on request</span>
        </p>
      </div>
    </footer>
  );
}
