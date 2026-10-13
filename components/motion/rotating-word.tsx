"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cycles through `words` in place. Every word is also rendered invisibly in
 * the same grid cell so the slot always has the width of the longest one.
 */
export function RotatingWord({ words, interval = 2600 }: { words: readonly string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <span className="relative -mb-[0.15em] inline-grid overflow-hidden pb-[0.15em] align-bottom">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap text-foreground"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
