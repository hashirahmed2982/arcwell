"use client";

import { useState, type FormEvent } from "react";
import { formToObject, submitLead } from "@/lib/leads";
import { fieldClass, labelClass } from "./fields";
import { site } from "@/content/site";

/** Name + email form used for lead magnets. Calls onDone after a successful (or unconfigured) submit. */
export function EmailCapture({ formName, button = "Send it to me", onDone }: { formName: string; button?: string; onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const r = await submitLead(formName, formToObject(e.currentTarget));
    // While the form service isn't connected (preview), still unlock the resource.
    if (r === "ok" || r === "not-configured") onDone();
    else setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block"><span className={labelClass}>Name</span><input name="name" required autoComplete="name" className={fieldClass} /></label>
      <label className="block"><span className={labelClass}>Work email</span><input name="email" type="email" required autoComplete="email" className={fieldClass} /></label>
      <label className="block"><span className={labelClass}>Company</span><input name="company" autoComplete="organization" className={fieldClass} /></label>
      {status === "error" && <p role="alert" className="text-sm text-[#b45309]">Something went wrong. Please email {site.email}.</p>}
      <button disabled={status === "sending"} className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1c45c9] disabled:opacity-60">
        {status === "sending" ? "Sending…" : button}
      </button>
    </form>
  );
}
