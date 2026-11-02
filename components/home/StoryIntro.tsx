import { home } from "@/content/home";
import { StoryText } from "@/components/motion/StoryText";
import { Reveal } from "@/components/motion/Reveal";

/** Chapter one: the problem, told in a single paragraph that "writes itself" as you scroll. */
export function StoryIntro() {
  const { story } = home;
  return (
    <section className="relative pb-10 pt-24 md:pb-12 md:pt-40">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[180px_1fr]">
          <Reveal><p className="chapter md:pt-4">{story.chapter}</p></Reveal>
          <div>
            <StoryText text={story.text} className="font-display max-w-4xl text-pretty text-[2.1rem] leading-[1.18] md:text-[3.4rem] md:leading-[1.12]" />
            <Reveal delay={0.1}>
              <p className="font-display mt-10 text-[2.1rem] italic leading-tight text-accent md:text-[3.4rem]">{story.turn}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
