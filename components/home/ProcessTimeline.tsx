"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = { title: string; description: string };

/** Numbered steps; a line fills as you scroll (horizontal on desktop, vertical on mobile). */
export function ProcessTimeline({ heading, chapter, steps }: { heading: string; chapter?: string; steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const st = { trigger: root.current, start: "top 70%", end: "bottom 55%", scrub: 0.6 };
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(".tl-fill-x", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(".tl-fill-y", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: st });
      });
      gsap.utils.toArray<HTMLElement>(".tl-step").forEach((el) => {
        gsap.fromTo(el, { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" } });
        const dot = el.querySelector(".tl-dot");
        if (dot) gsap.fromTo(dot, { backgroundColor: "#f5f1ea", color: "#1d1b18" }, { backgroundColor: "#1d1b18", color: "#f5f1ea", duration: 0.4, scrollTrigger: { trigger: el, start: "top 70%", toggleActions: "play none none reverse" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading chapter={chapter} title={heading} />
        <div ref={root} className="relative">
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block">
            <div className="tl-fill-x h-full origin-left bg-ink" />
          </div>
          <div aria-hidden className="absolute bottom-0 left-[22px] top-0 w-px bg-line lg:hidden">
            <div className="tl-fill-y h-full w-full origin-top bg-ink" />
          </div>
          <ol className="relative grid gap-10 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:gap-8" style={{ ["--cols" as string]: steps.length }}>
            {steps.map((s, i) => (
              <li key={s.title} className="tl-step relative grid grid-cols-[44px_1fr] gap-5 lg:block">
                <span className="tl-dot font-display relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper text-lg">
                  {i + 1}
                </span>
                <div className="lg:mt-8 lg:pr-4">
                  <h3 className="font-display text-[1.75rem] leading-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
