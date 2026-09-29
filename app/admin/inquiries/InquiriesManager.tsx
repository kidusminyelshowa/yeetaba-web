'use client';

import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';
import { deleteInquiryAction, setInquiryStatusAction, type InquiryStatus } from './actions';

interface InquiryListItem {
  _id: string;
  name: string;
  email: string;
  organization?: string;
  service: string;
  message: string;
  status?: InquiryStatus;
  submittedAt: string;
}

type Filter = 'all' | InquiryStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
];

function formatDate(iso: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function InquiriesManager({ inquiries }: { inquiries: InquiryListItem[] }) {
  const [items, setItems] = useState(inquiries);
  const [filter, setFilter] = useState<Filter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setItems(inquiries);
  }, [inquiries]);

  const statusOf = (item: InquiryListItem): InquiryStatus => item.status ?? 'new';

  const visible = filter === 'all'
    ? items.filter((i) => statusOf(i) !== 'archived')
    : items.filter((i) => statusOf(i) === filter);

  const counts = {
    all: items.filter((i) => statusOf(i) !== 'archived').length,
    new: items.filter((i) => statusOf(i) === 'new').length,
    read: items.filter((i) => statusOf(i) === 'read').length,
    archived: items.filter((i) => statusOf(i) === 'archived').length,
  };

  const updateStatus = async (id: string, status: InquiryStatus, silent = false) => {
    setBusyId(id);
    try {
      const res = await setInquiryStatusAction(id, status);
      if (res.success) {
        setItems((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
        if (!silent) setToast({ message: `Marked as ${status}`, type: 'success' });
      } else {
        setToast({ message: res.error || 'Failed to update inquiry', type: 'error' });
      }
    } catch (e: any) {
      setToast({ message: e.message || 'An error occurred', type: 'error' });
    } finally {
      setBusyId(null);
    }
  };

  const toggleExpand = (item: InquiryListItem) => {
    const opening = expandedId !== item._id;
    setExpandedId(opening ? item._id : null);
    if (opening && statusOf(item) === 'new') {
      updateStatus(item._id, 'read', true);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Permanently delete the inquiry from "${name}"?`)) return;

    setBusyId(id);
    try {
      const res = await deleteInquiryAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i._id !== id));
        setToast({ message: 'Inquiry deleted', type: 'success' });
      } else {
        setToast({ message: res.error || 'Failed to delete inquiry', type: 'error' });
      }
    } catch (e: any) {
      setToast({ message: e.message || 'An error occurred', type: 'error' });
    } finally {
      setBusyId(null);
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

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`admin-btn py-1 px-3 text-xs ${filter === f.value ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
          >
            {f.label} ({counts[f.value]})
          </button>
        ))}
      </div>

      <div className="admin-card">
        {visible.length === 0 ? (
          <div className="p-12 text-center text-zinc-400">
            <p>{items.length === 0 ? 'No inquiries yet.' : 'No inquiries in this view.'}</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-20">Status</th>
                <th>From</th>
                <th>Service</th>
                <th>Received</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => {
                const status = statusOf(item);
                const expanded = expandedId === item._id;
                const busy = busyId === item._id;

                return (
                  <React.Fragment key={item._id}>
                    <tr className="cursor-pointer" onClick={() => toggleExpand(item)}>
                      <td>
                        <span className={`admin-badge ${status === 'new' ? 'admin-badge-green' : ''}`}>
                          {status}
                        </span>
                      </td>
                      <td>
                        <div className={status === 'new' ? 'font-semibold text-white' : 'text-zinc-300'}>
                          {item.name}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {item.email}
                          {item.organization ? ` · ${item.organization}` : ''}
                        </div>
                      </td>
                      <td className="text-zinc-400 text-xs max-w-xs">{item.service}</td>
                      <td className="text-zinc-400 text-xs whitespace-nowrap">{formatDate(item.submittedAt)}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">
                          <a
                            href={`mailto:${item.email}?subject=${encodeURIComponent('Re: Your inquiry to Ye Etaba Consultancy')}`}
                            className="admin-btn admin-btn-secondary py-1 px-3 text-xs"
                          >
                            Reply
                          </a>
                          {status === 'archived' ? (
                            <button
                              onClick={() => updateStatus(item._id, 'read')}
                              disabled={busy}
                              className="admin-btn admin-btn-secondary py-1 px-3 text-xs"
                            >
                              Restore
                            </button>
                          ) : (
                            <button
                              onClick={() => updateStatus(item._id, 'archived')}
                              disabled={busy}
                              className="admin-btn admin-btn-secondary py-1 px-3 text-xs"
                            >
                              Archive
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(item._id, item.name)}
                            disabled={busy}
                            className="admin-btn admin-btn-danger py-1 px-3 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded && (
                      <tr>
                        <td colSpan={5} className="bg-[#18181b]">
                          <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                            {item.message}
                          </p>
                          {status !== 'new' && (
                            <button
                              onClick={() => updateStatus(item._id, 'new')}
                              disabled={busy}
                              className="mt-4 text-xs text-zinc-500 underline hover:text-zinc-300"
                            >
                              Mark as unread
                            </button>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
