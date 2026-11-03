import { pricing, faq } from "@/content/pricing";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { PricingTable } from "@/components/pricing/PricingTable";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Faq } from "@/components/ui/Faq";
import { CTASection } from "@/components/home/CTASection";
import { Button } from "@/components/ui/Button";
import { BookCallButton } from "@/components/ui/BookCallButton";

export const metadata = pageMetadata({ ...pricing.seo, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow={pricing.eyebrow} title={pricing.heading} intro={pricing.intro}>
        <Button href="/estimate">Get an estimate</Button>
        <BookCallButton variant="ghost" />
      </PageHero>
      <section className="py-20 md:py-28">
        <div className="container-x"><PricingTable /></div>
      </section>
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading chapter="FAQ" title="Questions buyers ask us" intro="Working with a team in another country raises fair questions. Here are straight answers." />
          <Faq items={faq} />
        </div>
      </section>
      <CTASection {...home.cta} />
    </>
  );
}
