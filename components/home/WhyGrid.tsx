import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function WhyGrid() {
  const { why } = home;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Why us" title={why.heading} />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 md:p-10">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-muted">{item.description}</p>
              <span aria-hidden className="bg-arc absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
