import Link from "next/link";
import { home } from "@/content/home";
import { caseStudies } from "@/content/work";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCard } from "@/components/work/WorkCard";

export function FeaturedWork() {
  const items = caseStudies.slice(0, 3);
  if (!items.length) return null;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-6">
          <SectionHeading chapter={home.featuredWork.chapter} title={home.featuredWork.heading} />
          <Reveal className="mb-14 md:mb-20">
            <Link href="/work" className="border-b border-ink/30 pb-1 transition-colors hover:border-accent hover:text-accent">
              {home.featuredWork.linkLabel} →
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
              <WorkCard study={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
