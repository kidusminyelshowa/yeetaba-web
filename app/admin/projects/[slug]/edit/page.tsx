import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import ProjectForm from '../../ProjectForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function EditProjectPage({ params }: PageProps) {
  const { slug } = await params;

  let projectData = null;

  try {
    projectData = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        subtitle,
        sector,
        focus,
        overview,
        highlights,
        deliverables,
        sortOrder,
        "mainImageUrl": mainImage.asset->url,
        "mainImageAssetRef": mainImage.asset._ref,
        "galleryImageUrls": galleryImages[].asset->url,
        "galleryImageAssetRefs": galleryImages[].asset._ref
      }`,
      { slug }
    );
  } catch (e) {
    console.error('Failed to fetch project for editing:', e);
  }

  if (!projectData) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Edit Project: {projectData.title}</h1>
          <p className="admin-page-desc">Update case study details and images</p>
        </div>
      </div>

      <ProjectForm
        initialData={{
          id: projectData._id,
          title: projectData.title,
          slug: projectData.slug,
          subtitle: projectData.subtitle,
          sector: projectData.sector,
          focus: projectData.focus || [],
          overview: projectData.overview,
          highlights: projectData.highlights || [],
          deliverables: projectData.deliverables || [],
          sortOrder: projectData.sortOrder ?? 0,
          mainImageUrl: projectData.mainImageUrl,
          mainImageAssetRef: projectData.mainImageAssetRef,
          galleryImageUrls: projectData.galleryImageUrls || [],
          galleryImageAssetRefs: projectData.galleryImageAssetRefs || [],
        }}
      />
    </div>
  );
}
