import Link from "next/link";
import { COMPANY_INFO } from "@/lib/config/constants";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

const LINK = "inline-flex h-11 items-center transition-colors hover:text-foreground";

const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          &copy; {new Date().getFullYear()} {COMPANY_INFO.fullName}
        </p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-6">
            <li>
              <Link href="/privacy" className={LINK}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={LINK}>
                Cookie policy
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={LINK} />
            </li>
            <li>
              <a href="#top" className={LINK}>
                Back to top
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
