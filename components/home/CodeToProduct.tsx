"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { home } from "@/content/home";
import { Highlighted } from "./PhoneMockup";
import { BrowserFrame } from "@/components/ui/Mocks";
import { Emphasis } from "@/components/ui/SectionHeading";

const code = `export default function Dashboard() {
  const sales = useSales({ range: "30d" });
  const stock = useInventory();

  return (
    <Layout sidebar={<Nav modules={modules} />}>
      <KpiRow>
        <Kpi label="Sales this month" value={sales.total} />
        <Kpi label="Open orders" value={sales.open} />
        <Kpi label="Low stock" value={stock.low} />
      </KpiRow>
      <SalesChart data={sales.monthly} />
      <InvoiceList rows={sales.latest} />
    </Layout>
  );
}`;

// Fraction of the code that must be typed before each UI piece appears.
const at = { layout: 0.22, kpi1: 0.45, kpi2: 0.53, kpi3: 0.61, chart: 0.74, table: 0.88 };
const bars = [42, 55, 48, 62, 58, 71, 66, 78, 74, 86, 81, 92];

/** Chapter three: code types on the left while the matching ERP screen builds itself on the right. Driven by scroll. */
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
    `transition-all duration-500 ease-out ${on(k) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;

  return (
    <section ref={section} className="relative" aria-labelledby="c2p-heading">
      <div ref={pin} className="flex min-h-screen items-center py-6">
        <div className="mx-auto w-full max-w-[88rem] px-3 md:px-5">
          <div className="rounded-3xl bg-ink-2 px-5 py-16 text-white md:px-14 md:py-20">
            <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-3xl">
                <p className="chapter mb-5 !text-[#8fb0ff]">{c.chapter}</p>
                <h2 id="c2p-heading" className="font-display text-balance text-4xl leading-[1.08] md:text-[3.25rem] [&_em]:!text-[#8fb0ff]">
                  <Emphasis text={c.heading} />
                </h2>
              </div>
              <p className="max-w-xs text-white/60">{c.subtext}</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2" aria-hidden>
              {/* Editor */}
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] text-white/60">
                  <span className="font-mono">dashboard.tsx</span>
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-20 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full bg-[#4d7cff]" style={{ width: `${p * 100}%` }} />
                    </span>
                  </span>
                </div>
                <pre className="h-[340px] overflow-hidden whitespace-pre-wrap p-5 font-mono text-[12px] leading-[1.75] md:h-[380px] md:text-[13px]">
                  <Highlighted text={shown} dark />
                  <span className="ml-px inline-block h-4 w-[7px] animate-pulse bg-[#4d7cff] align-middle" />
                </pre>
              </div>

              {/* Product */}
              <BrowserFrame url="erp.alnoortraders.pk" className="!shadow-none">
                <div className={`flex h-[340px] bg-white text-ink md:h-[380px] ${piece("layout")}`}>
                  <aside className="hidden w-36 shrink-0 flex-col gap-0.5 border-r border-ink/8 bg-[#f7f8fa] p-3 text-[11px] sm:flex">
                    <p className="mb-3 flex items-center gap-1.5 font-semibold"><span className="h-4 w-4 rounded bg-accent" /> Al-Noor Traders</p>
                    {["Dashboard", "Sales", "Inventory", "Purchasing", "HR & Payroll", "Reports"].map((m, i) => (
                      <span key={m} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-white font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : "text-muted"}`}>{m}</span>
                    ))}
                  </aside>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {([["kpi1", "Sales this month", "Rs 4.82M"], ["kpi2", "Open orders", "138"], ["kpi3", "Low stock", "9 items"]] as const).map(([k, label, val]) => (
                        <div key={k} className={`rounded-lg border border-ink/8 bg-white p-3 ${piece(k)}`}>
                          <p className="truncate text-[9.5px] text-muted">{label}</p>
                          <p className="mt-0.5 text-[15px] font-semibold tracking-tight">{val}</p>
                        </div>
                      ))}
                    </div>
                    <div className={`flex flex-1 flex-col rounded-lg border border-ink/8 bg-white p-3 ${piece("chart")}`}>
                      <p className="mb-2 text-[10px] font-medium">Monthly sales</p>
                      <div className="flex flex-1 items-end gap-1.5">
                        {bars.map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 origin-bottom rounded-t-[3px] transition-transform duration-700"
                            style={{
                              height: `${h}%`,
                              background: i === bars.length - 1 ? "#2453e6" : "#2453e633",
                              transform: `scaleY(${on("chart") ? 1 : 0})`,
                              transitionDelay: `${i * 40}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={`rounded-lg border border-ink/8 bg-white text-[10.5px] ${piece("table")}`}>
                      {[["INV-2041", "Hassan Medical Store", "Paid"], ["INV-2040", "City Mart, Gulshan", "Due"]].map(([id, n, st]) => (
                        <div key={id} className="flex items-center gap-3 border-b border-ink/6 px-3 py-2 last:border-0">
                          <span className="font-mono text-[9.5px] text-muted">{id}</span>
                          <span className="flex-1 truncate">{n}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[9.5px] ${st === "Paid" ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fef3c7] text-[#b45309]"}`}>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
