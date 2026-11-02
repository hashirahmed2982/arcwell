"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3.5 text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-arc-1 focus:bg-white/[0.05]";

/** Sends submissions by email through Formspree. No database. */
export function ContactForm() {
  const f = contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      e.currentTarget.reset();
      setService("");
      setBudget("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center" role="status">
        <span className="bg-arc mb-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white">✓</span>
        <p className="max-w-sm text-xl">{f.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-3xl p-6 md:p-10" noValidate={false}>
      <input type="hidden" name="_subject" value={`New enquiry — ${site.name}`} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">{f.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">{f.company}</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>

      <ChipGroup legend={f.service} name="service" options={f.serviceOptions} value={service} onChange={setService} />
      <ChipGroup legend={f.budget} name="budget" options={f.budgetOptions} value={budget} onChange={setBudget} />

      <label className="block">
        <span className="mb-2 block text-sm text-muted">{f.message}</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="text-sm text-red-300">
            {FORMSPREE_ID ? f.error : f.notConfigured}{" "}
            <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-arc w-full rounded-full px-6 py-4 font-semibold text-white shadow-[0_8px_40px_-8px_rgba(123,92,255,0.7)] transition-opacity disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}

function ChipGroup({ legend, name, options, value, onChange }: { legend: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o;
          return (
            <label key={o} className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-arc-1 ${checked ? "border-transparent text-white" : "border-line text-fg/80 hover:border-white/25"}`}>
              {checked && <motion.span layoutId={`chip-${name}`} className="bg-arc absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
              <input type="radio" name={name} value={o} checked={checked} onChange={() => onChange(o)} className="sr-only" />
              <span className="relative">{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
