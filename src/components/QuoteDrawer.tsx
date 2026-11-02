import React, { useEffect, useState } from 'react';
import {
  ClipboardList,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Mail,
  Check,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  type QuoteItem,
  getQuoteItems,
  updateQuoteItemQuantity,
  addMultipleToQuote,
  removeQuoteItem,
  clearQuote,
  QUOTE_UPDATED_EVENT,
  QUOTE_DRAWER_OPEN_EVENT,
} from '../utils/quoteStore';
import { SITE_CONFIG } from '../config/site';

const STARTER_PACK_ITEMS: Omit<QuoteItem, 'quantity'>[] = [
  {
    id: 'br-ts-01',
    code: 'BR-TS01',
    slug: 'press-inclinado-olimpico',
    name: 'Press Inclinado Olímpico',
    category: 'tren-superior',
    imageUrl: '/tren-superior/1.jpg',
  },
  {
    id: 'br-ti-08',
    code: 'BR-TI08',
    slug: 'prensa-olimpica-45',
    name: 'Prensa Olímpica 45°',
    category: 'tren-inferior',
    imageUrl: '/tren-inferior/8.jpg',
  },
  {
    id: 'br-mf-06',
    code: 'BR-MF06',
    slug: 'crossover-smith-multifuncional',
    name: 'Crossover Smith Multifuncional',
    category: 'multifuncionales',
    imageUrl: '/multifuncionales/6.jpg',
  },
  {
    id: 'br-ca-03',
    code: 'BR-CA03',
    slug: 'trotadora-mecanica-profesional',
    name: 'Trotadora Mecánica Profesional (Curva)',
    category: 'cardio',
    imageUrl: '/cardio/3.jpg',
  },
];

export function QuoteHeaderTrigger() {
  const [items, setItems] = useState<QuoteItem[]>([]);

  useEffect(() => {
    setItems(getQuoteItems());
    const handleUpdate = () => setItems(getQuoteItems());
    window.addEventListener(QUOTE_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(QUOTE_UPDATED_EVENT, handleUpdate);
  }, []);

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(QUOTE_DRAWER_OPEN_EVENT))}
      className="relative inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs ring-1 ring-orange-500/40 transition hover:bg-orange-600 focus:outline-none cursor-pointer"
      aria-label="Abrir lista de cotización"
    >
      <ClipboardList className="h-4 w-4 text-orange-400 shrink-0" />
      <span className="hidden sm:inline">Mi Cotización</span>
      <span className="sm:hidden">Cotizar</span>
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition ${
          totalUnits > 0
            ? 'bg-orange-600 text-white'
            : 'bg-zinc-800 text-zinc-300'
        }`}
      >
        {totalUnits}
      </span>
    </button>
  );
}

export function QuoteDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [city, setCity] = useState('');
  const [projectType, setProjectType] = useState('Gimnasio Comercial');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setItems(getQuoteItems());

    const handleUpdate = () => setItems(getQuoteItems());
    const handleOpen = () => setIsOpen(true);

    window.addEventListener(QUOTE_UPDATED_EVENT, handleUpdate);
    window.addEventListener(QUOTE_DRAWER_OPEN_EVENT, handleOpen);

    return () => {
      window.removeEventListener(QUOTE_UPDATED_EVENT, handleUpdate);
      window.removeEventListener(QUOTE_DRAWER_OPEN_EVENT, handleOpen);
    };
  }, []);

  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);

  const buildQuoteMessage = () => {
    const lines: string[] = [
      `Hola equipo *${SITE_CONFIG.name}*, deseo cotizar los siguientes equipos seleccionados en la web:`,
      '',
      `*LISTA DE EQUIPOS (${totalUnits} ${totalUnits === 1 ? 'unidad' : 'unidades'}):*`,
    ];

    items.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. *[${item.code}] ${item.name}* — Cantidad: *${item.quantity}*`
      );
    });

    if (contactName.trim() || companyName.trim() || city.trim() || notes.trim()) {
      lines.push('');
      lines.push('*DATOS DE CONTACTO:*');
      if (contactName.trim()) lines.push(`• Nombre: ${contactName.trim()}`);
      if (companyName.trim()) lines.push(`• Gimnasio / Empresa: ${companyName.trim()}`);
      lines.push(`• Proyecto: ${projectType}`);
      if (city.trim()) lines.push(`• Ciudad / Provincia: ${city.trim()}`);
      if (notes.trim()) lines.push(`• Consulta / Color deseado: ${notes.trim()}`);
    }

    return lines.join('\n');
  };

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const text = encodeURIComponent(buildQuoteMessage());
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSendEmail = () => {
    if (items.length === 0) return;
    const subject = encodeURIComponent(
      `Cotización Brasilife Fitness - ${companyName || contactName || 'Equipamiento'} (${totalUnits} equipos)`
    );
    const body = encodeURIComponent(buildQuoteMessage().replace(/\*/g, ''));
    window.location.href = `mailto:${SITE_CONFIG.salesEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = async () => {
    if (items.length === 0) return;
    try {
      await navigator.clipboard.writeText(buildQuoteMessage().replace(/\*/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Floating Bottom Bar: Allows Reviewing List OR Sending Directly to WhatsApp */}
      {totalUnits > 0 && !isOpen && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-2xl bg-zinc-950 p-2 text-white shadow-2xl ring-2 ring-orange-500">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex-1 sm:flex-initial flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-zinc-900 cursor-pointer"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-orange-400 font-bold text-sm">
              {totalUnits}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                Tu Lista de Cotización
              </p>
              <p className="text-xs font-semibold text-white">
                Ver / editar equipos ({items.length})
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-500 cursor-pointer shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Enviar a WhatsApp</span>
          </button>
        </div>
      )}

      {/* Slide-over Quote Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
            <div className="w-screen max-w-full sm:max-w-lg bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="relative overflow-hidden flex items-center justify-between border-b-4 border-orange-600 px-4 sm:px-6 py-4 bg-zinc-950 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      Lista de Cotización
                    </h2>
                    <p className="text-[11px] text-zinc-400">
                      Agrega todos los equipos que necesites y envía tu consulta por WhatsApp
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
                  aria-label="Cerrar cotizador"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
                {items.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 sm:p-8 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">
                        Tu lista de cotización está vacía
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
                        Haz clic en "+ Cotizar" en cualquier máquina del catálogo para ir armando tu pedido y enviarlo por WhatsApp.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => addMultipleToQuote(STARTER_PACK_ITEMS, false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Cargar Pack Base de Gimnasio (4 equipos)</span>
                      </button>

                      <a
                        href="/catalogo"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-zinc-800 transition"
                      >
                        <span>Explorar los 33 equipos</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* List of Selected Machines */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          {items.length} {items.length === 1 ? 'modelo' : 'modelos'} · {totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'}
                        </span>
                        <button
                          type="button"
                          onClick={clearQuote}
                          className="text-xs font-medium text-rose-600 hover:text-rose-700 cursor-pointer"
                        >
                          Vaciar lista
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {items.map((item, idx) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xs transition hover:border-orange-300"
                          >
                            {item.imageUrl && (
                              <a
                                href={`/catalogo/${item.slug}`}
                                className="h-14 w-14 shrink-0 rounded-xl border border-zinc-100 bg-white p-1 flex items-center justify-center"
                              >
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </a>
                            )}

                            <div className="flex-1 min-w-0">
                              <span className="inline-block rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                                {item.code}
                              </span>
                              <a
                                href={`/catalogo/${item.slug}`}
                                className="mt-0.5 block text-xs sm:text-sm font-semibold text-zinc-900 hover:text-orange-600 truncate"
                              >
                                {item.name}
                              </a>
                            </div>

                            {/* Quantity Controls + Delete */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuoteItemQuantity(idx, item.quantity - 1)
                                  }
                                  className="p-1.5 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                                  aria-label="Disminuir cantidad"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-7 text-center text-xs font-semibold text-zinc-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuoteItemQuantity(idx, item.quantity + 1)
                                  }
                                  className="p-1.5 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeQuoteItem(idx)}
                                className="rounded-lg p-1.5 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                                title="Quitar de la lista"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Optional Customer Data Form */}
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 sm:p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-600" />
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-800">
                          Datos opcionales para tu consulta
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Tu nombre (opcional)"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-orange-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Gimnasio / Empresa (opcional)"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-orange-600 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-orange-600 focus:outline-none"
                        >
                          <option value="Gimnasio Comercial">Gimnasio Comercial</option>
                          <option value="Apertura de Nuevo Gimnasio">Nuevo Gimnasio</option>
                          <option value="Renovación / Ampliación">Renovación</option>
                          <option value="Uso Residencial / Condominio">Residencial / Condominio</option>
                        </select>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Ciudad / Distrito (opcional)"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-orange-600 focus:outline-none"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="¿Algún color de estructura o consulta adicional? (opcional)"
                        className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-orange-600 focus:outline-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {items.length > 0 && (
                <div className="border-t border-zinc-200 bg-white p-4 sm:p-5 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-orange-500 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Enviar Consulta por WhatsApp ({totalUnits} {totalUnits === 1 ? 'equipo' : 'equipos'})</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="flex items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                    >
                      <Mail className="h-3.5 w-3.5 text-zinc-500" />
                      Por Correo
                    </button>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="flex items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-orange-600" />
                          <span className="text-orange-700">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <ClipboardList className="h-3.5 w-3.5 text-zinc-500" />
                          <span>Copiar Lista</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
