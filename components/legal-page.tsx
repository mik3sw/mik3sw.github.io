import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  /** ISO date of the last substantive change. */
  updated: string;
  children: ReactNode;
};

/** Shared shell for the privacy and cookie policies: one readable column. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  const label = new Date(updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="top" className="mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8 md:pt-40 md:pb-32">
      <article className="max-w-[68ch]">
        <h1 className="text-5xl leading-[1.05] font-semibold tracking-[-0.04em] md:text-6xl">{title}</h1>
        <p className="mt-5 text-sm text-muted-foreground">
          Last updated <time dateTime={updated}>{label}</time>
        </p>
        <div className="legal mt-12">{children}</div>
      </article>
    </main>
  );
}
