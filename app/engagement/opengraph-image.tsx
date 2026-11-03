import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "A proposal built around your project.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("A proposal built around your project.");
}
