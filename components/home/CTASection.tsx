import { Reveal } from "@/components/motion/Reveal";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { site } from "@/content/site";

/** The last page of the story: a warm, quiet invitation. */
export function CTASection({ headline, subtext, button }: { headline: string; subtext?: string; button: string }) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#ead9c6] px-6 py-20 text-center md:px-16 md:py-28">
            <svg aria-hidden viewBox="0 0 400 220" className="pointer-events-none absolute -bottom-6 left-1/2 w-[640px] max-w-none -translate-x-1/2 opacity-[0.35]">
              <path d="M40 220V140a160 160 0 0 1 320 0v80" fill="none" stroke="#c4683d" strokeWidth="1.2" />
              <path d="M80 220V140a120 120 0 0 1 240 0v80" fill="none" stroke="#c4683d" strokeWidth="1.2" />
            </svg>
            <p className="chapter relative mb-6">The next chapter is yours</p>
            <h2 className="font-display relative mx-auto max-w-3xl text-balance text-5xl leading-[1.02] md:text-8xl">{headline}</h2>
            {subtext && <p className="relative mx-auto mt-6 max-w-xl text-lg text-ink/70">{subtext}</p>}
            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-5">
              <BookCallButton label={button} />
              <a href={`mailto:${site.email}`} className="text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink">or email {site.email}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
