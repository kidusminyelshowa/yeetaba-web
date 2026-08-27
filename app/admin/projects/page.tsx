import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import ProjectsManager from './ProjectsManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProjectsPage() {
  let projects = [];

  try {
    projects = await client.fetch(`
      *[_type == "project"] | order(sortOrder asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        sector,
        "imageUrl": mainImage.asset->url
      }
    `);
  } catch (e) {
    console.error('Failed to fetch projects from Sanity:', e);
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-desc">Manage portfolio case studies and project pages</p>
        </div>
        <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
          + Add New Project
        </Link>
      </div>

      <ProjectsManager projects={projects} />
    </div>
  );
}
