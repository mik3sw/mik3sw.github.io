"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { Asterisk } from "@phosphor-icons/react";

const SKILLS = [
  "RAG pipelines",
  "Fine-tuning",
  "MCP tooling",
  "Computer vision",
  "REST APIs",
  "Local AI",
  "Data extraction",
  "Clean architecture",
];

/** Percent of one copy's width travelled per second when the page is still. */
const BASE_SPEED = 2.2;

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {SKILLS.map((skill) => (
        <Fragment key={skill}>
          <span className="px-6 whitespace-nowrap md:px-10">{skill}</span>
          <Asterisk weight="bold" className="size-[0.6em] shrink-0 text-signal" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * The one marquee on the page. It idles slowly, speeds up with scroll
 * velocity, follows scroll direction and leans into fast scrolls.
 */
export function TechMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(-1);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    const move = direction.current * BASE_SPEED * (delta / 1000);
    baseX.set(baseX.get() + move + move * Math.abs(b));
  });

  if (reduce) {
    return (
      <div aria-hidden="true" className="flex flex-wrap gap-y-2 text-3xl font-semibold tracking-tight text-muted-foreground md:text-5xl">
        <Row />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="overflow-hidden">
      <motion.div
        style={{ x, skewX }}
        className="flex w-max text-4xl font-semibold tracking-[-0.03em] text-muted-foreground md:text-6xl"
      >
        <Row />
        <Row />
      </motion.div>
    </div>
  );
}
