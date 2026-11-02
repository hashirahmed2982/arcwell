import { site } from "@/content/site";

/** An arch — the "arc" in Arcwell — drawn as a single line. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-ink" />
      <path d="M9.5 24V15.5a6.5 6.5 0 0 1 13 0V24" stroke="#f5f1ea" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="21" r="1.9" fill="#c4683d" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[22px] leading-none">{site.name.split(" ")[0]}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">{site.name.split(" ").slice(1).join(" ")}</span>
      </span>
    </span>
  );
}
