import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, work } from "@/content/work";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { CaseMock } from "@/components/ui/Mocks";
import { CTASection } from "@/components/home/CTASection";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({ title: study.title, description: study.summary, path: `/work/${study.slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const [a, b] = study.accent;
  const L = work.labels;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 md:pt-44">
        {/* Same gradient as the card's expand transition, so the hand-off feels continuous */}
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[90%] opacity-30" style={{ background: `radial-gradient(ellipse at 20% 0%, ${a}, transparent 60%), radial-gradient(ellipse at 90% 30%, ${b}, transparent 55%)` }} />
        <div className="container-x">
          <Reveal>
            <Link href="/work" className="eyebrow transition-colors hover:text-fg">← {L.back}</Link>
            <p className="eyebrow mt-8">{study.clientType}</p>
          </Reveal>
          <WordReveal text={study.title} className="mt-4 max-w-5xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl" />
          <Reveal delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={L.tech}>
              {study.tech.map((t) => (
                <li key={t} className="glass rounded-full px-4 py-1.5 text-sm">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <Reveal className="container-x" y={50}>
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-ink-2 p-6 md:p-14">
            {study.images[0] ? (
              <Image src={study.images[0]} alt={`${study.title} screenshot`} width={1600} height={1100} priority sizes="(min-width: 1024px) 960px, 100vw" className="h-auto w-full rounded-xl" />
            ) : (
              <CaseMock kind={study.mock} accent={study.accent} />
            )}
          </div>
        </Reveal>
      </section>

      <section className="pb-24">
        <div className="container-x grid max-w-5xl gap-12 md:grid-cols-3">
          {([[L.challenge, study.challenge], [L.solution, study.solution], [L.result, study.result]] as const).map(([label, text], i) => (
            <Reveal key={label} delay={i * 0.1}>
              <h2 className="eyebrow mb-4">{label}</h2>
              <p className="text-lg leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {study.images.length > 1 && (
        <section className="pb-24">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {study.images.slice(1).map((src) => (
              <Reveal key={src}>
                <Image src={src} alt={`${study.title} screenshot`} width={1600} height={1100} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-2xl border border-white/10" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {next && next.slug !== study.slug && (
        <section className="border-t border-line">
          <Link href={`/work/${next.slug}`} className="container-x group flex flex-col gap-2 py-16 md:py-24">
            <span className="eyebrow">{L.next}</span>
            <span className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-arc md:text-6xl">
              {next.title} <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </section>
      )}

      <CTASection {...home.cta} />
    </>
  );
}
