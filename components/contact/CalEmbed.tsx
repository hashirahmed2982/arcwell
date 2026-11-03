"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/** Inline booking calendar (Cal.com or Calendly), loaded only when scrolled near. */
export function CalEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "300px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const sep = site.bookCallUrl.includes("?") ? "&" : "?";
  const src = site.bookCallUrl.includes("calendly.com") ? `${site.bookCallUrl}${sep}hide_gdpr_banner=1` : `${site.bookCallUrl}${sep}embed=true&theme=light`;
  return (
    <div ref={ref} className="card overflow-hidden rounded-2xl">
      {load ? (
        <iframe src={src} title="Book a call" className="h-[680px] w-full" loading="lazy" />
      ) : (
        <div className="flex h-[680px] items-center justify-center text-muted">Loading calendar…</div>
      )}
    </div>
  );
}
