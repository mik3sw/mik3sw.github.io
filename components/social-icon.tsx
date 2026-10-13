import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { SiHuggingface } from "@icons-pack/react-simple-icons";
import type { SocialLink } from "@/lib/config/constants";

export function SocialIcon({ icon, className }: { icon: SocialLink["icon"]; className?: string }) {
  switch (icon) {
    case "github":
      return <GithubLogo className={className} aria-hidden="true" />;
    case "linkedin":
      return <LinkedinLogo className={className} aria-hidden="true" />;
    case "huggingface":
      return <SiHuggingface className={className} aria-hidden="true" />;
    case "email":
      return <EnvelopeSimple className={className} aria-hidden="true" />;
  }
}
