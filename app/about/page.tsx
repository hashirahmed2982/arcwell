import { about } from "@/content/about";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StoryText } from "@/components/motion/StoryText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/home/CTASection";

export const metadata = pageMetadata({ ...about.seo, path: "/about" });

const tints = ["#ece4d6", "#e4e6dc", "#e6e3ee", "#efe0d6", "#e9e4da"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.heading} title={about.story[1]} highlight={["simple", "last", "people"]} />

      <section className="pb-24 md:pb-36">
        <div className="container-x grid gap-10 md:grid-cols-[180px_1fr]">
          <Reveal><p className="chapter md:pt-3">Our story</p></Reveal>
          <StoryText text={about.story[0]} className="font-display max-w-4xl text-pretty text-[2rem] leading-[1.2] md:text-5xl md:leading-[1.15]" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="The team" title={about.teamHeading} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {about.team.map((t, i) => (
              <Reveal as="li" key={t.role} delay={i * 0.07} className="relative isolate flex min-h-[260px] flex-col justify-between rounded-[1.5rem] p-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 -z-10 rounded-[1.5rem]" style={{ background: tints[i % tints.length] }} />
                <span className="font-display text-xl text-ink/40">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.75rem] leading-tight">{t.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{t.description}</p>
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
                <span className="font-display text-xl text-faint">{i + 1}.</span>
                <h3 className="font-display text-5xl transition-colors duration-300 group-hover:text-accent md:text-6xl">{v.title}</h3>
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
