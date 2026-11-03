"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** WhatsApp button (all screens) and a sticky "Get a free quote" bar on mobile, shown after scrolling. */
export function FloatingActions() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onQuote = pathname.startsWith("/quote") || pathname.startsWith("/contact");

  return (
    <>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-20 right-4 z-[56] flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 md:bottom-6 md:right-6 ${show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        style={{ width: 52, height: 52 }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z" />
        </svg>
      </a>

      {!onQuote && (
        <div className={`fixed inset-x-0 bottom-0 z-[55] border-t border-line bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex gap-2">
            <Link href="/quote" className="flex-1 rounded-lg bg-accent py-3 text-center text-sm font-semibold text-white">Get a free quote</Link>
            <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-line py-3 text-center text-sm font-semibold">Book a call</a>
          </div>
        </div>
      )}
    </>
  );
}
