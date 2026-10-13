"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SiHuggingface, SiPython, SiPytorch, SiSwift, type IconType } from "@icons-pack/react-simple-icons";
import { HERO_PEEP } from "@/lib/config/constants";
import { cn } from "@/lib/utils";

type Badge = {
  Icon: IconType;
  label: string;
  /** Position around the panel. Small offsets on phones keep them on screen. */
  className: string;
  /** Parallax depth: how far it drifts with the pointer. Negative = opposite way. */
  depth: number;
  /** Seconds for one float cycle, varied so they never move in sync. */
  period: number;
};

const BADGES: Badge[] = [
  { Icon: SiPython, label: "Python", className: "left-0 top-[10%] sm:-left-8", depth: 1.2, period: 5.2 },
  { Icon: SiSwift, label: "Swift", className: "right-[8%] -top-5 sm:-top-7", depth: -0.8, period: 6.1 },
  { Icon: SiHuggingface, label: "Hugging Face", className: "right-0 top-[40%] sm:-right-8", depth: 1.6, period: 4.6 },
  { Icon: SiPytorch, label: "PyTorch", className: "left-[4%] bottom-[16%] sm:-left-10", depth: -1.3, period: 5.8 },
];

function FloatingBadge({
  badge,
  index,
  pointerX,
  pointerY,
}: {
  badge: Badge;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(pointerX, (v) => v * badge.depth * 36);
  const y = useTransform(pointerY, (v) => v * badge.depth * 36);
  const { Icon } = badge;

  return (
    <motion.div style={{ x, y }} className={cn("absolute z-10", badge.className)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.7 + index * 0.12 }}
      >
        <motion.div
          title={badge.label}
          animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, index % 2 ? 4 : -4, 0] }}
          transition={{ duration: badge.period, repeat: Infinity, ease: "easeInOut" }}
          className="grid size-12 place-items-center rounded-xl border border-line bg-background shadow-[0_14px_30px_-14px_color-mix(in_oklch,var(--signal)_55%,transparent)] sm:size-16"
        >
          <Icon className="size-6 sm:size-7" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hero illustration: the peep on a light panel that tilts toward the pointer,
 * drifts on scroll, and is orbited by floating tool badges at different depths.
 */
export function HeroArt() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Pointer position across the viewport, -0.5..0.5, smoothed by springs.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [6, -6]);

  // As the hero leaves, the panel sinks slower than the page and leans back.
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  return (
    <div ref={root} className="relative mx-auto w-[88%] max-w-md sm:w-full md:mr-0">
      {BADGES.map((badge, i) => (
        <FloatingBadge key={badge.label} badge={badge} index={i} pointerX={pointerX} pointerY={pointerY} />
      ))}

      <motion.div style={reduce ? undefined : { y: scrollY, rotate: scrollRotate }}>
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
          className="hero-unveil group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-panel"
        >
          {/* Slow breathing halo behind the head. */}
          <motion.div
            aria-hidden="true"
            animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[14%] left-1/2 aspect-square w-[62%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--signal)_38%,transparent),transparent_68%)]"
          />
          {/* Both frames stay mounted so the hover swap never flickers. */}
          <img
            src={HERO_PEEP.src}
            width={HERO_PEEP.width}
            height={HERO_PEEP.height}
            alt={HERO_PEEP.alt}
            fetchPriority="high"
            className="absolute bottom-0 left-1/2 w-[82%] -translate-x-1/2 transition-opacity duration-200 group-hover:opacity-0"
          />
          <img
            src={HERO_PEEP.hover}
            width={HERO_PEEP.width}
            height={HERO_PEEP.height}
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 w-[82%] -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
