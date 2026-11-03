import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Clear pricing, before we write a line of code.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Clear pricing, before we write a line of code.");
}
