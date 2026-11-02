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

  // Load the WebGL scene once the page is idle, so it never delays the headline or the buttons.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setLoad3d(true));
    else window.setTimeout(() => setLoad3d(true), 800);
  }, []);

  return (
    <section className="relative overflow-hidden pb-10 pt-32 md:pt-36 lg:min-h-[100svh]">
      {/* Soft warm daylight from the top-right */}
      <div aria-hidden className="absolute right-[-15%] top-[-25%] -z-10 h-[800px] w-[800px] rounded-full bg-[#fbe9d3] opacity-70 blur-[120px]" />

      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="pt-6 lg:pt-0">
          <Reveal>
            <p className="eyebrow mb-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              {hero.eyebrow}
            </p>
          </Reveal>
          <WordReveal
            text={hero.headline}
            highlight={["your", "business"]}
            delay={0.1}
            className="font-display text-balance text-[3.6rem] leading-[0.95] sm:text-7xl md:text-8xl xl:text-[7.4rem]"
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-muted md:text-xl">{hero.subtext}</p>
          </Reveal>
          <Reveal delay={0.65} className="mt-10 flex flex-wrap gap-3">
            <BookCallButton label={hero.primaryCta} />
            <Button href={hero.secondaryCta.href} variant="ghost">{hero.secondaryCta.label}</Button>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={30}>
          <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[560px] md:h-[640px]">
            {load3d && <HeroScene still={!!reduce} />}
            <div className="absolute bottom-[13%] left-[48%] w-[140px] -translate-x-1/2 sm:w-[170px] md:w-[190px]">
              <PhoneMockup />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
