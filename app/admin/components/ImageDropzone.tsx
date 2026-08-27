'use client';

import React, { useRef, useState } from 'react';

interface ImageDropzoneProps {
  label?: string;
  multiple?: boolean;
  maxSizeBytes?: number; // Default 3MB
  existingImages?: string[];
  onImagesSelected: (files: File[]) => void;
  onRemoveExisting?: (index: number) => void;
}

export default function ImageDropzone({
  label = 'Upload Image',
  multiple = false,
  maxSizeBytes = 3 * 1024 * 1024, // 3MB limit as requested by user
  existingImages = [],
  onImagesSelected,
  onRemoveExisting,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreviews, setSelectedPreviews] = useState<{ file: File; previewUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (filesList: FileList | File[]) => {
    setError(null);
    const validFiles: File[] = [];
    const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);

    Array.from(filesList).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError(`File "${file.name}" is not an image.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        setError(`File "${file.name}" exceeds the ${maxMb}MB size limit (${(file.size / (1024 * 1024)).toFixed(2)}MB).`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const newPreviews = validFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      if (multiple) {
        setSelectedPreviews((prev) => [...prev, ...newPreviews]);
        onImagesSelected(validFiles);
      } else {
        setSelectedPreviews(newPreviews);
        onImagesSelected(validFiles);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveNew = (index: number) => {
    setSelectedPreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="admin-form-group">
      {label && <label className="admin-label">{label}</label>}

      {error && (
        <div className="mb-3 p-3 text-xs bg-red-950/80 border border-red-800 text-red-300 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <div
        className={`dropzone-container ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg className="dropzone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>

        <p className="dropzone-text">
          Drag & drop your {multiple ? 'images' : 'image'} here, or <span className="text-[#a3c276] underline">browse</span>
        </p>
        <p className="dropzone-hint">PNG, JPG, WEBP, SVG up to 3MB per file</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Preview Section */}
      {(existingImages.length > 0 || selectedPreviews.length > 0) && (
        <div className="dropzone-previews">
          {/* Existing uploaded images from Sanity */}
          {existingImages.map((src, idx) => (
            <div key={`existing-${idx}`} className="dropzone-preview-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Uploaded preview" className="dropzone-preview-img" />
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(idx)}
                  className="dropzone-remove-btn"
                  title="Remove image"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Newly selected images to upload */}
          {selectedPreviews.map((item, idx) => (
            <div key={`new-${idx}`} className="dropzone-preview-card border-emerald-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.previewUrl} alt="Selected preview" className="dropzone-preview-img" />
              <button
                type="button"
                onClick={() => handleRemoveNew(idx)}
                className="dropzone-remove-btn"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
