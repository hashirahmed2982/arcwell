import { Reveal } from "@/components/motion/Reveal";

/** Numbered section label + heading. Wrap words in *asterisks* to show them in the accent colour. */
export function SectionHeading({ chapter, title, intro, center, invert }: { chapter?: string; title: string; intro?: string; center?: boolean; invert?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-3xl md:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      {chapter && <p className={`chapter mb-5 ${invert ? "!text-[#8fb0ff]" : ""}`}>{chapter}</p>}
      <h2 className={`font-display text-balance text-4xl leading-[1.08] md:text-[3.25rem] ${invert ? "text-white" : ""}`}>
        <Emphasis text={title} />
      </h2>
      {intro && <p className={`mt-5 max-w-xl text-pretty text-lg leading-relaxed ${invert ? "text-white/65" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}

/** Renders "plain *accent* plain" with the starred part in <em>. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}</>;
}
