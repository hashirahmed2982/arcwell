import { home } from "@/content/home";
import { StoryText } from "@/components/motion/StoryText";
import { Reveal } from "@/components/motion/Reveal";

/** 01 — The challenge: one paragraph that darkens word by word as you scroll, then the answer. */
export function StoryIntro() {
  const { story } = home;
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x grid gap-8 lg:grid-cols-[220px_1fr]">
        <Reveal><p className="chapter lg:pt-3">{story.chapter}</p></Reveal>
        <div>
          <StoryText text={story.text} className="font-display max-w-4xl text-pretty text-[1.9rem] leading-[1.25] md:text-[2.75rem] md:leading-[1.2]" />
          <Reveal delay={0.1}>
            <div className="mt-10 flex max-w-3xl gap-5 border-l-2 border-accent pl-6">
              <p className="text-xl font-medium leading-relaxed text-ink md:text-2xl">{story.turn}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
