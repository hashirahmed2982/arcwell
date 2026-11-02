import { site } from "@/content/site";
import { Button } from "./Button";

type Props = { label?: string; variant?: "primary" | "ghost"; className?: string };

export function BookCallButton({ label = "Book a free call", variant = "primary", className = "" }: Props) {
  return (
    <Button href={site.bookCallUrl} external variant={variant} className={className}>
      {label}
    </Button>
  );
}
