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
    <div className="relative mx-auto w-[240px] md:w-[270px]" aria-hidden>
      <div className="absolute -inset-10 -z-10 rounded-full bg-arc-2/30 blur-[70px]" />
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-2, 1, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
                className="h-full overflow-hidden whitespace-pre-wrap p-4 pt-10 font-mono text-[9.5px] leading-[1.55] text-muted"
              >
                <Highlighted text={code.slice(0, chars)} />
                <span className="ml-px inline-block h-3 w-1.5 animate-pulse bg-arc-1 align-middle" />
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
export function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\b(?:class|extends|return|const|function|export|import|from|await|async|new)\b|@\w+|\b[A-Z][A-Za-z]+\b|\d+|"[^"]*"|'[^']*')/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        let cls = "";
        if (/^(class|extends|return|const|function|export|import|from|await|async|new)$/.test(p)) cls = "text-[#c792ff]";
        else if (/^@/.test(p)) cls = "text-[#ffcb6b]";
        else if (/^[A-Z]/.test(p)) cls = "text-[#82aaff]";
        else if (/^\d+$/.test(p)) cls = "text-[#f78c6c]";
        else if (/^["']/.test(p)) cls = "text-[#c3e88d]";
        return cls ? <span key={i} className={cls}>{p}</span> : <span key={i} className="text-fg/80">{p}</span>;
      })}
    </>
  );
}
