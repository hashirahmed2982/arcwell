"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Reveals a headline word by word. `highlight` words are set in the italic accent (<em>). */
export function WordReveal({
  text,
  highlight = [],
  className,
  delay = 0,
  as = "h1",
}: {
  text: string;
  highlight?: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => {
        const hl = highlight.includes(w.replace(/[.,—]/g, ""));
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {hl ? <em>{w}</em> : w}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}
