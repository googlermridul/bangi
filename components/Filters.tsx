import React from 'react';
import { SearchFilters } from '@/lib/api';

export function FilterTags({ filters }: { filters: SearchFilters }) {
  const tags: { label: string; value: string | null }[] = [
    { label: 'Category', value: filters.category },
    { label: 'Max Price', value: filters.max_price ? `${filters.max_price} ${filters.currency || ''}` : null },
    { label: 'Brand', value: filters.brand },
  ];

  const activeTags = tags.filter(t => t.value !== null && t.value !== '');

  if (activeTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center text-sm text-zinc-600 dark:text-zinc-400">
      <span className="font-medium mr-1">Understood as:</span>
      {activeTags.map(t => (
        <span key={t.label} className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <span className="opacity-60 mr-1">{t.label}:</span> {t.value}
        </span>
      ))}
    </div>
  );
}
