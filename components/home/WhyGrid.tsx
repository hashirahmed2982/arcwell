import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Chapter four: reasons set as an editorial list, like a contents page. */
export function WhyGrid() {
  const { why } = home;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading chapter={why.chapter} title={why.heading} />
        <ul className="grid gap-x-16 md:grid-cols-2">
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className="group border-t border-line py-8">
              <div className="flex gap-6">
                <span className="font-display w-8 shrink-0 pt-1 text-xl text-faint">{i + 1}.</span>
                <div>
                  <h3 className="font-display text-3xl transition-colors duration-300 group-hover:text-accent md:text-[2.25rem]">{item.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
