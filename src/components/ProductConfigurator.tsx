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
}

export function QuickAddToQuoteButton({
  id,
  code,
  slug,
  name,
  category,
  imageUrl,
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
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs ${
        added
          ? 'bg-emerald-600 text-white'
          : qtyInQuote > 0
            ? 'bg-zinc-900 text-white hover:bg-orange-600'
            : 'bg-orange-600 text-white hover:bg-orange-500'
      }`}
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
  category: string;
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
  category,
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
      {/* Left: Large Studio Machine Preview */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs">
          <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
            <span className="rounded-md bg-zinc-900 px-2.5 py-1 font-mono text-xs font-medium text-orange-400">
              {code}
            </span>
            <span className="text-xs font-medium text-zinc-400">
              Fabricación Nacional · Uso Comercial Pesado
            </span>
          </div>

          <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-white flex items-center justify-center border border-zinc-100">
            <MachineBlueprintIllustration
              imageType={imageType}
              code={code}
              imageUrl={imageUrl}
              className="w-full h-full max-h-96"
            />
          </div>
        </div>
      </div>

      {/* Right: Technical Details & Multi-Product Quote Actions */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-xs space-y-5">
          <div>
            <span className="inline-block rounded bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-700 mb-2">
              Especificaciones del Equipo
            </span>
            <h2 className="font-display text-lg sm:text-xl font-bold text-zinc-900">
              {name}
            </h2>
            {fullDescription && (
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
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
