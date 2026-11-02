import { erp } from "@/content/erp";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CTASection } from "@/components/home/CTASection";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { BrowserFrame, ErpScreen, PhoneFrame, MobileAppScreen } from "@/components/ui/Mocks";

export const metadata = pageMetadata({ ...erp.seo, path: "/erp" });

const moduleIcons = ["◆", "▣", "◎", "◉", "▤", "▯"];

export default function ErpPage() {
  return (
    <>
      <PageHero eyebrow={erp.hero.eyebrow} title={erp.hero.headline} intro={erp.hero.subtext} highlight={["business"]}>
        <BookCallButton label={erp.hero.button} />
      </PageHero>

      <section className="pb-12">
        <Reveal className="container-x relative" y={50}>
          <div className="relative mx-auto max-w-5xl">
            <BrowserFrame>
              <ErpScreen />
            </BrowserFrame>
            <div className="absolute -bottom-10 -right-2 hidden w-40 md:block lg:-right-12">
              <PhoneFrame>
                <MobileAppScreen />
              </PhoneFrame>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="What's inside" title={erp.modulesHeading} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {erp.modules.map((m, i) => (
              <Reveal as="li" key={m} delay={(i % 3) * 0.08} className="glass group flex items-center gap-5 rounded-2xl p-6 transition-colors hover:border-white/20">
                <span aria-hidden className="bg-arc flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg text-white transition-transform duration-500 group-hover:rotate-12">
                  {moduleIcons[i % moduleIcons.length]}
                </span>
                <span className="text-lg font-medium">{m}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line py-20">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-8">{erp.industriesHeading}</p></Reveal>
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {erp.industries.map((ind, i) => (
              <Reveal as="li" key={ind} delay={i * 0.06} className="text-2xl font-semibold tracking-tight text-fg/80 md:text-4xl">
                {ind}
                {i < erp.industries.length - 1 && <span aria-hidden className="text-arc ml-10">·</span>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProcessTimeline eyebrow="Process" heading={erp.howHeading} steps={erp.steps} />

      <CTASection headline={erp.cta.headline} button={erp.cta.button} />
    </>
  );
}
