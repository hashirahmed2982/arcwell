import { reviews } from "@/content/site";

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="#f5a524" aria-hidden><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
);

/** Ratings on review platforms (Clutch, GoodFirms, Upwork). Hidden when there are none. */
export function ReviewBadges({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  if (!reviews.length) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {reviews.map((r) => (
        <li key={r.platform}>
          <a href={r.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 rounded-xl border border-line bg-white transition-colors hover:border-accent/40 ${compact ? "px-3 py-2" : "px-4 py-3"}`}>
            <span className="text-sm font-bold tracking-tight">{r.platform}</span>
            <span className="h-6 w-px bg-line" />
            <span className="flex flex-col leading-tight">
              <span className="flex items-center gap-1 text-sm font-semibold">{/^\d/.test(r.rating) && <Star />}{r.rating}</span>
              <span className="text-xs text-muted">{r.reviews}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
