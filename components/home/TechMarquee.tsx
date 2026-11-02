import { techStack } from "@/content/site";

const icons: Record<string, React.ReactNode> = {
  Flutter: <path d="M14 3L5 12l3 3L20 3h-6zm0 9l-5 5 5 5h6l-5-5 5-5h-6z" />,
  React: (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </g>
  ),
  "Next.js": (
    <g>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 8v8M9 8l7 9M15 8v5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </g>
  ),
  "Node.js": <path d="M12 2l9 5v10l-9 5-9-5V7z" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  Firebase: <path d="M5 18L7.5 3l3.5 6.5L13 6l6 12-7 4z" />,
  Figma: (
    <g>
      <rect x="7" y="2" width="5" height="6" rx="2.5" />
      <rect x="12" y="2" width="5" height="6" rx="2.5" opacity=".7" />
      <rect x="7" y="8" width="5" height="6" rx="2.5" opacity=".85" />
      <circle cx="14.5" cy="11" r="2.5" opacity=".6" />
      <rect x="7" y="14" width="5" height="6" rx="2.5" opacity=".5" />
    </g>
  ),
};

/** Infinite scrolling technology logos. Pure CSS, pauses on hover. */
export function TechMarquee({ heading }: { heading: string }) {
  const row = [...techStack, ...techStack];
  return (
    <section aria-label={heading} className="relative border-y border-line py-12">
      <p className="container-x eyebrow mb-8 text-center">{heading}</p>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-16 pr-16 group-hover:[animation-play-state:paused] md:gap-24 md:pr-24">
          {[...row, ...row].map((t, i) => (
            <li key={i} aria-hidden={i >= techStack.length} className="flex items-center gap-3 text-xl font-semibold tracking-tight text-faint transition-colors duration-300 hover:text-ink md:text-2xl">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{icons[t]}</svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
