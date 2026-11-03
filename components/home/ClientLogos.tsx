import { clients } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

// Simple marks so each wordmark looks like a distinct brand.
const marks = [
  <path key="0" d="M4 18L12 4l8 14z" />,
  <circle key="1" cx="12" cy="12" r="8" />,
  <rect key="2" x="4" y="4" width="16" height="16" rx="4" />,
  <path key="3" d="M3 16c4-8 14-8 18 0" fill="none" stroke="currentColor" strokeWidth="3" />,
  <path key="4" d="M12 3l9 9-9 9-9-9z" />,
  <path key="5" d="M5 5h6v14H5zM13 9h6v10h-6z" />,
  <path key="6" d="M4 12a8 8 0 0116 0z" />,
];
const styles = ["font-semibold tracking-tight", "font-bold tracking-tight", "font-medium tracking-wide uppercase text-[0.85em]", "font-semibold italic", "font-bold uppercase tracking-[0.12em] text-[0.8em]", "font-medium tracking-tight", "font-semibold"];

/** "Trusted by" row of client wordmarks. Hidden when there are no clients to show. */
export function ClientLogos() {
  if (!clients.length) return null;
  return (
    <section aria-label="Clients" className="border-b border-line py-12">
      <div className="container-x">
        <p className="mb-8 text-center text-sm text-muted">Trusted by growing teams across the UK, Europe and the Middle East</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((c, i) => (
            <Reveal as="li" key={c} delay={i * 0.04} className={`flex items-center gap-2 text-lg text-faint transition-colors duration-300 hover:text-ink md:text-xl ${styles[i % styles.length]}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{marks[i % marks.length]}</svg>
              {c}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
