import type { Block } from "@/content/insights";

/** Renders article blocks from /content with consistent typography. */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-2xl space-y-6 text-[17px] leading-[1.8] text-ink/85">
      {blocks.map((b, i) => {
        if ("h" in b) return <h2 key={i} className="!mt-12 text-2xl font-semibold tracking-tight text-ink">{b.h}</h2>;
        if ("list" in b)
          return (
            <ul key={i} className="space-y-2 pl-1">
              {b.list.map((li) => (
                <li key={li} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{li}</li>
              ))}
            </ul>
          );
        if ("quote" in b) return <blockquote key={i} className="border-l-2 border-accent pl-6 text-xl font-medium leading-relaxed text-ink">{b.quote}</blockquote>;
        return <p key={i}>{b.p}</p>;
      })}
    </div>
  );
}
