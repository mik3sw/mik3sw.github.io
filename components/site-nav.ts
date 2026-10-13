export type NavLink = { label: string; href: `#${string}` };

/** Single source for header and mobile menu. Hrefs match section ids. */
export const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Websites", href: "#websites" },
  { label: "Stack", href: "#tech-stack" },
  { label: "About me", href: "#journey" },
];
