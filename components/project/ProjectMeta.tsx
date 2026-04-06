import { Project } from "@/lib/data";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <dl className="grid gap-5 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="text-xs uppercase tracking-[0.16em]">Loại</dt>
        <dd className="mt-1 text-ink">{project.category}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-[0.16em]">Vị trí</dt>
        <dd className="mt-1 text-ink">{project.location}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-[0.16em]">Diện tích</dt>
        <dd className="mt-1 text-ink">{project.area}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-[0.16em]">Năm</dt>
        <dd className="mt-1 text-ink">{project.year}</dd>
      </div>
    </dl>
  );
}
