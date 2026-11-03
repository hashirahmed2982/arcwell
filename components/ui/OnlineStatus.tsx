"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** "We're online now · 3:42 PM in Karachi" — computed in the visitor's browser. */
export function OnlineStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{ time: string; online: boolean; local: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: site.hours.timezone, hour: "numeric", weekday: "short", hourCycle: "h23" }).formatToParts(now);
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
      const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.find((p) => p.type === "weekday")?.value ?? "");
      const online = site.hours.days.includes(wd) && hour >= site.hours.open && hour < site.hours.close;
      const time = new Intl.DateTimeFormat("en-US", { timeZone: site.hours.timezone, hour: "numeric", minute: "2-digit" }).format(now);
      const local = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(now);
      setState({ time, online, local });
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return <span className={`inline-block h-5 ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className={`h-2 w-2 rounded-full ${state.online ? "bg-sage" : "bg-faint"}`} />
      <span>
        <span className="font-medium">{state.online ? "We're online now" : "We're offline right now"}</span>
        <span className="text-muted"> · {state.time} in Karachi ({state.local} your time)</span>
      </span>
    </span>
  );
}
