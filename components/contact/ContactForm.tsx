"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10";

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
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-10 text-center" role="status">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-2xl text-white">✓</span>
        <p className="max-w-sm text-xl font-medium leading-relaxed">{f.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 rounded-2xl p-6 md:p-10" noValidate={false}>
      <input type="hidden" name="_subject" value={`New enquiry — ${site.name}`} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink/70">{f.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink/70">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink/70">{f.company}</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>

      <ChipGroup legend={f.service} name="service" options={f.serviceOptions} value={service} onChange={setService} />
      <ChipGroup legend={f.budget} name="budget" options={f.budgetOptions} value={budget} onChange={setBudget} />

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink/70">{f.message}</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>

      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="text-sm text-[#b2582f]">
            {FORMSPREE_ID ? f.error : f.notConfigured}{" "}
            <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-[#1c45c9] disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>
    </form>
  );
}

function ChipGroup({ legend, name, options, value, onChange }: { legend: string; name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-ink/70">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o;
          return (
            <label key={o} className={`relative isolate cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${checked ? "border-accent text-accent" : "border-ink/15 text-ink/80 hover:border-ink/40"}`}>
              {checked && <motion.span layoutId={`chip-${name}`} className="absolute inset-0 -z-10 rounded-lg bg-accent-soft" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
              <input type="radio" name={name} value={o} checked={checked} onChange={() => onChange(o)} className="sr-only" />
              <span className="relative">{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
