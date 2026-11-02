import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Products we've designed and built.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Products we've designed and built.");
}
