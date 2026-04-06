import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  return (
    <Section>
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Let&apos;s build with intention</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-serif text-4xl md:text-6xl">
          Bắt đầu dự án kiến trúc và nội thất của bạn cùng Sleeper.
        </h2>
        <div className="mt-10">
          <Button href="/contact">Đặt lịch tư vấn</Button>
        </div>
      </Container>
    </Section>
  );
}
