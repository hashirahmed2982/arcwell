import { agencies } from "@/content/agencies";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { OnlineStatus } from "@/components/ui/OnlineStatus";
import { ReviewBadges } from "@/components/ui/ReviewBadges";

export const metadata = pageMetadata({ ...agencies.seo, path: "/agencies" });

export default function AgenciesPage() {
  return (
    <>
      <PageHero eyebrow={agencies.eyebrow} title={agencies.heading} intro={agencies.intro} highlight={["Our", "delivery"]}>
        <BookCallButton label={agencies.primaryCta} />
        <Button href="/quote" variant="ghost">Request developers</Button>
      </PageHero>

      <section className="border-b border-line py-8">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <OnlineStatus />
          <ReviewBadges compact />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="Why partner with us" title="A team your clients will never know about" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agencies.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="card rounded-2xl p-7">
                <span className="text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading chapter="Engagement" title={agencies.modelsHeading} />
          <div className="grid gap-4 md:grid-cols-2">
            {agencies.models.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} className="card rounded-2xl p-8">
                <h3 className="text-2xl font-semibold tracking-tight">{m.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{m.description}</p>
                <ul className="mt-6 space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline chapter="Getting started" heading={agencies.stepsHeading} steps={agencies.steps} />
      <Testimonials chapter="Partners" />
      <CTASection headline="Got more projects than people?" subtext="Tell us about your overflow. We'll reply within 24 hours." button={agencies.primaryCta} />
    </>
  );
}
