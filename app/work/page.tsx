import { work, caseStudies } from "@/content/work";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCard } from "@/components/work/WorkCard";
import { CTASection } from "@/components/home/CTASection";

export const metadata = pageMetadata({ ...work.seo, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={work.heading} title={work.intro} highlight={["designed", "built."]} />
      <section className="pb-24">
        <div className="container-x grid gap-x-8 gap-y-16 md:grid-cols-2">
          {caseStudies.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1}>
              <WorkCard study={s} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection {...home.cta} />
    </>
  );
}
