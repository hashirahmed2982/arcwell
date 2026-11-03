import { terms } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMetadata({ title: terms.title, description: terms.description, path: "/terms" });
export default function TermsPage() {
  return <LegalPage title={terms.title} body={terms.body} />;
}
