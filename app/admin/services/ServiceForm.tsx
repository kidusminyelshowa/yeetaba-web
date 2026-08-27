'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageDropzone from '../components/ImageDropzone';
import Toast from '../components/Toast';
import { saveServiceAction } from './actions';

interface ServiceFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    sortOrder: number;
    imageUrl?: string;
    imageAssetRef?: string;
  };
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageExisting, setImageExisting] = useState<string[]>(
    initialData?.imageUrl ? [initialData.imageUrl] : []
  );
  const [imageAssetRef, setImageAssetRef] = useState<string | undefined>(
    initialData?.imageAssetRef
  );

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setToast({ message: 'Service name is required', type: 'error' });
      return;
    }
    if (!description.trim()) {
      setToast({ message: 'Description is required', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const res = await saveServiceAction({
        id: initialData?.id,
        name,
        description,
        sortOrder,
        imageFile,
        imageAssetRef: imageExisting.length > 0 ? imageAssetRef : undefined,
      });

      if (res.success) {
        setToast({ message: 'Service saved successfully!', type: 'success' });
        setTimeout(() => {
          router.push('/admin/services');
          router.refresh();
        }, 1000);
      } else {
        setToast({ message: res.error || 'Failed to save service', type: 'error' });
      }
    } catch (err: any) {
      setToast({ message: err.message || 'An error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="admin-card p-6 space-y-6">
        <h3 className="text-base font-semibold text-white border-b border-zinc-800 pb-4">
          Service Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 admin-form-group mb-0">
            <label className="admin-label">Service Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Gender Equality and Social Inclusion (GESI)"
              className="admin-input"
            />
          </div>

          <div className="admin-form-group mb-0">
            <label className="admin-label">Sort Order (01, 02...) *</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
              required
              min={1}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group mb-0">
          <label className="admin-label">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="Describe what this service encompasses..."
            className="admin-textarea"
          />
        </div>

        <ImageDropzone
          label="Service Illustration / Cover Image"
          multiple={false}
          maxSizeBytes={3 * 1024 * 1024} // 3MB limit
          existingImages={imageExisting}
          onImagesSelected={(files) => {
            if (files.length > 0) {
              setImageFile(files[0]);
              setImageExisting([]);
            }
          }}
          onRemoveExisting={() => {
            setImageExisting([]);
            setImageAssetRef(undefined);
            setImageFile(null);
          }}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? 'Saving...' : initialData?.id ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
