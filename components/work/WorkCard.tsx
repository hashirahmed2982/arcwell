"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { CaseStudy } from "@/content/work";
import { CaseMock } from "@/components/ui/Mocks";

/** Case study card: device frame that tilts in 3D on hover, then expands to fill the screen on click. */
export function WorkCard({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const card = useRef<HTMLAnchorElement>(null);
  const [expand, setExpand] = useState<DOMRect | null>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.12), transparent 40%)`);

  const href = `/work/${study.slug}`;
  const [a, b] = study.accent;

  return (
    <>
      <a
        ref={card}
        href={href}
        className="group block [perspective:1200px]"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        onMouseEnter={() => router.prefetch(href)}
        onClick={(e) => {
          if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          setExpand(e.currentTarget.getBoundingClientRect());
          window.setTimeout(() => router.push(href), 520);
        }}
      >
        <motion.div
          style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 p-6 md:p-10"
        >
          <div aria-hidden className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40" style={{ background: `radial-gradient(circle at 30% 0%, ${a}, transparent 60%), radial-gradient(circle at 100% 100%, ${b}, transparent 55%)` }} />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glare }}
          />
          <div className="relative flex aspect-[16/11] items-center justify-center" style={{ transform: "translateZ(50px)" }}>
            <div className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              {study.images[0] ? (
                <Image src={study.images[0]} alt={`${study.title} screenshot`} width={1600} height={1100} priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-xl" />
              ) : (
                <CaseMock kind={study.mock} accent={study.accent} />
              )}
            </div>
          </div>
        </motion.div>
        <div className="mt-5 flex items-start justify-between gap-6 px-1">
          <div>
            <p className="eyebrow">{study.clientType}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{study.title}</h3>
            <p className="mt-1 text-muted">{study.summary}</p>
          </div>
          <span aria-hidden className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-ink">
            →
          </span>
        </div>
      </a>

      {expand && (
        <motion.div
          aria-hidden
          className="fixed z-[65] rounded-3xl"
          style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
          initial={{ top: expand.top, left: expand.left, width: expand.width, height: expand.height, opacity: 0.6 }}
          animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </>
  );
}
