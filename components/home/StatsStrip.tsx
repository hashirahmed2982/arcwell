import { stats } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";

/** Hidden until real numbers are added to content/site.ts. */
export function StatsStrip() {
  if (!stats.length) return null;
  return (
    <section className="py-16">
      <dl className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-ink pt-5">
            <dd className="font-display text-6xl md:text-7xl"><CountUp value={s.value} suffix={s.suffix} /></dd>
            <dt className="mt-2 text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
