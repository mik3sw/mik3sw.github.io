"use client";

import { motion, useInView, Variants } from "framer-motion";
import {UsersIcon, LightbulbIcon, HandshakeIcon, FlaskConicalIcon, TimerIcon, DnaIcon } from 'lucide-react'
import Features from "./ui/feature-section";
import { useRef } from "react";

const featuresList = [
  {
    icon: UsersIcon,
    title: 'People, our value',
    description:
      "We are thirty professionals who head in the same direction: we are ReDiX team.",
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  },
  {
    icon: DnaIcon,
    title: 'Mission',
    description:
      'Providing our clients the most useful and appropriate IT solution and building up a relationship based on trust and loyalty.',
    cardBorderColor: 'border-destructive/40 hover:border-destructive',
    avatarTextColor: 'text-destructive',
    avatarBgColor: 'bg-destructive/10'
  },
  {
    icon: LightbulbIcon,
    title: 'Concept',
    description:
      'Our ability to face challenges, to respond to needs and exploit the opportunities as a way to grow up depends on a shared sense of responsibility.',
    cardBorderColor: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400',
    avatarTextColor: 'text-amber-600 dark:text-amber-400',
    avatarBgColor: 'bg-amber-600/10 dark:bg-amber-400/10'
  },
  {
    icon: HandshakeIcon,
    title: 'Transparency and trust',
    description:
      'ReDiX team are fond of their job. Those who choose to collaborate with us know they can rely on a company that offers transparency dedication and respect for the client’s needs.',
    cardBorderColor: 'border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400',
    avatarTextColor: 'text-sky-600 dark:text-sky-400',
    avatarBgColor: 'bg-sky-600/10 dark:bg-sky-400/10'
  },
  {
    icon: TimerIcon,
    title: 'Efficiency and flexibility',
    description:
      'Flexibility is the key to success in the ICT field: keeping to adapt ourselves to be able to design new solutions, the most efficient ones.',
    cardBorderColor: 'border-primary/40 hover:border-primary',
    avatarTextColor: 'text-primary',
    avatarBgColor: 'bg-primary/10'
  },
  {
    icon: FlaskConicalIcon,
    title: 'Innovation and improvements',
    description:
      'Updates, training and innovation are the key words. Keeping up with the times, specializing in the most promising technologies, these are the challenges and wishes that everyone in ReDiX team shares.',
    cardBorderColor: 'border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400',
    avatarTextColor: 'text-green-600 dark:text-green-400',
    avatarBgColor: 'bg-green-600/10 dark:bg-green-400/10'
  }
]


export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // const container: Variants = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.15,
  //     },
  //   },
  // };

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
        <Features featuresList={featuresList} />
    </motion.div>
    
);
}

export { About }




