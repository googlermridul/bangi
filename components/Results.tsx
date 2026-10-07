import React from 'react';
import { Product, SearchFilters } from '@/lib/api';
import { formatPrice, formatSpec } from '@/lib/format';

interface ResultCardProps {
  product: Product;
  rank: number;
  query: string;
}

export function ResultCard({ product, rank, query }: ResultCardProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const buyUrl = `${apiUrl}/go/${product.offer_id}?q=${encodeURIComponent(query)}`;

  // Get the top 5 specs based on priority
  const priorityKeys = ['network', 'ram_gb', 'storage_gb', 'battery_mah', 'camera_mp', 'display'];
  const specs = Object.entries(product.specs)
    .map(([key, value]) => ({ key, value: formatSpec(key, value) }))
    .filter(s => s.value !== null)
    .sort((a, b) => {
      const aIdx = priorityKeys.indexOf(a.key);
      const bIdx = priorityKeys.indexOf(b.key);
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    })
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded uppercase">
            #{rank} Pick
          </span>
          <span className="text-xl font-bold text-zinc-900 dark:text-white">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                }}
              />
            ) : (
              <img src="https://via.placeholder.com/100?text=No+Image" alt="Placeholder" className="w-full h-full object-contain" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-zinc-900 dark:text-white leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {product.brand} • {product.seller}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {specs.map(({ key }, i) => (
            <span key={i} className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              {Object.entries(product.specs).find(e => e[0] === key)?.[1] === true ? 'Yes' :
               formatSpec(key, product.specs[key])}
            </span>
          ))}
        </div>

        {product.reason && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 italic mb-6 leading-relaxed">
            "{product.reason}"
          </p>
        )}
      </div>

      <div className="p-5 pt-0">
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl mt-auto" />
    </div>
  );
}
