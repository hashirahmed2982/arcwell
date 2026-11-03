import { site } from "@/content/site";

/** Small reminder shown while invented sample content is switched on. */
export function SampleBadge() {
  if (!site.showSampleContent) return null;
  return (
    <div className="fixed bottom-20 left-4 z-[55] flex max-w-[calc(100vw-6rem)] md:bottom-4 items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Preview — sample content (reviews, testimonials, logos)
    </div>
  );
}
