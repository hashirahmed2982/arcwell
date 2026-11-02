import { site } from "@/content/site";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="arcg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d7bff" />
          <stop offset="0.55" stopColor="#7b5cff" />
          <stop offset="1" stopColor="#b05cff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#arcg)" />
      <path d="M8 23a8 8 0 0 1 16 0" stroke="white" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="11" r="2.4" fill="white" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 font-semibold tracking-tight">
      <LogoMark />
      <span className="text-[15px]">{site.name}</span>
    </span>
  );
}
