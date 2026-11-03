import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";
import { solutions } from "@/content/solutions";
import { posts } from "@/content/insights";
import { erpChecklist } from "@/content/resources";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/", "/services/", "/erp/", "/work/", "/pricing/", "/agencies/", "/estimate/", "/about/", "/contact/",
    "/solutions/", "/insights/", `/resources/${erpChecklist.slug}/`, "/privacy/", "/terms/",
    ...caseStudies.map((c) => `/work/${c.slug}/`),
    ...solutions.map((s) => `/solutions/${s.slug}/`),
    ...posts.map((p) => `/insights/${p.slug}/`),
  ];
  return pages.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: "monthly", priority: p === "/" ? 1 : p.split("/").length > 3 ? 0.6 : 0.8 }));
}
