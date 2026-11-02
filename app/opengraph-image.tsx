import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Software built around your business.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Software built around your business.");
}
