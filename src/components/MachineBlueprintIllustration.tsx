import React from 'react';

interface Props {
  imageType: string;
  code: string;
  imageUrl?: string;
  className?: string;
  frameHex?: string;
  upholsteryHex?: string;
}

export function MachineBlueprintIllustration({
  imageType,
  code,
  imageUrl,
  className = 'w-full h-full',
  frameHex = '#18181b',
  upholsteryHex = '#09090b',
}: Props) {
  if (imageUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white p-2 sm:p-3">
        <img
          src={imageUrl}
          alt={`Máquina ${code}`}
          className={`max-h-full max-w-full object-contain ${className}`}
          loading="lazy"
        />
      </div>
    );
  }

  const renderMachineGraphic = () => {
    switch (imageType) {
      case 'shoulder-hammer':
        return (
          <g>
            {/* Wide A-frame base */}
            <path
              d="M55 215 L225 215 M85 215 L118 55 L145 55 L165 215"
              stroke={frameHex}
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Rear weight storage horns */}
            <line x1="72" y1="125" x2="96" y2="125" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
            <line x1="66" y1="168" x2="90" y2="168" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
            {/* Inclined Backrest & Seat */}
            <rect
              x="132"
              y="102"
              width="14"
              height="58"
              rx="5"
              transform="rotate(-12 132 102)"
              fill={upholsteryHex}
            />
            <rect
              x="142"
              y="158"
              width="38"
              height="12"
              rx="4"
              fill={upholsteryHex}
            />
            {/* Hammer Iso-Lateral Overhead Converging Arm */}
            <path
              d="M126 65 L182 115 L205 95"
              stroke="#ea580c"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="126" cy="65" r="7" fill="#ea580c" />
            {/* Olympic Weight Plate on Hammer Arm */}
            <circle
              cx="166"
              cy="102"
              r="22"
              fill="#09090b"
              stroke="#f97316"
              strokeWidth="3"
            />
            <circle cx="166" cy="102" r="6" fill="#fafafa" />
            {/* Overhead motion arc */}
            <path
              d="M198 112 A 48 48 0 0 0 212 62"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          </g>
        );

      case 'glute-kick':
        return (
          <g>
            {/* Base frame */}
            <path
              d="M58 212 L222 212 M92 212 L115 95 L162 95"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Forearm & Chest Support Pad */}
            <rect
              x="132"
              y="84"
              width="48"
              height="14"
              rx="5"
              transform="rotate(14 132 84)"
              fill={upholsteryHex}
            />
            {/* Standing foot platform */}
            <rect x="85" y="202" width="46" height="9" rx="2" fill="#27272a" />
            {/* Rear Kickback Pendulum Arm */}
            <path
              d="M125 122 L175 182 L205 168"
              stroke="#ea580c"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="125" cy="122" r="7" fill={frameHex} />
            {/* Olympic Plate */}
            <circle
              cx="158"
              cy="160"
              r="18"
              fill="#09090b"
              stroke="#f97316"
              strokeWidth="2.5"
            />
            <path
              d="M185 192 A 45 45 0 0 0 218 145"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          </g>
        );

      case 'abductor':
        return (
          <g>
            {/* Front Weight Tower */}
            <rect
              x="68"
              y="58"
              width="42"
              height="154"
              rx="5"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            {[74, 86, 98, 110, 122, 134, 146].map((y) => (
              <rect key={y} x="74" y={y} width="30" height="7" rx="1.5" fill="#27272a" />
            ))}
            {/* Bottom Connecting Frame */}
            <path
              d="M65 212 L212 212 M182 212 L192 145"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            {/* Seat & Backrest */}
            <rect
              x="186"
              y="92"
              width="14"
              height="56"
              rx="5"
              transform="rotate(10 186 92)"
              fill={upholsteryHex}
            />
            <rect x="155" y="146" width="38" height="12" rx="4" fill={upholsteryHex} />
            {/* Swiveling Thigh Pads & Cam */}
            <circle cx="136" cy="162" r="14" fill="#ea580c" opacity="0.2" />
            <circle cx="136" cy="162" r="6" fill="#ea580c" />
            <rect x="132" y="132" width="24" height="12" rx="5" fill={upholsteryHex} stroke="#ea580c" strokeWidth="2" />
          </g>
        );

      case 'multigym':
        return (
          <g>
            {/* Base */}
            <path d="M52 215 L228 215" stroke={frameHex} strokeWidth="7" strokeLinecap="round" />
            {/* Central Weight Stack Column */}
            <rect
              x="85"
              y="44"
              width="42"
              height="170"
              rx="4"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            {[62, 74, 86, 98, 110, 122, 134, 146, 158].map((y) => (
              <rect key={y} x="91" y={y} width="30" height="7" rx="1.5" fill="#27272a" />
            ))}
            {/* Top Lat Boom & Pulleys */}
            <path d="M85 44 L195 38 L195 49 L85 54 Z" fill={frameHex} />
            <circle cx="190" cy="44" r="7" fill="#ea580c" />
            <path d="M162 76 L176 70 L204 70 L218 76" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Main Seat, Backrest, Preacher & Leg Extension */}
            <path d="M148 50 L148 212 M148 155 L195 155 L205 212" stroke={frameHex} strokeWidth="6.5" fill="none" />
            <rect x="140" y="92" width="13" height="54" rx="4" fill={upholsteryHex} />
            <rect x="150" y="148" width="40" height="11" rx="4" fill={upholsteryHex} />
            {/* Dual Press/Pec Arms */}
            <path d="M148 65 L175 118" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
            {/* Leg Developer Rollers */}
            <circle cx="198" cy="134" r="8" fill={upholsteryHex} />
            <circle cx="212" cy="182" r="8" fill="#ea580c" />
          </g>
        );

      case 'chest-press':
      case 'pec-fly':
        return (
          <g>
            {/* Base frame */}
            <path
              d="M65 215 L195 215 L180 205 L80 205 Z"
              fill="#cbd5e1"
              stroke={frameHex}
              strokeWidth="3"
            />
            {/* Weight stack tower */}
            <rect
              x="70"
              y="55"
              width="46"
              height="155"
              rx="5"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            {/* Weight plates */}
            {[72, 84, 96, 108, 120, 132, 144, 156].map((y) => (
              <rect
                key={y}
                x="76"
                y={y}
                width="34"
                height="8"
                rx="1.5"
                fill="#27272a"
              />
            ))}
            {/* Top bridge */}
            <path
              d="M90 55 L175 65 L175 76 L90 68 Z"
              fill={frameHex}
            />
            {/* Main upright & seat frame */}
            <path
              d="M150 68 L150 208 M150 155 L188 155 L195 208"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Seat & Backrest pads */}
            <rect
              x="140"
              y="92"
              width="14"
              height="55"
              rx="5"
              transform="rotate(-8 140 92)"
              fill={upholsteryHex}
            />
            <rect
              x="148"
              y="148"
              width="38"
              height="12"
              rx="4"
              fill={upholsteryHex}
            />
            {/* Converging press arm in Brasilife Orange */}
            <path
              d="M168 72 L195 128 L215 125"
              stroke="#ea580c"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="168" cy="72" r="7" fill="#ea580c" />
            {/* Biomechanical motion arc */}
            <path
              d="M202 105 A 45 45 0 0 1 228 138"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
          </g>
        );

      case 'lat-pulldown':
      case 'leg-extension':
        return (
          <g>
            {/* Base */}
            <path
              d="M65 215 L210 215"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Tall Weight Tower */}
            <rect
              x="75"
              y="42"
              width="44"
              height="170"
              rx="5"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            {[60, 72, 84, 96, 108, 120, 132, 144, 156].map((y) => (
              <rect
                key={y}
                x="81"
                y={y}
                width="32"
                height="8"
                rx="1.5"
                fill="#27272a"
              />
            ))}
            {/* Overhead boom */}
            <path
              d="M97 42 L185 35 L190 48 L97 54 Z"
              fill={frameHex}
            />
            {/* Pulley & Cable */}
            <circle cx="182" cy="42" r="8" fill="#ea580c" />
            <line
              x1="182"
              y1="50"
              x2="182"
              y2="88"
              stroke="#52525b"
              strokeWidth="2.5"
            />
            {/* Lat bar */}
            <path
              d="M150 92 L165 86 L199 86 L214 92"
              stroke="#ea580c"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Seat & Thigh rollers */}
            <path
              d="M165 215 L175 155 L205 155"
              stroke={frameHex}
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect
              x="162"
              y="148"
              width="42"
              height="12"
              rx="4"
              fill={upholsteryHex}
            />
            <circle cx="164" cy="128" r="9" fill={upholsteryHex} />
            <circle cx="182" cy="128" r="9" fill={upholsteryHex} />
          </g>
        );

      case 'leg-press':
      case 'hack-squat':
        return (
          <g>
            {/* Heavy Duty Base Frame */}
            <path
              d="M52 215 L230 215 M65 215 L135 82 L152 82 L105 215"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 45 Degree Linear Guide Rails */}
            <line
              x1="78"
              y1="175"
              x2="165"
              y2="68"
              stroke="#94a3b8"
              strokeWidth="5"
            />
            <line
              x1="88"
              y1="183"
              x2="175"
              y2="76"
              stroke="#64748b"
              strokeWidth="5"
            />
            {/* Sled / Carriage */}
            <path
              d="M105 128 L148 75 L168 92 L125 145 Z"
              fill={frameHex}
            />
            {/* Olympic Weight Horn + Plates */}
            <line
              x1="136"
              y1="108"
              x2="165"
              y2="132"
              stroke="#ea580c"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <ellipse
              cx="148"
              cy="118"
              rx="8"
              ry="24"
              transform="rotate(-40 148 118)"
              fill="#09090b"
              stroke="#f97316"
              strokeWidth="2.5"
            />
            {/* Backrest & Seat at bottom right */}
            <path
              d="M155 182 L205 208 L222 170"
              stroke={upholsteryHex}
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        );

      case 'hip-thrust':
      case 'iso-row':
        return (
          <g>
            {/* Base */}
            <path
              d="M58 205 L222 205"
              stroke={frameHex}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Angled foot platform */}
            <path
              d="M65 205 L95 162 L112 205 Z"
              fill="#27272a"
              stroke={frameHex}
              strokeWidth="3"
            />
            {/* Pivot arm */}
            <path
              d="M85 195 L182 135"
              stroke="#ea580c"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="85" cy="195" r="8" fill={frameHex} />
            {/* Olympic Horn */}
            <circle
              cx="155"
              cy="152"
              r="20"
              fill="#18181b"
              stroke="#f97316"
              strokeWidth="3"
            />
            <circle cx="155" cy="152" r="6" fill="#f8fafc" />
            {/* Rear Pivoting Back Pad */}
            <path
              d="M190 205 L198 135"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect
              x="175"
              y="122"
              width="42"
              height="16"
              rx="6"
              transform="rotate(-12 175 122)"
              fill={upholsteryHex}
            />
          </g>
        );

      case 'power-rack':
      case 'smith-machine':
        return (
          <g>
            {/* Base skid */}
            <path
              d="M62 215 L218 215"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* 4 Uprights */}
            <rect x="78" y="42" width="10" height="173" fill={frameHex} />
            <rect x="132" y="42" width="10" height="173" fill={frameHex} />
            <rect x="186" y="48" width="9" height="167" fill="#52525b" />
            {/* Laser cut holes representation */}
            {[65, 80, 95, 110, 125, 140, 155, 170, 185].map((y) => (
              <circle key={y} cx="137" cy={y} r="1.8" fill="#ffffff" />
            ))}
            {/* Top Crossmembers & Pullup bar */}
            <rect x="74" y="40" width="125" height="9" rx="2" fill={frameHex} />
            {/* Safety Spotter Arms */}
            <rect x="88" y="142" width="54" height="6" rx="2" fill="#ea580c" />
            {/* Olympic Barbell + Bumper Plates */}
            <line
              x1="56"
              y1="108"
              x2="215"
              y2="108"
              stroke="#71717a"
              strokeWidth="4"
            />
            <rect
              x="66"
              y="84"
              width="10"
              height="48"
              rx="3"
              fill="#09090b"
              stroke="#ea580c"
              strokeWidth="2"
            />
            <rect
              x="194"
              y="84"
              width="10"
              height="48"
              rx="3"
              fill="#09090b"
              stroke="#ea580c"
              strokeWidth="2"
            />
          </g>
        );

      case 'adjustable-bench':
        return (
          <g>
            {/* Base Frame */}
            <path
              d="M62 205 L218 205 M90 205 L112 162 L182 162 L195 205"
              stroke={frameHex}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Transport wheels */}
            <circle cx="68" cy="205" r="8" fill="#09090b" />
            {/* Laser ladder support */}
            <path
              d="M148 162 L175 112"
              stroke="#ea580c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Seat Pad */}
            <rect
              x="92"
              y="144"
              width="42"
              height="14"
              rx="5"
              transform="rotate(-12 92 144)"
              fill={upholsteryHex}
            />
            {/* Incline Backrest Pad */}
            <rect
              x="136"
              y="142"
              width="78"
              height="15"
              rx="5"
              transform="rotate(-38 136 142)"
              fill={upholsteryHex}
            />
          </g>
        );

      default:
        // dual-pulley / functional crossover
        return (
          <g>
            {/* Left & Right Columns */}
            <rect
              x="62"
              y="44"
              width="28"
              height="170"
              rx="4"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            <rect
              x="190"
              y="44"
              width="28"
              height="170"
              rx="4"
              fill="#f1f5f9"
              stroke={frameHex}
              strokeWidth="3.5"
            />
            {/* Top Crossover Bridge */}
            <path
              d="M62 46 L140 34 L218 46 L218 58 L140 48 L62 58 Z"
              fill={frameHex}
            />
            {/* Multi-grip chin-up handles */}
            <path
              d="M118 48 L125 60 M162 48 L155 60"
              stroke="#ea580c"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Adjustable Pulley Carriages */}
            <rect x="86" y="102" width="12" height="18" rx="3" fill="#ea580c" />
            <rect x="182" y="102" width="12" height="18" rx="3" fill="#ea580c" />
            {/* Cables converging to center */}
            <path
              d="M98 111 L126 138 M182 111 L154 138"
              stroke="#71717a"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="126" cy="138" r="5" fill="#09090b" />
            <circle cx="154" cy="138" r="5" fill="#09090b" />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 280 250"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Esquema biomecánico ${code}`}
    >
      {/* Sporty Studio Backdrop with Athletic Diagonal Accents */}
      <defs>
        <radialGradient id={`glow-${code}`} cx="50%" cy="52%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`grid-${code}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>
      <rect width="280" height="250" fill="#f8fafc" />
      <rect width="280" height="250" fill={`url(#grid-${code})`} />
      <circle cx="145" cy="130" r="105" fill={`url(#glow-${code})`} />

      {/* Athletic Diagonal Speed Stripes in Top Right */}
      <g opacity="0.18">
        <path d="M210 0 L235 0 L195 75 L170 75 Z" fill="#ea580c" />
        <path d="M242 0 L256 0 L216 75 L202 75 Z" fill="#f59e0b" />
      </g>

      {/* Bold Athletic Watermark */}
      <text
        x="140"
        y="142"
        textAnchor="middle"
        fill="#09090b"
        opacity="0.04"
        fontSize="44"
        fontFamily="Impact, sans-serif"
        fontStyle="italic"
        fontWeight="900"
        letterSpacing="0.04em"
      >
        BRASILIFE
      </text>

      {/* Floor shadow */}
      <ellipse cx="140" cy="216" rx="92" ry="7" fill="#d4d4d8" />
      <ellipse cx="140" cy="216" rx="58" ry="3.5" fill="#f97316" opacity="0.25" />

      {/* Main Machine Render */}
      {renderMachineGraphic()}
    </svg>
  );
}
