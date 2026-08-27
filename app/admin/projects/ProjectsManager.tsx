'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Toast from '../components/Toast';
import { deleteProjectAction } from './actions';

interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  sector: string;
  imageUrl?: string;
}

export default function ProjectsManager({ projects }: { projects: ProjectListItem[] }) {
  const [items, setItems] = useState(projects);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setItems(projects);
  }, [projects]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((p) => p._id !== id));
        setToast({ message: `Project "${title}" deleted`, type: 'success' });
      } else {
        setToast({ message: res.error || 'Failed to delete project', type: 'error' });
      }
    } catch (e: any) {
      setToast({ message: e.message || 'An error occurred', type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="p-12 text-center text-zinc-400">
            <p className="mb-4">No projects found in Sanity dataset.</p>
            <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
              Create Your First Project
            </Link>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Sector</th>
                <th>Slug</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((project) => (
                <tr key={project._id}>
                  <td className="w-16">
                    {project.imageUrl ? (
                      <div className="relative w-14 h-10 rounded overflow-hidden bg-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-10 rounded bg-zinc-800 flex items-center justify-center text-xs text-zinc-600">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="font-semibold text-white">{project.title}</td>
                  <td>
                    <span className="admin-badge">{project.sector}</span>
                  </td>
                  <td className="font-mono text-xs text-zinc-400">{project.slug}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="admin-btn admin-btn-secondary py-1 px-3 text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project._id, project.title)}
                        disabled={deletingId === project._id}
                        className="admin-btn admin-btn-danger py-1 px-3 text-xs"
                      >
                        {deletingId === project._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
