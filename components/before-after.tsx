"use client";

import { useState } from "react";
import type { ProjectImage } from "@/lib/config/constants";
import { cn } from "@/lib/utils";

/**
 * Shows a filter's input and output in the same frame. Pointer hover previews
 * the result; the button below makes it reachable by touch and keyboard.
 */
export function BeforeAfter({ before, after }: { before: ProjectImage; after: ProjectImage }) {
  const [showAfter, setShowAfter] = useState(false);
  const [hovering, setHovering] = useState(false);
  const visible = showAfter || hovering;

  return (
    <div className="relative z-10">
      <div
        className="relative overflow-hidden rounded-xl bg-background"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <img
          src={before.src}
          width={before.width}
          height={before.height}
          alt={before.alt}
          loading="lazy"
          className="block aspect-[3/2] w-full object-cover"
        />
        <img
          src={after.src}
          width={after.width}
          height={after.height}
          alt={visible ? after.alt : ""}
          aria-hidden={!visible}
          loading="lazy"
          className={cn(
            "absolute inset-0 aspect-[3/2] w-full object-cover transition-opacity duration-500",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      <button
        type="button"
        aria-pressed={showAfter}
        onClick={() => setShowAfter((v) => !v)}
        className="mt-3 inline-flex h-9 items-center rounded-full border border-line px-4 text-sm transition-colors hover:border-foreground/40 active:scale-[0.98]"
      >
        {showAfter ? "Show original" : "Apply filter"}
      </button>
    </div>
  );
}
