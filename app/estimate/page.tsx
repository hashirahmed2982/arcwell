import { estimate } from "@/content/estimate";
import { pageMetadata } from "@/lib/seo";
import { EstimateWizard } from "@/components/forms/EstimateWizard";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewBadges } from "@/components/ui/ReviewBadges";
import { assurances } from "@/content/site";

export const metadata = pageMetadata({ ...estimate.seo, path: "/estimate" });

export default function EstimatePage() {
  return (
    <section className="relative bg-paper-2 pb-24 pt-32 md:pt-40">
      <div aria-hidden className="dot-bg absolute inset-x-0 top-0 h-[500px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="chapter mb-5">{estimate.eyebrow}</p>
          <h1 className="font-display text-balance text-4xl leading-[1.06] md:text-6xl">{estimate.heading}</h1>
          <p className="mt-5 text-lg text-muted">{estimate.intro}</p>
        </Reveal>
        <Reveal delay={0.15} className="mx-auto mt-12 max-w-5xl">
          <EstimateWizard />
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-between gap-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {assurances.map((a) => <li key={a.title} className="flex items-center gap-2"><span className="text-accent">✓</span>{a.title}</li>)}
          </ul>
          <ReviewBadges compact />
        </div>
      </div>
    </section>
  );
}
