import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Simple to use, built to last.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Simple to use, built to last.");
}
