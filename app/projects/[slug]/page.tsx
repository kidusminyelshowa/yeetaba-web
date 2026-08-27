import Image from "next/image";
import Link from "next/link";
import { projects as fallbackProjects, Project } from "../data";
import { client } from "@/sanity/lib/client";
import "../Projects.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const sanitySlugs = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
    if (sanitySlugs && sanitySlugs.length > 0) {
      return sanitySlugs;
    }
  } catch (e) {
    console.error("Sanity generateStaticParams failed:", e);
  }
  return fallbackProjects.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
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
      }`,
      { slug }
    );
    if (project) return project;
  } catch (e) {
    console.error(`Sanity fetch failed for project slug "${slug}":`, e);
  }

  return fallbackProjects.find((p) => p.slug === slug) || null;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages = project.images?.length
    ? project.images
    : [project.image, project.image, project.image];

  return (
    <main className="project-detail-page">
      {/* Project Hero Header */}
      <section className="project-detail-hero">
        <Image
          src={project.image}
          alt={`${project.title} Banner`}
          fill
          priority
          sizes="100vw"
        />
        <div className="project-detail-hero-overlay"></div>
        <div className="project-detail-header-wrapper">
          <span className="project-detail-category">{project.sector}</span>
          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
        </div>
      </section>

      {/* Case Study Body */}
      <section className="project-detail-body">
        <div className="project-detail-container">
          
          {/* Left Column: Project Stats & Deliverables */}
          <aside className="project-detail-sidebar">
            <div className="detail-sidebar-block">
              <h4>Sector & Context</h4>
              <p style={{ fontSize: "18px", color: "#4a4a4a", margin: 0 }}>
                {project.sector}
              </p>
            </div>
            
            <div className="detail-sidebar-block">
              <h4>Key Expertise</h4>
              <div className="project-card-tags">
                {project.focus.map((f) => (
                  <span key={f} className="project-card-tag">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-sidebar-block">
              <h4>What We Delivered</h4>
              <ul className="sidebar-deliverables-list">
                {project.deliverables.map((d, index) => (
                  <li key={index}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="detail-back-button-container">
              <Link href="/projects" className="back-link">
                <Image src="/Arrow Thin.svg" width={20} height={20} alt="" className="back-link-arrow" />
                <span>Back to projects</span>
              </Link>
            </div>
          </aside>

          {/* Right Column: Case Story & Highlights */}
          <article className="project-detail-content">
            <div className="project-overview">
              <p className="project-overview-text">{project.overview}</p>
            </div>

            {project.images && project.images.length > 0 && (
              <>
                <div className="project-image-block">
                  <div className="project-image-card">
                    <Image
                      src={galleryImages[0]}
                      alt={`${project.title} image 1`}
                      fill
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>

                {galleryImages.length > 1 && (
                  <div className="project-image-row">
                    {galleryImages.slice(1).map((image, index) => (
                      <div key={index} className="project-image-card project-image-card-small">
                        <Image
                          src={image}
                          alt={`${project.title} image ${index + 2}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="project-highlights-section">
              <h3>Key Impacts & highlights</h3>
              <div className="project-highlights-list">
                {project.highlights.map((highlight, index) => {
                  const numStr = String(index + 1).padStart(2, "0");
                  return (
                    <div key={index} className="project-highlight-item">
                      <span className="highlight-number">{numStr}</span>
                      <div className="highlight-text-content">
                        <p>{highlight}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
