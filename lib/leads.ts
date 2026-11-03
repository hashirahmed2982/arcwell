"use client";

// Lead capture helpers: where a visitor came from (attribution), event tracking, and a single
// submit function used by every form on the site. No database: submissions go to Formspree
// (email) and, optionally, to a webhook such as a Google Sheet, Zapier, Make or HubSpot.

const ATTR_KEY = "aw_attribution";
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const LEAD_WEBHOOK = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;

export type Attribution = {
  source: string; // e.g. google, linkedin, upwork, outreach-email, direct
  medium?: string;
  campaign?: string;
  landingPage: string;
  referrer?: string;
  firstSeen: string;
};

function store() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Records first-touch attribution once per visitor. Call on every page load. */
export function captureAttribution() {
  const s = store();
  if (!s || s.getItem(ATTR_KEY)) return;
  const q = new URLSearchParams(window.location.search);
  const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "";
  let source = q.get("utm_source") || q.get("ref") || "";
  if (!source && ref) {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    source = host.includes("google") ? "google" : host.includes("linkedin") ? "linkedin" : host.includes("upwork") ? "upwork" : host.includes("clutch") ? "clutch" : host;
  }
  const a: Attribution = {
    source: source || "direct",
    medium: q.get("utm_medium") || undefined,
    campaign: q.get("utm_campaign") || undefined,
    landingPage: window.location.pathname,
    referrer: ref || undefined,
    firstSeen: new Date().toISOString(),
  };
  try {
    s.setItem(ATTR_KEY, JSON.stringify(a));
  } catch {}
}

export function getAttribution(): Partial<Attribution> {
  try {
    return JSON.parse(store()?.getItem(ATTR_KEY) || "{}");
  } catch {
    return {};
  }
}

type Win = Window & {
  plausible?: (e: string, o?: { props?: Record<string, string> }) => void;
  gtag?: (...args: unknown[]) => void;
};

/** Sends a conversion event to whichever analytics tool is active. */
export function track(event: string, props: Record<string, string> = {}) {
  const w = window as Win;
  w.plausible?.(event, { props });
  w.gtag?.("event", event, props);
}

export type LeadResult = "ok" | "not-configured" | "error";

/** Submits a lead (any form) with attribution attached. */
export async function submitLead(formName: string, data: Record<string, string>): Promise<LeadResult> {
  const a = getAttribution();
  const payload: Record<string, string> = {
    form: formName,
    ...data,
    lead_source: a.source || "direct",
    lead_medium: a.medium || "",
    lead_campaign: a.campaign || "",
    landing_page: a.landingPage || "",
    referrer: a.referrer || "",
    first_seen: a.firstSeen || "",
    submitted_from: window.location.pathname,
    _subject: `New ${formName} — Arcwell Digital`,
  };
  if (!FORMSPREE_ID && !LEAD_WEBHOOK) return "not-configured";

  const jobs: Promise<Response>[] = [];
  if (FORMSPREE_ID)
    jobs.push(
      fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );
  if (LEAD_WEBHOOK)
    jobs.push(fetch(LEAD_WEBHOOK, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) }));

  try {
    const results = await Promise.allSettled(jobs);
    const ok = results.some((r) => r.status === "fulfilled" && (r.value.ok || r.value.type === "opaque"));
    if (ok) track("Lead", { form: formName, source: payload.lead_source });
    return ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

/** Converts a <form> into a plain object (ignores honeypot). */
export function formToObject(form: HTMLFormElement) {
  const out: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (k !== "_gotcha" && typeof v === "string") out[k] = v;
  });
  return out;
}
