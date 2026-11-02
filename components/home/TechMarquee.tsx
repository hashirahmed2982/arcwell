import { techStack } from "@/content/site";

/** Infinite scrolling tech names, set in the display serif. Pure CSS, pauses on hover. */
export function TechMarquee({ heading }: { heading: string }) {
  const row = [...techStack, ...techStack];
  return (
    <section aria-label={heading} className="relative border-y border-line py-10 md:py-14">
      <p className="container-x eyebrow mb-8">{heading}</p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[...row, ...row].map((t, i) => (
            <li key={i} aria-hidden={i >= techStack.length} className="flex items-center">
              <span className="font-display px-8 text-5xl text-ink/80 transition-colors hover:text-accent md:px-12 md:text-7xl">{t}</span>
              <span aria-hidden className="text-2xl text-clay">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
