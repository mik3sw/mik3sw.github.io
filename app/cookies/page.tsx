import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LegalPage } from "@/components/legal-page";
import { GA_MEASUREMENT_ID } from "@/lib/config/constants";

export const metadata: Metadata = {
  title: "Cookie policy | Michele Angelo Marcucci",
  description: "Every cookie and browser storage item mik3sw.github.io uses, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

type StoredItem = {
  name: string;
  kind: "Cookie" | "Local storage";
  purpose: string;
  duration: string;
  provider: string;
};

const TECHNICAL: StoredItem[] = [
  {
    name: "theme",
    kind: "Local storage",
    purpose: "Remembers whether you picked the light or dark theme.",
    duration: "Until you clear your browser data",
    provider: "This site",
  },
  {
    name: "cookie-consent",
    kind: "Local storage",
    purpose: "Remembers your cookie choice and when you made it.",
    duration: "6 months, then you are asked again",
    provider: "This site",
  },
];

// GA4 names its session cookie after the measurement ID without the "G-".
const ANALYTICS: StoredItem[] = [
  {
    name: "_ga",
    kind: "Cookie",
    purpose: "Tells visits apart with a random identifier.",
    duration: "2 years",
    provider: "Google Analytics",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`,
    kind: "Cookie",
    purpose: "Keeps track of the current visit.",
    duration: "2 years",
    provider: "Google Analytics",
  },
];

/* One card per item: a table would not survive a phone screen. */
function StoredItems({ items }: { items: StoredItem[] }) {
  return (
    <ul className="not-legal mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.name} className="rounded-xl border border-line bg-surface p-5">
          <p className="font-mono text-sm text-foreground">{item.name}</p>
          <p className="mt-2 text-sm leading-relaxed">{item.purpose}</p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt>Type</dt>
            <dd className="text-foreground">{item.kind}</dd>
            <dt>Lasts</dt>
            <dd className="text-foreground">{item.duration}</dd>
            <dt>Set by</dt>
            <dd className="text-foreground">{item.provider}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" updated="2026-10-13">
      <p>
        Cookies are small text files a website stores in your browser. Local storage works in a
        similar way. This page lists everything this site stores, why, and how to change your
        choice.
      </p>

      <h2>Technical storage</h2>
      <p>
        These keep the site working the way you set it. They need no consent, stay on your device
        and are never sent anywhere.
      </p>
      <StoredItems items={TECHNICAL} />

      <h2>Analytics cookies, only with your consent</h2>
      <p>
        These are set by Google Analytics 4 only after you click &ldquo;Accept&rdquo;, and are used
        to count visits and see which sections get read. Until you accept, the Google Analytics
        script is not even loaded. Details on the data involved are in the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <StoredItems items={ANALYTICS} />

      <h2>Your choice</h2>
      <p>
        On your first visit a banner asks whether you accept analytics cookies. Closing it with
        the X counts as a refusal and sets nothing, as does leaving analytics off under
        &ldquo;manage your choice&rdquo;. You can change your mind at any time: if you withdraw
        consent, statistics stop and the Google Analytics cookies are deleted.
      </p>
      <p>
        <CookieSettingsButton className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-foreground transition-[border-color,transform] hover:border-foreground/40 active:scale-[0.98]" />
      </p>
      <p>
        You can also block or delete cookies from your browser settings, or install the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics opt-out add-on
        </a>
        .
      </p>

      <h2>Nothing else</h2>
      <p>
        There are no ads, social media widgets or embedded videos, and the fonts are served by
        this site, so no other third party stores anything in your browser.
      </p>
    </LegalPage>
  );
}
