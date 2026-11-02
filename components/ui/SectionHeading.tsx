import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 max-w-3xl md:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-pretty text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
