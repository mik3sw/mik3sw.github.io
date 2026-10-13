"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EMAIL, SOCIALS } from "@/lib/config/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The email address as the section's main link; its underline draws in on view. */
export function ContactEmail() {
  const reduce = useReducedMotion();

  return (
    <a
      href={SOCIALS.email}
      className="group inline-flex max-w-full items-center gap-3 text-2xl font-medium tracking-tight break-all sm:text-4xl md:text-5xl"
    >
      <span className="relative pb-2">
        {EMAIL}
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-signal transition-[height] group-hover:h-[5px]"
        />
      </span>
      <ArrowUpRight className="size-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}
