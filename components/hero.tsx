"use client";

import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, SOCIALS } from "@/lib/config/constants";
import { ArrowUpRightIcon, SquareTerminal } from "lucide-react";
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { Magnetic } from "./ui/shadcn-io/magnetic";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {

  const [hover, setHover] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax: blob and illustration drift at different speeds on scroll.
      gsap.to("[data-hero-blob]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-art]", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );
  // ✅ Tip explicito
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div ref={heroRef}>
      <div className="w-full h-screen flex flex-col items-center">
        <motion.div
          className="md:w-[80%] lg:w-[80%] w-[90%] flex justify-center items-center h-screen gap-7 max-w-7xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex-1 flex flex-col justify-center gap-7">
            
            <motion.div
              variants={item}
              className="rounded-md border px-4 py-2 font-mono text-sm w-fit flex items-center gap-2"
            >
              {/* <UserIcon /> */}
              <SquareTerminal />
              <div>Writing code</div>
              <Status status="online">
                <StatusIndicator />
                <StatusLabel />
              </Status>
            </motion.div>

            <div>
              <motion.h1
                variants={item}
                className="scroll-m-10 md:text-6xl lg:text-6xl text-5xl font-bold tracking-tight text-balance max-w-3xl"
              >
                {COMPANY_INFO.title1}
              </motion.h1>
              <motion.h1
                variants={item}
                className="scroll-m-10 md:text-6xl lg:text-6xl text-5xl font-bold tracking-tight text-balance max-w-3xl"
              >
                {COMPANY_INFO.title2}
              </motion.h1>
            </div>
           

            <motion.span
              variants={item}
              className="scroll-m-10 text-xl font-normal tracking-tight text-balance text-muted-foreground max-w-2xl"
            >
              {COMPANY_INFO.subtitle}
            </motion.span>

            <motion.div variants={item}>
              <Magnetic>
                <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
                <Button className="w-fit text-center font-normal cursor-pointer" size="lg">
                  Contact Me <ArrowUpRightIcon />
                </Button>
                </a>
              </Magnetic>
            </motion.div>
          </div>


        <motion.div
          variants={item}
          className="flex-1 rounded-2xl hidden md:flex overflow-hidden relative"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          {/* Cerchio sfumato di sfondo (parallax) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              data-hero-blob
              className="w-2/4 aspect-square rounded-full bg-gradient-to-r from-pink-500 to-violet-500 blur-3xl"
            />
          </div>

          {/* Illustrazione sopra lo sfondo (parallax) */}
          <img
            data-hero-art
            src={hover ? "./hero_peep2_hover.svg" : "./hero_peep2.svg"}
            alt="Illustration of Michele Marcucci working at a computer"
            className="w-full h-full relative z-10 dark:shadow-lg dark:shadow-black/40 rounded-2xl"
          />
        </motion.div>
      </motion.div>
          
      </div>
    </div>
  );
}

export { Hero }
