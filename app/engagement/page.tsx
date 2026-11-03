import { pricing, faq } from "@/content/pricing";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { EngagementModels } from "@/components/pricing/EngagementModels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/ui/Faq";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CTASection } from "@/components/home/CTASection";
import { Button } from "@/components/ui/Button";
import { BookCallButton } from "@/components/ui/BookCallButton";

export const metadata = pageMetadata({ ...pricing.seo, path: "/engagement" });

export default function EngagementPage() {
  return (
    <>
      <PageHero eyebrow={pricing.eyebrow} title={pricing.heading} intro={pricing.intro}>
        <Button href="/quote">Get a free quote</Button>
        <BookCallButton variant="ghost" />
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHeading chapter="Ways to work with us" title="Pick the model that fits" />
          <EngagementModels />
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading chapter="Every budget" title={pricing.sizesHeading} intro={pricing.sizesIntro} />
          <div className="grid gap-4 md:grid-cols-3">
            {pricing.sizes.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="card rounded-2xl p-7">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline chapter="Quoting" heading={pricing.howHeading} steps={pricing.howSteps} />

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading chapter="FAQ" title="Questions buyers ask us" intro="Working with a team in another country raises fair questions. Here are straight answers." />
          <Faq items={faq} />
        </div>
      </section>
      <CTASection {...home.cta} />
    </>
  );
}
