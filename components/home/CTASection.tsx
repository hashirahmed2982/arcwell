import { Reveal } from "@/components/motion/Reveal";
import { BookCallButton } from "@/components/ui/BookCallButton";

export function CTASection({ headline, subtext, button }: { headline: string; subtext?: string; button: string }) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-20 text-center md:px-16 md:py-28">
            <div aria-hidden className="absolute inset-0 -z-10 bg-ink-2" />
            <div aria-hidden className="bg-arc absolute left-1/2 top-full -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]" />
            <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-60" />
            <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">{headline}</h2>
            {subtext && <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{subtext}</p>}
            <div className="mt-10 flex justify-center">
              <BookCallButton label={button} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
