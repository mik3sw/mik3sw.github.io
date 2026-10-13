import { COMPANY_INFO } from "@/lib/config/constants";

const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground md:px-8">
        <p>
          &copy; {new Date().getFullYear()} {COMPANY_INFO.fullName}
        </p>
        <a href="#top" className="inline-flex h-11 items-center transition-colors hover:text-foreground">
          Back to top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
