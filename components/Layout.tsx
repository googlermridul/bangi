import React from "react";

export function Header() {
   return (
      <header className="py-8 text-center">
         <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">AI Shopping</h1>
         <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">Tell us what you need. Get the best 3 picks, not 300 links.</p>
      </header>
   );
}

export function Footer() {
   return (
      <footer className="mt-auto py-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
         <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 px-4">We may earn a commission when you buy through our links. This doesn&apos;t change the price you pay.</p>
         <div className="flex justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
               Privacy
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
               Terms
            </a>
            <span>© 2026 Bangi</span>
         </div>
      </footer>
   );
}
