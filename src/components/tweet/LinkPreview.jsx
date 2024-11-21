// components/tweet/LinkPreview.jsx
import React from 'react';
import { Link } from 'lucide-react';

export const LinkPreview = ({ url }) => {
  return (
    <div className="mt-2 border rounded-lg overflow-hidden break-all">
      <div className="p-3 bg-secondary">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Link size={16} className="shrink-0" />
          <span className="text-sm truncate overflow-hidden break-all">
            {url}
          </span>
        </div>
      </div>
    </div>
  );
};