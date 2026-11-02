import Link from "next/link";
import { services } from "@/content/services";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { BookCallButton } from "@/components/ui/BookCallButton";

export const metadata = pageMetadata({ ...services.seo, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={services.heading} title={services.intro} highlight={["launch"]}>
        <BookCallButton />
      </PageHero>

      <section className="pb-24">
        <div className="container-x divide-y divide-line border-y border-line">
          {services.items.map((s, i) => (
            <Reveal key={s.id} as="section">
              <div id={s.id} className="group grid scroll-mt-28 gap-6 py-12 md:grid-cols-[120px_1fr_1fr] md:gap-10 md:py-16">
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight transition-colors md:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-md text-lg text-muted">{s.description}</p>
                  {s.link && (
                    <Link href={s.link.href} className="text-arc mt-6 inline-block font-semibold">
                      {s.link.label} →
                    </Link>
                  )}
                </div>
                {s.deliverables.length > 0 && (
                  <div>
                    <p className="eyebrow mb-4">Deliverables</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="glass rounded-full px-4 py-2 text-sm">{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="container-x mt-12">
          <p className="max-w-3xl text-sm text-muted">{services.outOfScope}</p>
        </Reveal>
      </section>

      <CTASection {...home.cta} />
    </>
  );
}
