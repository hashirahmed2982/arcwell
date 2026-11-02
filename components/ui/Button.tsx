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
    "group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-accent"
      : "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper";
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
