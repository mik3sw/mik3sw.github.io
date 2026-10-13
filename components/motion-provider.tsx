"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honors prefers-reduced-motion for every Motion animation on the site. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
