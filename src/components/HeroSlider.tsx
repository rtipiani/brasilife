import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface Slide {
  id: string;
  ribbonText: string;
  subRibbonText: string;
  cardBadgeText: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaWhatsappMsg: string;
  bgImage: string;
  previewMachines: {
    name1: string;
    name2: string;
    img: string;
    href: string;
  }[];
}

const SLIDES: Slide[] = [
  {
    id: 'portada-catalogo',
    ribbonText: 'CATÁLOGO OFICIAL',
    subRibbonText: '33 EQUIPOS DE GIMNASIO',
    cardBadgeText: 'Destacados del Catálogo',
    titleLine1: 'Equipamiento profesional',
    titleHighlight: 'para gimnasios en Perú',
    subtitle:
      'Fabricación directa de máquinas de fuerza y cardio comercial: Tren Superior, Tren Inferior, Multifuncionales, Cardio Profesional, Mancuernas, Bancos y Discos Olímpicos.',
    ctaPrimaryText: 'Explorar los 33 Equipos',
    ctaPrimaryHref: '/catalogo',
    ctaWhatsappMsg:
      'Hola Brasilife Fitness, vi su Catálogo de Equipos en la web y deseo solicitar una cotización.',
    bgImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    previewMachines: [
      {
        name1: 'PRESS',
        name2: 'INCLINADO',
        img: '/tren-superior/1.jpg',
        href: '/catalogo/press-inclinado-olimpico',
      },
      {
        name1: 'PRENSA',
        name2: 'OLÍMPICA',
        img: '/tren-inferior/8.jpg',
        href: '/catalogo/prensa-olimpica-45',
      },
      {
        name1: 'CROSSOVER',
        name2: 'SMITH',
        img: '/multifuncionales/6.jpg',
        href: '/catalogo/crossover-smith-multifuncional',
      },
      {
        name1: 'TROTADORA',
        name2: 'MECÁNICA',
        img: '/cardio/3.jpg',
        href: '/catalogo/trotadora-mecanica-profesional',
      },
    ],
  },
  {
    id: 'tren-superior',
    ribbonText: 'TREN SUPERIOR',
    subRibbonText: '9 MÁQUINAS OFICIALES',
    cardBadgeText: 'Línea Tren Superior',
    titleLine1: 'Bancos Olímpicos,',
    titleHighlight: 'Poleas y Jaulas',
    subtitle:
      'Press Inclinado, Banco Plano, Banco Declinado, Polea Baja, Jaula de Potencia, Polea Alta, Rack de Sentadillas, Banco Scoth y Fondos Paralelas.',
    ctaPrimaryText: 'Ver Tren Superior (9)',
    ctaPrimaryHref: '/catalogo?categoria=tren-superior',
    ctaWhatsappMsg:
      'Hola Brasilife Fitness, deseo cotizar las máquinas de la línea *Tren Superior* del catálogo.',
    bgImage:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1800&q=85',
    previewMachines: [
      {
        name1: 'BANCO',
        name2: 'PLANO',
        img: '/tren-superior/2.jpg',
        href: '/catalogo/banco-plano-olimpico',
      },
      {
        name1: 'JAULA DE',
        name2: 'POTENCIA',
        img: '/tren-superior/5.jpg',
        href: '/catalogo/jaula-de-potencia-profesional',
      },
      {
        name1: 'POLEA',
        name2: 'ALTA',
        img: '/tren-superior/6.jpg',
        href: '/catalogo/polea-alta-dorsalera',
      },
      {
        name1: 'RACK DE',
        name2: 'SENTADILLAS',
        img: '/tren-superior/7.jpg',
        href: '/catalogo/rack-de-sentadillas-olimpico',
      },
    ],
  },
  {
    id: 'tren-inferior',
    ribbonText: 'TREN INFERIOR',
    subRibbonText: '9 MÁQUINAS DE PIERNAS',
    cardBadgeText: 'Línea Tren Inferior',
    titleLine1: 'Prensas, Péndulo,',
    titleHighlight: 'Hack y Glúteos',
    subtitle:
      'Extensiones Cuádriceps, Patada de Glúteos, Curt Femorales, Super Péndulo, Hip Trust, Abductor Dual, Pantorrillera Sentado, Prensa Olímpica y Hack Olímpica.',
    ctaPrimaryText: 'Ver Tren Inferior (9)',
    ctaPrimaryHref: '/catalogo?categoria=tren-inferior',
    ctaWhatsappMsg:
      'Hola Brasilife Fitness, deseo cotizar las máquinas de la línea *Tren Inferior* del catálogo.',
    bgImage:
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1800&q=85',
    previewMachines: [
      {
        name1: 'EXTENSIONES',
        name2: 'CUÁDRICEPS',
        img: '/tren-inferior/1.jpg',
        href: '/catalogo/extensiones-cuadriceps',
      },
      {
        name1: 'SUPER',
        name2: 'PÉNDULO',
        img: '/tren-inferior/4.jpg',
        href: '/catalogo/super-pendulo-sentadilla',
      },
      {
        name1: 'HIP',
        name2: 'TRUST',
        img: '/tren-inferior/5.jpg',
        href: '/catalogo/hip-trust-gluteos',
      },
      {
        name1: 'HACK',
        name2: 'OLÍMPICA',
        img: '/tren-inferior/9.jpg',
        href: '/catalogo/hack-olimpica-45',
      },
    ],
  },
  {
    id: 'multifuncionales-cardio',
    ribbonText: 'MULTIFUNCIONALES & CARDIO',
    subRibbonText: 'CROSSOVERS, SMITH Y PESO LIBRE',
    cardBadgeText: 'Multifuncionales y Cardio',
    titleLine1: 'Crossovers, Smith,',
    titleHighlight: 'Cardio y Discos',
    subtitle:
      'Polea Dual Alta & Baja, Crossover Compacta, Press de Pecho 4 en 1, Sentadillas Mixta + Búlgaras, Smith Olímpica, Trotadoras, Spinning, Mancuernas y Discos.',
    ctaPrimaryText: 'Ver Multifuncionales (7)',
    ctaPrimaryHref: '/catalogo?categoria=multifuncionales',
    ctaWhatsappMsg:
      'Hola Brasilife Fitness, deseo cotizar equipos *Multifuncionales, Cardio y Accesorios* del catálogo.',
    bgImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85',
    previewMachines: [
      {
        name1: 'CROSSOVER',
        name2: 'COMPACTA',
        img: '/multifuncionales/2.jpg',
        href: '/catalogo/crossover-compacta-multifunciones',
      },
      {
        name1: 'SMITH',
        name2: 'OLÍMPICA',
        img: '/multifuncionales/5.jpg',
        href: '/catalogo/smith-olimpica-profesional',
      },
      {
        name1: 'TROTADORA',
        name2: 'ELECTRÓNICA',
        img: '/cardio/4.jpg',
        href: '/catalogo/trotadora-electronica-profesional',
      },
      {
        name1: 'MANCUERNAS',
        name2: 'RACK & BARRAS',
        img: '/accesorios/1.jpg',
        href: '/catalogo/mancuernas-rack-y-barras',
      },
    ],
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full min-h-0 lg:h-[calc(100vh-8.5rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 text-zinc-900 select-none border-b border-zinc-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle Studio Gym Backdrop with Soft White Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.bgImage}
          alt="Catálogo de Equipos Brasilife Fitness"
          className="h-full w-full object-cover object-center opacity-[0.06] grayscale transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-zinc-50/85" />
      </div>

      {/* Main Content Container scaled with vh on desktop, fluid on mobile */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 py-6 sm:py-8 lg:py-[3.5vh] sm:px-6 lg:px-8">
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Clean Category Badge, Headline & Direct CTAs */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-[2.4vh]">
            <div className="inline-flex max-w-full items-center overflow-hidden rounded-lg shadow-xs">
              <span className="bg-orange-600 px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-display text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-white uppercase whitespace-nowrap">
                {slide.ribbonText}
              </span>
              <span className="bg-zinc-900 px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-display text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider text-white uppercase whitespace-nowrap truncate">
                {slide.subRibbonText}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-zinc-900">
              {slide.titleLine1}{' '}
              <span className="text-orange-600 block sm:inline">
                {slide.titleHighlight}
              </span>
            </h1>

            <p className="text-xs sm:text-base font-normal text-zinc-600 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Key Factory Specs Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-zinc-700">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                Tubo estructural 3.0–3.5 mm
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-2xs">
                Pintura electrostática al horno
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-2xs">
                Envíos a todo el Perú
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href={slide.ctaPrimaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-orange-500"
              >
                <span>{slide.ctaPrimaryText}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(slide.ctaWhatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
              >
                <svg className="h-4 w-4 fill-current shrink-0 text-emerald-400" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.86 11.86 0 0 0 5.74 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                </svg>
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean 2x2 Product Showcase Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white text-zinc-900 p-4 sm:p-[2.2vh] shadow-xl border border-zinc-200/90 space-y-[1.5vh]">
              {/* Clean Card Header */}
              <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-[1vh]">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                    Brasi<span className="text-orange-600">life</span>
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    Fitness
                  </span>
                </div>
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {slide.cardBadgeText}
                </span>
              </div>

              {/* 4 Studio Machines Preview from Current Slide (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {slide.previewMachines.map((pm) => (
                  <a
                    key={pm.href}
                    href={pm.href}
                    className="group flex flex-col items-center justify-between rounded-xl border border-zinc-200/80 bg-white p-2 transition hover:border-orange-500 hover:shadow-xs"
                  >
                    <div className="flex h-20 sm:h-28 lg:h-[13.5vh] min-h-[75px] max-h-[125px] w-full items-center justify-center overflow-hidden bg-white">
                      <img
                        src={pm.img}
                        alt={`${pm.name1} ${pm.name2}`}
                        className="max-h-full max-w-full object-contain transition group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-1 text-center font-display text-[10px] sm:text-[11px] font-bold uppercase leading-tight">
                      <span className="text-zinc-800">{pm.name1}</span>{' '}
                      <span className="text-orange-600">{pm.name2}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-[0.6vh] border-t border-zinc-100">
                <span className="font-medium text-zinc-600">
                  5 líneas · 33 equipos en catálogo
                </span>
                <a
                  href={slide.ctaPrimaryHref}
                  className="font-semibold text-orange-600 hover:text-orange-700"
                >
                  Ver línea completa →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slider Navigation Bar */}
        <div className="mt-4 lg:mt-[2vh] pt-3 lg:pt-[1.5vh] border-t border-zinc-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => {
              const active = idx === current;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    active ? 'w-8 bg-orange-600' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-2xs transition hover:border-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 shadow-2xs transition hover:border-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
