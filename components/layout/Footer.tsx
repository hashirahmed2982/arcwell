import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-muted">{site.tagline}</p>
          <p className="mt-2 text-sm text-muted">{site.location}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Pages</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted transition-colors hover:text-fg">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-2">
            <li><a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-fg">{site.email}</a></li>
            <li><a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">WhatsApp</a></li>
            <li><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">LinkedIn</a></li>
            <li><a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">Book a call</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <p>Designed and built in Karachi.</p>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="text-arc -mb-[0.22em] text-center text-[19vw] font-bold leading-none tracking-tighter opacity-20">Arcwell</p>
      </div>
    </footer>
  );
}
