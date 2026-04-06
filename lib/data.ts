import projectsRaw from "@/data/projects.json";
import processRaw from "@/data/process.json";
import servicesRaw from "@/data/services.json";

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  area: string;
  cover: string;
  description: string;
  scope: string[];
  gallery: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Service = {
  name: string;
  description: string;
};

export const projects = projectsRaw as Project[];
export const processSteps = processRaw as ProcessStep[];
export const services = servicesRaw as Service[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
