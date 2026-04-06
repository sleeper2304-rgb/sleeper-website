import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/data";

export function HomeFeaturedProjects() {
  return (
    <Section className="pt-6 md:pt-10">
      <Container>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-9">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">02 · Work</p>
            <h2 className="mt-3 font-serif text-5xl leading-none md:text-7xl">Selected Projects</h2>
          </div>
          <Button href="/projects" variant="ghost">
            Xem tất cả
          </Button>
        </div>
        <ProjectGrid projects={projects.slice(0, 2)} />
      </Container>
    </Section>
  );
}
