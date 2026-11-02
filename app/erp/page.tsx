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

// Small line icons, one per module, in the same order as content/erp.ts.
const icons = [
  "M4 5h16v14H4zM4 9h16M9 13h6", // accounting
  "M3 9l9-5 9 5v10H3zM9 19v-6h6v6", // inventory / warehouse
  "M5 6h14l-1.5 9h-11zM8 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z", // sales
  "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5", // HR
  "M5 19V10M12 19V5M19 19v-7", // reports
  "M8 3h8v18H8zM11 18h2", // mobile
];

export default function ErpPage() {
  return (
    <>
      <PageHero eyebrow={erp.hero.eyebrow} title={erp.hero.headline} intro={erp.hero.subtext} highlight={["business"]}>
        <BookCallButton label={erp.hero.button} />
      </PageHero>

      <section className="pt-16 pb-8">
        <Reveal className="container-x" y={40}>
          <div className="relative rounded-3xl border border-line bg-paper-2 px-5 pb-14 pt-10 md:px-16 md:pb-20 md:pt-16">
            <div className="relative mx-auto max-w-4xl">
              <BrowserFrame url="erp.alnoortraders.pk">
                <ErpScreen />
              </BrowserFrame>
              <div className="absolute -bottom-10 -right-3 hidden w-40 md:block lg:-right-16">
                <PhoneFrame>
                  <MobileAppScreen />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="Modules" title="Everything your operations need, in one system" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {erp.modules.map((m, i) => (
              <Reveal as="li" key={m} delay={(i % 3) * 0.08} className="card group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                  <path d={icons[i % icons.length]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg></span>
                <p className="mt-6 text-lg font-semibold tracking-tight">{m}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-2 py-20">
        <div className="container-x">
          <SectionHeading chapter="Industries" title={erp.industriesHeading} />
          <ul className="flex flex-wrap gap-3">
            {erp.industries.map((ind, i) => (
              <Reveal as="li" key={ind} delay={i * 0.06} className="rounded-lg border border-line bg-white px-5 py-3 text-[15px] font-medium shadow-sm transition-colors duration-300 hover:border-accent hover:text-accent md:text-base">
                {ind}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProcessTimeline chapter="Process" heading={erp.howHeading} steps={erp.steps} />

      <CTASection headline={erp.cta.headline} button={erp.cta.button} />
    </>
  );
}
