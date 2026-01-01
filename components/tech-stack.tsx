"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react'
import OrbitalCircles from "./ui/orbital-circle";


export default function TechStack() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} id="tech-stack" className='py-8 overflow-hidden mb-30'>
      <div className="flex items-center justify-center mx-auto flex-col-reverse md:flex-row lg:flex-row md:w-[80%] lg:w-[80%] w-[90%] max-w-7xl">
        <motion.div
          className='flex-1'
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <OrbitalCircles />
        </motion.div>

        <div className='flex-1'>
          {/* Header */}
          <div className='mb-12 space-y-4 sm:mb-16 lg:mb-24'>
            <motion.h2
              className='text-2xl font-semibold md:text-3xl lg:text-4xl'
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              My tech stack, your advantage.
            </motion.h2>

            <motion.p
              className='text-muted-foreground text-xl'
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ delay: 0.3 }}
            >
              Leveraging a diverse tech stack to deliver tailored solutions that drive success. From cutting-edge AI frameworks to robust web technologies, I harness the best tools to meet your unique needs. Let's build something exceptional together.
            </motion.p>

            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              transition={{ delay: 0.5 }}
            >
              <Button variant='outline' className='rounded-lg text-base shadow-none has-[>svg]:px-6' size='lg' asChild>
                <a href='https://www.linkedin.com/in/michele-angelo-marcucci/overlay/1767093719439/single-media-viewer/?profileId=ACoAACX59jEBhAPYj2ps2wksT7dUyJ0XUSN2iiA' target="_blank" rel="noopener noreferrer">
                  Download CV
                  <Download />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        
      </div>
    </section>
  );
}

export { TechStack }