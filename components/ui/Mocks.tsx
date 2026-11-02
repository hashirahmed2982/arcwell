// Placeholder product screens drawn in HTML/CSS. Used until real screenshots exist (see TODO.md).
import type { ReactNode } from "react";
import type { MockKind } from "@/content/work";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] w-full rounded-[2.4rem] border border-white/15 bg-[#0b0b12] p-2 shadow-[0_40px_120px_-30px_rgba(91,92,255,0.6)] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-ink-2">
        <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b12] shadow-[0_40px_120px_-30px_rgba(91,92,255,0.55)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 h-4 flex-1 rounded-full bg-white/5" />
      </div>
      {children}
    </div>
  );
}

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <div className={`h-2 rounded-full bg-white/15 ${className}`} style={{ width: w }} />
);

export function MobileAppScreen({ accent = ["#3d7bff", "#7b5cff"] }: { accent?: [string, string] }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4 pt-10">
      <div className="flex items-center justify-between">
        <Bar w="40%" className="h-3 bg-white/40" />
        <div className="h-7 w-7 rounded-full bg-white/15" />
      </div>
      <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }}>
        <Bar w="45%" className="bg-white/60" />
        <div className="mt-3 h-6 w-2/3 rounded-md bg-white/85" />
        <Bar w="30%" className="mt-3 bg-white/50" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="h-9 w-9 rounded-xl bg-white/10" />
            <Bar w="70%" className="h-1.5" />
          </div>
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
          <div className="h-8 w-8 rounded-lg" style={{ background: i === 0 ? accent[0] : i === 1 ? accent[1] : "rgba(255,255,255,0.15)" }} />
          <div className="flex-1 space-y-1.5">
            <Bar w="60%" />
            <Bar w="35%" className="h-1.5 bg-white/10" />
          </div>
          <Bar w="18%" className="bg-white/30" />
        </div>
      ))}
      <div className="mt-auto flex justify-around rounded-2xl bg-white/[0.05] py-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-4 w-4 rounded-md ${i === 0 ? "bg-white/70" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}

const chartPoints = [30, 52, 41, 68, 55, 80, 72, 94];

export function ErpScreen({ accent = ["#3d7bff", "#7b5cff"], compact = false }: { accent?: [string, string]; compact?: boolean }) {
  const path = chartPoints.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (chartPoints.length - 1)) * 100},${100 - p}`).join(" ");
  return (
    <div className="flex">
      {!compact && (
        <div className="hidden w-28 shrink-0 flex-col gap-2.5 border-r border-white/8 p-3 sm:flex">
          <div className="mb-2 h-5 w-5 rounded-md" style={{ background: accent[1] }} />
          {["70%", "55%", "80%", "60%", "65%"].map((w, i) => (
            <Bar key={i} w={w} className={i === 1 ? "bg-white/50" : ""} />
          ))}
        </div>
      )}
      <div className="flex-1 space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2">
          {["Revenue", "Orders", "Stock"].map((k, i) => (
            <div key={k} className="rounded-lg bg-white/[0.05] p-2.5">
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted">{k}</p>
              <div className="mt-1.5 h-3 w-3/4 rounded" style={{ background: i === 0 ? accent[0] : i === 1 ? accent[1] : "rgba(255,255,255,0.35)" }} />
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white/[0.04] p-3">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-24 w-full" aria-hidden>
            <defs>
              <linearGradient id={`erpfill-${accent[0].slice(1)}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={accent[1]} stopOpacity="0.45" />
                <stop offset="1" stopColor={accent[1]} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L100,100 L0,100 Z`} fill={`url(#erpfill-${accent[0].slice(1)})`} />
            <path d={path} fill="none" stroke={accent[0]} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="space-y-1.5">
          {Array.from({ length: compact ? 2 : 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md bg-white/[0.03] px-3 py-2">
              <Bar w="30%" />
              <Bar w="20%" className="bg-white/10" />
              <span className="ml-auto rounded-full px-2 py-0.5 font-mono text-[8px]" style={{ background: `${accent[0]}33`, color: accent[0] }}>
                {["PAID", "SHIPPED", "PENDING"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WebScreen({ accent = ["#3d7bff", "#7b5cff"] }: { accent?: [string, string] }) {
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div className="h-4 w-16 rounded" style={{ background: accent[0] }} />
        <div className="flex gap-2">
          <Bar w="2rem" />
          <Bar w="2rem" />
          <Bar w="2rem" />
        </div>
      </div>
      <div className="space-y-2 py-4">
        <div className="h-5 w-3/4 rounded bg-white/70" />
        <div className="h-5 w-1/2 rounded" style={{ background: `linear-gradient(90deg, ${accent[0]}, ${accent[1]})` }} />
        <Bar w="60%" className="mt-3 bg-white/15" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-lg bg-white/[0.05] p-3">
            <div className="h-6 w-6 rounded-md" style={{ background: i === 1 ? accent[1] : "rgba(255,255,255,0.15)" }} />
            <Bar w="80%" />
            <Bar w="50%" className="bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Device frame + placeholder screen for a case study, or a real screenshot when provided. */
export function CaseMock({ kind, accent }: { kind: MockKind; accent: [string, string] }) {
  if (kind === "mobile")
    return (
      <div className="mx-auto w-[46%] max-w-[220px]">
        <PhoneFrame>
          <MobileAppScreen accent={accent} />
        </PhoneFrame>
      </div>
    );
  return (
    <BrowserFrame className="w-full">
      {kind === "erp" ? <ErpScreen accent={accent} /> : <WebScreen accent={accent} />}
    </BrowserFrame>
  );
}
