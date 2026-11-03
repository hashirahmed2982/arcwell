import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/content/solutions";
import { getCaseStudy } from "@/content/work";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/ui/Faq";
import { WorkCard } from "@/components/work/WorkCard";
import { CTASection } from "@/components/home/CTASection";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { ReviewBadges } from "@/components/ui/ReviewBadges";
import { BrowserFrame, ErpScreen, MobileAppScreen, PhoneFrame, WebScreen } from "@/components/ui/Mocks";

export const dynamicParams = false;
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  return s ? pageMetadata({ title: s.title, description: s.description, path: `/solutions/${s.slug}` }) : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const study = s.caseStudy ? getCaseStudy(s.caseStudy) : undefined;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["GB", "AE", "SA", "US", "PK"],
  };

  return (
    <>
      <PageHero eyebrow={s.group === "Industries" ? "Industry solution" : "Service"} title={s.title} intro={s.description}>
        <Button href="/estimate">Get an estimate</Button>
        <BookCallButton variant="ghost" />
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading chapter="Sound familiar?" title="The problems we solve" />
            <ul className="space-y-4">
              {s.problems.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.06} className="flex gap-4 rounded-xl border border-line p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fef3c7] text-sm font-bold text-[#b45309]">!</span>
                  <span className="leading-relaxed">{p}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal y={30} className="rounded-3xl bg-paper-2 p-8 md:p-12">
            {s.mock === "mobile" ? (
              <div className="mx-auto w-52"><PhoneFrame><MobileAppScreen /></PhoneFrame></div>
            ) : (
              <BrowserFrame>{s.mock === "erp" ? <ErpScreen compact /> : <WebScreen />}</BrowserFrame>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHeading chapter="What you get" title="What we build for you" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.deliverables.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.06} className="card rounded-2xl p-7">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {study && (
        <section className="py-20 md:py-28">
          <div className="container-x">
            <SectionHeading chapter="Case study" title="See it in practice" />
            <div className="max-w-3xl"><WorkCard study={study} /></div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading chapter="FAQ" title="Common questions" />
            <ReviewBadges compact />
          </div>
          <Faq items={s.faq} />
        </div>
      </section>

      <CTASection {...home.cta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
