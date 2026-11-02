import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const links = "text-ink/70 transition-colors hover:text-accent";
  return (
    <footer className="relative mt-10 bg-paper-2">
      <div className="container-x grid gap-12 pb-10 pt-20 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="font-display mt-6 max-w-sm text-3xl leading-tight">
            Software built around <em>your business.</em>
          </p>
          <p className="mt-4 text-sm text-muted">{site.location}</p>
        </div>
        <div>
          <p className="eyebrow mb-5">Pages</p>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className={links}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Say hello</p>
          <ul className="space-y-2.5">
            <li><a href={`mailto:${site.email}`} className={links}>{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className={links}>WhatsApp</a></li>
            <li><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className={links}>LinkedIn</a></li>
            <li><a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className={links}>Book a call</a></li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="font-display -mb-[0.2em] text-center text-[24vw] leading-none text-ink/[0.07]">Arcwell</p>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <p>Designed and built in Karachi.</p>
      </div>
    </footer>
  );
}
