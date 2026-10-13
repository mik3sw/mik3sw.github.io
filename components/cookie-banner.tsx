"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  Asks once, then stays out of the way. Accept is the one button; refusing is
  the X, which counts as a rejection (the Italian Garante accepts the close
  button as the refusal), so it stays clearly visible. "Manage" opens a second
  view with the analytics switch. The footer's "Cookie settings" reopens it.
*/
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ConsentChoice | null>(null);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    if (readConsent() === null) setOpen(true);

    const onOpen = () => {
      const choice = readConsent();
      setCurrent(choice);
      setAnalytics(choice === "granted");
      setManaging(false);
      setOpen(true);
      // Opened on purpose from the footer: move focus to it.
      requestAnimationFrame(() => panel.current?.focus());
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const choose = (choice: ConsentChoice) => {
    writeConsent(choice);
    setCurrent(choice);
    setManaging(false);
    setOpen(false);
  };

  const textLink =
    "font-medium text-foreground underline decoration-signal decoration-2 underline-offset-4 hover:decoration-[3px]";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          aria-describedby={bodyId}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] rounded-xl border border-line bg-background/95 p-5 shadow-[0_24px_60px_-20px_color-mix(in_oklch,var(--foreground)_35%,transparent)] backdrop-blur-xl focus-visible:outline-none sm:inset-x-auto sm:left-5 sm:bottom-5 sm:w-[26rem] md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-base font-semibold tracking-tight">
              Cookies
            </h2>
            <button
              type="button"
              onClick={() => choose("denied")}
              aria-label="Close and reject analytics cookies"
              className="-mt-1.5 -mr-1.5 grid size-9 shrink-0 place-items-center rounded-full border border-line text-foreground transition-colors hover:bg-surface"
            >
              <X className="size-4" />
            </button>
          </div>

          {managing ? (
            <>
              <p id={bodyId} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Choose what the site may store. Details are in the{" "}
                <Link href="/cookies" className={textLink}>
                  cookie policy
                </Link>
                .
              </p>

              <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
                <li className="flex items-center justify-between gap-4 p-4">
                  <span>
                    <span className="block text-sm font-medium">Necessary</span>
                    <span className="block text-sm text-muted-foreground">Theme and this choice.</span>
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground">Always on</span>
                </li>
                <li className="flex items-center justify-between gap-4 p-4">
                  <span>
                    <span id={`${titleId}-analytics`} className="block text-sm font-medium">
                      Analytics
                    </span>
                    <span className="block text-sm text-muted-foreground">Google Analytics visit counts.</span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    aria-labelledby={`${titleId}-analytics`}
                    onClick={() => setAnalytics((on) => !on)}
                    className={cn(
                      "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
                      analytics ? "bg-signal" : "bg-line"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-1 left-1 size-5 rounded-full bg-background shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        analytics && "translate-x-5"
                      )}
                    />
                  </button>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => choose(analytics ? "granted" : "denied")}
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-signal text-base font-medium text-signal-foreground transition-transform hover:-translate-y-px active:scale-[0.98]"
              >
                Save choice
              </button>
            </>
          ) : (
            <>
              <p id={bodyId} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                With your consent I use Google Analytics to count visits and see which sections get
                read. No ads, no profiling. You can{" "}
                <button type="button" onClick={() => setManaging(true)} className={textLink}>
                  manage your choice
                </button>{" "}
                or read the{" "}
                <Link href="/cookies" className={textLink}>
                  cookie policy
                </Link>
                .
              </p>

              {current && (
                <p className="mt-3 text-sm text-foreground">
                  Current choice: analytics {current === "granted" ? "accepted" : "rejected"}.
                </p>
              )}

              <button
                type="button"
                onClick={() => choose("granted")}
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-signal text-base font-medium text-signal-foreground transition-transform hover:-translate-y-px active:scale-[0.98]"
              >
                Accept
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
