import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/data";

export function HomeFeaturedProjects() {
  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-serif text-4xl md:text-5xl">Dự án tiêu biểu</h2>
          <Button href="/projects" variant="ghost">
            Xem tất cả
          </Button>
        </div>
        <ProjectGrid projects={projects.slice(0, 2)} />
      </Container>
    </Section>
  );
}
