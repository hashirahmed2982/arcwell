"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quote } from "@/content/quote";
import { site } from "@/content/site";
import { formToObject, submitLead, track } from "@/lib/leads";
import { fieldClass, labelClass } from "./fields";

const S = quote.steps;
const STEP_LABELS = ["Project", "Features", "Stage", "Start", "Your details"];

/** Five-step project brief. Sends the answers as a lead; never shows a price. */
export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [timeline, setTimeline] = useState("");
  const [sent, setSent] = useState<"idle" | "sending" | "done" | "error">("idle");

  const label = <T extends { id: string; label: string }>(opts: readonly T[], id: string) => opts.find((o) => o.id === id)?.label ?? "";
  const summary = [
    ["Project", label(S.type.options, type)],
    ["Features", S.features.options.filter((f) => features.includes(f.id)).map((f) => f.label).join(", ") || "To discuss"],
    ["Stage", label(S.stage.options, stage)],
    ["Start", label(S.timeline.options, timeline)],
  ] as const;

  const canNext = [type, true, stage, timeline][step];
  const next = () => {
    if (step === 3) track("Quote brief completed", { type });
    setStep((s) => Math.min(4, s + 1));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent("sending");
    const r = await submitLead("quote request", {
      ...formToObject(e.currentTarget),
      project_type: summary[0][1],
      features: summary[1][1],
      stage: summary[2][1],
      start: summary[3][1],
    });
    setSent(r === "ok" || r === "not-configured" ? "done" : "error");
  }

  if (sent === "done")
    return (
      <div className="card rounded-2xl p-8 md:p-12" role="status">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-sage text-xl text-white">✓</span>
            <h2 className="font-display text-3xl">{quote.doneHeading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{quote.doneText}</p>
            <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3.5 font-semibold text-white hover:bg-[#1c45c9]">Book your free call</a>
          </div>
          <div className="rounded-xl bg-paper-2 p-6">
            <p className="eyebrow mb-4">Your brief</p>
            <dl className="space-y-3 text-sm">
              {summary.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );

  return (
    <div className="card overflow-hidden rounded-2xl">
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

      <div className="min-h-[420px] p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            {step === 0 && <Choice question={S.type.question} options={S.type.options} value={type} onChange={setType} />}
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
            {step === 2 && <Choice question={S.stage.question} options={S.stage.options} value={stage} onChange={setStage} />}
            {step === 3 && <Choice question={S.timeline.question} options={S.timeline.options} value={timeline} onChange={setTimeline} />}
            {step === 4 && (
              <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div className="space-y-4">
                  <p className="text-2xl font-semibold tracking-tight">Where should we send your proposal?</p>
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block"><span className={labelClass}>Name</span><input name="name" required autoComplete="name" className={fieldClass} /></label>
                    <label className="block"><span className={labelClass}>Work email</span><input name="email" type="email" required autoComplete="email" className={fieldClass} /></label>
                  </div>
                  <label className="block"><span className={labelClass}>Company</span><input name="company" autoComplete="organization" className={fieldClass} /></label>
                  <label className="block"><span className={labelClass}>{quote.budgetLabel}</span><input name="budget" placeholder={quote.budgetPlaceholder} className={fieldClass} /></label>
                  <label className="block"><span className={labelClass}>Anything else? (optional)</span><textarea name="message" rows={3} className={fieldClass} /></label>
                  {sent === "error" && <p role="alert" className="text-sm text-[#b45309]">Something went wrong. Please email {site.email}.</p>}
                  <button disabled={sent === "sending"} className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white hover:bg-[#1c45c9] disabled:opacity-60">
                    {sent === "sending" ? "Sending…" : "Get my free quote"}
                  </button>
                </div>
                <div className="h-fit rounded-xl bg-paper-2 p-6">
                  <p className="eyebrow mb-4">Your brief</p>
                  <dl className="space-y-3 text-sm">
                    {summary.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6 border-b border-line pb-3 last:border-0"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                    ))}
                  </dl>
                  <p className="mt-5 text-sm leading-relaxed text-muted">After a free 30-minute call we send a written proposal with scope, timeline and a fixed price.</p>
                </div>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 4 && (
        <div className="flex items-center justify-between border-t border-line px-6 py-4 md:px-10">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-sm font-semibold text-muted hover:text-ink disabled:opacity-0">← Back</button>
          <button type="button" onClick={next} disabled={!canNext} className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40">Continue →</button>
        </div>
      )}
      {step === 4 && (
        <div className="border-t border-line px-6 py-4 md:px-10">
          <button type="button" onClick={() => setStep(3)} className="text-sm font-semibold text-muted hover:text-ink">← Back</button>
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
