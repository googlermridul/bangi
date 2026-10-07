"use client";

import React, { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/Layout';
import { SearchBox, ExampleChips } from '@/components/Search';
import { FilterTags } from '@/components/Filters';
import { ResultCard, SkeletonCard } from '@/components/Results';
import { searchProducts, SearchResponse } from '@/lib/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // We define this as a standalone function to allow the 'Retry' button to use it
    window.triggerSearch = async (searchQuery: string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchProducts(searchQuery, controller.signal);
        setData(result);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          setError(e.message || 'Something went wrong. Please try again.');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    return () => controller.abort();
  }, []);

  // Override triggerSearch for the current render cycle
  const handleSearch = async (searchQuery: string) => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await searchProducts(searchQuery, controller.signal);
      setData(result);
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setError(e.message || 'Something went wrong. Please try again.');
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex flex-col items-center text-center mb-12">
          <SearchBox
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={loading}
          />
          <ExampleChips onChipClick={(q) => {
            setQuery(q);
            handleSearch(q);
          }} />
        </div>

        {!loading && !error && !data && (
          <div className="text-center py-20 px-4">
            <div className="mb-4 text-5xl">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">Find the best value electronics</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Search for something like "Gaming laptop under 80k" and we'll find the 3-5 best options for you.
            </p>
            <div className="mt-8 text-sm text-zinc-400 italic">
              Step 1: Type what you need &rarr; Step 2: See best picks &rarr; Step 3: Buy with confidence
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div className="text-center py-20 px-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              {error}
            </p>
            <button
              onClick={() => handleSearch(query)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FilterTags filters={data.filters} />

            {data.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {data.results.map((product, i) => (
                  <ResultCard
                    key={product.product_id}
                    product={product}
                    rank={i + 1}
                    query={data.query}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-4xl mb-4">📦</div>
                <h2 className="text-xl font-bold mb-2">No perfect matches found</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                  We couldn't find exactly what you're looking for. Try widening your budget or rephrasing your query.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <ExampleChips onChipClick={(q) => {
                    setQuery(q);
                    handleSearch(q);
                  }} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
