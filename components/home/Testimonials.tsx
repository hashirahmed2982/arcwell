import { testimonials } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** Hidden until real testimonials are added to content/site.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="py-24">
      <div className="container-x grid gap-10 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure className="card h-full rounded-2xl p-8">
              <blockquote className="text-xl leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-muted"><span className="font-medium text-ink">{t.name}</span> · {t.role}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
