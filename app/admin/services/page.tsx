import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import ServicesManager from './ServicesManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminServicesPage() {
  let services = [];

  try {
    services = await client.fetch(`
      *[_type == "service"] | order(sortOrder asc) {
        _id,
        name,
        sortOrder,
        description,
        "imageUrl": image.asset->url
      }
    `);
  } catch (e) {
    console.error('Failed to fetch services from Sanity:', e);
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-desc">Manage core services offerings and descriptions</p>
        </div>
        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
          + Add New Service
        </Link>
      </div>

      <ServicesManager services={services} />
    </div>
  );
}
