"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/motion/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`border-b transition-all duration-300 ${scrolled ? "border-line bg-white/85 backdrop-blur-md" : "border-transparent"}`}>
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative isolate px-4 py-2 text-[14px] font-medium transition-colors ${isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {isActive(item.href) && (
                <motion.span layoutId="nav-pill" className="absolute inset-x-4 -bottom-[1px] h-[2px] rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 35 }} />
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-accent">
              Book a call
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-center">
              {nav.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link href={item.href} className="font-display block border-b border-line py-4 text-3xl">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex w-fit rounded-lg bg-accent px-6 py-3.5 font-semibold text-white">
                Book a call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
