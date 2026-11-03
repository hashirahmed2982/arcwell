import { Reveal } from "@/components/motion/Reveal";

/** Accessible FAQ accordion (native <details>) with FAQPage structured data for Google. */
export function Faq({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((i, n) => (
        <Reveal key={i.q} delay={Math.min(n, 5) * 0.04}>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
              {i.q}
              <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{i.a}</p>
          </details>
        </Reveal>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
