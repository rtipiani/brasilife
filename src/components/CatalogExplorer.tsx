import React, { useState, useMemo, useEffect } from 'react';
import { RotateCcw, Eye, X, Plus, Send } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { MachineBlueprintIllustration } from './MachineBlueprintIllustration';
import { QuickAddToQuoteButton } from './ProductConfigurator';
import { addMultipleToQuote, addToQuote } from '../utils/quoteStore';
import { HEADER_SEARCH_EVENT } from './HeaderSearch';

export interface CatalogMachineItem {
  id: string;
  code: string;
  slug: string;
  name: string;
  titleLine1: string;
  titleLine2: string;
  series: string;
  category: string;
  muscleGroups: string[];
  usageLevel: string;
  shortDescription: string;
  specs: {
    dimensions: string;
    machineWeight: string;
    weightStackOrLoad: string;
    frameProfile: string;
  };
  featured: boolean;
  isNew: boolean;
  imageType: string;
  imageUrl?: string;
}

interface Props {
  machines: CatalogMachineItem[];
}

const MUSCLE_FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'pecho', label: 'Pecho', keywords: ['Pectoral', 'Pectorales', 'Pecho'] },
  { id: 'espalda', label: 'Espalda', keywords: ['Dorsal', 'Dorsales', 'Espalda'] },
  { id: 'pierna', label: 'Piernas y Glúteos', keywords: ['Cuádriceps', 'Glúteo', 'Glúteos', 'Isquiotibiales', 'Piernas', 'Femorales'] },
  { id: 'hombros-brazos', label: 'Hombros y Brazos', keywords: ['Deltoides', 'Hombros', 'Bíceps', 'Tríceps', 'Brazos'] },
];

export function CatalogExplorer({ machines }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [quickViewMachine, setQuickViewMachine] = useState<CatalogMachineItem | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categoria');
    if (catParam && SITE_CONFIG.categories.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    }
    const qParam = params.get('q');
    if (qParam) {
      setSearchQuery(qParam);
    }

    const handleHeaderSearch = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (typeof custom.detail === 'string') {
        setSearchQuery(custom.detail);
      }
    };
    window.addEventListener(HEADER_SEARCH_EVENT, handleHeaderSearch);
    return () => window.removeEventListener(HEADER_SEARCH_EVENT, handleHeaderSearch);
  }, []);

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      if (selectedCategory !== 'all' && m.category !== selectedCategory) {
        return false;
      }

      if (selectedMuscle !== 'all') {
        const groupObj = MUSCLE_FILTERS.find((f) => f.id === selectedMuscle);
        if (groupObj?.keywords) {
          const matchesMuscle = m.muscleGroups.some((mg) =>
            groupObj.keywords!.some((kw) =>
              mg.toLowerCase().includes(kw.toLowerCase())
            )
          );
          if (!matchesMuscle) return false;
        }
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inName = m.name.toLowerCase().includes(q);
        const inCode = m.code.toLowerCase().includes(q);
        const inMuscles = m.muscleGroups.some((mg) =>
          mg.toLowerCase().includes(q)
        );
        if (!inName && !inCode && !inMuscles) {
          return false;
        }
      }

      return true;
    });
  }, [machines, selectedCategory, selectedMuscle, searchQuery]);

  const updateCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (catId === 'all') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', catId);
      }
      window.history.replaceState({}, '', url.toString());

      document.querySelectorAll('[data-nav-cat]').forEach((el) => {
        const navCat = el.getAttribute('data-nav-cat');
        if (navCat === catId) {
          el.classList.add('bg-orange-600', 'text-white', 'font-semibold');
          el.classList.remove('hover:text-orange-400', 'bg-zinc-900', 'text-zinc-200');
        } else {
          el.classList.remove('bg-orange-600', 'text-white', 'font-semibold');
        }
      });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    updateCategory('all');
    setSelectedMuscle('all');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('q');
      window.history.replaceState({}, '', url.toString());
      window.dispatchEvent(new CustomEvent('brasilife:search-sync', { detail: '' }));
    }
  };

  const activeCategoryName =
    selectedCategory === 'all'
      ? 'CATÁLOGO COMPLETO DE EQUIPOS'
      : SITE_CONFIG.categories
          .find((c) => c.id === selectedCategory)
          ?.shortName.toUpperCase() || 'EQUIPOS';

  const handleAddFilteredCategory = () => {
    addMultipleToQuote(
      filteredMachines.map((m) => ({
        id: m.id,
        code: m.code,
        slug: m.slug,
        name: m.name,
        category: m.category,
        imageUrl: m.imageUrl,
      })),
      true
    );
  };

  return (
    <div className="space-y-6">
      {/* Brochure-Styled White Catalog Sheet */}
      {filteredMachines.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
          <p className="text-sm sm:text-base font-semibold text-zinc-900">
            Sin resultados para este filtro
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-orange-600 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Ver todas las máquinas
          </button>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-3.5 sm:p-8 shadow-md">
          {/* Clean Header Banner */}
          <div className="relative mb-5 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-zinc-900 px-4 sm:px-5 py-3 sm:py-3.5 text-white border-l-6 sm:border-l-8 border-orange-600">
            <div>
              <span className="block text-[9px] sm:text-[10px] font-medium uppercase tracking-widest text-orange-400">
                Catálogo de Equipos ({filteredMachines.length})
              </span>
              <h2 className="font-display text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-white">
                {activeCategoryName}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleAddFilteredCategory}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-zinc-950 shadow-xs hover:bg-orange-50 transition cursor-pointer self-start sm:self-center"
            >
              <Plus className="h-3.5 w-3.5 text-orange-600" />
              <span>Cotizar esta línea ({filteredMachines.length})</span>
            </button>
          </div>

          {/* Brochure Studio Grid on Pure White */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredMachines.map((machine) => (
              <article
                key={machine.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-4 transition duration-300 hover:border-orange-400 hover:shadow-lg"
              >
                {/* Studio Image on White + Quick View Trigger */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white p-2">
                  <a
                    href={`/catalogo/${machine.slug}`}
                    className="block h-full w-full"
                  >
                    <MachineBlueprintIllustration
                      imageType={machine.imageType}
                      code={machine.code}
                      imageUrl={machine.imageUrl}
                      className="h-full w-full transition duration-300 group-hover:scale-105"
                    />
                  </a>

                  <span className="absolute top-2 left-2 rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                    {machine.code}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuickViewMachine(machine)}
                    className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-zinc-900/85 px-2.5 py-1 text-[10px] font-medium text-white opacity-90 hover:bg-orange-600 transition cursor-pointer"
                    title="Vista rápida de especificaciones"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Vista rápida</span>
                  </button>
                </div>

                {/* Brochure Two-Tone Centered Label (Compact Title + Short Description + Prominent Buttons) */}
                <div className="pt-3 text-center flex flex-1 flex-col justify-between">
                  <div className="px-1">
                    <a
                      href={`/catalogo/${machine.slug}`}
                      className="inline-block font-display text-sm sm:text-base font-bold uppercase tracking-wide leading-snug group-hover:opacity-90"
                    >
                      <span className="text-zinc-800">{machine.titleLine1}</span>{' '}
                      <span className="text-orange-600">{machine.titleLine2}</span>
                    </a>

                    <p className="mt-1.5 text-xs font-normal text-zinc-500 line-clamp-2 leading-relaxed">
                      {machine.shortDescription}
                    </p>
                  </div>

                  {/* Buttons: Stacked on all screens so they never break */}
                  <div className="mt-3.5 pt-3 border-t border-zinc-100 flex flex-col gap-2 w-full">
                    <a
                      href={`/catalogo/${machine.slug}`}
                      className="w-full inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:border-orange-500 hover:text-orange-600 transition text-center"
                    >
                      Ver Ficha →
                    </a>

                    <QuickAddToQuoteButton
                      id={machine.id}
                      code={machine.code}
                      slug={machine.slug}
                      name={machine.name}
                      category={machine.category}
                      imageUrl={machine.imageUrl}
                      showColorDots={false}
                      className="w-full"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Quick-View Modal (Vista Rápida sin salir del catálogo) */}
      {quickViewMachine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs"
          onClick={() => setQuickViewMachine(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-zinc-950 px-5 py-4 text-white border-b-4 border-orange-600">
              <div>
                <span className="font-mono text-[11px] text-orange-400">
                  {quickViewMachine.code} · {quickViewMachine.series}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide">
                  <span>{quickViewMachine.titleLine1}</span>{' '}
                  <span className="text-orange-500">{quickViewMachine.titleLine2}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuickViewMachine(null)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
                aria-label="Cerrar vista rápida"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-5 sm:p-6 items-center">
              <div className="sm:col-span-5 aspect-square rounded-2xl border border-zinc-100 bg-white p-3 flex items-center justify-center">
                <MachineBlueprintIllustration
                  imageType={quickViewMachine.imageType}
                  code={quickViewMachine.code}
                  imageUrl={quickViewMachine.imageUrl}
                  className="h-full w-full"
                />
              </div>

              <div className="sm:col-span-7 space-y-4">
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {quickViewMachine.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-zinc-50 p-2.5 border border-zinc-100">
                    <span className="block text-[10px] uppercase text-zinc-400">Dimensiones</span>
                    <strong className="text-zinc-900">{quickViewMachine.specs.dimensions}</strong>
                  </div>
                  <div className="rounded-xl bg-zinc-50 p-2.5 border border-zinc-100">
                    <span className="block text-[10px] uppercase text-zinc-400">Peso / Carga</span>
                    <strong className="text-orange-600">{quickViewMachine.specs.machineWeight} · {quickViewMachine.specs.weightStackOrLoad}</strong>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToQuote(
                        {
                          id: quickViewMachine.id,
                          code: quickViewMachine.code,
                          slug: quickViewMachine.slug,
                          name: quickViewMachine.name,
                          category: quickViewMachine.category,
                          imageUrl: quickViewMachine.imageUrl,
                        },
                        1,
                        false
                      );
                      setQuickViewMachine(null);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar a mi lista de cotización</span>
                  </button>

                  <a
                    href={`/catalogo/${quickViewMachine.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 transition"
                  >
                    Ficha completa →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
