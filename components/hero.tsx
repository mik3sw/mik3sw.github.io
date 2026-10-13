import type { CSSProperties } from "react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { COMPANY_INFO, HERO_ROLES } from "@/lib/config/constants";
import { HeroArt } from "./hero-art";
import { Magnetic } from "./motion/magnetic";
import { RotatingWord } from "./motion/rotating-word";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/*
  Copy entry motion is plain CSS (.hero-rise in globals.css) so it starts with
  first paint instead of waiting for hydration. The art is a client island.
*/
export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[100dvh] max-w-7xl items-center overflow-x-clip px-5 pt-24 pb-16 md:px-8"
    >
      <div className="grid w-full grid-cols-1 items-center gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="hero-rise text-lg text-muted-foreground md:text-xl" style={step(0)}>
            {COMPANY_INFO.greeting}
          </p>

          <h1
            className="hero-rise mt-4 text-6xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-7xl lg:text-[6.25rem]"
            style={step(1)}
          >
            AI Software <span className="text-signal">Engineer.</span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-[40ch] text-lg leading-relaxed text-muted-foreground md:text-xl"
            style={step(2)}
          >
            {COMPANY_INFO.lead} <RotatingWord words={HERO_ROLES} />
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-3" style={step(3)}>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full bg-foreground px-7 text-base font-medium text-background transition-transform active:scale-[0.98]"
              >
                Contact me
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-base font-medium transition-colors hover:border-foreground/40 active:scale-[0.98]"
              >
                See projects
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Offset down from the headline so the two columns don't line up flat. */}
        <figure className="md:col-span-5 md:col-start-8 md:mt-24">
          <HeroArt />
        </figure>
      </div>
    </section>
  );
}

export { Hero };
