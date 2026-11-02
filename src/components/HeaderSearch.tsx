import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import machines from '../data/machines.json';

export const HEADER_SEARCH_EVENT = 'brasilife:search';

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    if (q) setQuery(q);

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (typeof custom.detail === 'string') {
        setQuery(custom.detail);
      }
    };
    window.addEventListener('brasilife:search-sync', handleSync);
    return () => window.removeEventListener('brasilife:search-sync', handleSync);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    setIsOpen(val.trim().length > 0);
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/catalogo')) {
      const url = new URL(window.location.href);
      if (val.trim()) {
        url.searchParams.set('q', val);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url.toString());
      window.dispatchEvent(new CustomEvent(HEADER_SEARCH_EVENT, { detail: val }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (typeof window === 'undefined') return;
    if (window.location.pathname === '/catalogo' || window.location.pathname === '/catalogo/') {
      window.dispatchEvent(new CustomEvent(HEADER_SEARCH_EVENT, { detail: query }));
    } else {
      const target = query.trim()
        ? `/catalogo?q=${encodeURIComponent(query.trim())}`
        : '/catalogo';
      window.location.href = target;
    }
  };

  const results =
    query.trim().length > 0
      ? machines
          .filter((m) => {
            const q = query.toLowerCase().trim();
            return (
              m.name.toLowerCase().includes(q) ||
              m.code.toLowerCase().includes(q) ||
              m.muscleGroups.some((mg) => mg.toLowerCase().includes(q))
            );
          })
          .slice(0, 6)
      : [];

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative flex h-10 sm:h-11 items-stretch overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-white/15 focus-within:ring-2 focus-within:ring-orange-500 transition"
      >
        <input
          type="text"
          value={query}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Buscar equipo o código..."
          className="w-full bg-transparent pl-4 pr-2 text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleChange('')}
            className="self-center mr-1.5 rounded-full p-1 text-zinc-400 hover:bg-zinc-200/70 hover:text-zinc-700 cursor-pointer"
            aria-label="Borrar búsqueda"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Buscar"
          className="shrink-0 inline-flex h-full px-5 items-center justify-center bg-orange-600 text-white transition hover:bg-orange-500 cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl divide-y divide-zinc-100">
          {results.map((item) => (
            <a
              key={item.id}
              href={`/catalogo/${item.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-orange-50/60 transition"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-10 w-10 rounded-lg border border-zinc-100 bg-white object-contain p-1 shrink-0"
              />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-bold text-zinc-900 truncate">
                  {item.titleLine1}{' '}
                  <span className="text-orange-600">{item.titleLine2}</span>
                </p>
                <p className="text-[11px] text-zinc-500 truncate">
                  {item.code} · {item.muscleGroups.slice(0, 2).join(' · ')}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-orange-600 shrink-0">
                Ver →
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

