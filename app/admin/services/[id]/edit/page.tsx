import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import ServiceForm from '../../ServiceForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;

  let serviceData = null;

  try {
    serviceData = await client.fetch(
      `*[_type == "service" && _id == $id][0] {
        _id,
        name,
        description,
        sortOrder,
        "imageUrl": image.asset->url,
        "imageAssetRef": image.asset._ref
      }`,
      { id }
    );
  } catch (e) {
    console.error('Failed to fetch service for editing:', e);
  }

  if (!serviceData) {
    notFound();
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Edit Service: {serviceData.name}</h1>
          <p className="admin-page-desc">Update service details and illustration image</p>
        </div>
      </div>

      <ServiceForm
        initialData={{
          id: serviceData._id,
          name: serviceData.name,
          description: serviceData.description,
          sortOrder: serviceData.sortOrder,
          imageUrl: serviceData.imageUrl,
          imageAssetRef: serviceData.imageAssetRef,
        }}
      />
    </div>
  );
}
