"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/config/constants";
import { ArrowUpRightIcon, SquareTerminal, UserIcon, UsersIcon } from "lucide-react";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from '@/components/ui/shadcn-io/terminal';
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/shadcn-io/status';
import { Magnetic } from "./ui/shadcn-io/magnetic";
import { useState } from "react";


export default function Hero() {

  const [hover, setHover] = useState(false)
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
    <div>
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
                Hi, I'm Mike!
              </motion.h1>
              <motion.h1
                variants={item}
                className="scroll-m-10 md:text-6xl lg:text-6xl text-5xl font-bold tracking-tight text-balance max-w-3xl"
              >
                AI Software Engineer.
              </motion.h1>
            </div>
           

            <motion.span
              variants={item}
              className="scroll-m-10 text-xl font-normal tracking-tight text-balance text-muted-foreground max-w-2xl"
            >
              Full-stack developer based in Milan, Italy, specialized in complex AI pipeline integrations. I build web and desktop applications and have a strong interest in image processing, machine learning, and AI.
              <br />
              Bachelor’s degree in Information Technology from the University of Milano-Bicocca.
            </motion.span>

            <motion.div variants={item}>
              <Magnetic>
                <a href="https://www.linkedin.com/in/michele-angelo-marcucci/" target="_blank" rel="noopener noreferrer cursor-pointer">
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
          {/* Cerchio sfumato - versione light */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-2/4 aspect-square rounded-full bg-gradient-to-r from-pink-500 to-violet-500 blur-3xl" />
          </div>
          
          
          {/* Immagine sopra lo sfondo */}
          <img
            src={hover ? "./hero_peep2_hover.svg" : "./hero_peep2.svg"}
            alt="Descrizione immagine"
            className="w-full h-full relative z-10 dark:shadow-lg dark:shadow-black/40 rounded-2xl"
          />
        </motion.div>
      </motion.div>
          
      </div>
    </div>
  );
}

export { Hero }
