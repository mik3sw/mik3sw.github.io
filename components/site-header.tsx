"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { COMPANY_INFO } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Only flips state when the threshold is crossed, not on every frame.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Highlight the nav item for the section crossing the middle of the screen.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(
      (el): el is Element => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActiveHref(href);
          else setActiveHref((current) => (current === href ? null : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || menuOpen
            ? "border-line bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <a
            href="#top"
            onClick={() => menuOpen && setMenuOpen(false)}
            className="text-[15px] font-semibold tracking-tight"
          >
            {COMPANY_INFO.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center px-3 text-sm transition-colors hover:text-foreground",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-1.5 h-px origin-left bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="#contact"
              className="ml-2 hidden h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-px active:scale-[0.98] md:inline-flex"
            >
              Contact me
            </a>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              className="-mr-2 inline-flex h-11 items-center px-2 text-sm font-medium md:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} activeHref={activeHref} onClose={closeMenu} />
    </>
  );
}
