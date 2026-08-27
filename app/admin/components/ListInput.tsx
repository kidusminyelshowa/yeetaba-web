'use client';

import React from 'react';

interface ListInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
}

export default function ListInput({
  label,
  items,
  onChange,
  multiline = false,
  placeholder = 'Add new item...',
}: ListInputProps) {
  const handleItemChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="admin-form-group">
      <div className="flex justify-between items-center mb-2">
        <label className="admin-label mb-0">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="text-xs text-[#a3c276] hover:underline font-semibold"
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-xs text-zinc-500 italic p-3 border border-dashed border-zinc-800 rounded-lg text-center">
          No items added yet. Click "+ Add Item" above.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="list-input-item">
              <span className="text-xs font-mono text-zinc-500 mt-2.5 w-6">
                {(idx + 1).toString().padStart(2, '0')}
              </span>

              {multiline ? (
                <textarea
                  value={item}
                  onChange={(e) => handleItemChange(idx, e.target.value)}
                  placeholder={placeholder}
                  className="admin-textarea text-sm py-2"
                  rows={2}
                />
              ) : (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(idx, e.target.value)}
                  placeholder={placeholder}
                  className="admin-input text-sm py-2"
                />
              )}

              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                title="Remove item"
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
