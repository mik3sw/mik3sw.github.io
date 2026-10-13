"use client";

import { openCookieSettings } from "@/lib/consent";

/** Reopens the consent banner, so a choice can be changed or withdrawn. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
