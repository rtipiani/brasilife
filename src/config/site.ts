export const SITE_CONFIG = {
  name: 'Brasilife Fitness',
  legalName: 'Weider Gym S.A.C.',
  tagline: 'Catálogo de Equipos · Personalizamos el color a pedido del cliente',
  description:
    'Fabricantes de máquinas profesionales para gimnasios en Perú. Tren Superior, Tren Inferior, Multifuncionales, Cardio, Mancuernas, Bancos y Discos. Personalizamos el color a pedido del cliente.',
  whatsappNumber: '51990228990',
  whatsappDisplay: '990 228 990',
  salesEmail: 'dam780797@gmail.com',
  websiteDisplay: 'www.brasilifefitness.com',
  facebookUrl: 'https://www.facebook.com/brasilifefitness/',
  instagramUrl: 'https://www.instagram.com/brasilifefitness/',
  youtubeUrl: 'https://www.youtube.com/@brasilifefitness5448',
  location: 'Jr. Monsefu N° 950 - Cercado de Lima',
  warrantyYears: 'Garantía de Fábrica',
  steelSpec: 'Tubo Estructural Pesado 3.0–3.5 mm',
  brochureColors: [
    { id: 'amarillo', name: 'AMARILLO', hex: '#EAB308' },
    { id: 'rojo', name: 'ROJO', hex: '#DC2626' },
    { id: 'azul', name: 'AZUL', hex: '#1E40AF' },
    { id: 'silver', name: 'SILVER', hex: '#A1A1AA' },
    { id: 'fucsia', name: 'FUCSIA', hex: '#DB2777' },
    { id: 'negro', name: 'NEGRO', hex: '#18181B' },
  ],
  finishes: {
    frames: [
      { id: 'negro', name: 'Negro', hex: '#18181B' },
      { id: 'silver', name: 'Silver Metalizado', hex: '#A1A1AA' },
      { id: 'amarillo', name: 'Amarillo', hex: '#EAB308' },
      { id: 'rojo', name: 'Rojo', hex: '#DC2626' },
      { id: 'azul', name: 'Azul', hex: '#1E40AF' },
      { id: 'fucsia', name: 'Fucsia', hex: '#DB2777' },
    ],
    upholstery: [
      { id: 'negro-carbon', name: 'Negro', hex: '#18181B' },
      { id: 'rojo-pro', name: 'Rojo', hex: '#B91C1C' },
      { id: 'azul-pro', name: 'Azul', hex: '#1E3A8A' },
      { id: 'fucsia-pro', name: 'Fucsia', hex: '#BE185D' },
      { id: 'amarillo-pro', name: 'Amarillo', hex: '#CA8A04' },
    ],
  },
  categories: [
    {
      id: 'tren-superior',
      name: 'Tren Superior',
      shortName: 'Tren Superior',
      subtitle: 'Bancos Olímpicos, Poleas y Jaulas',
      description:
        'Press Inclinado, Banco Plano, Banco Declinado, Polea Baja, Jaula de Potencia, Polea Alta, Rack de Sentadillas, Banco Scoth y Fondos Paralelas.',
      badge: '9 Equipos',
    },
    {
      id: 'tren-inferior',
      name: 'Tren Inferior',
      shortName: 'Tren Inferior',
      subtitle: 'Piernas, Femorales y Glúteos',
      description:
        'Extensiones Cuádriceps, Patada de Glúteos, Curt Femorales, Super Péndulo, Hip Trust, Abductor Dual, Pantorrillera Sentado, Prensa Olímpica y Hack Olímpica.',
      badge: '9 Equipos',
    },
    {
      id: 'multifuncionales',
      name: 'Multifuncionales',
      shortName: 'Multifuncionales',
      subtitle: 'Crossovers, Smith y Estaciones Multiestación',
      description:
        'Polea Dual Alta & Baja, Crossover Compacta Multifunciones, Press de Pecho 4 en 1, Sentadillas Mixta + Búlgaras, Smith Olímpica, Crossover Smith Multifuncional y Sissy.',
      badge: '7 Equipos',
    },
    {
      id: 'cardio',
      name: 'Cardio Profesional',
      shortName: 'Cardio',
      subtitle: 'Trotadoras, Spinning y Elípticas',
      description:
        'Elíptica Profesional, Bicicleta Spinning, Trotadora Mecánica Profesional (Curva) y Trotadora Electrónica Profesional.',
      badge: '4 Equipos',
    },
    {
      id: 'accesorios',
      name: 'Mancuernas, Bancos y Discos',
      shortName: 'Accesorios y Discos',
      subtitle: 'Peso Libre, Racks y Discos Olímpicos',
      description:
        'Set de Mancuernas con Rack y Barras, Banco Multi Funciones Regulable, Rack Porta Discos y Discos Olímpicos de Hierro y de Colores.',
      badge: '4 Equipos',
    },
  ],
} as const;

export type CategoryId = (typeof SITE_CONFIG.categories)[number]['id'];
