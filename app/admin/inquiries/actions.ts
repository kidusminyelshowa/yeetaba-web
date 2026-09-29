'use server';

import { writeClient } from '@/sanity/lib/write-client';
import { revalidatePath } from 'next/cache';
import { checkAuth } from '../actions';

export type InquiryStatus = 'new' | 'read' | 'archived';

const STATUSES: InquiryStatus[] = ['new', 'read', 'archived'];

function isInquiryId(id: string) {
  return typeof id === 'string' && id.startsWith('inquiries.');
}

export async function setInquiryStatusAction(id: string, status: InquiryStatus) {
  if (!(await checkAuth())) return { success: false, error: 'Not authorized.' };
  if (!isInquiryId(id) || !STATUSES.includes(status)) {
    return { success: false, error: 'Invalid request.' };
  }

  try {
    await writeClient.patch(id).set({ status }).commit();
    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return { success: false, error: error.message || 'Failed to update inquiry.' };
  }
}

export async function deleteInquiryAction(id: string) {
  if (!(await checkAuth())) return { success: false, error: 'Not authorized.' };
  if (!isInquiryId(id)) return { success: false, error: 'Invalid request.' };

  try {
    await writeClient.delete(id);
    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return { success: false, error: error.message || 'Failed to delete inquiry.' };
  }
}
