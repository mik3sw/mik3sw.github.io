"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { PRINCIPLES } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "./motion/animated-heading";
import { Reveal } from "./reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Journey() {
  const reduce = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // Active principle: the last one whose top has passed the middle of the
  // screen. Reads four rects per scroll frame; state only changes on a switch.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-principle]");
    if (!items) return;
    const line = window.innerHeight * 0.5;
    let next = 0;
    items.forEach((item, i) => {
      if (item.getBoundingClientRect().top < line) next = i;
    });
    setActive((prev) => (prev === next ? prev : next));
  });

  // Progress line that fills as the list is read.
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="journey" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Sticky rail on desktop with the peep for the active principle; stacked intro below lg. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <AnimatedHeading text="How I work" className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">
                I design, build and optimize software end to end, and reach for AI when a problem
                calls for it. I studied Information Technology at the University of Milano-Bicocca.
              </p>
            </Reveal>

            <div
              aria-hidden="true"
              className="relative mt-10 hidden aspect-[5/4] max-w-sm overflow-hidden rounded-xl bg-panel lg:block"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={PRINCIPLES[active].art}
                  src={PRINCIPLES[active].art}
                  alt=""
                  initial={{ opacity: 0, y: 60, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -30, rotate: 3 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute bottom-0 left-1/2 w-[88%] -translate-x-1/2"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative pl-10 md:pl-14 lg:col-span-6 lg:col-start-7 lg:pt-3">
          {/* Track and fill. */}
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute top-3 bottom-3 left-[6px] w-[3px] origin-top bg-signal"
          />

          <ol ref={list} className="space-y-16 lg:space-y-28">
            {PRINCIPLES.map((principle, i) => {
              const isActive = active === i;
              return (
                <li key={principle.id} id={principle.id} data-principle={i} className="relative scroll-mt-28">
                  {/* State marker: fills when this principle is the active one. */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: isActive ? 1 : 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={cn(
                      "absolute top-2.5 -left-10 size-[15px] rounded-full border-2 transition-colors duration-500 md:-left-14",
                      isActive ? "border-signal bg-signal" : "border-line bg-background"
                    )}
                  />
                  <Reveal>
                    <h3
                      className={cn(
                        "text-3xl font-semibold tracking-[-0.03em] transition-colors duration-500 md:text-4xl",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {principle.title}
                    </h3>
                    <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                      {principle.body}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-muted-foreground">
                      {principle.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export { Journey };
