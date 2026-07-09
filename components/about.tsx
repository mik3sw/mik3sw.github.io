"use client";

import { motion, useInView, Variants } from "framer-motion";
import Features from "./ui/feature-section";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const item: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={item}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      id="about"
    >
      <Features />
    </motion.div>
  );
}

export { About };
