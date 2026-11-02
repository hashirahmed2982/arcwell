import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared Open Graph card used by every route's opengraph-image.tsx. */
export function ogImage(title: string, eyebrow = site.tagline) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 92% 0%, #dbe5fd, transparent 45%)",
          color: "#0b1b33",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#0b1b33",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <div style={{ width: 28, height: 34, borderTopLeftRadius: 14, borderTopRightRadius: 14, border: "4px solid #ffffff", borderBottom: "none" }} />
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, color: "#2453e6", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div
          style={{
            height: 6,
            width: 120,
            borderRadius: 6,
            background: "#2453e6",
          }}
        />
      </div>
    ),
    ogSize,
  );
}
