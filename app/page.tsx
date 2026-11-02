import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ServicesBento } from "@/components/home/ServicesBento";
import { CodeToProduct } from "@/components/home/CodeToProduct";
import { WhyGrid } from "@/components/home/WhyGrid";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  ...pageMetadata({ ...home.seo, path: "/" }),
  title: { absolute: home.seo.title },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee heading={home.techHeading} />
      <ServicesBento />
      <CodeToProduct />
      <WhyGrid />
      <ProcessTimeline heading={home.process.heading} steps={home.process.steps} />
      <StatsStrip />
      <FeaturedWork />
      <Testimonials />
      <CTASection {...home.cta} />
    </>
  );
}
