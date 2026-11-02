import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-32">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-4 text-6xl md:text-8xl">This page <em>doesn&apos;t</em> exist.</h1>
      <div className="mt-10"><Button href="/">Back home</Button></div>
    </section>
  );
}
