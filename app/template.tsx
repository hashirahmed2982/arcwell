"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Route transition: each page fades and lifts in. Short, so it never blocks reading.
 *  (No filter here: a filter on this wrapper would break position:fixed pinning inside pages.) */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
