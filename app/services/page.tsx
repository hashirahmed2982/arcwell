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
      <PageHero eyebrow={services.heading} title={services.intro} highlight={[]}>
        <BookCallButton />
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x"><div className="divide-y divide-line border-y border-line">
          {services.items.map((s, i) => (
            <Reveal key={s.id}>
              <article id={s.id} className="grid scroll-mt-28 gap-6 py-12 md:grid-cols-[80px_1.1fr_1fr] md:gap-12 md:py-16">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-3xl leading-[1.1] md:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{s.description}</p>
                  {s.link && (
                    <Link href={s.link.href} className="mt-6 inline-block font-semibold text-accent transition-colors hover:text-ink">
                      {s.link.label} →
                    </Link>
                  )}
                </div>
                {s.deliverables.length > 0 && (
                  <div>
                    <p className="eyebrow mb-4">What you get</p>
                    <ul className="card divide-y divide-line rounded-xl px-5">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 py-3 text-[15px]">
                          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-accent"><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div></div>
        <Reveal className="container-x mt-12">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{services.outOfScope}</p>
        </Reveal>
      </section>

      <CTASection {...home.cta} />
    </>
  );
}
