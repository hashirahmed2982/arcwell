import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Get a ballpark estimate in two minutes.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Get a ballpark estimate in two minutes.");
}
