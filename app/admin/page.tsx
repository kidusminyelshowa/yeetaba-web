import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  let projectCount = 0;
  let serviceCount = 0;

  try {
    projectCount = await client.fetch(`count(*[_type == "project"])`);
    serviceCount = await client.fetch(`count(*[_type == "service"])`);
  } catch (e) {
    console.error('Failed to fetch counts from Sanity:', e);
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-desc">Manage site content connected to Sanity CMS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Projects</h3>
            <span className="admin-badge admin-badge-green">{projectCount} Documents</span>
          </div>
          <p className="text-sm text-zinc-400 mb-6">
            Manage portfolio case studies, highlights, sector tags, deliverables, and gallery images.
          </p>
          <div className="flex gap-3">
            <Link href="/admin/projects" className="admin-btn admin-btn-primary">
              View Projects
            </Link>
            <Link href="/admin/projects/new" className="admin-btn admin-btn-secondary">
              + New Project
            </Link>
          </div>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <span className="admin-badge admin-badge-green">{serviceCount} Documents</span>
          </div>
          <p className="text-sm text-zinc-400 mb-6">
            Manage practice areas, services offerings descriptions, display order, and illustrations.
          </p>
          <div className="flex gap-3">
            <Link href="/admin/services" className="admin-btn admin-btn-primary">
              View Services
            </Link>
            <Link href="/admin/services/new" className="admin-btn admin-btn-secondary">
              + New Service
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Quick Reference</h3>
        <p className="text-sm text-zinc-400 mb-4">
          All changes made through this admin dashboard directly update the live Sanity dataset and revalidate public Next.js pages.
        </p>
        <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside">
          <li>Maximum image upload limit: <strong>3MB</strong> per image file</li>
          <li>Supported image formats: PNG, JPG, WEBP, SVG</li>
          <li>Direct GROQ queries can also be executed in <a href="/studio" target="_blank" className="text-[#80c998] underline">Sanity Studio Vision tool</a></li>
        </ul>
      </div>
    </div>
  );
}
