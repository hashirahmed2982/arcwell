import Link from "next/link";
import { solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({ title: "Solutions", description: "Software services and industry solutions from Arcwell Digital.", path: "/solutions" });

export default function SolutionsPage() {
  const groups = ["Services", "Industries"] as const;
  return (
    <>
      <PageHero eyebrow="Solutions" title="Software for the way your business works." intro="Pick the closest match. Every solution is tailored — these are starting points, not templates." />
      <section className="py-20">
        <div className="container-x space-y-16">
          {groups.map((g) => (
            <div key={g}>
              <p className="eyebrow mb-6">{g}</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {solutions.filter((s) => s.group === g).map((s, i) => (
                  <Reveal key={s.slug} delay={i * 0.06}>
                    <Link href={`/solutions/${s.slug}`} className="card group flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-accent/40">
                      <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                      <p className="mt-3 flex-1 leading-relaxed text-muted">{s.description}</p>
                      <span className="mt-6 font-semibold text-accent">Learn more →</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
