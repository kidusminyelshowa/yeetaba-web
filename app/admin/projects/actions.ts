'use server';

import { writeClient } from '@/sanity/lib/write-client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export interface ProjectFormData {
  id?: string;
  title: string;
  slug: string;
  subtitle: string;
  sector: string;
  focus: string[];
  overview: string;
  highlights: string[];
  deliverables: string[];
  sortOrder?: number;
  mainImageFile?: File | null;
  mainImageAssetRef?: string;
  galleryImageFiles?: File[];
  galleryImageAssetRefs?: string[];
}

export async function uploadImageToSanity(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const asset = await writeClient.assets.upload('image', buffer, {
    filename: file.name,
    contentType: file.type,
  });

  return asset._id;
}

export async function saveProjectAction(data: ProjectFormData) {
  try {
    let mainImageAssetRef = data.mainImageAssetRef;

    // Handle main image upload if a new file is provided
    if (data.mainImageFile && data.mainImageFile.size > 0) {
      mainImageAssetRef = await uploadImageToSanity(data.mainImageFile);
    }

    if (!mainImageAssetRef) {
      return { success: false, error: 'Main image is required.' };
    }

    // Handle gallery image uploads
    const galleryAssetRefs: string[] = [...(data.galleryImageAssetRefs || [])];

    if (data.galleryImageFiles && data.galleryImageFiles.length > 0) {
      for (const file of data.galleryImageFiles) {
        if (file.size > 0) {
          const assetId = await uploadImageToSanity(file);
          galleryAssetRefs.push(assetId);
        }
      }
    }

    const doc: any = {
      _type: 'project',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      },
      subtitle: data.subtitle,
      sector: data.sector,
      focus: data.focus,
      overview: data.overview,
      highlights: data.highlights,
      deliverables: data.deliverables,
      sortOrder: data.sortOrder ?? 0,
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAssetRef,
        },
      },
      galleryImages: galleryAssetRefs.map((ref) => ({
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: ref,
        },
      })),
    };

    if (data.id) {
      doc._id = data.id;
      await writeClient.createOrReplace(doc);
    } else {
      await writeClient.create(doc);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath(`/projects/${doc.slug.current}`);

    return { success: true, slug: doc.slug.current };
  } catch (error: any) {
    console.error('Error saving project to Sanity:', error);
    return { success: false, error: error.message || 'Failed to save project document.' };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message || 'Failed to delete project.' };
  }
}
