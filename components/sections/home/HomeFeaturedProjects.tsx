import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/data";

export function HomeFeaturedProjects() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-8">
          <h2 className="font-serif text-5xl leading-none md:text-7xl">Selected Projects</h2>
          <Button href="/projects" variant="ghost">
            Xem tất cả
          </Button>
        </div>
        <ProjectGrid projects={projects.slice(0, 2)} />
      </Container>
    </Section>
  );
}
