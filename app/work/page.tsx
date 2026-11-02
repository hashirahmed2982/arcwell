import { work, caseStudies } from "@/content/work";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCard } from "@/components/work/WorkCard";
import { CTASection } from "@/components/home/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { demoApps } from "@/content/site";
import { BrowserFrame, ErpScreen, MobileAppScreen, PhoneFrame } from "@/components/ui/Mocks";

export const metadata = pageMetadata({ ...work.seo, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={work.heading} title={work.intro} highlight={["designed", "built"]} />
      <section className="pb-24">
        <div className="container-x grid gap-x-8 gap-y-20 md:grid-cols-2">
          {caseStudies.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1}>
              <WorkCard study={s} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>
      {demoApps.length > 0 && (
        <section className="border-t border-line bg-paper-2 py-24 md:py-32">
          <div className="container-x">
            <SectionHeading chapter="Demos" title={work.demoHeading} intro={work.demoIntro} />
            <div className="grid gap-6 md:grid-cols-2">
              {demoApps.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.1}>
                  <a href={d.href} className="card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30">
                    <div className="flex h-64 items-start justify-center overflow-hidden bg-gradient-to-b from-accent-soft to-white px-8 pt-8">
                      {i % 2 === 0 ? (
                        <div className="w-full max-w-md transition-transform duration-500 group-hover:-translate-y-2">
                          <BrowserFrame><ErpScreen compact /></BrowserFrame>
                        </div>
                      ) : (
                        <div className="w-48 transition-transform duration-500 group-hover:-translate-y-2">
                          <PhoneFrame><MobileAppScreen /></PhoneFrame>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex gap-2">
                        {d.tags.map((t) => <span key={t} className="rounded-md bg-accent-soft px-2 py-1 text-xs font-semibold text-accent">{t}</span>)}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold tracking-tight">{d.title}</h3>
                      <p className="mt-2 flex-1 leading-relaxed text-muted">{d.description}</p>
                      <span className="mt-6 font-semibold text-accent">Try the demo →</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection {...home.cta} />
    </>
  );
}
