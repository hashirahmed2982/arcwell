import type { ReactNode } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({ eyebrow, title, intro, highlight, children }: { eyebrow: string; title: string; intro?: string; highlight?: string[]; children?: ReactNode }) {
  return (
    <section className="relative pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-ink/40" />
            {eyebrow}
          </p>
        </Reveal>
        <WordReveal text={title} highlight={highlight} className="font-display max-w-5xl text-balance text-[3.2rem] leading-[0.98] md:text-8xl" />
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-4">{children}</Reveal>}
      </div>
    </section>
  );
}
