import { ArrowsLeftRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiOllama, SiTelegram } from "@icons-pack/react-simple-icons";
import { PROJECTS, SOCIALS, type Project } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "./before-after";
import { AnimatedHeading } from "./motion/animated-heading";
import { SpotlightTile } from "./motion/spotlight-tile";
import { Reveal } from "./reveal";

/*
  Bento, one cell per project (6). The grid packs densely so OneClick can
  fill the hole next to Alembic even though GymTonic comes first in source.
  lg (6 cols): Alembic 4        | OneClick 2 x 2 rows
               GymTonic 4       |
               NPR 2 | Skin Detection 4
               LocalAI 6 (a slim closing strip)
  md (2 cols): Alembic and GymTonic full, then OneClick tall beside NPR and
               Skin Detection, then LocalAI full.
  < md: single column in source order.
*/
const LAYOUT: Record<string, string> = {
  Alembic: "md:col-span-2 lg:col-span-4",
  GymTonic: "md:col-span-2 lg:col-span-4",
  OneClick: "md:row-span-2 lg:col-span-2",
  "NPR Painting": "lg:col-span-2",
  "Skin Detection": "lg:col-span-4",
  "LocalAI Chatbot": "md:col-span-2 lg:col-span-6",
};

function linkFor(project: Project) {
  if (project.website) return { href: project.website, label: "Visit site" };
  if (project.demo) return { href: project.demo, label: "Live demo" };
  if (project.repo) return { href: project.repo, label: "View code" };
  return null;
}

function TileHeader({ project }: { project: Project }) {
  const link = linkFor(project);
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
      <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
        {link ? (
          // Stretched link: the whole tile is clickable.
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-signal"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      {link ? (
        <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          {link.label}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      ) : (
        project.status && <span className="shrink-0 pt-1 text-sm text-muted-foreground">{project.status}</span>
      )}
    </div>
  );
}

function TileBody({ project }: { project: Project }) {
  return (
    <>
      <p className="mt-3 max-w-[52ch] leading-relaxed text-pretty text-muted-foreground">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </>
  );
}

function Alembic({ project }: { project: Project }) {
  return (
    <div className="grid h-full grid-cols-1 gap-8 p-6 sm:grid-cols-[1fr_auto] sm:items-end md:p-8">
      <div className="flex h-full flex-col justify-end">
        <TileHeader project={project} />
        <TileBody project={project} />
      </div>
      <img
        src={project.logo}
        alt=""
        width={160}
        height={160}
        className="float-slow order-first size-20 sm:order-none sm:size-40"
      />
    </div>
  );
}

function OneClick({ project }: { project: Project }) {
  const img = project.image!;
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-72 flex-1 overflow-hidden bg-[oklch(0.2_0.02_265)]">
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt={img.alt}
          loading="lazy"
          className="absolute inset-x-0 top-0 mx-auto w-[82%] translate-y-6 rounded-t-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-3"
        />
      </div>
      <div className="p-6 md:p-8">
        <TileHeader project={project} />
        <TileBody project={project} />
      </div>
    </div>
  );
}

function ImageTile({ project, crop = false }: { project: Project; crop?: boolean }) {
  const img = project.image!;
  return (
    <div className="flex h-full flex-col">
      <div className="overflow-hidden">
        {/* crop: zooms past the light padding baked into the screenshot. */}
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt={img.alt}
          loading="lazy"
          style={{ aspectRatio: crop ? "2 / 1" : `${img.width} / ${img.height}` }}
          className={cn(
            "block w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            crop ? "scale-[1.14] group-hover:scale-[1.18]" : "group-hover:scale-[1.03]"
          )}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <TileHeader project={project} />
        <TileBody project={project} />
      </div>
    </div>
  );
}

function Npr({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="mb-6">
        <BeforeAfter before={project.before!} after={project.image!} />
      </div>
      {/* Anchored to the bottom so any spare height sits under the image. */}
      <div className="mt-auto">
        <TileHeader project={project} />
        <TileBody project={project} />
      </div>
    </div>
  );
}

/*
  Phones rise out of a tinted panel and are cropped by its bottom edge. The
  bezel keeps a phone's own radius: it is the one physical object in the grid.
  On hover they lift in turn, as feedback that the tile is the GymTonic one.
*/
const PHONE_OFFSET = ["translate-y-12", "translate-y-6", "translate-y-16"];
const PHONE_LIFT = [
  "motion-safe:group-hover:translate-y-8",
  "motion-safe:group-hover:translate-y-2",
  "motion-safe:group-hover:translate-y-12",
];

function GymTonic({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex h-64 justify-center gap-3 overflow-hidden bg-[color-mix(in_oklch,var(--signal)_14%,var(--surface))] px-6 pt-6 sm:h-80 sm:gap-5 md:px-8">
        {project.screens!.map((screen, i) => (
          <div
            key={screen.src}
            className={cn(
              "w-[30%] max-w-48 shrink-0 self-start rounded-[1.75rem] bg-[oklch(0.16_0.005_260)] p-1.5 shadow-[0_24px_48px_-24px_color-mix(in_oklch,var(--signal)_60%,transparent)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              PHONE_OFFSET[i],
              PHONE_LIFT[i]
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <img
              src={screen.src}
              width={screen.width}
              height={screen.height}
              alt={screen.alt}
              loading="lazy"
              className="block w-full rounded-[1.4rem]"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start gap-4">
          {/* The launcher icon: white glass on black, as it sits on the phone. */}
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-[oklch(0.16_0.005_260)]">
            <img src={project.logo} alt="" width={22} height={25} className="h-6 w-auto" />
          </span>
          <div className="flex-1">
            <TileHeader project={project} />
          </div>
        </div>
        <TileBody project={project} />
      </div>
    </div>
  );
}

/* A slim strip that closes the grid: the two ends of the bot, then the copy. */
function LocalAi({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-10 md:p-8">
      <div aria-hidden="true" className="flex shrink-0 items-center gap-3 text-foreground">
        <span className="grid size-14 place-items-center rounded-xl bg-background">
          <SiOllama className="size-7" />
        </span>
        <ArrowsLeftRight className="size-5 text-muted-foreground" />
        <span className="grid size-14 place-items-center rounded-xl bg-background">
          <SiTelegram className="size-7" />
        </span>
      </div>
      <div className="flex-1">
        <TileHeader project={project} />
        <TileBody project={project} />
      </div>
    </div>
  );
}

function renderTile(project: Project) {
  switch (project.title) {
    case "Alembic":
      return <Alembic project={project} />;
    case "GymTonic":
      return <GymTonic project={project} />;
    case "OneClick":
      return <OneClick project={project} />;
    case "NPR Painting":
      return <Npr project={project} />;
    case "LocalAI Chatbot":
      return <LocalAi project={project} />;
    case "Skin Detection":
      return <ImageTile project={project} crop />;
    default:
      return project.image ? <ImageTile project={project} /> : <LocalAi project={project} />;
  }
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <AnimatedHeading text="Selected work" className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl" />
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            From native macOS apps to AI tooling and computer vision. More on{" "}
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-signal decoration-2 underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-flow-row-dense grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((project, i) => (
            <Reveal
              as="li"
              key={project.title}
              delay={(i % 3) * 0.06}
              className={cn(LAYOUT[project.title], "list-none")}
            >
              <SpotlightTile
                className={cn(
                  "group relative h-full overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-foreground/25",
                  project.title === "Alembic" &&
                    "bg-dots bg-[color-mix(in_oklch,var(--signal)_10%,var(--surface))]"
                )}
              >
                {/* Above the spotlight glow; also the stretched link's containing block. */}
                <div className="relative z-[1] h-full">{renderTile(project)}</div>
              </SpotlightTile>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { Projects };
