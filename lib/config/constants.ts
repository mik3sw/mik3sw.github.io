import {
  SiGithub,
  SiHuggingface,
  type IconType,
} from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";
import type { ComponentType } from "react";

export const COMPANY_INFO = {
  name: "Michele Marcucci",
  title1: "Hi, I'm Mike!",
  title2: "AI Software Engineer.",
  subtitle:
    "Full-stack developer based in Milan, Italy, specialized in complex AI pipeline integrations. I build web and desktop applications and have a strong interest in image processing, machine learning, and AI. Bachelor's degree in Information Technology from the University of Milano-Bicocca.",
} as const;

export const SOCIALS = {
  github: "https://github.com/mik3sw",
  huggingface: "https://huggingface.co/mik3ml",
  linkedin: "https://www.linkedin.com/in/michele-angelo-marcucci/",
  email: "mailto:michymarcucci@gmail.com",
  cv: "https://www.linkedin.com/in/michele-angelo-marcucci/overlay/1767093719439/single-media-viewer/?profileId=ACoAACX59jEBhAPYj2ps2wksT7dUyJ0XUSN2iiA",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType | ComponentType<{ className?: string }>;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: SOCIALS.github, icon: SiGithub },
  { label: "Hugging Face", href: SOCIALS.huggingface, icon: SiHuggingface },
  { label: "LinkedIn", href: SOCIALS.linkedin, icon: Linkedin },
  { label: "Email", href: SOCIALS.email, icon: Mail },
];

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
  /** Highlighted card spanning two columns on large screens. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Alembic",
    description:
      "An enterprise platform for RAG, document sharing and management — powered by MCP tooling and local AI. Privacy-first and local-first, built for individuals and companies.",
    tags: ["RAG", "MCP", "Local AI", "Documents", "Privacy-first"],
    website: "https://www.redixlabs.ai/alembic",
    logo: "/alembic.svg",
    featured: true,
  },
  {
    title: "OneClick",
    description:
      "A native macOS menubar utility that puts quick system actions one click away. My most starred project.",
    tags: ["Swift", "SwiftUI", "macOS"],
    repo: "https://github.com/mik3sw/OneClick",
  },
  {
    title: "quokka-datasetbuilder",
    description:
      "A tool to easily build high-quality Q&A datasets for fine-tuning large language models.",
    tags: ["LLM", "Datasets", "Python"],
    repo: "https://github.com/mik3sw/quokka-datasetbuilder",
  },
  {
    title: "LocalAI Chatbot",
    description:
      "A Telegram chatbot wired to a local LLM through Ollama — private, self-hosted conversational AI.",
    tags: ["Ollama", "Telegram", "Python"],
    repo: "https://github.com/mik3sw/LocalAI-chatbot",
  },
  {
    title: "Skin Detection",
    description:
      "Human skin detection and segmentation from images using classic computer-vision techniques.",
    tags: ["OpenCV", "Image Processing", "Python"],
    repo: "https://github.com/mik3sw/SkinDetection",
  },
  {
    title: "NPR Painting",
    description:
      "A non-photorealistic rendering filter that turns photos into oil-painting-style artwork.",
    tags: ["OpenCV", "Image Processing", "Python"],
    repo: "https://github.com/mik3sw/NPR-Painting",
  },
];
