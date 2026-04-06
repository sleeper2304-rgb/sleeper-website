import vi from "@/data/content/vi.json";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroImageSequence } from "./HeroImageSequence";

export function HomeHero() {
  return (
    <Section className="pb-20 pt-24 md:pb-32 md:pt-36">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{vi.homeHero.eyebrow}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">[ Scroll down ]</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 max-w-[13ch] font-serif text-[3.5rem] leading-[0.88] md:text-[7rem]">
            Kiến tạo không gian
            <br />
            sống và làm việc
            <br />
            mang dấu ấn đương đại.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 max-w-[42ch] text-[0.9rem] leading-relaxed text-muted">{vi.homeHero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-1">
            <Button href="/projects">{vi.homeHero.primaryCta}</Button>
            <Button href="/contact" variant="ghost">
              {vi.homeHero.secondaryCta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <HeroImageSequence />
        </Reveal>
      </Container>
    </Section>
  );
}
