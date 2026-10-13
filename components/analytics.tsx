"use client";

import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/config/constants";
import { CONSENT_EVENT, readConsent, type ConsentChoice } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`;

/*
  gtag.js is never requested before the visitor accepts: until then Google
  gets nothing, not even a cookieless ping. Consent Mode is still declared,
  denied by default, so the tag knows exactly what it may store. Ads signals
  stay off for good: this site runs no advertising.
*/
function enable() {
  (window as unknown as Record<string, boolean>)[DISABLE_FLAG] = false;

  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the Arguments object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    return;
  }

  window.gtag("consent", "update", { analytics_storage: "granted" });
}

/** Stops further hits and removes the cookies Analytics may already have set. */
function disable() {
  (window as unknown as Record<string, boolean>)[DISABLE_FLAG] = true;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });

  const host = location.hostname;
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; max-age=0; path=/${domain}`;
      }
    });
}

function apply(choice: ConsentChoice | null) {
  if (choice === "granted") enable();
  else disable();
}

export function Analytics() {
  useEffect(() => {
    apply(readConsent());
    const onChange = (e: Event) => apply((e as CustomEvent<ConsentChoice>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return null;
}
