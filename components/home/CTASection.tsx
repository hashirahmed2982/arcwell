import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function CTASection({ headline, subtext, button }: { headline: string; subtext?: string; button: string }) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-2 px-6 py-16 md:px-16 md:py-20">
            <div aria-hidden className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/40 blur-[100px]" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-balance text-4xl leading-[1.08] text-white md:text-5xl">{headline}</h2>
                {subtext && <p className="mt-5 max-w-xl text-lg text-white/65">{subtext}</p>}
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a href={site.bookCallUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex w-fit items-center gap-2.5 rounded-lg bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-accent hover:text-white">
                  {button}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a href={`mailto:${site.email}`} className="text-white/65 transition-colors hover:text-white">or email {site.email}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
