import { stats } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/** Numbers that count up as they scroll into view. Hidden when there are no stats. */
export function StatsStrip({ heading = "Arcwell Digital in numbers", tone = "light" }: { heading?: string; tone?: "light" | "muted" }) {
  if (!stats.length) return null;
  return (
    <section className={`py-20 md:py-24 ${tone === "muted" ? "bg-paper-2" : ""}`}>
      <div className="container-x">
        <Reveal><p className="eyebrow mb-10">{heading}</p></Reveal>
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={`pr-6 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 ? "border-l border-line pl-6 lg:pl-8" : ""}`}>
              <dd className="font-display text-5xl text-ink md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-3 text-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
