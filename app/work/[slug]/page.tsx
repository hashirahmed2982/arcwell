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
  const [tint, accent] = study.accent;
  const L = work.labels;

  return (
    <>
      {/* Opens on the same tint the card expanded into, so the hand-off feels continuous */}
      <section className="border-b border-line pb-20 pt-36 md:pt-44" style={{ background: tint }}>
        <div className="container-x">
          <Reveal>
            <Link href="/work" className="eyebrow transition-colors hover:text-ink">← {L.back}</Link>
            <div className="mt-10"><p className="chapter">{study.clientType}</p></div>
          </Reveal>
          <WordReveal text={study.title} className="font-display mt-4 max-w-4xl text-balance text-4xl leading-[1.06] md:text-6xl" />
          <Reveal delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label={L.tech}>
              {study.tech.map((t) => (
                <li key={t} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium">{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-16" y={40}>
            <div className="mx-auto max-w-4xl">
              {study.images[0] ? (
                <Image src={study.images[0]} alt={`${study.title} screenshot`} width={1600} height={1100} priority sizes="(min-width: 1024px) 900px, 100vw" className="h-auto w-full rounded-xl shadow-2xl" />
              ) : (
                <CaseMock kind={study.mock} accent={accent} />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {study.metrics && study.metrics.length > 0 && (
        <section className="border-b border-line">
          <dl className="container-x grid gap-y-8 py-12 sm:grid-cols-3">
            {study.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className={i > 0 ? "sm:border-l sm:border-line sm:pl-8" : ""}>
                <dd className="font-display text-4xl text-accent md:text-5xl">{m.value}</dd>
                <dt className="mt-2 text-muted">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      <section className="py-24 md:py-32">
        <div className="container-x max-w-5xl space-y-14">
          {([[L.challenge, study.challenge], [L.solution, study.solution], [L.result, study.result]] as const).map(([label, text], i) => (
            <Reveal key={label} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[200px_1fr]">
              <h2 className="chapter">{String(i + 1).padStart(2, "0")} — {label}</h2>
              <p className="text-xl leading-relaxed md:text-2xl">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {study.images.length > 1 && (
        <section className="pb-24">
          <div className="container-x grid gap-6 md:grid-cols-2">
            {study.images.slice(1).map((src) => (
              <Reveal key={src}>
                <Image src={src} alt={`${study.title} screenshot`} width={1600} height={1100} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-2xl" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {next && next.slug !== study.slug && (
        <section className="border-t border-line">
          <Link href={`/work/${next.slug}`} className="container-x group flex flex-col gap-3 py-16 md:py-24">
            <span className="chapter">{L.next}</span>
            <span className="font-display text-3xl leading-tight transition-colors group-hover:text-accent md:text-5xl">
              {next.title} <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </section>
      )}

      <CTASection {...home.cta} />
    </>
  );
}
