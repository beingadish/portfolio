import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProjectSlugs,
  getProjectShowcase,
  PROJECT_SHOWCASES,
} from "../../data/project-showcases";
import { ProjectViewer } from "./project-viewer";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectShowcase(slug);

  if (!project) {
    return {
      title: "Project Not Found | Aadarsh Pandey",
    };
  }

  return {
    title: `${project.name} | Aadarsh Pandey Projects`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectShowcase(slug);

  if (!project) {
    notFound();
  }

  const allProjects = Object.values(PROJECT_SHOWCASES);

  return <ProjectViewer project={project} allProjects={allProjects} />;
}
