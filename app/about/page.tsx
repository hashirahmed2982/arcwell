import { about } from "@/content/about";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StoryText } from "@/components/motion/StoryText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/home/CTASection";

export const metadata = pageMetadata({ ...about.seo, path: "/about" });


export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.heading} title={about.story[1]} highlight={[]} />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-[180px_1fr]">
          <Reveal><p className="chapter md:pt-3">Our story</p></Reveal>
          <StoryText text={about.story[0]} className="font-display max-w-4xl text-pretty text-[1.75rem] leading-[1.3] md:text-[2.5rem] md:leading-[1.25]" />
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="The team" title={about.teamHeading} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.team.map((t, i) => (
              <Reveal as="li" key={t.role} delay={i * 0.07} className="card flex min-h-[220px] flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{t.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="Values" title={about.valuesHeading} />
          <div className="border-b border-line">
            {about.values.map((v, i) => (
              <Reveal key={v.title} className="group grid gap-3 border-t border-line py-10 md:grid-cols-[100px_1fr_1fr] md:items-baseline">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="font-display text-3xl transition-colors duration-300 group-hover:text-accent md:text-4xl">{v.title}</h3>
                <p className="text-lg leading-relaxed text-muted">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection {...home.cta} />
    </>
  );
}
