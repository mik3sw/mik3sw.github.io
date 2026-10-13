import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { COMPANY_INFO, EMAIL, SOCIALS } from "@/lib/config/constants";

export const metadata: Metadata = {
  title: "Privacy policy | Michele Angelo Marcucci",
  description: "What personal data mik3sw.github.io processes, why, and the rights you have.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const email = (
    <a href={SOCIALS.email}>
      {EMAIL}
    </a>
  );

  return (
    <LegalPage title="Privacy policy" updated="2026-10-13">
      <p>
        This page explains what personal data is processed when you visit mik3sw.github.io, why it
        is processed and which rights you have. It follows the EU General Data Protection
        Regulation (Regulation (EU) 2016/679, &ldquo;GDPR&rdquo;) and Italian data protection law.
      </p>

      <h2>Who is responsible</h2>
      <p>
        The data controller is {COMPANY_INFO.fullName}, based in Milan, Italy. For anything about
        your data, write to {email}.
      </p>

      <h2>What data is processed</h2>

      <h3>Hosting and server logs</h3>
      <p>
        This is a static website hosted on GitHub Pages, a service of GitHub, Inc. When your
        browser loads a page, GitHub receives the technical data sent with every request, such as
        your IP address, browser and the time of the request, and may keep it in its logs to run
        and protect the service. Some project images are loaded from GitHub as well. I have no
        access to these logs.
      </p>
      <p>
        Legal basis: legitimate interest in delivering a working and secure website (Art. 6(1)(f)
        GDPR). More in the{" "}
        <a
          href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub privacy statement
        </a>
        .
      </p>

      <h3>Visit statistics, only with your consent</h3>
      <p>
        If you accept analytics cookies, the site loads Google Analytics 4, provided by Google
        Ireland Limited. It records how the site is used: pages and sections viewed, the site you
        came from, device and browser type, approximate location at city level and a random
        identifier stored in a cookie. Google Analytics 4 does not log or store IP addresses.
        Google signals and ad personalisation are switched off, and nothing is used for
        advertising. If you reject, the Google Analytics script is never loaded.
      </p>
      <ul>
        <li>
          <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR), which you can withdraw at
          any time from &ldquo;Cookie settings&rdquo; in the footer.
        </li>
        <li>
          <strong>Retention:</strong> statistics are kept in Google Analytics for 2 months, then
          deleted automatically.
        </li>
        <li>
          <strong>Transfers outside the EU:</strong> Google may process this data in the United
          States. Google LLC is certified under the EU-U.S. Data Privacy Framework, which the
          European Commission recognises as providing adequate protection.
        </li>
      </ul>
      <p>
        More in the{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google privacy policy
        </a>{" "}
        and in{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          how Google uses data from sites that use its services
        </a>
        .
      </p>

      <h3>When you write to me</h3>
      <p>
        If you send me an email, I use your address and what you write only to reply, and keep the
        conversation for as long as it is useful to it. Legal basis: taking steps at your request
        before a possible agreement (Art. 6(1)(b) GDPR) or my legitimate interest in answering
        (Art. 6(1)(f) GDPR).
      </p>

      <h3>Preferences stored in your browser</h3>
      <p>
        The site remembers your theme and your cookie choice in your browser&apos;s local storage.
        These stay on your device and are never sent anywhere. The{" "}
        <Link href="/cookies">cookie policy</Link> lists them.
      </p>

      <h2>What this site does not do</h2>
      <p>
        There are no accounts, forms, newsletters or ads. Your data is not sold or shared for
        marketing, and no decision about you is made automatically.
      </p>

      <h2>Who receives the data</h2>
      <ul>
        <li>GitHub, Inc., which hosts the site.</li>
        <li>Google Ireland Limited, for visit statistics, only if you accept them.</li>
      </ul>
      <p>Nobody else.</p>

      <h2>Your rights</h2>
      <p>Under Articles 15 to 22 GDPR you can ask to:</p>
      <ul>
        <li>access the data about you and get a copy of it;</li>
        <li>correct it, or have it deleted;</li>
        <li>restrict its processing, or receive it in a portable format;</li>
        <li>object to processing based on legitimate interest;</li>
        <li>withdraw your consent at any time, without affecting what happened before.</li>
      </ul>
      <p>
        Write to {email} and I will reply within one month. Statistics in Google Analytics are tied
        to a random identifier and not to your name, so the quickest way to stop them is to reject
        or withdraw consent from &ldquo;Cookie settings&rdquo; in the footer.
      </p>
      <p>
        You can also lodge a complaint with the Italian data protection authority, the{" "}
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
          Garante per la protezione dei dati personali
        </a>
        , or with the authority of the EU country where you live.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, the date at the top changes with it. If the change affects what you
        agreed to, the cookie banner will ask you again.
      </p>
    </LegalPage>
  );
}
