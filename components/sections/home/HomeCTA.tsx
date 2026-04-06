import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  return (
    <Section className="pt-12 md:pt-16">
      <Container className="border-t border-ink/10 pt-12 text-center md:pt-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">04 · Contact</p>
        <h2 className="mx-auto mt-5 max-w-[16ch] font-serif text-5xl leading-[0.93] md:text-7xl">
          Bắt đầu dự án kiến trúc mang dấu ấn riêng của bạn.
        </h2>
        <div className="mt-10">
          <Button href="/contact">Đặt lịch tư vấn</Button>
        </div>
      </Container>
    </Section>
  );
}
