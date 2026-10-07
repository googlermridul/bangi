import React from 'react';

interface SearchBoxProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isLoading: boolean;
}

export function SearchBox({ query, setQuery, onSearch, isLoading }: SearchBoxProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., best 5G phone under 25k bdt"
        disabled={isLoading}
        className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white font-semibold rounded-xl transition-colors"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export function ExampleChips({ onChipClick }: { onChipClick: (q: string) => void }) {
  const examples = [
    "best 5G phone under 25k bdt",
    "gaming phone with 5g below $400",
    "noise cancelling earbuds under 5000 taka"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
      {examples.map((text) => (
        <button
          key={text}
          onClick={() => onChipClick(text)}
          className="px-3 py-1 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {text}
        </button>
      ))}
    </div>
  );
}
