import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { StoryIntro } from "@/components/home/StoryIntro";
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

// The home page reads as a short story, in chapters.
export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <ServicesBento />
      <CodeToProduct />
      <WhyGrid />
      <ProcessTimeline chapter={home.process.chapter} heading={home.process.heading} steps={home.process.steps} />
      <StatsStrip />
      <FeaturedWork />
      <TechMarquee heading={home.techHeading} />
      <Testimonials />
      <CTASection {...home.cta} />
    </>
  );
}
