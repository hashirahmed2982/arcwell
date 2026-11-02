import { Reveal } from "@/components/motion/Reveal";

/** Chapter label + serif heading. Wrap a word in *asterisks* to set it in the italic accent. */
export function SectionHeading({ chapter, title, intro, center }: { chapter?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-14 max-w-3xl md:mb-20 ${center ? "mx-auto text-center" : ""}`}>
      {chapter && <p className="chapter mb-5">{chapter}</p>}
      <h2 className="font-display text-balance text-5xl leading-[1.02] md:text-7xl">
        <Emphasis text={title} />
      </h2>
      {intro && <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

/** Renders "plain *accent* plain" with the starred part in <em>. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}</>;
}
