/*
  Cookie consent, stored in localStorage (a technical store, no consent needed).

  The only optional category is analytics. A choice expires after six months,
  or as soon as CONSENT_VERSION changes (bump it when the cookie policy changes
  in a way visitors should be asked about again).
*/

export type ConsentChoice = "granted" | "denied";

type StoredConsent = { choice: ConsentChoice; at: number; version: number };

export const CONSENT_KEY = "cookie-consent";
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

/** Fired on window whenever the choice changes or the banner is asked to reopen. */
export const CONSENT_EVENT = "cookie-consent-change";
export const OPEN_SETTINGS_EVENT = "cookie-settings-open";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredConsent;
    if (stored.version !== CONSENT_VERSION || Date.now() - stored.at > MAX_AGE_MS) return null;
    return stored.choice === "granted" || stored.choice === "denied" ? stored.choice : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    const stored: StoredConsent = { choice, at: Date.now(), version: CONSENT_VERSION };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
