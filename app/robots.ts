import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://mik3sw.github.io/sitemap.xml",
    host: "https://mik3sw.github.io",
  };
}
