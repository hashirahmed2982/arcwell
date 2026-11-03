import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Notes from the work.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Notes from the work.");
}
