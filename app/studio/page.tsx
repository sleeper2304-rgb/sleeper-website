import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data";

export const metadata = {
  title: "Studio"
};

export default function StudioPage() {
  return (
    <>
      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">About Sleeper</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight md:text-7xl">Studio kiến tạo không gian sống đậm bản sắc đương đại.</h1>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted">
            Sleeper là studio thiết kế kiến trúc, nội thất và xây dựng tập trung vào chất lượng thực thi. Chúng tôi kết hợp tư duy thiết kế
            tinh giản với hệ thống quản trị dự án chặt chẽ để tạo nên các công trình bền vững và có giá trị lâu dài.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="border-y border-ink/10 py-14">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Dịch vụ</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.name} className="space-y-3 border-t border-ink/10 pt-4">
                <h2 className="font-serif text-3xl">{service.name}</h2>
                <p className="text-muted">{service.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Chúng tôi làm việc như một đối tác chiến lược của chủ đầu tư.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted">
            Từ định hướng concept đến bàn giao vận hành, Sleeper luôn ưu tiên sự rõ ràng, cam kết tiến độ và chất lượng hoàn thiện.
          </p>
          <div className="mt-8">
            <Button href="/contact">Kết nối với Sleeper</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
