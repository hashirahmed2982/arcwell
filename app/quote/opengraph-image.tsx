import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Tell us about your project. Free quote.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Tell us about your project. Free quote.");
}
