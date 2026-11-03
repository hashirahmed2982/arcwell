import Link from "next/link";
import { pricing } from "@/content/pricing";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** Engagement models — deliberately without prices. */
export function EngagementModels() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {pricing.models.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.08} className={`relative flex flex-col rounded-2xl p-7 md:p-8 ${m.featured ? "bg-ink-2 text-white shadow-[0_30px_60px_-30px_rgba(11,27,51,0.6)]" : "card"}`}>
          {m.featured && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold">Most popular</span>}
          <h3 className="pr-24 text-xl font-semibold tracking-tight">{m.name}</h3>
          <p className={`mt-2 text-sm ${m.featured ? "text-white/65" : "text-muted"}`}>{m.bestFor}</p>
          <p className={`mt-6 text-sm font-semibold ${m.featured ? "text-[#8fb0ff]" : "text-accent"}`}>Quoted after a free call</p>
          <ul className="mt-5 flex-1 space-y-3 text-[15px]">
            {m.points.map((p) => (
              <li key={p} className="flex gap-3">
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className={`mt-0.5 shrink-0 ${m.featured ? "text-[#8fb0ff]" : "text-accent"}`}><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {p}
              </li>
            ))}
          </ul>
          {m.href === "book" ? (
            <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold ${m.featured ? "bg-white text-ink" : "border border-line hover:border-ink/40"}`}>{m.cta}</a>
          ) : (
            <Link href={m.href} className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold ${m.featured ? "bg-accent text-white hover:bg-[#1c45c9]" : "border border-line hover:border-ink/40"}`}>{m.cta}</Link>
          )}
        </Reveal>
      ))}
    </div>
  );
}
