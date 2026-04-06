import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { NextProject } from "@/components/project/NextProject";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectMeta } from "@/components/project/ProjectMeta";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, projects } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Section className="pt-14">
        <Container>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{project.category}</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-muted">{project.description}</p>
          <div className="mt-10">
            <ProjectMeta project={project} />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="relative mb-8 aspect-[16/9] overflow-hidden">
            <Image src={project.cover} alt={project.title} fill sizes="100vw" className="object-cover" />
          </div>
          <ProjectGallery images={project.gallery} title={project.title} />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 border-y border-ink/10 py-14 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Scope</p>
            <ul className="mt-4 space-y-2">
              {project.scope.map((item) => (
                <li key={item} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Bắt đầu dự án mới</p>
            <p className="mt-4 text-muted">Sleeper hỗ trợ từ ý tưởng đến thi công hoàn thiện với quy trình minh bạch.</p>
            <div className="mt-6">
              <Button href="/contact">Liên hệ tư vấn</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <NextProject project={nextProject} />
        </Container>
      </Section>
    </>
  );
}
