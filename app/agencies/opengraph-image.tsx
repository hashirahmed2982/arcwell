import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Your brand. Our delivery.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Your brand. Our delivery.");
}
