"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { home, type ServiceKey } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/lib/hooks";

const layout: Record<ServiceKey, { className: string; href: string; tint: string }> = {
  mobile: { className: "md:col-span-1 md:row-span-2", href: "/services#mobile", tint: "#ece4d6" },
  web: { className: "md:col-span-1", href: "/services#web", tint: "#e4e6dc" },
  erp: { className: "md:col-span-2", href: "/erp", tint: "#e6e3ee" },
  design: { className: "md:col-span-1", href: "/services#design", tint: "#efe0d6" },
};

export function ServicesBento() {
  const { services } = home;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading chapter={services.chapter} title={services.heading} />
        <div className="grid auto-rows-[minmax(300px,auto)] gap-4 md:grid-flow-dense md:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className={layout[s.key].className}>
              <BentoCard kind={s.key} index={i} title={s.title} description={s.description} href={layout[s.key].href} tint={layout[s.key].tint} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ kind, index, title, description, href, tint }: { kind: ServiceKey; index: number; title: string; description: string; href: string; tint: string }) {
  // Touch screens have no hover, so play the micro-animation when the card scrolls into view instead.
  const touch = useMediaQuery("(hover: none)");
  return (
    <motion.div initial="rest" animate="rest" whileHover="hover" whileFocus="hover" whileInView={touch ? "hover" : undefined} viewport={{ amount: 0.6 }} className="h-full">
      <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8" style={{ background: tint }}>
        <div className="flex items-start justify-between">
          <span className="font-display text-xl text-ink/50">0{index + 1}</span>
          <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-sm transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-ink group-hover:bg-ink group-hover:text-paper">→</span>
        </div>
        <div className="relative my-6 flex min-h-[160px] flex-1 items-center justify-center">
          {kind === "mobile" && <SwipingPhones />}
          {kind === "erp" && <DrawingChart />}
          {kind === "web" && <BuildingBrowser />}
          {kind === "design" && <EditingCursor />}
        </div>
        <div>
          <h3 className="font-display text-3xl leading-tight md:text-[2.1rem]">{title}</h3>
          <p className="mt-2 max-w-md text-ink/65">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

const screens = [
  { title: "Orders", tone: "#3446c4", rows: ["#2041 · Delivered", "#2040 · On the way"] },
  { title: "Wallet", tone: "#c4683d", rows: ["Top up · $40.00", "Refund · $12.50"] },
  { title: "Profile", tone: "#6f8466", rows: ["Saved addresses", "Notifications"] },
];

function SwipingPhones() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-64 w-[132px] rounded-[1.8rem] bg-[#26231f] p-[5px] shadow-[0_30px_50px_-25px_rgba(50,35,20,0.5)]" aria-hidden>
      <div className="h-full overflow-hidden rounded-[1.5rem] bg-[#fbfaf7]">
        <motion.div
          className="flex h-full"
          variants={{ rest: { x: "0%" }, hover: reduce ? { x: "0%" } : { x: ["0%", "-100%", "-200%", "0%"] } }}
          transition={{ duration: 3.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1], times: [0, 0.33, 0.66, 1] }}
        >
          {screens.map((s) => (
            <div key={s.title} className="h-full min-w-full space-y-2 p-3 pt-6">
              <p className="text-[11px] font-semibold text-ink">{s.title}</p>
              <div className="h-16 rounded-xl" style={{ background: s.tone }} />
              {s.rows.map((r) => (
                <div key={r} className="rounded-lg bg-white px-2 py-1.5 text-[8px] text-ink/70 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">{r}</div>
              ))}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-10 rounded-lg bg-ink/5" />
                <div className="h-10 rounded-lg bg-ink/5" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const values = [38, 52, 45, 61, 57, 70, 66, 82];

function DrawingChart() {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white/70 p-4 shadow-[0_20px_40px_-30px_rgba(50,35,20,0.4)]" aria-hidden>
      <div className="mb-3 flex items-baseline justify-between text-[11px]">
        <span className="font-medium">Sales by month</span>
        <span className="text-muted">Rs 4.82M this month</span>
      </div>
      <div className="flex h-28 items-end gap-2">
        {values.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 origin-bottom rounded-t-md"
            style={{ height: `${v}%`, background: i === values.length - 1 ? "#3446c4" : "#3446c42e" }}
            variants={{ rest: { scaleY: 0.35 }, hover: { scaleY: 1 } }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-muted">
        {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

function BuildingBrowser() {
  return (
    <div className="w-full max-w-[250px] overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-25px_rgba(50,35,20,0.45)]" aria-hidden>
      <div className="flex gap-1 border-b border-ink/8 bg-[#f1ece4] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e8786b]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#e8c160]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7fbf6a]" />
      </div>
      <div className="space-y-2 p-3">
        {[
          <p key="h" className="font-display text-[15px] leading-tight">Book a table in seconds.</p>,
          <div key="b" className="h-6 w-20 rounded-full bg-ink" />,
          <div key="g" className="grid grid-cols-3 gap-1.5">
            {["#e4e6dc", "#efe0d6", "#e6e3ee"].map((c) => <div key={c} className="h-10 rounded-md" style={{ background: c }} />)}
          </div>,
        ].map((el, i) => (
          <motion.div key={i} variants={{ rest: { opacity: 0.25, y: 0 }, hover: { opacity: 1, y: [10, 0] } }} transition={{ duration: 0.45, delay: i * 0.12 }}>
            {el}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EditingCursor() {
  return (
    <div className="relative h-40 w-full max-w-[250px]" aria-hidden>
      <motion.div
        className="absolute left-4 top-6 border border-accent"
        variants={{ rest: { width: 120, height: 72, borderRadius: 8 }, hover: { width: 176, height: 96, borderRadius: 20 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => (
          <span key={p} className={`absolute h-2 w-2 border border-accent bg-white ${p}`} />
        ))}
        <motion.div
          className="absolute inset-2.5 flex items-center justify-center rounded-[inherit] text-[11px] font-medium"
          variants={{ rest: { background: "#ffffff", color: "#1d1b18" }, hover: { background: "#1d1b18", color: "#f5f1ea" } }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get started
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" variants={{ rest: { x: 130, y: 82 }, hover: { x: 186, y: 108 } }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#1d1b18" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        <span className="ml-4 inline-block rounded-md bg-clay px-1.5 py-0.5 text-[9px] font-medium text-white">Ayesha</span>
      </motion.div>
    </div>
  );
}
