import { Project } from "@/lib/data";
import Link from "next/link";

export function NextProject({ project }: { project: Project }) {
  return (
    <div className="border-t border-ink/10 pt-10">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Dự án tiếp theo</p>
      <Link href={`/projects/${project.slug}`} className="mt-2 inline-block font-serif text-3xl hover:text-accent">
        {project.title}
      </Link>
    </div>
  );
}
