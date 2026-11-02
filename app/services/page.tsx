import Link from "next/link";
import { services } from "@/content/services";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { BookCallButton } from "@/components/ui/BookCallButton";

export const metadata = pageMetadata({ ...services.seo, path: "/services" });

const tints = ["#ece4d6", "#e4e6dc", "#e6e3ee", "#efe0d6", "#e9e4da"];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={services.heading} title={services.intro} highlight={["launch", "running."]}>
        <BookCallButton />
      </PageHero>

      <section className="pb-24">
        <div className="container-x space-y-4">
          {services.items.map((s, i) => (
            <Reveal key={s.id}>
              <article id={s.id} className="grid scroll-mt-28 gap-8 rounded-[1.75rem] p-7 md:grid-cols-[90px_1.1fr_1fr] md:gap-12 md:p-12" style={{ background: tints[i % tints.length] }}>
                <span className="font-display text-3xl text-ink/40">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">{s.title}</h2>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">{s.description}</p>
                  {s.link && (
                    <Link href={s.link.href} className="mt-6 inline-block border-b border-ink pb-0.5 font-medium transition-colors hover:border-accent hover:text-accent">
                      {s.link.label} →
                    </Link>
                  )}
                </div>
                {s.deliverables.length > 0 && (
                  <div>
                    <p className="eyebrow mb-4">What you get</p>
                    <ul className="divide-y divide-ink/10 border-y border-ink/10">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 py-2.5">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-clay" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="container-x mt-12">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{services.outOfScope}</p>
        </Reveal>
      </section>

      <CTASection {...home.cta} />
    </>
  );
}
