"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SOCIAL_LINKS } from "@/lib/config/constants";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./site-nav";
import { SocialIcon } from "./social-icon";

const EASE = [0.16, 1, 0.3, 1] as const;

type MobileMenuProps = {
  open: boolean;
  activeHref: string | null;
  /** Off the home page the links navigate back to it instead of scrolling. */
  onHome: boolean;
  onClose: () => void;
};

/** Full-screen menu below md. Sits under the header so the toggle stays in place. */
export function MobileMenu({ open, activeHref, onHome, onClose }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = (e: MediaQueryListEvent) => e.matches && onClose();
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    // Wait for the scroll lock to lift before jumping.
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView();
      history.replaceState(null, "", href);
    });
  };

  const links = [...NAV_LINKS, { label: "Contact me", href: "#contact" as const }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col bg-background px-5 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <nav aria-label="Primary" className="flex-1">
            <ul className="space-y-2">
              {links.map((link, i) => {
                const active = activeHref === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                  >
                    <a
                      href={onHome ? link.href : `/${link.href}`}
                      aria-current={active ? "location" : undefined}
                      onClick={(e) => {
                        if (!onHome) return onClose();
                        e.preventDefault();
                        go(link.href);
                      }}
                      className={cn(
                        "block py-1 text-5xl font-semibold tracking-tight underline-offset-8",
                        active && "underline decoration-signal decoration-2"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
