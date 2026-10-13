import { SOCIAL_LINKS } from "@/lib/config/constants";
import { ContactEmail } from "./contact-email";
import { CopyEmail } from "./copy-email";
import { AnimatedHeading } from "./motion/animated-heading";
import { Magnetic } from "./motion/magnetic";
import { Reveal } from "./reveal";
import { SocialIcon } from "./social-icon";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedHeading
          text="Have a project in mind?"
          className="max-w-[14ch] text-6xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl"
        />
        <Reveal delay={0.25}>
          <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
            Write me an email or find me on LinkedIn.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <ContactEmail />

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic strength={0.25}>
              <CopyEmail />
            </Magnetic>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SocialIcon icon={icon} className="size-[18px]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { Contact };
