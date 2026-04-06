import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import vi from "@/data/content/vi.json";

export function HomeStudioIntro() {
  return (
    <Section>
      <Container className="grid gap-8 border-t border-ink/10 pt-12 md:grid-cols-2 md:pt-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Studio</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-3xl leading-snug md:text-5xl">{vi.studio.title}</h2>
          <p className="mt-5 max-w-xl text-muted">{vi.studio.description}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
