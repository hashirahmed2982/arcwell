import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Software for the way your business works.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Software for the way your business works.");
}
