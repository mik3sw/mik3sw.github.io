"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 160, damping: 20 };
const MAX_TILT = 4;

/**
 * Project tile that tilts slightly toward the pointer and carries a cobalt
 * glow under it (see .spotlight in globals.css). Pointer position is written
 * straight to CSS variables, never to React state.
 */
export function SpotlightTile({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn("spotlight", className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--spot-x", `${px * 100}%`);
        el.style.setProperty("--spot-y", `${py * 100}%`);
        if (reduce) return;
        rotateY.set((px - 0.5) * MAX_TILT);
        rotateX.set(-(py - 0.5) * MAX_TILT);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.article>
  );
}
