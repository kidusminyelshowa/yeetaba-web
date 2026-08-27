'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';
import { deleteServiceAction } from './actions';

interface ServiceListItem {
  _id: string;
  name: string;
  sortOrder: number;
  description: string;
  imageUrl?: string;
}

export default function ServicesManager({ services }: { services: ServiceListItem[] }) {
  const [items, setItems] = useState(services);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setItems(services);
  }, [services]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteServiceAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((s) => s._id !== id));
        setToast({ message: `Service "${name}" deleted`, type: 'success' });
      } else {
        setToast({ message: res.error || 'Failed to delete service', type: 'error' });
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
            <p className="mb-4">No services found in Sanity dataset.</p>
            <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
              Create Your First Service
            </Link>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-16">Order</th>
                <th className="w-16">Image</th>
                <th>Service Name</th>
                <th>Description Preview</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((service) => (
                <tr key={service._id}>
                  <td className="font-mono text-center text-[#a3c276] font-bold">
                    [{service.sortOrder.toString().padStart(2, '0')}]
                  </td>
                  <td>
                    {service.imageUrl ? (
                      <div className="relative w-12 h-10 rounded overflow-hidden bg-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-10 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-600">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="font-semibold text-white">{service.name}</td>
                  <td className="text-zinc-400 text-xs max-w-md truncate">
                    {service.description}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/services/${service._id}/edit`}
                        className="admin-btn admin-btn-secondary py-1 px-3 text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id, service.name)}
                        disabled={deletingId === service._id}
                        className="admin-btn admin-btn-danger py-1 px-3 text-xs"
                      >
                        {deletingId === service._id ? 'Deleting...' : 'Delete'}
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
