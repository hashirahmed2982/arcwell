import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/content/insights";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/home/CTASection";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return p ? pageMetadata({ title: p.title, description: p.excerpt, path: `/insights/${p.slug}` }) : {};
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
  return (
    <>
      <article className="pb-16 pt-32 md:pt-40">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Link href="/insights" className="eyebrow hover:text-ink">← Insights</Link>
            <p className="mt-8"><span className="rounded-md bg-accent-soft px-2 py-1 text-xs font-semibold text-accent">{p.category}</span></p>
            <h1 className="font-display mt-5 text-balance text-4xl leading-[1.08] md:text-[3.25rem]">{p.title}</h1>
            <p className="mt-6 text-muted">{p.author} · {fmt(p.date)} · {p.readMinutes} min read</p>
          </Reveal>
          <div className="mt-12 border-t border-line pt-12">
            <Prose blocks={p.body} />
            <div className="mt-14 max-w-2xl rounded-2xl bg-paper-2 p-7">
              <p className="font-semibold">Planning a project?</p>
              <p className="mt-1 text-muted">Get a ballpark price and timeline in two minutes.</p>
              <Link href="/estimate" className="mt-4 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white">Get an estimate</Link>
            </div>
          </div>
        </div>
      </article>
      <CTASection {...home.cta} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
