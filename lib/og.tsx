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
          background: "#06060a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(123,92,255,0.45), transparent 45%), radial-gradient(circle at 10% 100%, rgba(61,123,255,0.35), transparent 45%)",
          color: "#f3f3f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(120deg, #3d7bff, #7b5cff 55%, #b05cff)",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 26, color: "#9b9bb0", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div
          style={{
            height: 8,
            width: "100%",
            borderRadius: 8,
            background: "linear-gradient(90deg, #3d7bff, #7b5cff 55%, #b05cff)",
          }}
        />
      </div>
    ),
    ogSize,
  );
}
