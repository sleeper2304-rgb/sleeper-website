import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import vi from "@/data/content/vi.json";

export function HomeProcessPreview() {
  return (
    <Section>
      <Container className="border-y border-ink/10 py-14">
        <h2 className="max-w-3xl font-serif text-3xl md:text-5xl">{vi.processPreview.title}</h2>
        <ol className="mt-10 grid gap-6 text-sm uppercase tracking-[0.15em] text-muted md:grid-cols-4">
          {vi.processPreview.steps.map((step, index) => (
            <li key={step} className="border-t border-ink/15 pt-4">
              {String(index + 1).padStart(2, "0")} · {step}
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href="/process" variant="ghost">
            Xem quy trình đầy đủ
          </Button>
        </div>
      </Container>
    </Section>
  );
}
