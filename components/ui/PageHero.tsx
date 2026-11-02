import type { ReactNode } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({ eyebrow, title, intro, highlight, children }: { eyebrow: string; title: string; intro?: string; highlight?: string[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-arc-2/25 blur-[120px]" />
      <div className="container-x relative">
        <Reveal><p className="eyebrow mb-6">{eyebrow}</p></Reveal>
        <WordReveal text={title} highlight={highlight} className="max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl" />
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-pretty text-lg text-muted md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-4">{children}</Reveal>}
      </div>
    </section>
  );
}
