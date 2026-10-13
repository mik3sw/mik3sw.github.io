"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { WEBSITES } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import { AnimatedHeading } from "./motion/animated-heading";
import { Reveal } from "./reveal";

/*
  List of sites with a shared preview. md+: names on the left, a capture of
  the hovered or focused site on the right. < md: each row carries its own
  capture above the text and the shared preview is hidden.
*/
export default function Websites() {
  const [active, setActive] = useState(0);

  return (
    <section id="websites" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedHeading text="Websites I've built" className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl" />

        <div className="mt-14 grid grid-cols-1 md:mt-20 md:grid-cols-12 md:gap-10">
          <ul className="divide-y divide-line md:col-span-5">
            {WEBSITES.map((site, i) => {
              const isActive = active === i;
              return (
                <Reveal as="li" key={site.name} delay={i * 0.06} className="py-10 first:pt-0 last:pb-0 md:py-9">
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block"
                  >
                    <img
                      src={site.image}
                      width={1440}
                      height={900}
                      alt={`Homepage of ${site.name}`}
                      loading="lazy"
                      className="mb-6 aspect-[16/10] w-full rounded-xl border border-line object-cover object-top md:hidden"
                    />
                    <span className="flex items-center justify-between gap-4">
                      <span
                        className={cn(
                          "text-3xl font-semibold tracking-[-0.03em] transition-colors duration-300 md:text-4xl",
                          !isActive && "md:text-muted-foreground"
                        )}
                      >
                        {site.name}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "size-6 shrink-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                          !isActive && "md:opacity-0"
                        )}
                      />
                    </span>
                    <span className="mt-2 block font-mono text-sm text-signal">
                      {site.domain}
                      {site.aliases && <span className="text-muted-foreground"> {site.aliases.join(" ")}</span>}
                    </span>
                    <span className="mt-3 block max-w-[46ch] leading-relaxed text-pretty text-muted-foreground">
                      {site.description}
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.15} className="hidden md:col-span-7 md:block">
            <a
              href={WEBSITES[active].href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden="true"
              className="sticky top-24 block"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                {/* Every capture stays mounted so switching is a crossfade, not a load. */}
                {WEBSITES.map((site, i) => (
                  <img
                    key={site.name}
                    src={site.image}
                    width={1440}
                    height={900}
                    alt=""
                    loading="lazy"
                    className={cn(
                      "absolute inset-0 size-full object-cover object-top transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === active ? "opacity-100" : "opacity-0 motion-safe:scale-[1.04]"
                    )}
                  />
                ))}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { Websites };
