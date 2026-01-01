"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconTerminal2,
  IconBrain,
  IconLayoutDashboard,
  IconDatabaseImport,
  IconCode,
  IconArrowRight,
} from "@tabler/icons-react";
import { motion } from "framer-motion";


export function PortfolioBentoGrid() {
  return (
    <BentoGrid className="w-full md:auto-rows-[20rem] p-4">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

// --- SKELETON 1: AI Training (Invariato) ---
const SkeletonAI = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <div className="flex flex-row items-center justify-between text-xs text-neutral-500 mb-2">
        <span>Training Epoch: 50/100</span>
        <span>Loss: 0.024</span>
      </div>
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-ai-" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className={cn(
            "flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-full h-4",
            i % 2 === 0 ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-neutral-100 dark:bg-neutral-800"
          )}
        ></motion.div>
      ))}
    </motion.div>
  );
};

// --- SKELETON 2: Backend Code (Invariato) ---
const SkeletonCode = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 p-2 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="flex flex-row space-x-2 mb-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="space-y-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        <p><span className="text-blue-500">def</span> <span className="text-yellow-500">process_data</span>(source):</p>
        <p className="pl-4 text-green-600 dark:text-green-400"># Python Data ingestion</p>
        <p className="pl-4">data = pandas.read_csv(source)</p>
        <br />
        <p><span className="text-purple-500">public class</span> <span className="text-yellow-500">ServiceWorker</span> {"{"}</p>
         <p className="pl-4 text-green-600 dark:text-green-400">// Java High-throughput</p>
        <p className="pl-4">public void run() {"{"} ... {"}"}</p>
      </div>
    </div>
  );
};

// --- SKELETON 3: Frontend (Invariato) ---
const SkeletonFrontend = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2 justify-center items-center overflow-hidden relative"
      style={{
        background: "linear-gradient(-45deg, #6366f1, #a855f7, #ec4899)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="h-24 w-3/4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col justify-between shadow-xl">
        <div className="flex gap-2">
           <div className="h-2 w-8 rounded-full bg-white/50"></div>
           <div className="h-2 w-16 rounded-full bg-white/30"></div>
        </div>
        <div className="flex gap-2 mt-2">
            <div className="h-6 w-full rounded-md bg-white/30 flex items-center justify-center text-[10px] text-white font-semibold shadow-sm">React Component</div>
        </div>
      </div>
    </motion.div>
  );
};

// --- NUOVO SKELETON 4: MCP (Model Context Protocol) - Animato ---
const SkeletonMCPBig = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[8rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Nodes Container */}
      <div className="flex flex-row items-center justify-center space-x-2 relative z-20">
        
        {/* LEFT: IDE Node */}
        <motion.div 
          variants={{
            initial: { scale: 1 },
            animate: { scale: 1.05, borderColor: "#a3a3a3" } // Leggero highlight
          }}
          transition={{ duration: 0.3 }}
          className="h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center z-10 shadow-sm"
        >
          <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-300">IDE</span>
        </motion.div>

        {/* Left Connector (Data Flow) */}
        <div className="w-16 h-[2px] bg-neutral-200 dark:bg-neutral-700 relative overflow-hidden">
          <motion.div
            variants={{
              initial: { x: "-100%" },
              animate: { x: "100%" },
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 animate-pulse"
            style={{ opacity: 1 }} // Force opacity visible during anim
          />
        </div>

        {/* CENTER: MCP Node (Glowing Center) */}
        <div className="relative h-16 w-16 flex items-center justify-center z-20">
           {/* Glow Effect - Intensifies on Hover */}
          <motion.div 
            variants={{
                initial: { opacity: 0.4, scale: 1 },
                animate: { opacity: 0.8, scale: 1.2 }
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 rounded-full bg-purple-600 blur-xl"
          ></motion.div>
          
          <motion.div 
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20"
          >
            <span className="text-xs font-extrabold text-white tracking-wider">MCP</span>
          </motion.div>
        </div>

        {/* Right Connector (Data Flow) */}
        <div className="w-16 h-[2px] bg-neutral-200 dark:bg-neutral-700 relative overflow-hidden">
             {/* Delay slightly to create sequence effect */}
            <motion.div
            variants={{
              initial: { x: "-100%" },
              animate: { x: "100%" },
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }}
            className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0"
             style={{ opacity: 1 }}
          />
        </div>

        {/* RIGHT: LLM Node */}
        <motion.div 
           variants={{
            initial: { scale: 1 },
            animate: { scale: 1.05, borderColor: "#a3a3a3" }
          }}
          transition={{ duration: 0.3 }}
          className="h-12 w-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center z-10 shadow-sm"
        >
          <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-300">LLM</span>
        </motion.div>
      </div>

      {/* Pill Badge below */}
      <motion.div
        variants={{
            initial: { y: 0, opacity: 1 },
            animate: { y: 5, opacity: 0.8 } // Slight movement
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-[10px] font-medium border border-purple-200 dark:border-purple-800 shadow-sm relative z-10"
      >
        Context Protocol Active
      </motion.div>

      {/* Background Gradient Mesh */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
    </motion.div>
  )
}

// --- NUOVO SKELETON 5: RAG (Simple) - Animato ---
const SkeletonRAGSimple = () => {
  return (
    <motion.div 
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-4 justify-center items-center group"
    >
      
      {/* Document Icon - Floats on hover */}
      <motion.div 
        variants={{
            initial: { y: 0 },
            animate: { y: -5 }
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="h-14 w-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm flex flex-col p-2 gap-1.5 relative overflow-hidden"
      >
         <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/20 rounded-bl-lg z-10" />
        <div className="h-1.5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        <div className="h-1.5 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
        
        {/* Scanning effect inside doc */}
        <motion.div
             variants={{
                initial: { top: "-10%" },
                animate: { top: "120%" }
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-blue-500/20 blur-[1px]" 
        />
      </motion.div>

      {/* Arrow Container with Moving Particle */}
      <div className="relative flex items-center justify-center w-10">
        <IconArrowRight className="text-neutral-300 dark:text-neutral-700 h-5 w-5 absolute" />
        {/* The moving particle */}
        <motion.div 
            variants={{
                initial: { x: -10, opacity: 0 },
                animate: { x: 10, opacity: [0, 1, 0] }
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-2 w-2 rounded-full bg-blue-500 z-10 blur-[1px]"
        />
      </div>

      {/* Brain Square (Glowing & Pulsing) */}
      <motion.div 
        variants={{
            initial: { scale: 1, boxShadow: "0 0 0 rgba(59,130,246,0)" },
            animate: { 
                scale: [1, 1.1, 1], 
                boxShadow: ["0 0 15px rgba(59,130,246,0.5)", "0 0 25px rgba(59,130,246,0.8)", "0 0 15px rgba(59,130,246,0.5)"]
            }
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-14 w-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center relative"
      >
        <IconBrain className="text-white h-7 w-7 relative z-10" />
        {/* Inner ring pulse */}
        <motion.div
             variants={{
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1.5, opacity: 0 }
             }}
             transition={{ duration: 1, repeat: Infinity }}
             className="absolute inset-0 rounded-2xl border border-white/50"
        />
      </motion.div>
    </motion.div>
  );
};


// --- ITEMS ARRAY AGGIORNATO (Ordine e Col-span invertiti per MCP/RAG) ---
const items = [
  {
    title: "Polyglot Backend Engineering",
    description: (
      <span className="text-sm">
        Robust architectures built with <b>Python, C#, and Java</b>. From microservices to high-performance APIs.
      </span>
    ),
    header: <SkeletonCode />,
    className: "md:col-span-1",
    icon: <IconTerminal2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI Dataset & Fine-Tuning",
    description: (
      <span className="text-sm">
        Curating high-quality datasets and fine-tuning models for domain-specific precision.
      </span>
    ),
    header: <SkeletonAI />,
    className: "md:col-span-1",
    icon: <IconDatabaseImport className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Modern Frontend Experience",
    description: (
      <span className="text-sm">
        Crafting pixel-perfect UIs with <b>React, Shadcn, and TypeScript</b>. Focusing on accessibility and motion.
      </span>
    ),
    header: <SkeletonFrontend />,
    className: "md:col-span-1",
    icon: <IconLayoutDashboard className="h-4 w-4 text-neutral-500" />,
  },
  // --- MCP ORA E' QUI (Grande, col-span-2) ---
  {
    title: "Model Context Protocol (MCP)",
    description: (
      <span className="text-sm">
        Standardizing how AI interacts with your tools and data environment for seamless integration.
      </span>
    ),
    header: <SkeletonMCPBig />,
    className: "md:col-span-2", // Diventa grande
    icon: <IconCode className="h-4 w-4 text-neutral-500" />,
  },
  // --- RAG ORA E' QUI (Piccolo, col-span-1) ---
  {
    title: "RAG & Knowledge Systems",
    description: (
      <span className="text-sm">
        Bridging the gap between static data and Generative AI.
      </span>
    ),
    header: <SkeletonRAGSimple />,
    className: "md:col-span-1", // Diventa piccolo
    icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
  },
];