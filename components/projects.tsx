"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, SOCIALS, type Project } from "@/lib/config/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-project-card
      className={cn(
        "group relative flex flex-col justify-between gap-6 rounded-2xl border bg-card p-6 transition-colors duration-300 hover:border-primary/60",
        project.featured && "lg:col-span-2"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {project.logo && (
              <img
                src={project.logo}
                alt=""
                aria-hidden="true"
                className="size-6 shrink-0"
              />
            )}
            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
          </div>
          <a
            href={project.demo ?? project.website ?? project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            <ArrowUpRight className="size-5" />
          </a>
        </div>
        <p className="text-muted-foreground text-pretty">
          {project.description}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
              Code
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="size-4" />
              Visit site
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-4" />
              Live demo
            </a>
          )}
        </div>
      </div>

      {/* Subtle gradient glow on hover */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-pink-500/0 via-violet-500/0 to-pink-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-pink-500/20 group-hover:to-violet-500/20 group-hover:opacity-100" />
    </article>
  );
}

export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-project-heading] > *", {
        scrollTrigger: {
          trigger: "[data-project-heading]",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from("[data-project-card]", {
        scrollTrigger: {
          trigger: "[data-projects-grid]",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="projects"
      className="py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto w-[90%] max-w-7xl md:w-[80%]">
        <div data-project-heading className="mb-12 space-y-4 sm:mb-16">
          <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            Selected work.
          </h2>
          <p className="text-muted-foreground max-w-2xl text-xl">
            A handful of things I&apos;ve built — from native macOS apps to AI
            tooling and computer-vision experiments. More on{" "}
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div
          data-projects-grid
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { Projects };
