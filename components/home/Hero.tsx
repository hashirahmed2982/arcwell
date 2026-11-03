"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { home } from "@/content/home";
import { assurances, servingRegions } from "@/content/site";
import { WordReveal } from "@/components/motion/WordReveal";
import { Reveal } from "@/components/motion/Reveal";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { BrowserFrame, ErpScreen } from "@/components/ui/Mocks";
import { PhoneMockup } from "./PhoneMockup";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export function Hero() {
  const { hero } = home;
  const reduce = useReducedMotion();
  const [load3d, setLoad3d] = useState(false);

  // The product composition tilts slightly toward the pointer.
  const rx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  // Load the WebGL globe once the page is idle, so it never delays the headline or the buttons.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setLoad3d(true));
    else window.setTimeout(() => setLoad3d(true), 800);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-paper-2 to-paper"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        rx.set(((e.clientY / window.innerHeight) - 0.5) * -6);
        ry.set(((e.clientX / window.innerWidth) - 0.5) * 8);
      }}
    >
      <div aria-hidden className="dot-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-32 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
        <div>
          <Reveal>
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-muted shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
              </span>
              {hero.eyebrow}
            </p>
          </Reveal>
          <WordReveal
            text={hero.headline}
            highlight={["business"]}
            delay={0.1}
            className="font-display text-balance text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
          />
          <Reveal delay={0.5}>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{hero.subtext}</p>
          </Reveal>
          <Reveal delay={0.65} className="mt-9 flex flex-wrap gap-3">
            <BookCallButton label={hero.primaryCta} />
            <Button href={hero.secondaryCta.href} variant="ghost">{hero.secondaryCta.label}</Button>
          </Reveal>
          <Reveal delay={0.8}>
            <p className="mt-6 text-sm text-muted">
              Not ready to talk?{" "}
              <a href="/quote" className="font-semibold text-accent hover:underline">Tell us about your project in 2 minutes →</a>
            </p>
            <p className="mt-2 text-sm text-muted">
              {hero.servingLabel} <span className="font-medium text-ink">{servingRegions}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={30}>
          <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[600px]">
            {/* Globe sits behind the product, top-right */}
            <div className="absolute -right-[18%] -top-[16%] h-[92%] w-[92%]">{load3d && <HeroScene still={!!reduce} />}</div>

            <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }} className="absolute inset-0">
              <div className="absolute left-0 top-[16%] w-[88%]">
                <BrowserFrame url="erp.alnoortraders.pk">
                  <ErpScreen compact />
                </BrowserFrame>
              </div>
              <div className="absolute bottom-0 right-[2%] w-[34%] max-w-[190px]">
                <PhoneMockup />
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      {/* Assurances */}
      <div className="relative border-y border-line bg-white">
        <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
          {assurances.map((a, i) => (
            <Reveal as="li" key={a.title} delay={0.9 + i * 0.06} className={`flex gap-3 py-6 lg:px-6 ${i % 2 ? "pl-4" : "pr-4"} ${i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-0.5 shrink-0 text-accent">
                <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
                <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-[15px] font-semibold">{a.title}</p>
                <p className="mt-0.5 hidden text-sm text-muted sm:block">{a.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
