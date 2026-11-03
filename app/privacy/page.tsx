import { privacy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMetadata({ title: privacy.title, description: privacy.description, path: "/privacy" });
export default function PrivacyPage() {
  return <LegalPage title={privacy.title} body={privacy.body} />;
}
