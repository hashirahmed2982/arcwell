"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Long-form paragraph whose words darken one by one as you scroll through it — reads like turning a page. */
export function StoryText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-word",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 45%", scrub: 0.5 },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="story-word">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
