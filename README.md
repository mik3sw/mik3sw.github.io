# mik3sw.github.io

Personal portfolio of **Michele Angelo Marcucci** — AI Software Engineer based in Milan, Italy.

🔗 Live: [mik3sw.github.io](https://mik3sw.github.io)

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, static export) + [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for entrance/in-view animations
- [GSAP](https://gsap.com) + ScrollTrigger for scroll-driven effects (hero parallax, project reveals)
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                 # App Router entry (layout, page, globals)
components/          # Page sections: hero, projects, tech-stack, about
  ui/               # shadcn + custom UI primitives
lib/config/         # constants.ts — single source of truth for content
                    # (bio, social links, projects list)
```

Content — bio, social links and the projects grid — lives in
[`lib/config/constants.ts`](lib/config/constants.ts). Edit it there; the
sections read from it.

## Build & deploy

```bash
npm run build
```

The site is statically exported (`output: "export"` in
[`next.config.ts`](next.config.ts)) and deployed to GitHub Pages via GitHub
Actions.
