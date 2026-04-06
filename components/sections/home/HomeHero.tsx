import vi from "@/data/content/vi.json";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function HomeHero() {
  return (
    <Section className="pb-12 pt-20 md:pb-20 md:pt-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{vi.homeHero.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-tight md:text-7xl">{vi.homeHero.title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{vi.homeHero.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
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
