"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MobileAppScreen, PhoneFrame } from "@/components/ui/Mocks";

const code = `class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        BalanceCard(total: 12480),
        QuickActions(),
        OrdersList(),
      ]),
      bottomNavigationBar: NavBar(),
    );
  }
}`;

/** A phone whose screen "types" Flutter code, then morphs into the finished app. Loops. */
export function PhoneMockup() {
  const reduce = useReducedMotion();
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<"code" | "app">(reduce ? "app" : "code");

  useEffect(() => {
    if (reduce) return;
    let timer: number;
    if (phase === "code") {
      if (chars < code.length) {
        timer = window.setTimeout(() => setChars((c) => Math.min(code.length, c + 3)), 22);
      } else {
        timer = window.setTimeout(() => setPhase("app"), 600);
      }
    } else {
      timer = window.setTimeout(() => {
        setChars(0);
        setPhase("code");
      }, 4200);
    }
    return () => window.clearTimeout(timer);
  }, [chars, phase, reduce]);

  return (
    <div className="relative mx-auto w-full" aria-hidden>
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PhoneFrame>
          <AnimatePresence mode="wait">
            {phase === "code" ? (
              <motion.pre
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="h-full overflow-hidden whitespace-pre-wrap bg-[#fbfaf7] px-4 pt-6 font-mono text-[9px] leading-[1.6] text-muted"
              >
                <Highlighted text={code.slice(0, chars)} />
                <span className="ml-px inline-block h-3 w-1.5 animate-pulse bg-accent align-middle" />
              </motion.pre>
            ) : (
              <motion.div
                key="app"
                className="h-full"
                initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <MobileAppScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneFrame>
      </motion.div>
    </div>
  );
}

/** Tiny syntax highlighter for the mock editor. */
export function Highlighted({ text, dark = false }: { text: string; dark?: boolean }) {
  const parts = text.split(/(\b(?:class|extends|return|const|function|export|import|from|await|async|new)\b|@\w+|\b[A-Z][A-Za-z]+\b|\d+|"[^"]*"|'[^']*')/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        let cls = "";
        if (/^(class|extends|return|const|function|export|import|from|await|async|new)$/.test(p)) cls = dark ? "text-[#e59a73]" : "text-[#b2582f]";
        else if (/^@/.test(p)) cls = dark ? "text-[#d9b56a]" : "text-[#9a7424]";
        else if (/^[A-Z]/.test(p)) cls = dark ? "text-[#9fb0ff]" : "text-[#3446c4]";
        else if (/^\d+$/.test(p)) cls = dark ? "text-[#a9c99a]" : "text-[#4f7a45]";
        else if (/^["']/.test(p)) cls = dark ? "text-[#a9c99a]" : "text-[#4f7a45]";
        return cls ? <span key={i} className={cls}>{p}</span> : <span key={i} className={dark ? "text-[#e9e2d6]/85" : "text-ink/75"}>{p}</span>;
      })}
    </>
  );
}
