import { stats } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";

/** Hidden until real numbers are added to content/site.ts. */
export function StatsStrip() {
  if (!stats.length) return null;
  return (
    <section className="py-16">
      <dl className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-line pl-6">
            <dt className="text-muted">{s.label}</dt>
            <dd className="text-arc mt-2 text-5xl font-semibold tracking-tight md:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
