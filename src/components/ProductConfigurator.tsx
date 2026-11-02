import React, { useState, useEffect } from 'react';
import { Plus, Check, Send, CheckCircle2, ClipboardList } from 'lucide-react';
import {
  addToQuote,
  getQuoteItems,
  openQuoteDrawer,
  QUOTE_UPDATED_EVENT,
} from '../utils/quoteStore';
import { SITE_CONFIG } from '../config/site';
import { MachineBlueprintIllustration } from './MachineBlueprintIllustration';

interface QuickAddProps {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: string;
  imageUrl?: string;
  showColorDots?: boolean;
  className?: string;
}

export function QuickAddToQuoteButton({
  id,
  code,
  slug,
  name,
  category,
  imageUrl,
  className = '',
}: QuickAddProps) {
  const [added, setAdded] = useState(false);
  const [qtyInQuote, setQtyInQuote] = useState(0);

  useEffect(() => {
    const sync = () => {
      const found = getQuoteItems().find((i) => i.id === id);
      setQtyInQuote(found ? found.quantity : 0);
    };
    sync();
    window.addEventListener(QUOTE_UPDATED_EVENT, sync);
    return () => window.removeEventListener(QUOTE_UPDATED_EVENT, sync);
  }, [id]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQuote(
      {
        id,
        code,
        slug,
        name,
        category,
        imageUrl,
      },
      1,
      false
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs ${
        added
          ? 'bg-emerald-600 text-white'
          : qtyInQuote > 0
            ? 'bg-zinc-900 text-white hover:bg-orange-600'
            : 'bg-orange-600 text-white hover:bg-orange-500'
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          <span>Agregado ({qtyInQuote})</span>
        </>
      ) : qtyInQuote > 0 ? (
        <>
          <Plus className="h-4 w-4 text-orange-400" />
          <span>En lista ({qtyInQuote})</span>
        </>
      ) : (
        <span>+ Cotizar</span>
      )}
    </button>
  );
}

interface DetailConfiguratorProps {
  id: string;
  code: string;
  slug: string;
  name: string;
  titleLine1?: string;
  titleLine2?: string;
  category: string;
  categoryName?: string;
  muscleGroups?: string[];
  imageType: string;
  imageUrl?: string;
  fullDescription?: string;
  highlights?: string[];
}

export function ProductDetailConfigurator({
  id,
  code,
  slug,
  name,
  titleLine1,
  titleLine2,
  category,
  categoryName,
  muscleGroups = [],
  imageType,
  imageUrl,
  fullDescription,
  highlights = [],
}: DetailConfiguratorProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddConfigured = () => {
    addToQuote(
      {
        id,
        code,
        slug,
        name,
        category,
        imageUrl,
      },
      quantity,
      false
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola *${SITE_CONFIG.name}*, deseo cotizar el equipo *[${code}] ${name}* (Cantidad: ${quantity}).`
    );
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Left: Clean Studio Machine Preview (Uncluttered) */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-8 shadow-xs">
          <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden rounded-xl bg-white flex items-center justify-center">
            <MachineBlueprintIllustration
              imageType={imageType}
              code={code}
              imageUrl={imageUrl}
              className="w-full h-full max-h-96 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right: Technical Details & Multi-Product Quote Actions */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-xs space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="rounded-md bg-zinc-900 px-2.5 py-1 font-mono text-xs font-semibold text-orange-400">
                {code}
              </span>
              {categoryName && (
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {categoryName}
                </span>
              )}
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
              {titleLine1 || name}{' '}
              {titleLine2 && <span className="text-orange-600">{titleLine2}</span>}
            </h1>

            {muscleGroups.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-zinc-100 border border-zinc-200/80 px-2.5 py-0.5 text-xs font-medium text-zinc-700"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            )}

            {fullDescription && (
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {fullDescription}
              </p>
            )}
          </div>

          {highlights.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Características principales:
              </span>
              <ul className="space-y-2">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Add to Quote List / Send to WhatsApp */}
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="inline-flex items-center justify-between sm:justify-center rounded-full border border-zinc-200 bg-zinc-50 px-3 sm:px-2 py-1">
                <span className="sm:hidden text-xs font-medium text-zinc-500 pl-2">
                  Cantidad:
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 rounded-full text-sm font-medium text-zinc-700 hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-zinc-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 rounded-full text-sm font-medium text-zinc-700 hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddConfigured}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600'
                    : 'bg-zinc-950 hover:bg-orange-600'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>¡Agregado a tu lista!</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 text-orange-400 shrink-0" />
                    <span>Agregar a mi lista</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={openQuoteDrawer}
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-100 cursor-pointer"
              >
                <ClipboardList className="h-4 w-4 text-orange-600 shrink-0" />
                <span>Ver mi lista de equipos</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="flex items-center justify-center gap-2 rounded-full bg-orange-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-500 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 shrink-0" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
