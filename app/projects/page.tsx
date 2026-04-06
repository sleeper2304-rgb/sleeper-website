import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Portfolio</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl">Dự án của Sleeper</h1>
        <p className="mt-5 max-w-2xl text-muted">
          Tuyển chọn các dự án kiến trúc, nội thất và thi công do Sleeper thực hiện cho khách hàng nhà ở và thương mại tại Việt Nam.
        </p>
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </Container>
    </Section>
  );
}
