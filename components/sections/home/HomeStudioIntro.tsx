import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import vi from "@/data/content/vi.json";

export function HomeStudioIntro() {
  return (
    <Section className="pb-24 pt-8 md:pb-32">
      <Container className="grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-[120px_1fr] md:pt-14">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">01 · Studio</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="max-w-5xl font-serif text-4xl leading-[0.96] md:text-7xl">{vi.studio.title}</h2>
          <p className="mt-8 max-w-[56ch] text-[0.95rem] leading-relaxed text-muted">{vi.studio.description}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
