import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/lib/data";

export const metadata = {
  title: "Process"
};

export default function ProcessPage() {
  return (
    <>
      <Section>
        <Container>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Workflow</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Quy trình thiết kế và thi công được chuẩn hoá để kiểm soát chất lượng toàn diện.</h1>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="space-y-8">
          {processSteps.map((step) => (
            <article key={step.step} className="grid gap-3 border-t border-ink/10 py-7 md:grid-cols-[140px_1fr_2fr] md:gap-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Bước {step.step}</p>
              <h2 className="font-serif text-2xl md:text-3xl">{step.title}</h2>
              <p className="text-muted">{step.description}</p>
            </article>
          ))}
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Sẵn sàng khởi động dự án?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Hãy chia sẻ brief của bạn, đội ngũ Sleeper sẽ phản hồi lộ trình triển khai phù hợp trong 24 giờ làm việc.
          </p>
          <div className="mt-8">
            <Button href="/contact">Đặt lịch tư vấn</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
