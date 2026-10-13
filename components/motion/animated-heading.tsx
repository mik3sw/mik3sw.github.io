"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Words rise out of their own masks, one after another, on first view. */
export function AnimatedHeading({ text, as: Tag = "h2", className }: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={line}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {words.map((w, i) => (
          <span key={i}>
            {/* Padding reserve keeps descenders (g, j, p, y) out of the mask. */}
            <span className={cn("-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top")}>
              <motion.span className="inline-block" variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
