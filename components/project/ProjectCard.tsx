import { Project } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[16/11] overflow-hidden bg-ink/5">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-[10%]"
        />
      </div>
      <div className="mt-5 grid gap-3 border-b border-ink/10 pb-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{project.category}</p>
          <h3 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{project.title}</h3>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{project.year}</p>
      </div>
    </Link>
  );
}
