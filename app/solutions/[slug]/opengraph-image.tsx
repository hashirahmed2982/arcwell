import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { solutions, getSolution } from "@/content/solutions";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "Arcwell Digital";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return solutions.map((x) => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getSolution((await params).slug);
  return ogImage(item?.title ?? "Arcwell Digital", "Arcwell Digital");
}
