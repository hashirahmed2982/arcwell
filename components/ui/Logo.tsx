import { site } from "@/content/site";

/** Navy tile with an arch — the "arc" in Arcwell. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="7" fill="#0b1b33" />
      <path d="M9.5 24V15.5a6.5 6.5 0 0 1 13 0V24" stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M13 24v-7.5a3 3 0 0 1 6 0V24" stroke="#4d7cff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">{site.name}</span>
    </span>
  );
}
