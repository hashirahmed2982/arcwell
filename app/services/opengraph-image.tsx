import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Everything from sketch to launch.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Everything from sketch to launch.");
}
