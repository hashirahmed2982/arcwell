import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className = "" }: Props) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-arc text-white shadow-[0_8px_40px_-8px_rgba(123,92,255,0.7)] hover:shadow-[0_8px_50px_-6px_rgba(123,92,255,0.9)]"
      : "glass text-fg hover:bg-white/10";
  const inner = (
    <>
      <span>{children}</span>
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:translate-x-1">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={`${base} ${styles} ${className}`}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
