"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { home, type ServiceKey } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/lib/hooks";

const layout: Record<ServiceKey, { className: string; href: string }> = {
  mobile: { className: "md:col-span-1 md:row-span-2", href: "/services#mobile" },
  erp: { className: "md:col-span-2", href: "/erp" },
  web: { className: "md:col-span-1", href: "/services#web" },
  design: { className: "md:col-span-1", href: "/services#design" },
};

export function ServicesBento() {
  const { services } = home;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Services" title={services.heading} />
        <div className="grid auto-rows-[minmax(280px,auto)] gap-4 md:grid-flow-dense md:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className={layout[s.key].className}>
              <BentoCard kind={s.key} title={s.title} description={s.description} href={layout[s.key].href} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ kind, title, description, href }: { kind: ServiceKey; title: string; description: string; href: string }) {
  // Touch screens have no hover, so play the micro-animation when the card scrolls into view instead.
  const touch = useMediaQuery("(hover: none)");
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      whileInView={touch ? "hover" : undefined}
      viewport={{ amount: 0.6 }}
      className="h-full"
    >
      <Link
        href={href}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:border-white/20 md:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-arc-2/0 blur-3xl transition-colors duration-700 group-hover:bg-arc-2/25" />
        <div className="relative mb-6 flex min-h-[150px] flex-1 items-center justify-center">
          {kind === "mobile" && <SwipingPhones />}
          {kind === "erp" && <DrawingChart />}
          {kind === "web" && <BuildingBrowser />}
          {kind === "design" && <EditingCursor />}
        </div>
        <div className="relative">
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
          <p className="mt-2 text-muted">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

const screenColors = ["from-arc-1 to-arc-2", "from-arc-2 to-arc-3", "from-arc-3 to-arc-1"];

function SwipingPhones() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-56 w-32 overflow-hidden rounded-[1.6rem] border border-white/15 bg-ink-2 p-1.5" aria-hidden>
      <motion.div
        className="flex h-full gap-1.5"
        variants={{ rest: { x: 0 }, hover: reduce ? { x: 0 } : { x: ["0%", "-100%", "-200%", "0%"] } }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.65, 0, 0.35, 1], times: [0, 0.33, 0.66, 1] }}
      >
        {screenColors.map((c, i) => (
          <div key={i} className="h-full w-full shrink-0 space-y-2 rounded-[1.2rem] bg-white/[0.04] p-2.5" style={{ minWidth: "100%" }}>
            <div className={`h-14 rounded-xl bg-gradient-to-br ${c}`} />
            <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="h-10 rounded-lg bg-white/10" />
              <div className="h-10 rounded-lg bg-white/10" />
            </div>
            <div className="h-6 rounded-lg bg-white/[0.06]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const pts = [70, 58, 64, 44, 50, 30, 36, 14];
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${i * (300 / (pts.length - 1))},${p}`).join(" ");

function DrawingChart() {
  return (
    <div className="w-full max-w-lg" aria-hidden>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {["Revenue", "Orders", "Stock"].map((k, i) => (
          <motion.div
            key={k}
            className="rounded-xl bg-white/[0.05] p-3"
            variants={{ rest: { y: 0, opacity: 0.7 }, hover: { y: -4, opacity: 1 } }}
            transition={{ delay: i * 0.06 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</p>
            <div className="mt-2 h-2.5 rounded-full bg-arc" style={{ width: `${60 + i * 12}%` }} />
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 300 90" className="h-28 w-full overflow-visible">
        <defs>
          <linearGradient id="bento-line" x1="0" x2="1">
            <stop offset="0" stopColor="#3d7bff" />
            <stop offset="1" stopColor="#b05cff" />
          </linearGradient>
          <linearGradient id="bento-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#7b5cff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7b5cff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 45, 70].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
        ))}
        <motion.path
          d={`${linePath} L300,90 L0,90 Z`}
          fill="url(#bento-fill)"
          variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#bento-line)"
          strokeWidth="3"
          strokeLinecap="round"
          variants={{ rest: { pathLength: 0.35 }, hover: { pathLength: 1 } }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}

function BuildingBrowser() {
  const blocks = [
    { className: "col-span-3 h-4 w-1/2" },
    { className: "col-span-3 h-8" },
    { className: "h-12" },
    { className: "h-12" },
    { className: "h-12" },
  ];
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded-xl border border-white/12 bg-ink-2" aria-hidden>
      <div className="flex gap-1 border-b border-white/8 px-3 py-2">
        {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/25" />)}
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {blocks.map((b, i) => (
          <motion.div
            key={i}
            className={`rounded-md ${i === 1 ? "bg-arc" : "bg-white/10"} ${b.className}`}
            variants={{ rest: { opacity: 0.35, y: 0, scale: 1 }, hover: { opacity: 1, y: [8, 0], scale: [0.9, 1] } }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          />
        ))}
      </div>
    </div>
  );
}

function EditingCursor() {
  return (
    <div className="relative h-40 w-full max-w-[260px]" aria-hidden>
      <motion.div
        className="absolute left-6 top-6 rounded-xl border border-dashed border-arc-1/70 bg-arc-1/10"
        variants={{ rest: { width: 110, height: 70, borderRadius: 12 }, hover: { width: 170, height: 96, borderRadius: 22 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {[["-left-1 -top-1"], ["-right-1 -top-1"], ["-left-1 -bottom-1"], ["-right-1 -bottom-1"]].map(([p]) => (
          <span key={p} className={`absolute h-2 w-2 rounded-sm border border-arc-1 bg-ink ${p}`} />
        ))}
        <motion.div
          className="absolute inset-3 rounded-lg"
          variants={{ rest: { background: "rgba(255,255,255,0.08)" }, hover: { background: "linear-gradient(120deg,#3d7bff,#b05cff)" } }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        className="absolute left-0 top-0 drop-shadow"
        variants={{ rest: { x: 120, y: 80 }, hover: { x: 180, y: 106 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M4 2l16 9-7 2-3 7z" fill="white" stroke="#06060a" strokeWidth="1.5" strokeLinejoin="round" />
      </motion.svg>
      <motion.span
        className="absolute rounded-md bg-arc-3 px-2 py-0.5 font-mono text-[10px] text-white"
        variants={{ rest: { x: 140, y: 104, opacity: 0 }, hover: { x: 200, y: 130, opacity: 1 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Designer
      </motion.span>
    </div>
  );
}
