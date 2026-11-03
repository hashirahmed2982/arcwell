import type { Block } from "@/content/insights";
import { legalUpdated } from "@/content/legal";
import { Prose } from "./Prose";

export function LegalPage({ title, body }: { title: string; body: Block[] }) {
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <div className="container-x">
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 text-muted">Last updated {new Date(legalUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <div className="mt-12 border-t border-line pt-10"><Prose blocks={body} /></div>
      </div>
    </section>
  );
}
