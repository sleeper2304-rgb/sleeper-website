import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import vi from "@/data/content/vi.json";

export function HomeProcessPreview() {
  return (
    <Section className="pt-8 md:pt-12">
      <Container className="border-y border-ink/10 py-16 md:py-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">03 · Method</p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[0.95] md:text-6xl">{vi.processPreview.title}</h2>

        <ol className="mt-12 grid gap-5 text-[11px] uppercase tracking-[0.16em] text-muted md:grid-cols-4">
          {vi.processPreview.steps.map((step, index) => (
            <li key={step} className="border-t border-ink/15 pt-4">
              {String(index + 1).padStart(2, "0")} / {step}
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Button href="/process" variant="ghost">
            Xem quy trình đầy đủ
          </Button>
        </div>
      </Container>
    </Section>
  );
}
