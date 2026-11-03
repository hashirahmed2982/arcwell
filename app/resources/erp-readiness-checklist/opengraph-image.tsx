import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const dynamic = "force-static";
export const alt = "Is your business ready for an ERP?";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("Is your business ready for an ERP?");
}
