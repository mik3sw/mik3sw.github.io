import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Michele Angelo Marcucci | AI Software Engineer";
export const ogContentType = "image/png";

// Shared 1200×630 social preview, rendered to a static PNG at build time.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#16171b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            color: "#6f8bff",
          }}
        >
          AI SOFTWARE ENGINEER
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Michele Angelo Marcucci
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 34,
              color: "#d4d4d8",
            }}
          >
            Full-stack software, AI pipelines, RAG and fine-tuning
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          <div style={{ display: "flex" }}>mik3sw.github.io</div>
          <div style={{ display: "flex" }}>Milan, Italy</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
