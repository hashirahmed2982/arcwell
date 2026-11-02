import type { ReactNode } from "react";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({ eyebrow, title, intro, highlight, children }: { eyebrow: string; title: string; intro?: string; highlight?: string[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-2 pb-16 pt-36 md:pb-24 md:pt-44">
      <div aria-hidden className="dot-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <Reveal><p className="chapter mb-6">{eyebrow}</p></Reveal>
        <WordReveal text={title} highlight={highlight} className="font-display max-w-4xl text-balance text-[2.6rem] leading-[1.05] md:text-6xl lg:text-[4.25rem]" />
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-3">{children}</Reveal>}
      </div>
    </section>
  );
}
