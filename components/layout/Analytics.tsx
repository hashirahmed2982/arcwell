"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "aw_cookie_consent";

/**
 * Loads analytics. Plausible is cookie-free, so it needs no banner.
 * Google Analytics only loads after the visitor accepts the cookie banner.
 */
export function Analytics() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const useGa = site.analytics === "ga" && !!GA_ID;

  useEffect(() => {
    if (!useGa) return;
    try {
      setConsent((localStorage.getItem(CONSENT_KEY) as "granted" | "denied" | null) ?? null);
    } catch {}
  }, [useGa]);

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {}
  };

  if (site.analytics === "plausible" && PLAUSIBLE) {
    return (
      <>
        <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />
        <Script id="plausible-queue" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </>
    );
  }

  if (!useGa) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === null && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-[75] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-20px_rgba(11,27,51,0.35)] md:bottom-6">
          <p className="text-sm leading-relaxed text-muted">
            We use analytics cookies to understand which pages are useful. No advertising, no selling data.{" "}
            <Link href="/privacy" className="font-medium text-accent underline">Privacy policy</Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => choose("granted")} className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white">Accept</button>
            <button onClick={() => choose("denied")} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
