'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageDropzone from '../components/ImageDropzone';
import TagInput from '../components/TagInput';
import ListInput from '../components/ListInput';
import Toast from '../components/Toast';
import { saveProjectAction } from './actions';

interface ProjectFormProps {
  initialData?: {
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
    mainImageUrl?: string;
    mainImageAssetRef?: string;
    galleryImageUrls?: string[];
    galleryImageAssetRefs?: string[];
  };
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [sector, setSector] = useState(initialData?.sector || '');
  const [focus, setFocus] = useState<string[]>(initialData?.focus || []);
  const [overview, setOverview] = useState(initialData?.overview || '');
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || ['']);
  const [deliverables, setDeliverables] = useState<string[]>(initialData?.deliverables || ['']);
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 0);

  // Main Image state
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImageExisting, setMainImageExisting] = useState<string[]>(
    initialData?.mainImageUrl ? [initialData.mainImageUrl] : []
  );
  const [mainImageAssetRef, setMainImageAssetRef] = useState<string | undefined>(
    initialData?.mainImageAssetRef
  );

  // Gallery Images state
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [galleryExisting, setGalleryExisting] = useState<string[]>(
    initialData?.galleryImageUrls || []
  );
  const [galleryAssetRefs, setGalleryAssetRefs] = useState<string[]>(
    initialData?.galleryImageAssetRefs || []
  );

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialData) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return;
    }
    if (!mainImageFile && mainImageExisting.length === 0) {
      setToast({ message: 'Main image is required', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const res = await saveProjectAction({
        id: initialData?.id,
        title,
        slug,
        subtitle,
        sector,
        focus,
        overview,
        highlights: highlights.filter((h) => h.trim().length > 0),
        deliverables: deliverables.filter((d) => d.trim().length > 0),
        sortOrder,
        mainImageFile,
        mainImageAssetRef: mainImageExisting.length > 0 ? mainImageAssetRef : undefined,
        galleryImageFiles,
        galleryImageAssetRefs: galleryAssetRefs,
      });

      if (res.success) {
        setToast({ message: 'Project saved successfully!', type: 'success' });
        setTimeout(() => {
          router.push('/admin/projects');
          router.refresh();
        }, 1000);
      } else {
        setToast({ message: res.error || 'Failed to save project', type: 'error' });
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
          Basic Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-form-group mb-0">
            <label className="admin-label">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="e.g. ELiDA Advocacy Campaign"
              className="admin-input"
            />
          </div>

          <div className="admin-form-group mb-0">
            <label className="admin-label">URL Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="elida-advocacy-campaign"
              className="admin-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-form-group mb-0">
            <label className="admin-label">Subtitle *</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              placeholder="e.g. Strategic Communications & Advocacy"
              className="admin-input"
            />
          </div>

          <div className="admin-form-group mb-0">
            <label className="admin-label">Sector / Category *</label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              required
              placeholder="e.g. Advocacy & Public Engagement"
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group mb-0">
          <label className="admin-label">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
            className="admin-input"
            placeholder="0"
          />
          <p className="text-xs text-zinc-500 mt-1">Lower numbers appear first on the listing page.</p>
        </div>

        <TagInput
          label="Focus Areas / Tags *"
          tags={focus}
          onChange={setFocus}
          placeholder="Add tag (e.g. Strategic Communications)..."
        />

        <div className="admin-form-group mb-0">
          <label className="admin-label">Overview *</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            rows={4}
            placeholder="Enter project summary..."
            className="admin-textarea"
          />
        </div>
      </div>

      {/* Image Uploads */}
      <div className="admin-card p-6 space-y-6">
        <h3 className="text-base font-semibold text-white border-b border-zinc-800 pb-4">
          Project Media
        </h3>

        <ImageDropzone
          label="Main Image *"
          multiple={false}
          maxSizeBytes={3 * 1024 * 1024} // 3MB limit
          existingImages={mainImageExisting}
          onImagesSelected={(files) => {
            if (files.length > 0) {
              setMainImageFile(files[0]);
              setMainImageExisting([]); // Replace existing preview
            }
          }}
          onRemoveExisting={() => {
            setMainImageExisting([]);
            setMainImageAssetRef(undefined);
            setMainImageFile(null);
          }}
        />

        <ImageDropzone
          label="Gallery Images"
          multiple={true}
          maxSizeBytes={3 * 1024 * 1024} // 3MB limit
          existingImages={galleryExisting}
          onImagesSelected={(files) => {
            setGalleryImageFiles((prev) => [...prev, ...files]);
          }}
          onRemoveExisting={(idx) => {
            setGalleryExisting((prev) => prev.filter((_, i) => i !== idx));
            setGalleryAssetRefs((prev) => prev.filter((_, i) => i !== idx));
          }}
        />
      </div>

      {/* Structured Content */}
      <div className="admin-card p-6 space-y-6">
        <h3 className="text-base font-semibold text-white border-b border-zinc-800 pb-4">
          Highlights & Deliverables
        </h3>

        <ListInput
          label="Key Impacts & Highlights"
          items={highlights}
          onChange={setHighlights}
          multiline={true}
          placeholder="Describe a key outcome or highlight..."
        />

        <ListInput
          label="What We Delivered"
          items={deliverables}
          onChange={setDeliverables}
          multiline={false}
          placeholder="Deliverable item (e.g. Rebranding Strategy)..."
        />
      </div>

      {/* Submit Controls */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? 'Saving to Sanity...' : initialData?.id ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
