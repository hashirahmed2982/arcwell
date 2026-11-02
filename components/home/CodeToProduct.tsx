"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { home } from "@/content/home";
import { Highlighted } from "./PhoneMockup";
import { BrowserFrame } from "@/components/ui/Mocks";

const code = `export default function Dashboard() {
  const sales = useSales({ range: "30d" });
  const stock = useInventory();

  return (
    <Layout sidebar={<Nav modules={modules} />}>
      <KpiRow>
        <Kpi label="Revenue" value={sales.total} />
        <Kpi label="Orders" value={sales.count} />
        <Kpi label="Low stock" value={stock.low} />
      </KpiRow>
      <SalesChart data={sales.daily} />
      <OrdersTable rows={sales.latest} />
    </Layout>
  );
}`;

// Fraction of the code that must be typed before each UI piece appears.
const at = { layout: 0.22, kpi1: 0.45, kpi2: 0.53, kpi3: 0.61, chart: 0.74, table: 0.88 };

/** Signature section: code types on the left while the matching ERP screen builds itself on the right. Driven by scroll. */
export function CodeToProduct() {
  const { codeToProduct: c } = home;
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: desktop ? pin.current : section.current,
      start: desktop ? "top top" : "top 75%",
      end: desktop ? "+=1400" : "bottom 60%",
      pin: desktop ? pin.current : false,
      scrub: true,
      onUpdate: (self) => {
        const v = Math.round(Math.min(1, self.progress * 1.12) * 400) / 400;
        if (v !== last) {
          last = v;
          setP(v);
        }
      },
    });
    return () => st.kill();
  }, []);

  const shown = code.slice(0, Math.floor(p * code.length));
  const on = (k: keyof typeof at) => p >= at[k];
  const piece = (k: keyof typeof at) =>
    `transition-all duration-500 ease-out ${on(k) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.97]"}`;

  return (
    <section ref={section} className="relative" aria-labelledby="c2p-heading">
      <div ref={pin} className="flex min-h-screen items-center py-24">
        <div className="container-x">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">{c.eyebrow}</p>
            <h2 id="c2p-heading" className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">{c.heading}</h2>
            <p className="mt-5 text-lg text-muted">{c.subtext}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2" aria-hidden>
            {/* Editor */}
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <span className="font-mono text-xs text-muted">dashboard.tsx</span>
                <span className="font-mono text-xs text-muted">{Math.round(p * 100)}%</span>
              </div>
              <pre className="h-[340px] overflow-hidden whitespace-pre-wrap p-5 font-mono text-[12px] leading-[1.7] md:h-[380px] md:text-[13px]">
                <Highlighted text={shown} />
                <span className="ml-px inline-block h-4 w-2 animate-pulse bg-arc-1 align-middle" />
              </pre>
            </div>

            {/* Product */}
            <BrowserFrame className="flex flex-col">
              <div className={`flex h-[340px] md:h-[380px] ${piece("layout")}`}>
                <div className="hidden w-32 shrink-0 flex-col gap-3 border-r border-white/8 p-4 sm:flex">
                  <div className="bg-arc mb-2 h-6 w-6 rounded-md" />
                  {["Dashboard", "Sales", "Inventory", "HR", "Reports"].map((m, i) => (
                    <span key={m} className={`text-xs ${i === 0 ? "text-fg" : "text-muted"}`}>{m}</span>
                  ))}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {([["kpi1", "Revenue", "$48.2k"], ["kpi2", "Orders", "1,284"], ["kpi3", "Low stock", "12"]] as const).map(([k, label, val]) => (
                      <div key={k} className={`rounded-xl bg-white/[0.05] p-3 ${piece(k)}`}>
                        <p className="font-mono text-[9px] uppercase tracking-wider text-muted">{label}</p>
                        <p className="mt-1 text-lg font-semibold">{val}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`flex-1 rounded-xl bg-white/[0.04] p-3 ${piece("chart")}`}>
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-full w-full">
                      <defs>
                        <linearGradient id="c2p-line" x1="0" x2="1">
                          <stop offset="0" stopColor="#3d7bff" />
                          <stop offset="1" stopColor="#b05cff" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,80 L40,70 L80,74 L120,52 L160,58 L200,36 L240,42 L300,14"
                        fill="none"
                        stroke="url(#c2p-line)"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                        pathLength={1}
                        strokeDasharray="1"
                        strokeDashoffset={on("chart") ? 0 : 1}
                        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }}
                      />
                    </svg>
                  </div>
                  <div className={`space-y-1.5 ${piece("table")}`}>
                    {[["#1042", "PAID"], ["#1041", "SHIPPED"]].map(([id, st]) => (
                      <div key={id} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs">
                        <span className="font-mono text-muted">{id}</span>
                        <span className="rounded-full bg-arc-1/15 px-2 py-0.5 font-mono text-[10px] text-arc-1">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
