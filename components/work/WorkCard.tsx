"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { CaseStudy } from "@/content/work";
import { CaseMock } from "@/components/ui/Mocks";

/** Case study card: the device tilts gently in 3D on hover, then the card expands to fill the screen on click. */
export function WorkCard({ study, priority = false }: { study: CaseStudy; priority?: boolean }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [expand, setExpand] = useState<DOMRect | null>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  const href = `/work/${study.slug}`;
  const [tint, accent] = study.accent;

  return (
    <>
      <a
        href={href}
        className="group block"
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
          setExpand(e.currentTarget.firstElementChild!.getBoundingClientRect());
          window.setTimeout(() => router.push(href), 560);
        }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-line px-6 py-10 transition-colors duration-300 [perspective:1200px] group-hover:border-accent/30 md:px-12 md:py-14" style={{ background: tint }}>
          <motion.div
            style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative flex aspect-[16/11] items-center justify-center"
          >
            <div className="w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]">
              {study.images[0] ? (
                <Image src={study.images[0]} alt={`${study.title} screenshot`} width={1600} height={1100} priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-xl" />
              ) : (
                <CaseMock kind={study.mock} accent={accent} />
              )}
            </div>
          </motion.div>
        </div>
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">{study.clientType}</p>
            <h3 className="font-display mt-2 text-2xl leading-tight md:text-[1.75rem]">{study.title}</h3>
            <p className="mt-2 text-muted">{study.summary}</p>
          </div>
          <span aria-hidden className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">→</span>
        </div>
      </a>

      {expand && (
        <motion.div
          aria-hidden
          className="fixed z-[65]"
          style={{ background: tint }}
          initial={{ top: expand.top, left: expand.left, width: expand.width, height: expand.height, borderRadius: 16 }}
          animate={{ top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </>
  );
}
