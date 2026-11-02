import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services/", "/erp/", "/work/", "/about/", "/contact/", ...caseStudies.map((c) => `/work/${c.slug}/`)];
  return pages.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
