import Link from "next/link";
import { insights, posts } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({ ...insights.seo, path: "/insights" });

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow={insights.eyebrow} title={insights.heading} intro={insights.intro} />
      <section className="py-20">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/insights/${p.slug}`} className="card group flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-accent/40">
                <span className="w-fit rounded-md bg-accent-soft px-2 py-1 text-xs font-semibold text-accent">{p.category}</span>
                <h2 className="mt-5 text-xl font-semibold leading-snug tracking-tight group-hover:text-accent">{p.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.excerpt}</p>
                <p className="mt-6 text-sm text-faint">{fmtDate(p.date)} · {p.readMinutes} min read</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
