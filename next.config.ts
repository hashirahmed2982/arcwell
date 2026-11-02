import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export has no image optimisation server. Images are served as-is,
    // so export screenshots as compressed WebP/AVIF at the size they are shown.
    unoptimized: true,
  },
};

export default nextConfig;
