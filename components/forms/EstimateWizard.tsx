"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { estimate } from "@/content/estimate";
import { currencies, money, type CurrencyCode } from "@/content/pricing";
import { site } from "@/content/site";
import { formToObject, submitLead, track } from "@/lib/leads";
import { fieldClass, labelClass } from "./fields";

const S = estimate.steps;
const STEP_LABELS = ["Project", "Features", "Design", "Timeline", "Your estimate"];
const weeksFactor: Record<string, number> = { asap: 0.8, normal: 1, flexible: 1.15 };

export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [design, setDesign] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [sent, setSent] = useState<"idle" | "sending" | "done" | "error">("idle");

  const result = useMemo(() => {
    const t = S.type.options.find((o) => o.id === type);
    if (!t) return null;
    const light = type === "website" || type === "design";
    const feats = S.features.options.filter((f) => features.includes(f.id));
    const fCost = feats.reduce((a, f) => a + f.cost, 0) * (light ? 0.4 : 1);
    const fWeeks = feats.reduce((a, f) => a + f.weeks, 0) * (light ? 0.4 : 1);
    const d = S.design.options.find((o) => o.id === design)?.factor ?? 1;
    const tl = S.timeline.options.find((o) => o.id === timeline)?.factor ?? 1;
    const low = (t.base + fCost) * d * tl;
    const high = low * (1 + estimate.rangeSpread);
    const weeks = Math.max(2, Math.round((t.weeks + fWeeks) * (d > 1 ? 1.1 : 1) * (weeksFactor[timeline] ?? 1)));
    return { low, high, weeks: `${weeks}–${weeks + Math.max(2, Math.round(weeks * 0.25))} weeks`, typeLabel: t.label, featureLabels: feats.map((f) => f.label) };
  }, [type, features, design, timeline]);

  const canNext = [type, true, design, timeline][step];
  const next = () => {
    if (step === 3) track("Estimate completed", { type });
    setStep((s) => Math.min(4, s + 1));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!result) return;
    setSent("sending");
    const r = await submitLead("estimate", {
      ...formToObject(e.currentTarget),
      project_type: result.typeLabel,
      features: result.featureLabels.join(", ") || "None selected",
      design: S.design.options.find((o) => o.id === design)?.label ?? "",
      timeline: S.timeline.options.find((o) => o.id === timeline)?.label ?? "",
      estimate_usd: `${money(result.low, "USD")} – ${money(result.high, "USD")}`,
      estimate_weeks: result.weeks,
    });
    setSent(r === "ok" ? "done" : r === "not-configured" ? "done" : "error");
  }

  return (
    <div className="card overflow-hidden rounded-2xl">
      {/* Progress */}
      <div className="border-b border-line px-6 py-4 md:px-10">
        <ol className="flex gap-2">
          {STEP_LABELS.map((l, i) => (
            <li key={l} className="flex-1">
              <span className={`block h-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-accent" : "bg-paper-3"}`} />
              <span className={`mt-2 hidden text-xs font-medium sm:block ${i === step ? "text-ink" : "text-faint"}`}>{l}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="min-h-[440px] p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <Choice question={S.type.question} options={S.type.options} value={type} onChange={(v) => { setType(v); }} />
            )}
            {step === 1 && (
              <fieldset>
                <legend className="text-2xl font-semibold tracking-tight">{S.features.question}</legend>
                <p className="mt-1 text-muted">{S.features.hint}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {S.features.options.map((o) => {
                    const on = features.includes(o.id);
                    return (
                      <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${on ? "border-accent bg-accent-soft" : "border-line hover:border-ink/30"}`}>
                        <input type="checkbox" checked={on} onChange={() => setFeatures((f) => (on ? f.filter((x) => x !== o.id) : [...f, o.id]))} className="h-4 w-4 accent-[#2453e6]" />
                        <span className="font-medium">{o.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
            {step === 2 && <Choice question={S.design.question} options={S.design.options} value={design} onChange={setDesign} />}
            {step === 3 && <Choice question={S.timeline.question} options={S.timeline.options} value={timeline} onChange={setTimeline} />}
            {step === 4 && result && (
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                  <p className="chapter">Your ballpark estimate</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {currencies.map((c) => (
                      <button key={c.code} type="button" onClick={() => setCurrency(c.code)} className={`rounded-md px-2.5 py-1 text-xs font-semibold ${currency === c.code ? "bg-ink text-white" : "bg-paper-2 text-muted hover:text-ink"}`}>
                        {c.code}
                      </button>
                    ))}
                  </div>
                  <p className="font-display mt-5 text-4xl md:text-5xl">
                    {money(result.low, currency)} <span className="text-faint">–</span> {money(result.high, currency)}
                  </p>
                  <p className="mt-3 text-lg text-muted">Timeline: <span className="font-semibold text-ink">{result.weeks}</span></p>
                  <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                    <div className="flex justify-between gap-6"><dt className="text-muted">Project</dt><dd className="font-medium">{result.typeLabel}</dd></div>
                    <div className="flex justify-between gap-6"><dt className="text-muted">Features</dt><dd className="text-right font-medium">{result.featureLabels.join(", ") || "Core features only"}</dd></div>
                  </dl>
                  <p className="mt-6 text-sm leading-relaxed text-muted">{estimate.resultNote}</p>
                </div>

                <div className="rounded-xl bg-paper-2 p-6">
                  {sent === "done" ? (
                    <div className="flex h-full flex-col justify-center text-center" role="status">
                      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage text-xl text-white">✓</span>
                      <p className="text-lg font-semibold">Thanks — we've got your estimate.</p>
                      <p className="mt-2 text-muted">We'll reply within 24 hours with questions and a fixed quote.</p>
                      <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="mx-auto mt-6 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white">Or book a call now</a>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                      <p className="text-lg font-semibold tracking-tight">Get a fixed quote</p>
                      <p className="-mt-2 text-sm text-muted">We'll send this estimate to your inbox and follow up within 24 hours.</p>
                      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                      <label className="block"><span className={labelClass}>Name</span><input name="name" required autoComplete="name" className={fieldClass} /></label>
                      <label className="block"><span className={labelClass}>Work email</span><input name="email" type="email" required autoComplete="email" className={fieldClass} /></label>
                      <label className="block"><span className={labelClass}>Anything else? (optional)</span><textarea name="message" rows={3} className={fieldClass} /></label>
                      {sent === "error" && <p role="alert" className="text-sm text-[#b45309]">Something went wrong. Please email {site.email}.</p>}
                      <button disabled={sent === "sending"} className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white hover:bg-[#1c45c9] disabled:opacity-60">
                        {sent === "sending" ? "Sending…" : "Send me a fixed quote"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 4 && (
        <div className="flex items-center justify-between border-t border-line px-6 py-4 md:px-10">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-sm font-semibold text-muted hover:text-ink disabled:opacity-0">← Back</button>
          <button type="button" onClick={next} disabled={!canNext} className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40">
            {step === 3 ? "See my estimate" : "Continue"} →
          </button>
        </div>
      )}
    </div>
  );
}

function Choice({ question, options, value, onChange }: { question: string; options: readonly { id: string; label: string; hint?: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="text-2xl font-semibold tracking-tight">{question}</legend>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <label key={o.id} className={`cursor-pointer rounded-xl border p-5 transition-colors ${on ? "border-accent bg-accent-soft ring-2 ring-accent/20" : "border-line hover:border-ink/30"}`}>
              <input type="radio" name={question} value={o.id} checked={on} onChange={() => onChange(o.id)} className="sr-only" />
              <span className="block font-semibold">{o.label}</span>
              {o.hint && <span className="mt-1 block text-sm text-muted">{o.hint}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
