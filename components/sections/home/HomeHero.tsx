import vi from "@/data/content/vi.json";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function HomeHero() {
  return (
    <Section className="pb-16 pt-24 md:pb-24 md:pt-32">
      <Container>
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{vi.homeHero.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-[13ch] font-serif text-[3.35rem] leading-[0.9] md:text-[6.6rem]">
            Kiến tạo không gian
            <br />
            sống và làm việc
            <br />
            mang dấu ấn đương đại.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-9 max-w-[43ch] text-[0.92rem] leading-relaxed text-muted">{vi.homeHero.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-1">
            <Button href="/projects">{vi.homeHero.primaryCta}</Button>
            <Button href="/contact" variant="ghost">
              {vi.homeHero.secondaryCta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
