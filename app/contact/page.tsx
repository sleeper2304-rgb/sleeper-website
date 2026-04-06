import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Contact</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">Trao đổi về dự án của bạn.</h1>
          <div className="mt-8 space-y-3 text-muted">
            <p>{siteConfig.address}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
          </div>
        </div>

        <form className="space-y-5 border border-ink/10 bg-white/50 p-6 md:p-8">
          <div>
            <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted">
              Họ tên
            </label>
            <input id="name" name="name" className="w-full border border-ink/15 bg-transparent px-4 py-3 outline-none focus:border-ink" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full border border-ink/15 bg-transparent px-4 py-3 outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="service" className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted">
              Nhu cầu
            </label>
            <select id="service" name="service" className="w-full border border-ink/15 bg-transparent px-4 py-3 outline-none focus:border-ink">
              <option>Thiết kế kiến trúc</option>
              <option>Thiết kế nội thất</option>
              <option>Thi công trọn gói</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted">
              Mô tả dự án
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full border border-ink/15 bg-transparent px-4 py-3 outline-none focus:border-ink"
            />
          </div>
          <button type="submit" className="border border-ink bg-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-bg transition hover:bg-transparent hover:text-ink">
            Gửi yêu cầu
          </button>
        </form>
      </Container>
    </Section>
  );
}
