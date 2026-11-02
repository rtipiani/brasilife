import React, { useEffect, useState } from 'react';
import { MachineBlueprintIllustration } from './MachineBlueprintIllustration';
import { QuickAddToQuoteButton } from './ProductConfigurator';

export interface SliderMachineItem {
  id: string;
  code: string;
  slug: string;
  name: string;
  titleLine1: string;
  titleLine2: string;
  series: string;
  category: string;
  muscleGroups: string[];
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
  machines: SliderMachineItem[];
}

function pickRandomNine(list: SliderMachineItem[]): SliderMachineItem[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 9);
}

export function ProductSlider({ machines }: Props) {
  const [featuredNine, setFeaturedNine] = useState<SliderMachineItem[]>([]);

  useEffect(() => {
    setFeaturedNine(pickRandomNine(machines));
  }, [machines]);

  return (
    <div className="space-y-8">
      {/* Clean Centered Header: Equipos Destacados */}
      <div className="flex items-center justify-center text-center">
        <div className="relative overflow-hidden rounded-xl bg-zinc-900 px-6 py-3 text-white shadow-sm border-b-4 border-orange-600">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
            Equipos <span className="text-orange-500">Destacados</span>
          </h2>
        </div>
      </div>

      {/* 3x3 Grid of 9 Random Featured Products on Every Page Reload */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]">
        {featuredNine.map((machine) => (
          <article
            key={machine.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            {/* White Studio Machine Photo */}
            <a
              href={`/catalogo/${machine.slug}`}
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-white p-3"
            >
              <MachineBlueprintIllustration
                imageType={machine.imageType}
                code={machine.code}
                imageUrl={machine.imageUrl}
                className="h-full w-full transition duration-300 group-hover:scale-105"
              />

              <span className="absolute top-2.5 right-2.5 rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                {machine.code}
              </span>
            </a>

            {/* Two-Tone Brochure Label (Compact Title + Short Description + Prominent Buttons) */}
            <div className="flex flex-1 flex-col justify-between border-t border-zinc-100 bg-white pt-3.5">
              <div className="text-center px-1">
                <a
                  href={`/catalogo/${machine.slug}`}
                  className="inline-block font-display text-sm sm:text-base font-bold uppercase tracking-wide leading-snug hover:opacity-85 transition"
                >
                  <span className="text-zinc-800">{machine.titleLine1}</span>{' '}
                  <span className="text-orange-600">{machine.titleLine2}</span>
                </a>

                <p className="mt-1.5 text-xs font-normal text-zinc-500 line-clamp-2 leading-relaxed">
                  {machine.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2.5 relative z-20">
                <a
                  href={`/catalogo/${machine.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:border-orange-500 hover:text-orange-600 transition"
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
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
