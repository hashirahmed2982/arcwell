// Illustrative product screens drawn in HTML/CSS, with realistic sample content.
// They stand in until real (anonymised) screenshots exist — see TODO.md.
import type { ReactNode } from "react";
import type { MockKind } from "@/content/work";

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.2] w-full rounded-[2.6rem] bg-[#111827] p-[7px] shadow-[0_2px_0_1px_#374151_inset,0_50px_80px_-30px_rgba(11,27,51,0.45),0_20px_30px_-20px_rgba(11,27,51,0.3)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-white">
        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-[#141210]" />
        <div className="relative z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <svg width="14" height="9" viewBox="0 0 14 9" aria-hidden><path d="M1 8h2V6H1zM5 8h2V4H5zM9 8h2V2H9z" fill="currentColor" /></svg>
            <svg width="18" height="9" viewBox="0 0 18 9" aria-hidden><rect x=".5" y=".5" width="14" height="8" rx="2" fill="none" stroke="currentColor" /><rect x="2" y="2" width="10" height="5" rx="1" fill="currentColor" /></svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({ children, className = "", url = "app.yourcompany.com" }: { children: ReactNode; className?: string; url?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_50px_90px_-40px_rgba(11,27,51,0.35),0_10px_20px_-15px_rgba(11,27,51,0.2)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-ink/8 bg-[#f3f4f6] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8786b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8c160]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7fbf6a]" />
        <span className="ml-4 flex-1 truncate rounded-md bg-white/80 px-3 py-0.5 text-center text-[10px] text-muted">{url}</span>
        <span className="w-10" />
      </div>
      {children}
    </div>
  );
}

const Avatar = ({ initials, tone }: { initials: string; tone: string }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ background: tone }}>
    {initials}
  </span>
);

/** Booking app home screen. */
export function MobileAppScreen({ accent = "#2453e6" }: { accent?: string }) {
  return (
    <div className="flex h-[calc(100%-24px)] flex-col gap-3.5 px-4 pb-3 pt-4 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted">Tuesday, 14 May</p>
          <p className="text-[17px] font-semibold tracking-tight">Hello, Sara</p>
        </div>
        <Avatar initials="SA" tone="#0ea5e9" />
      </div>
      <div className="rounded-2xl p-3.5 text-white" style={{ background: accent }}>
        <p className="text-[9px] uppercase tracking-wider opacity-75">Next appointment</p>
        <p className="mt-1 text-[14px] font-semibold leading-tight">Consultation with Dr. Malik</p>
        <div className="mt-3 flex items-center justify-between text-[10px] opacity-90">
          <span>Today · 4:30 PM</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5">Clinic B</span>
        </div>
      </div>
      <div className="flex gap-1.5 text-[10px]">
        {["All", "Clinics", "Labs", "Pharmacy"].map((c, i) => (
          <span key={c} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-ink text-paper" : "bg-ink/5 text-muted"}`}>{c}</span>
        ))}
      </div>
      <p className="text-[11px] font-semibold">Recent</p>
      <div className="space-y-2">
        {[
          ["Blood test results", "Ready to view", "#16a34a", "BT"],
          ["Prescription refill", "Sent to pharmacy", "#0ea5e9", "RX"],
          ["Follow-up booked", "21 May, 11:00 AM", accent, "FU"],
        ].map(([t, sub, tone, ini]) => (
          <div key={t} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <Avatar initials={ini} tone={tone} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium">{t}</p>
              <p className="text-[9.5px] text-muted">{sub}</p>
            </div>
            <span className="text-[11px] text-faint">›</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around border-t border-ink/8 pt-2.5 text-[9px] text-muted">
        {["Home", "Bookings", "Records", "Profile"].map((t, i) => (
          <span key={t} className={`flex flex-col items-center gap-1 ${i === 0 ? "text-ink" : ""}`}>
            <span className={`h-1 w-1 rounded-full ${i === 0 ? "bg-ink" : "bg-transparent"}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const bars = [42, 55, 48, 62, 58, 71, 66, 78, 74, 86, 81, 92];

/** ERP dashboard for a distribution business. */
export function ErpScreen({ accent = "#2453e6", compact = false }: { accent?: string; compact?: boolean }) {
  return (
    <div className="flex bg-white text-ink">
      {!compact && (
        <aside className="hidden w-36 shrink-0 flex-col gap-0.5 border-r border-ink/8 bg-[#f7f8fa] p-3 text-[10.5px] sm:flex">
          <p className="mb-3 flex items-center gap-1.5 font-semibold">
            <span className="h-4 w-4 rounded" style={{ background: accent }} /> Al-Noor Traders
          </p>
          {["Dashboard", "Sales", "Inventory", "Purchasing", "HR & Payroll", "Reports"].map((m, i) => (
            <span key={m} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-white font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : "text-muted"}`}>{m}</span>
          ))}
        </aside>
      )}
      <div className="min-w-0 flex-1 space-y-3 p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-semibold">Good morning, Imran</p>
          <p className="text-[10px] text-muted">May 2026</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Sales this month", "Rs 4.82M", "+12%"],
            ["Open orders", "138", "+9"],
            ["Low stock", "9 items", "Reorder"],
          ].map(([k, v, d], i) => (
            <div key={k} className="rounded-lg border border-ink/8 bg-white p-2.5">
              <p className="truncate text-[9px] text-muted">{k}</p>
              <p className="mt-0.5 text-[13px] font-semibold tracking-tight">{v}</p>
              <p className="text-[9px]" style={{ color: i === 2 ? "#0ea5e9" : "#15803d" }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-ink/8 bg-white p-3">
          <div className="mb-2 flex justify-between text-[9.5px] text-muted">
            <span className="font-medium text-ink">Monthly sales</span>
            <span>Last 12 months</span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === bars.length - 1 ? accent : `${accent}33` }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-ink/8 bg-white text-[10px]">
          {[
            ["INV-2041", "Hassan Medical Store", "Rs 86,400", "Paid"],
            ["INV-2040", "City Mart, Gulshan", "Rs 124,000", "Due"],
            ...(compact ? [] : [["INV-2039", "Karim & Sons", "Rs 42,750", "Paid"]]),
          ].map(([id, n, amt, st]) => (
            <div key={id} className="flex items-center gap-3 border-b border-ink/6 px-3 py-2 last:border-0">
              <span className="w-14 shrink-0 font-mono text-[9px] text-muted">{id}</span>
              <span className="min-w-0 flex-1 truncate">{n}</span>
              <span className="hidden font-medium sm:inline">{amt}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] ${st === "Paid" ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fef3c7] text-[#b45309]"}`}>{st}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** SaaS analytics dashboard. */
export function WebScreen({ accent = "#2453e6" }: { accent?: string }) {
  const line = [30, 38, 34, 47, 44, 58, 55, 66, 72, 69, 81, 88];
  const d = line.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (line.length - 1)) * 300},${100 - p}`).join(" ");
  return (
    <div className="bg-white p-4 text-ink">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold">
          <span className="h-4 w-4 rounded-full" style={{ background: accent }} /> Ledgerline
        </p>
        <div className="flex gap-3 text-[10px] text-muted">
          <span className="text-ink">Overview</span><span>Customers</span><span>Billing</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[["Active accounts", "2,314"], ["Monthly revenue", "$84.2k"], ["Churn", "1.8%"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-ink/8 bg-white p-2.5">
            <p className="text-[9px] text-muted">{k}</p>
            <p className="mt-0.5 text-[14px] font-semibold tracking-tight">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-lg border border-ink/8 bg-white p-3">
        <p className="mb-1 text-[9.5px] font-medium">Revenue</p>
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-20 w-full" aria-hidden>
          <path d={`${d} L300,100 L0,100 Z`} fill={accent} opacity="0.1" />
          <path d={d} fill="none" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

/** Device frame + illustrative screen for a case study. */
export function CaseMock({ kind, accent }: { kind: MockKind; accent: string }) {
  if (kind === "mobile")
    return (
      <div className="mx-auto w-[44%] max-w-[230px]">
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
