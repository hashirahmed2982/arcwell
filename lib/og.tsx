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
          background: "#f5f1ea",
          backgroundImage: "radial-gradient(circle at 90% 0%, #fbe3c9, transparent 50%)",
          color: "#1d1b18",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1d1b18",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <div style={{ width: 28, height: 34, borderTopLeftRadius: 14, borderTopRightRadius: 14, border: "4px solid #f5f1ea", borderBottom: "none" }} />
          </div>
          <div style={{ fontSize: 36 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 28, color: "#6f685e", fontStyle: "italic" }}>{eyebrow}</div>
          <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -1.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div
          style={{
            height: 6,
            width: 120,
            borderRadius: 6,
            background: "#c4683d",
          }}
        />
      </div>
    ),
    ogSize,
  );
}
