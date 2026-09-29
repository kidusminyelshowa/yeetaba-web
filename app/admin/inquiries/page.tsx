import React from 'react';
import { redirect } from 'next/navigation';
import { writeClient } from '@/sanity/lib/write-client';
import { checkAuth } from '../actions';
import InquiriesManager from './InquiriesManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminInquiriesPage() {
  // Contact details are personal data; don't rely on the proxy alone.
  if (!(await checkAuth())) redirect('/admin/login');

  let inquiries = [];

  try {
    // Inquiries live under a private id path, so they must be read with the token client.
    inquiries = await writeClient.fetch(`
      *[_type == "inquiry"] | order(submittedAt desc) {
        _id,
        name,
        email,
        organization,
        service,
        message,
        status,
        submittedAt
      }
    `);
  } catch (e) {
    console.error('Failed to fetch inquiries from Sanity:', e);
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Inquiries</h1>
          <p className="admin-page-desc">Messages submitted through the Work With Us form</p>
        </div>
      </div>

      <InquiriesManager inquiries={inquiries} />
    </div>
  );
}
