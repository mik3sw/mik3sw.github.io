"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./ui/shadcn-io/magnetic";
import { SOCIALS } from "@/lib/config/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Chapter = {
  index: string;
  title: string;
  body: string;
  tags: string[];
  art: string;
  accent: string;
};

const chapters: Chapter[] = [
  {
    index: "01",
    title: "Full-stack, 360°",
    body: "I design, build and ship software end to end — clean architecture, databases, REST APIs, frontends and Docker. From the first diagram all the way to production.",
    tags: ["Clean Architecture", "REST APIs", "Databases", "Frontend", "Docker"],
    art: "/peep_tech_stack.svg",
    accent: "from-sky-500 to-blue-600",
  },
  {
    index: "02",
    title: "Built to optimize",
    body: "Making software work is only the start — I make it efficient. Clean refactors, thoughtful performance work and pipelines engineered to scale.",
    tags: ["Performance", "Refactoring", "Pipelines", "CI/CD"],
    art: "/peep.svg",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    index: "03",
    title: "AI, put to work",
    body: "I love the AI world, but I keep it practical: RAG systems, data extraction and processing pipelines that turn messy, unstructured data into real value.",
    tags: ["RAG", "Data Extraction", "Pipelines", "LLMs"],
    art: "/hero_peep.svg",
    accent: "from-violet-500 to-fuchsia-600",
  },
  {
    index: "04",
    title: "Specialized models, on demand",
    body: "When off-the-shelf models fall short, I build my own — fine-tuning specialized LLMs on curated datasets for domain-specific precision.",
    tags: ["Fine-tuning", "Datasets", "Hugging Face"],
    art: "/peep_alt.svg",
    accent: "from-orange-500 to-pink-600",
  },
];

const stats: { to?: number; suffix?: string; symbol?: string; label: string }[] =
  [
    { to: 360, suffix: "°", label: "End-to-end ownership" },
    { to: 5, suffix: "+", label: "Languages I ship in" },
    { to: 2023, label: "Building with AI since" },
    { symbol: "∞", label: "Curiosity to learn" },
  ];

const headingWords = "Design. Build. Ship. Optimize.".split(" ");

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Full animation set — only for users who haven't asked for reduced motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Masked, word-by-word heading reveal.
        gsap.from("[data-jrny-word]", {
          yPercent: 120,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-jrny-heading]", start: "top 82%" },
        });

        gsap.from("[data-jrny-intro]", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-jrny-heading]", start: "top 70%" },
        });

        // Per-chapter choreography.
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
          const art = chapter.querySelector("[data-chapter-art]");
          const blob = chapter.querySelector("[data-chapter-blob]");
          const ghost = chapter.querySelector("[data-chapter-ghost]");
          const reveals = chapter.querySelectorAll("[data-chapter-reveal]");
          const line = chapter.querySelector("[data-chapter-line]");

          // Entrance: illustration scales & fades in.
          if (art) {
            gsap.from(art, {
              opacity: 0,
              scale: 0.85,
              y: 40,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: chapter, start: "top 72%" },
            });
          }

          // Text block reveals with a stagger.
          gsap.from(reveals, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: chapter, start: "top 68%" },
          });

          // Vertical accent line draws itself.
          if (line) {
            gsap.from(line, {
              scaleY: 0,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top 75%",
                end: "bottom 60%",
                scrub: true,
              },
            });
          }

          // Parallax: illustration, glow and ghost number drift at their own pace.
          gsap.to(art, {
            yPercent: -14,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(blob, {
            yPercent: 22,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(ghost, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Animated counters.
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const obj = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(obj, {
                v: to,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = Math.round(obj.v).toString() + suffix;
                },
              }),
          });
        });

        gsap.from("[data-stat]", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-jrny-stats]", start: "top 82%" },
        });

        // Closing call to action.
        gsap.from("[data-jrny-cta] > *", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: "[data-jrny-cta]", start: "top 85%" },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="journey"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto w-[90%] max-w-7xl md:w-[80%]">
        {/* Intro */}
        <div data-jrny-heading className="mb-20 sm:mb-28 lg:mb-36">
          <p
            data-jrny-intro
            className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground"
          >
            How I work
          </p>
          <h2 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-bottom"
              >
                <span data-jrny-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p
            data-jrny-intro
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Versatile by nature — I design, build and optimize software end to
            end, and reach for AI, pipelines and fine-tuned models whenever a
            problem calls for it.
          </p>
        </div>

        {/* Chapters */}
        <div className="space-y-28 sm:space-y-36 lg:space-y-48">
          {chapters.map((chapter, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={chapter.index}
                data-chapter
                className={cn(
                  "flex flex-col gap-10 lg:items-center lg:gap-20",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                )}
              >
                {/* Illustration */}
                <div className="relative flex w-full justify-center lg:w-1/2">
                  <div
                    data-chapter-blob
                    className={cn(
                      "pointer-events-none absolute top-1/2 left-1/2 aspect-square w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-40 blur-3xl",
                      chapter.accent
                    )}
                  />
                  <span
                    data-chapter-ghost
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 select-none text-[9rem] font-black leading-none text-foreground/[0.04] sm:text-[12rem] lg:-top-16 lg:text-[16rem]"
                  >
                    {chapter.index}
                  </span>
                  <img
                    data-chapter-art
                    src={chapter.art}
                    alt=""
                    aria-hidden="true"
                    className="relative z-10 w-2/3 max-w-sm drop-shadow-xl sm:w-1/2 lg:w-3/4"
                  />
                </div>

                {/* Text */}
                <div className="relative flex w-full gap-5 lg:w-1/2">
                  <div
                    data-chapter-line
                    className={cn(
                      "mt-2 hidden w-[3px] shrink-0 rounded-full bg-gradient-to-b sm:block",
                      chapter.accent
                    )}
                  />
                  <div className="space-y-5">
                    <span
                      data-chapter-reveal
                      className="inline-block font-mono text-sm font-medium text-muted-foreground"
                    >
                      Chapter {chapter.index}
                    </span>
                    <h3
                      data-chapter-reveal
                      className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
                    >
                      {chapter.title}
                    </h3>
                    <p
                      data-chapter-reveal
                      className="max-w-xl text-lg text-muted-foreground text-pretty"
                    >
                      {chapter.body}
                    </p>
                    <div
                      data-chapter-reveal
                      className="flex flex-wrap gap-2 pt-1"
                    >
                      {chapter.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div
          data-jrny-stats
          className="mt-28 grid grid-cols-2 gap-8 border-t pt-16 sm:mt-36 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat, i) => (
            <div key={i} data-stat className="space-y-2">
              <div className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {stat.symbol ? (
                  stat.symbol
                ) : (
                  <span data-count={stat.to} data-suffix={stat.suffix ?? ""}>
                    0
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          data-jrny-cta
          className="mt-28 flex flex-col items-start gap-6 sm:mt-36"
        >
          <h3 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s build something exceptional together.
          </h3>
          <Magnetic>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="cursor-pointer font-normal">
                Get in touch <ArrowUpRightIcon />
              </Button>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export { Journey };
