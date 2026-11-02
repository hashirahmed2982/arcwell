"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { home } from "@/content/home";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "./PhoneMockup";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export function Hero() {
  const { hero } = home;
  const reduce = useReducedMotion();
  const [load3d, setLoad3d] = useState(false);

  // Load the WebGL scene after the page is idle so it never delays first paint or the CTAs.
  useEffect(() => {
    if (reduce) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setLoad3d(true));
    else window.setTimeout(() => setLoad3d(true), 800);
  }, [reduce]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-arc-1/20 blur-[140px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[700px] w-[700px] rounded-full bg-arc-3/15 blur-[160px]" />
        {load3d && <HeroScene />}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-arc-1" />
              {hero.eyebrow}
            </p>
          </Reveal>
          <WordReveal
            text={hero.headline}
            highlight={["business"]}
            delay={0.1}
            className="text-balance text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl xl:text-8xl"
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-xl text-pretty text-lg text-muted md:text-xl">{hero.subtext}</p>
          </Reveal>
          <Reveal delay={0.65} className="mt-10 flex flex-wrap gap-4">
            <BookCallButton label={hero.primaryCta} />
            <Button href={hero.secondaryCta.href} variant="ghost">{hero.secondaryCta.label}</Button>
          </Reveal>
        </div>
        <Reveal delay={0.4} y={40}>
          <PhoneMockup />
        </Reveal>
      </div>
    </section>
  );
}
