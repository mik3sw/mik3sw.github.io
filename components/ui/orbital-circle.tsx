"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPytorch,
  SiHuggingface,
  SiOpencv,
  SiDocker,
  SiPython,
  SiTypescript,
  SiSwift,
  SiSharp,
  type IconType,
} from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tech = { Icon: IconType; label: string; brand?: boolean };

// Outer orbit — frameworks, tooling & ML.
const outerTech: Tech[] = [
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js", brand: false },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: SiPytorch, label: "PyTorch" },
  { Icon: SiHuggingface, label: "Hugging Face" },
  { Icon: SiOpencv, label: "OpenCV" },
  { Icon: SiDocker, label: "Docker" },
];

// Inner orbit — core languages.
const innerTech: Tech[] = [
  { Icon: SiPython, label: "Python" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiSharp, label: "C#" },
  { Icon: SiSwift, label: "Swift" },
];

function polarPosition(i: number, n: number) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // start at the top
  return {
    left: `${50 + 50 * Math.cos(angle)}%`,
    top: `${50 + 50 * Math.sin(angle)}%`,
  };
}

function Chip({ Icon, label, brand = true }: Tech) {
  return (
    <div className="group/chip relative flex size-11 items-center justify-center rounded-full border bg-card/90 shadow-sm backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:scale-110 hover:shadow-md sm:size-12">
      <Icon
        size={22}
        color={brand ? "default" : undefined}
        className={cn(!brand && "text-foreground")}
      />
      {/* Label tooltip — readable when the orbit is paused on hover */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover/chip:opacity-100">
        {label}
      </span>
    </div>
  );
}

const OrbitalCircles = () => {
  const root = useRef<HTMLDivElement>(null);
  const spins = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const outerRing = root.current!.querySelector("[data-ring='outer']");
      const innerRing = root.current!.querySelector("[data-ring='inner']");
      const outerChips = gsap.utils.toArray<HTMLElement>("[data-spin='outer']");
      const innerChips = gsap.utils.toArray<HTMLElement>("[data-spin='inner']");

      const OUTER_DUR = 48;
      const INNER_DUR = 36;

      // Continuous orbit: rings spin in opposite directions…
      spins.current = [
        gsap.to(outerRing, {
          rotation: 360,
          duration: OUTER_DUR,
          ease: "none",
          repeat: -1,
        }),
        gsap.to(innerRing, {
          rotation: -360,
          duration: INNER_DUR,
          ease: "none",
          repeat: -1,
        }),
        // …while each chip counter-rotates so the logo stays upright.
        gsap.to(outerChips, {
          rotation: -360,
          duration: OUTER_DUR,
          ease: "none",
          repeat: -1,
        }),
        gsap.to(innerChips, {
          rotation: 360,
          duration: INNER_DUR,
          ease: "none",
          repeat: -1,
        }),
      ];

      // Playful pop-in when the widget scrolls into view.
      gsap.from("[data-pop]", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: { each: 0.06, from: "random" },
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from("[data-core]", {
        scale: 0.6,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  const slow = () =>
    spins.current.forEach((t) =>
      gsap.to(t, { timeScale: 0.06, duration: 0.6, overwrite: true })
    );
  const resume = () =>
    spins.current.forEach((t) =>
      gsap.to(t, { timeScale: 1, duration: 0.8, overwrite: true })
    );

  return (
    <div className="flex items-center justify-center py-10">
      <div
        ref={root}
        onMouseEnter={slow}
        onMouseLeave={resume}
        className="relative size-[300px] sm:size-[380px] lg:size-[440px]"
      >
        {/* Ambient glow */}
        <div
          data-core
          className="pointer-events-none absolute inset-1/4 rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 blur-3xl"
        />

        {/* Outer dashed track */}
        <div className="absolute inset-0 rounded-full border border-dashed border-foreground/15" />
        {/* Inner dashed track */}
        <div className="absolute inset-[64px] rounded-full border border-dashed border-foreground/15 sm:inset-[92px]" />

        {/* Outer rotating ring */}
        <div data-ring="outer" className="absolute inset-0">
          {outerTech.map((tech, i) => {
            const pos = polarPosition(i, outerTech.length);
            return (
              <div
                key={tech.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={pos}
              >
                <div data-spin="outer" data-pop>
                  <Chip {...tech} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Inner rotating ring */}
        <div data-ring="inner" className="absolute inset-[64px] sm:inset-[92px]">
          {innerTech.map((tech, i) => {
            const pos = polarPosition(i, innerTech.length);
            return (
              <div
                key={tech.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={pos}
              >
                <div data-spin="inner" data-pop>
                  <Chip {...tech} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Core */}
        <div
          data-core
          className="absolute inset-[104px] flex items-center justify-center sm:inset-[142px]"
        >
          <img
            src="/peep_tech_stack.svg"
            alt=""
            aria-hidden="true"
            className="w-[150%] max-w-none drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default OrbitalCircles;
