import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const links = "text-muted transition-colors hover:text-ink";
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs leading-relaxed text-muted">
            Mobile apps, web platforms and custom ERP for startups and growing businesses worldwide.
          </p>
          <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent">
            Book a call
          </a>
        </div>
        <div>
          <p className="eyebrow mb-5">Company</p>
          <ul className="space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className={links}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-3 text-[15px]">
            <li><a href={`mailto:${site.email}`} className={links}>{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={links}>WhatsApp</a></li>
            <li><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className={links}>LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Office</p>
          <p className="text-[15px] leading-relaxed text-muted">{site.legalName}<br />{site.location}</p>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <p>NDA available on request · Your code and IP belong to you.</p>
      </div>
    </footer>
  );
}
