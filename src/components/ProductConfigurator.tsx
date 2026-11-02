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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
      {/* Left: Clean Studio Machine Preview (Uncluttered) */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-3 sm:p-6 shadow-2xs">
          <div className="relative aspect-square sm:aspect-16/11 w-full overflow-hidden rounded-xl bg-white flex items-center justify-center">
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
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-2xs space-y-4">
          {fullDescription && (
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-orange-600 mb-1">
                Descripción del Equipo
              </span>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {fullDescription}
              </p>
            </div>
          )}

          {highlights.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-zinc-100">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Características principales:
              </span>
              <ul className="space-y-1.5">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                    <CheckCircle2 className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Add to Quote List / Send to WhatsApp */}
          <div className="pt-3 border-t border-zinc-100 space-y-2.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="inline-flex items-center justify-between sm:justify-center rounded-full border border-zinc-200 bg-zinc-50 px-3 sm:px-2 py-1">
                <span className="sm:hidden text-xs font-medium text-zinc-500 pl-2">
                  Cantidad:
                </span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-8 w-8 rounded-full text-sm font-medium text-zinc-700 hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-zinc-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-8 w-8 rounded-full text-sm font-medium text-zinc-700 hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddConfigured}
                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs transition cursor-pointer ${
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

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-emerald-500 transition cursor-pointer"
            >
              <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.86 11.86 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              <span>Cotizar este equipo por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
