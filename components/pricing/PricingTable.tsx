"use client";

import Link from "next/link";
import { useState } from "react";
import { currencies, money, pricing, type CurrencyCode } from "@/content/pricing";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** Engagement models and starting prices, with a currency switcher (USD / GBP / AED / SAR). */
export function PricingTable() {
  const [cur, setCur] = useState<CurrencyCode>("USD");

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow">Engagement models</p>
        <div role="group" aria-label="Currency" className="flex rounded-lg border border-line bg-white p-1">
          {currencies.map((c) => (
            <button key={c.code} type="button" onClick={() => setCur(c.code)} aria-pressed={cur === c.code} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${cur === c.code ? "bg-ink text-white" : "text-muted hover:text-ink"}`}>
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {pricing.models.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08} className={`relative flex flex-col rounded-2xl p-7 md:p-8 ${m.featured ? "bg-ink-2 text-white shadow-[0_30px_60px_-30px_rgba(11,27,51,0.6)]" : "card"}`}>
            {m.featured && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold">Most popular</span>}
            <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
            <p className={`mt-2 text-sm ${m.featured ? "text-white/65" : "text-muted"}`}>{m.bestFor}</p>
            <p className="mt-6">
              <span className={`text-sm ${m.featured ? "text-white/65" : "text-muted"}`}>From </span>
              <span className="font-display text-4xl">{money(m.price.from, cur)}</span>
              <span className={`block text-sm ${m.featured ? "text-white/65" : "text-muted"}`}>{m.price.unit}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-[15px]">
              {m.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className={`mt-0.5 shrink-0 ${m.featured ? "text-[#8fb0ff]" : "text-accent"}`}><path d="M5 10.5l3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {p}
                </li>
              ))}
            </ul>
            {m.href === "book" ? (
              <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold ${m.featured ? "bg-white text-ink" : "border border-line hover:border-ink/40"}`}>{m.cta}</a>
            ) : (
              <Link href={m.href} className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold ${m.featured ? "bg-accent text-white hover:bg-[#1c45c9]" : "border border-line hover:border-ink/40"}`}>{m.cta}</Link>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h2 className="font-display text-3xl md:text-4xl">{pricing.startingPrices.heading}</h2>
        <div className="card mt-8 overflow-hidden rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-paper-2 text-sm text-muted">
              <tr>
                <th className="px-6 py-3 font-semibold">Project</th>
                <th className="px-6 py-3 font-semibold">Starting from</th>
                <th className="hidden px-6 py-3 font-semibold sm:table-cell">Typical timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {pricing.startingPrices.items.map((it) => (
                <tr key={it.name}>
                  <td className="px-6 py-4 font-medium">{it.name}</td>
                  <td className="px-6 py-4 font-semibold">{money(it.from, cur)}</td>
                  <td className="hidden px-6 py-4 text-muted sm:table-cell">{it.weeks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">{pricing.startingPrices.note}</p>
      </Reveal>
    </>
  );
}
