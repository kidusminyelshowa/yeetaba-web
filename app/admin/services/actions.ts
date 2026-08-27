'use server';

import { writeClient } from '@/sanity/lib/write-client';
import { revalidatePath } from 'next/cache';
import { uploadImageToSanity } from '../projects/actions';

export interface ServiceFormData {
  id?: string;
  name: string;
  description: string;
  sortOrder: number;
  imageFile?: File | null;
  imageAssetRef?: string;
}

export async function saveServiceAction(data: ServiceFormData) {
  try {
    let imageAssetRef = data.imageAssetRef;

    if (data.imageFile && data.imageFile.size > 0) {
      imageAssetRef = await uploadImageToSanity(data.imageFile);
    }

    const doc: any = {
      _type: 'service',
      name: data.name,
      description: data.description,
      sortOrder: data.sortOrder,
    };

    if (imageAssetRef) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetRef,
        },
      };
    }

    if (data.id) {
      doc._id = data.id;
      await writeClient.createOrReplace(doc);
    } else {
      await writeClient.create(doc);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/services');
    revalidatePath('/#services');
    revalidatePath('/about');

    return { success: true };
  } catch (error: any) {
    console.error('Error saving service to Sanity:', error);
    return { success: false, error: error.message || 'Failed to save service document.' };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return { success: false, error: error.message || 'Failed to delete service.' };
  }
}
