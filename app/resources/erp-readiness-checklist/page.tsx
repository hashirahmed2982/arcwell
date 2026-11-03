import { erpChecklist } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ChecklistGate } from "@/components/resources/ChecklistGate";

export const metadata = pageMetadata({ ...erpChecklist.seo, path: `/resources/${erpChecklist.slug}` });

export default function ChecklistPage() {
  return (
    <>
      <PageHero eyebrow={erpChecklist.eyebrow} title={erpChecklist.heading} intro={erpChecklist.intro} />
      <section className="py-16 md:py-24">
        <div className="container-x"><ChecklistGate /></div>
      </section>
    </>
  );
}
