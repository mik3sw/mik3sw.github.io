export const COMPANY_INFO = {
  name: "Michele Marcucci",
  fullName: "Michele Angelo Marcucci",
  greeting: "Hi, I'm Mike.",
  title: "AI Software Engineer.",
  /** Aliases read by the legacy navbar-02 component. */
  title1: "Hi, I'm Mike.",
  title2: "AI Software Engineer.",
  subtitle:
    "Full-stack developer in Milan. I build web and desktop apps and wire AI pipelines into real products.",
  /** Hero sentence: `${lead} ${role}` with the role rotating. */
  lead: "Full-stack developer in Milan, wiring AI into real products. I build",
} as const;

/** Rotates at the end of the hero sentence. */
export const HERO_ROLES = ["AI pipelines.", "desktop apps.", "web platforms."] as const;

export const EMAIL = "michymarcucci@gmail.com";

/** Google Analytics 4. Loaded only after the visitor accepts analytics cookies. */
export const GA_MEASUREMENT_ID = "G-D07Y36REJB";

export const SOCIALS = {
  github: "https://github.com/mik3sw",
  huggingface: "https://huggingface.co/mik3ml",
  linkedin: "https://www.linkedin.com/in/michele-angelo-marcucci/",
  email: `mailto:${EMAIL}`,
  cv: "https://www.linkedin.com/in/michele-angelo-marcucci/overlay/1767093719439/single-media-viewer/?profileId=ACoAACX59jEBhAPYj2ps2wksT7dUyJ0XUSN2iiA",
} as const;

/** Open Peeps illustration used in the hero; `hover` swaps in the grin. */
export const HERO_PEEP = {
  src: "/peeps/hero.svg",
  hover: "/peeps/hero-hover.svg",
  width: 864,
  height: 1145,
  alt: "Illustration of Michele Marcucci holding a mug",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "huggingface" | "email";
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: SOCIALS.github, icon: "github" },
  { label: "LinkedIn", href: SOCIALS.linkedin, icon: "linkedin" },
  { label: "Hugging Face", href: SOCIALS.huggingface, icon: "huggingface" },
];

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
  /** External product/website link, shown as "Visit site". */
  website?: string;
  /** Path to a custom logo (in /public) rendered next to the title. */
  logo?: string;
  /** Real screenshot or output from the project. */
  image?: ProjectImage;
  /** Optional "before" frame, crossfaded with `image` to show a transformation. */
  before?: ProjectImage;
  /** Phone screenshots, shown side by side. */
  screens?: ProjectImage[];
  /** Shown instead of a link when the project has no public page yet. */
  status?: string;
};

const raw = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/mik3sw/${repo}/main/${path}`;

export const PROJECTS: Project[] = [
  {
    title: "Alembic",
    description:
      "An enterprise platform for RAG, document sharing and management, powered by MCP tooling and local AI. Privacy-first and local-first, built for individuals and companies.",
    tags: ["RAG", "MCP", "Local AI", "Privacy-first"],
    website: "https://www.redixlabs.ai/alembic",
    logo: "/alembic.svg",
  },
  {
    title: "GymTonic",
    description:
      "An Android gym diary: write your routines and run them set by set, with a rest timer that keeps going with the screen off. Offline, no account, no ads.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Offline-first"],
    status: "Coming to Google Play",
    logo: "/projects/gymtonic/icon.svg",
    screens: [
      {
        src: "/projects/gymtonic/workouts.webp",
        width: 540,
        height: 1205,
        alt: "GymTonic workouts tab: two of three workouts done this week and the list of routines",
      },
      {
        src: "/projects/gymtonic/workout.webp",
        width: 540,
        height: 1205,
        alt: "Rest timer with 54 seconds left and the heart rate read from a chest strap",
      },
      {
        src: "/projects/gymtonic/workout2.webp",
        width: 540,
        height: 1205,
        alt: "A set in progress: 10 reps at 45 kg, with last session's weight as a reminder",
      },
    ],
  },
  {
    title: "OneClick",
    description:
      "A native macOS menubar utility that puts quick system actions one click away. My most starred project.",
    tags: ["Swift", "SwiftUI", "macOS"],
    repo: "https://github.com/mik3sw/OneClick",
    image: {
      src: raw("OneClick", "imgs/darkThemes/1.png"),
      width: 750,
      height: 1622,
      alt: "OneClick menubar panel with toggles for hidden files, dark mode and caffeinate",
    },
  },
  {
    title: "NPR Painting",
    description:
      "A non-photorealistic rendering filter that turns photos into oil-painting-style artwork.",
    tags: ["OpenCV", "Python"],
    repo: "https://github.com/mik3sw/NPR-Painting",
    before: {
      src: raw("NPR-Painting", "input/im1.jpg"),
      width: 640,
      height: 427,
      alt: "Original photo of a dirt path through a rapeseed field",
    },
    image: {
      src: raw("NPR-Painting", "output/out1.jpg"),
      width: 640,
      height: 427,
      alt: "The same photo rendered with the oil-painting filter",
    },
  },
  {
    title: "Skin Detection",
    description:
      "Human skin detection and segmentation from images and video, using classic computer-vision techniques.",
    tags: ["OpenCV", "Image Processing", "Python"],
    repo: "https://github.com/mik3sw/SkinDetection",
    image: {
      src: raw("SkinDetection", "docs/multi.png"),
      width: 1524,
      height: 792,
      alt: "Terminal running Skin Detection on a video with eight threads",
    },
  },
  {
    title: "LocalAI Chatbot",
    description:
      "A Telegram chatbot wired to a local LLM through Ollama. Private, self-hosted conversational AI.",
    tags: ["Ollama", "Telegram", "Python"],
    repo: "https://github.com/mik3sw/LocalAI-chatbot",
  },
];

export type Website = {
  name: string;
  href: string;
  /** Shown as the address; extra TLDs that point to the same site go in `aliases`. */
  domain: string;
  aliases?: string[];
  description: string;
  /** 1440x900 capture of the live homepage, in /public/sites. */
  image: string;
};

export const WEBSITES: Website[] = [
  {
    name: "ReDiX Labs",
    href: "https://www.redixlabs.ai",
    domain: "redixlabs.ai",
    aliases: [".com", ".it"],
    description:
      "Company site for a private generative AI lab, in English and Italian, with pages for Alembic and Data Extraction.",
    image: "/sites/redixlabs.webp",
  },
  {
    name: "Tasto Matto",
    href: "https://tastomatto.cc",
    domain: "tastomatto.cc",
    description:
      "Home of a piano method book for children from age 5: the book, the method, the authors and where to buy it.",
    image: "/sites/tastomatto.webp",
  },
  {
    name: "Trio Clelia",
    href: "https://trioclelia.com",
    domain: "trioclelia.com",
    description:
      "A piano, violin and cello trio for weddings and events in Milan, with repertoire, gallery, rates and booking requests.",
    image: "/sites/trioclelia.webp",
  },
];

export type Principle = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  /** Decorative peep shown in the sticky rail while this principle is on screen. */
  art: string;
};

export const PRINCIPLES: Principle[] = [
  {
    id: "how-full-stack",
    title: "Full-stack, end to end",
    body: "Clean architecture, databases, REST APIs, frontends and Docker. I take software from the first diagram all the way to production.",
    tags: ["Clean Architecture", "REST APIs", "Databases", "Docker"],
    art: "/peeps/build.svg",
  },
  {
    id: "how-optimize",
    title: "Built to optimize",
    body: "Working software is the starting point. Then come careful refactors, performance work and pipelines that scale.",
    tags: ["Performance", "Refactoring", "CI/CD"],
    art: "/peeps/optimize.svg",
  },
  {
    id: "how-ai",
    title: "AI, put to work",
    body: "RAG systems, data extraction and processing pipelines that turn messy, unstructured data into something useful.",
    tags: ["RAG", "Data Extraction", "LLMs"],
    art: "/peeps/ai.svg",
  },
  {
    id: "how-models",
    title: "Specialized models",
    body: "When off-the-shelf models fall short, I fine-tune specialized LLMs on curated datasets for domain-specific precision.",
    tags: ["Fine-tuning", "Datasets", "Hugging Face"],
    art: "/peeps/models.svg",
  },
];
