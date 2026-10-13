"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";

  /*
    The new theme grows out of the button as a blurred circle (.theme-vt in
    globals.css). flushSync makes next-themes swap the class inside the
    transition callback, so the browser snapshots the right "after" state.
  */
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = dark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);
    root.classList.add("theme-vt");

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "grid size-10 place-items-center rounded-full text-muted-foreground transition-[color,background-color,transform] hover:bg-surface hover:text-foreground active:scale-[0.96]",
        className
      )}
    >
      {/* Render a fixed-size placeholder until the theme is known to avoid a flash. */}
      {mounted ? (dark ? <Sun className="size-5" /> : <Moon className="size-5" />) : <span className="size-5" />}
    </button>
  );
}
