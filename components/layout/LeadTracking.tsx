"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { captureAttribution, track } from "@/lib/leads";

/** Records where the visitor came from and tracks clicks on booking, WhatsApp and email links. */
export function LeadTracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith(site.bookCallUrl)) track("Book call click", { page: location.pathname });
      else if (href.startsWith(site.whatsappUrl)) track("WhatsApp click", { page: location.pathname });
      else if (href.startsWith("mailto:")) track("Email click", { page: location.pathname });
      else if (href.startsWith("/quote")) track("Quote click", { page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
