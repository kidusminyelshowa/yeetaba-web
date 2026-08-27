import Link from "next/link";
import Image from "next/image";
import { projects as fallbackProjects, Project } from "./data";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import "./Projects.css";

export const revalidate = 60; // Revalidate every 60 seconds or on demand

async function getProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await client.fetch(`
      *[_type == "project"] | order(sortOrder asc, _createdAt desc) {
        "slug": slug.current,
        title,
        subtitle,
        sector,
        focus,
        "image": mainImage.asset->url,
        "images": galleryImages[].asset->url,
        overview,
        highlights,
        deliverables
      }
    `);

    if (sanityProjects && sanityProjects.length > 0) {
      return sanityProjects;
    }
  } catch (e) {
    console.error("Sanity fetch failed for projects listing, using fallback:", e);
  }

  return fallbackProjects;
}

export default async function ProjectsPage() {
  const projectsList = await getProjects();

  return (
    <main className="projects-page">
      <div className="projects-container">
        <header className="projects-hero">
          <h1 className="projects-title">Our Work</h1>
          <p className="projects-intro">
            Through storytelling, strategy, advocacy, facilitation, and creative execution, we partner with organizations and movements committed to social impact, gender justice, and community transformation.
          </p>
        </header>

        <div className="projects-grid">
          {projectsList.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card"
            >
              <div className="project-card-image-box">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project image`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-500">
                    No image available
                  </div>
                )}
              </div>
              <div className="project-card-content">
                <span className="project-card-sector">{project.sector}</span>
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-description">{project.overview}</p>
                <div className="project-card-tags">
                  {(project.focus || []).map((tag) => (
                    <span key={tag} className="project-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
