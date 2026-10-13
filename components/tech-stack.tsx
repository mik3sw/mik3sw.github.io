import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  SiDocker,
  SiHuggingface,
  SiNextdotjs,
  SiOllama,
  SiOpencv,
  SiPython,
  SiPytorch,
  SiReact,
  SiSharp,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  type IconType,
} from "@icons-pack/react-simple-icons";
import { SOCIALS } from "@/lib/config/constants";
import { AnimatedHeading } from "./motion/animated-heading";
import { Reveal } from "./reveal";
import { TechMarquee } from "./tech-marquee";

type Tech = { Icon: IconType; label: string };
type Group = { title: string; note: string; items: Tech[] };

const GROUPS: Group[] = [
  {
    title: "Languages",
    note: "Python and TypeScript every day, Swift and C# when the platform needs it.",
    items: [
      { Icon: SiPython, label: "Python" },
      { Icon: SiTypescript, label: "TypeScript" },
      { Icon: SiSwift, label: "Swift" },
      { Icon: SiSharp, label: "C#" },
    ],
  },
  {
    title: "AI and data",
    note: "Training, fine-tuning and vision work, plus local models.",
    items: [
      { Icon: SiPytorch, label: "PyTorch" },
      { Icon: SiHuggingface, label: "Hugging Face" },
      { Icon: SiOpencv, label: "OpenCV" },
      { Icon: SiOllama, label: "Ollama" },
    ],
  },
  {
    title: "Web and shipping",
    note: "Interfaces for the products, containers to run them.",
    items: [
      { Icon: SiReact, label: "React" },
      { Icon: SiNextdotjs, label: "Next.js" },
      { Icon: SiTailwindcss, label: "Tailwind CSS" },
      { Icon: SiDocker, label: "Docker" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="scroll-mt-20 overflow-x-clip py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedHeading
          text="The tools I reach for"
          className="max-w-[16ch] text-5xl font-semibold tracking-[-0.04em] md:text-7xl"
        />
        <Reveal delay={0.2}>
          <a
            href={SOCIALS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-foreground/40 active:scale-[0.98]"
          >
            View CV
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* Full-bleed strip of what the tools are used for. */}
      <div className="mt-16 border-y border-line py-8 md:mt-20 md:py-10">
        <TechMarquee />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Asymmetric columns: the first group gets more room. < md: stacked. */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-[1.25fr_1fr_1fr] md:gap-10">
          {GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <h3 className="text-2xl font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-2 max-w-[34ch] text-muted-foreground">{group.note}</p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                {group.items.map(({ Icon, label }) => (
                  <li key={label} className="group flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface transition-[background-color,translate,rotate] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:bg-[color-mix(in_oklch,var(--signal)_18%,var(--surface))]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-medium">{label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TechStack };
