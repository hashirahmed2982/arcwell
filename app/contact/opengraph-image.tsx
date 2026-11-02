import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Let's build something together.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Let's build something together.");
}
