'use client';

import React, { useState } from 'react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  tags,
  onChange,
  placeholder = 'Type tag and press Enter...',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputValue.trim().replace(/^,/, '').replace(/,$/, '');
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="admin-form-group">
      <label className="admin-label">{label}</label>
      <div className="tag-input-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag-chip">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="tag-chip-remove"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : 'Add tag...'}
          className="tag-input-field"
        />
      </div>
      <p className="text-xs text-zinc-500 mt-1">Press Enter or comma to add a tag</p>
    </div>
  );
}
