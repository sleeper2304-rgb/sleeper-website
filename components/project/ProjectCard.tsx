import { Project } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.category}</p>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">{project.year}</p>
      </div>
    </Link>
  );
}
