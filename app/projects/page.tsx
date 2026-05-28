import Link from "next/link";
import Image from "next/image";
import { projects } from "./data";
import "./Projects.css";

export default function ProjectsPage() {
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
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card"
            >
              <div className="project-card-image-box">
                <Image
                  src={project.image}
                  alt={`${project.title} project image`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="project-card-content">
                <span className="project-card-sector">{project.sector}</span>
                <h2 className="project-card-title">{project.title}</h2>
                <p className="project-card-description">{project.overview}</p>
                <div className="project-card-tags">
                  {project.focus.map((tag) => (
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
