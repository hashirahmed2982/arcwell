import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/content/work";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "Arcwell Digital case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return ogImage(study?.title ?? "Case study", study?.clientType ?? "Case study");
}
