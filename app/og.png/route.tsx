import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";

// Emitted as a real /og.png file so GitHub Pages serves it with the
// correct image/png content-type (unlike the extensionless output of the
// opengraph-image file convention).
export function GET() {
  return renderOgImage();
}
