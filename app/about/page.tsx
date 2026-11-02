import { about } from "@/content/about";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/home/CTASection";

export const metadata = pageMetadata({ ...about.seo, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.heading} title={about.story[1]} highlight={["simple", "last,", "people"]} />

      <section className="pb-24">
        <Reveal className="container-x">
          <p className="max-w-4xl text-pretty text-2xl leading-snug text-fg/85 md:text-4xl md:leading-tight">{about.story[0]}</p>
        </Reveal>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Team" title={about.teamHeading} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.team.map((t, i) => (
              <Reveal as="li" key={t.role} delay={i * 0.07} className="glass group rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                <span aria-hidden className="bg-arc mb-8 block h-10 w-10 rounded-full opacity-80 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="text-lg font-semibold tracking-tight">{t.role}</h3>
                <p className="mt-2 text-sm text-muted">{t.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Values" title={about.valuesHeading} />
          <div className="divide-y divide-line border-y border-line">
            {about.values.map((v, i) => (
              <Reveal key={v.title} className="group grid gap-4 py-10 md:grid-cols-[120px_1fr_1fr] md:items-baseline">
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-arc md:text-5xl">{v.title}</h3>
                <p className="text-lg text-muted">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection {...home.cta} />
    </>
  );
}
