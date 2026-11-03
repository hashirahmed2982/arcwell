import { testimonials } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewBadges } from "@/components/ui/ReviewBadges";

const tones = ["#2453e6", "#0f766e", "#4f46e5", "#0e7490"];
const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

function Person({ name, role, company, i }: { name: string; role: string; company?: string; i: number }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: tones[i % tones.length] }}>
        {initials(name)}
      </span>
      <span>
        <span className="block font-semibold">{name}</span>
        <span className="block text-sm text-muted">{role}{company ? `, ${company}` : ""}</span>
      </span>
    </figcaption>
  );
}

const Stars = () => (
  <div className="flex gap-0.5 text-[#f5a524]" aria-label="5 out of 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
    ))}
  </div>
);

/** Featured quote plus a grid of shorter ones. Hidden when there are no testimonials. */
export function Testimonials({ chapter = "07 — Client stories" }: { chapter?: string }) {
  if (!testimonials.length) return null;
  const [featured, ...rest] = testimonials;
  return (
    <section className="bg-paper-2 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-10">
          <SectionHeading chapter={chapter} title="What our clients *say*" />
          <ReviewBadges className="mb-12 md:mb-16" />
        </div>
        <Reveal>
          <figure className="card grid gap-10 rounded-2xl p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden className="mb-6 text-accent"><path d="M0 32V19C0 8 6 1.5 16 0l1.5 4C11 6 8.5 10 8.5 15H16v17zm23 0V19c0-11 6-17.5 16-19l1.5 4C34 6 31.5 10 31.5 15H39v17z" fill="currentColor" opacity=".9" /></svg>
              <blockquote className="font-display max-w-3xl text-2xl leading-snug md:text-[2rem]">{featured.quote}</blockquote>
              <div className="mt-8"><Person {...featured} i={0} /></div>
            </div>
            <Stars />
          </figure>
        </Reveal>
        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="card flex h-full flex-col justify-between gap-8 rounded-2xl p-7">
                  <div>
                    <Stars />
                    <blockquote className="mt-4 leading-relaxed text-ink/85">“{t.quote}”</blockquote>
                  </div>
                  <Person {...t} i={i + 1} />
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
