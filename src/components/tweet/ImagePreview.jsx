// components/tweet/ImagePreview.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const ImagePreview = ({ file, onRemove }) => {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file]);

  if (!preview) return null;

  return (
    <div className="relative mt-2">
      <img 
        src={preview} 
        alt="Preview" 
        className="rounded-lg max-h-96 object-contain bg-secondary"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
        aria-label="Remove image"
      >
        <X size={16} />
      </button>
    </div>
  );
};