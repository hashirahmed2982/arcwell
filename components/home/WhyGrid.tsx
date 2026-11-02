import { home } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

// One simple line icon per reason, same order as content/home.ts.
const icons = [
  "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z", // experienced
  "M4 7h16M4 12h10M4 17h7", // built for you
  "M5 12l4 4L19 6", // clear process
  "M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z", // you own it
  "M12 3v18M17 7H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H7", // value
  "M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M18 3v4h-4M6 21v-4h4", // support
];

export function WhyGrid() {
  const { why } = home;
  return (
    <section className="relative bg-paper-2 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading chapter={why.chapter} title={why.heading} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 0.06} className="card group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                  <path d={icons[i % icons.length]} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
