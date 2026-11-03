"use client";

import { useState } from "react";
import { erpChecklist, workflowReview } from "@/content/resources";
import { site } from "@/content/site";
import { EmailCapture } from "@/components/forms/EmailCapture";

/** Email-gated, interactive ERP readiness checklist with a score. */
export function ChecklistGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const score = checked.length;
  const verdict = erpChecklist.scoring.find((s) => score >= s.min && score <= s.max)!;

  if (!unlocked)
    return (
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-8">
          <p className="text-sm font-semibold text-accent">Preview</p>
          {erpChecklist.sections.slice(0, 1).map((sec) => (
            <div key={sec.title} className="mt-4">
              <h3 className="text-lg font-semibold">{sec.title}</h3>
              <ul className="mt-3 space-y-3">
                {sec.items.map((it) => <li key={it} className="flex gap-3 text-muted"><span className="mt-1 h-4 w-4 shrink-0 rounded border border-line" />{it}</li>)}
              </ul>
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="card rounded-2xl p-8">
          <h2 className="text-xl font-semibold tracking-tight">{erpChecklist.formHeading}</h2>
          <p className="mb-6 mt-2 text-sm text-muted">{erpChecklist.formNote}</p>
          <EmailCapture formName="ERP checklist download" button="Unlock the checklist" onDone={() => setUnlocked(true)} />
        </div>
      </div>
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        {erpChecklist.sections.map((sec) => (
          <div key={sec.title} className="card rounded-2xl p-7">
            <h3 className="text-lg font-semibold">{sec.title}</h3>
            <ul className="mt-4 space-y-2">
              {sec.items.map((it) => {
                const on = checked.includes(it);
                return (
                  <li key={it}>
                    <label className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-paper-2">
                      <input type="checkbox" checked={on} onChange={() => setChecked((c) => (on ? c.filter((x) => x !== it) : [...c, it]))} className="mt-1 h-4 w-4 accent-[#2453e6]" />
                      <span>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <button onClick={() => window.print()} className="text-sm font-semibold text-accent">Print or save as PDF →</button>
      </div>
      <aside className="h-fit space-y-4 lg:sticky lg:top-28">
        <div className="rounded-2xl bg-ink-2 p-8 text-white">
          <p className="text-sm text-white/60">Your score</p>
          <p className="font-display mt-1 text-6xl">{score}<span className="text-2xl text-white/40"> / 15</span></p>
          <p className="mt-4 text-xl font-semibold">{verdict.label}</p>
          <p className="mt-2 text-white/70">{verdict.text}</p>
        </div>
        <div className="card rounded-2xl p-7">
          <h3 className="font-semibold">{workflowReview.heading}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{workflowReview.text}</p>
          <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white">{workflowReview.cta}</a>
        </div>
      </aside>
    </div>
  );
}
