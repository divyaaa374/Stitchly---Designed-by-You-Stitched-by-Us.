import React from 'react';

/**
 * Embroidery Levels & Decorative Border Paths
 * Procedural SVG elements rendered on hems, necklines, cuffs, and dupattas.
 */

export const EMBROIDERY_LEVELS = {
  none: {
    id: 'none',
    name: 'Clean Tailored (No Embroidery)',
    price: 0,
    days: 0,
    description: 'Crisp architectural seams without surface work.',
  },
  minimal: {
    id: 'minimal',
    name: 'Fine Thread Stitchwork',
    price: 2500,
    days: 2,
    description: 'Tone-on-tone delicate border stitches along cuffs and neck.',
  },
  subtle: {
    id: 'subtle',
    name: 'Pearl & Mukaish Highlights',
    price: 4800,
    days: 3,
    description: 'Scattered metal sequins and handcrafted pearl bead edging.',
  },
  moderate: {
    id: 'moderate',
    name: 'Jaipuri Gota Patti Lace',
    price: 8500,
    days: 5,
    description: 'Golden ribbon applique with floral foil motifs.',
  },
  heavy: {
    id: 'heavy',
    name: 'Heritage Zardozi Work',
    price: 14500,
    days: 7,
    description: 'Dense metallic dabka wire, french knots, and antique gold thread.',
  },
  royal: {
    id: 'royal',
    name: 'Imperial Mughal Zardozi & Jewels',
    price: 22000,
    days: 10,
    description: 'Intricate peacock and paisley jaal with double scalloped borders.',
  },
};

/**
 * Scalloped border generator for hem
 */
export const ScallopedHem = ({ y = 350, width = 280, startX = 60, level = 'heavy', strokeColor = 'url(#zariGold)' }) => {
  if (level === 'none') return null;

  const isHeavy = level === 'heavy' || level === 'royal';
  const isRoyal = level === 'royal';

  return (
    <g className="embroidery-hem" opacity={0.92}>
      {/* Base border line */}
      <path
        d={`M${startX} ${y} Q${startX + width / 2} ${y + 12} ${startX + width} ${y}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isHeavy ? 3.5 : 2}
      />

      {/* Decorative dashed stitch run */}
      <path
        d={`M${startX + 6} ${y - 4} Q${startX + width / 2} ${y + 8} ${startX + width - 6} ${y - 4}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.2}
        strokeDasharray="3 3"
        opacity={0.8}
      />

      {/* Scallops along the hem */}
      {Array.from({ length: 12 }).map((_, i) => {
        const step = width / 12;
        const cx = startX + i * step + step / 2;
        // Curve downward
        const cy = y + Math.sin((i / 11) * Math.PI) * 10;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy + 4} r={isRoyal ? 2.5 : 1.8} fill={strokeColor} />
            {isHeavy && (
              <path
                d={`M${cx - 4} ${cy} Q${cx} ${cy + 6} ${cx + 4} ${cy}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={1.2}
              />
            )}
          </g>
        );
      })}

      {/* Extra Royal Jaal layer */}
      {isRoyal && (
        <path
          d={`M${startX + 14} ${y - 12} Q${startX + width / 2} ${y} ${startX + width - 14} ${y - 12}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />
      )}
    </g>
  );
};

/**
 * Neckline embroidery embellishment
 */
export const NecklineEmbroidery = ({ type = 'sweetheart', level = 'moderate', strokeColor = 'url(#zariGold)' }) => {
  if (level === 'none') return null;

  const isHeavy = level === 'heavy' || level === 'royal';

  return (
    <g className="embroidery-neckline">
      {type === 'sweetheart' && (
        <path
          d="M165 92 Q185 125 200 115 Q215 125 235 92"
          fill="none"
          stroke={strokeColor}
          strokeWidth={isHeavy ? 2.8 : 1.8}
          strokeDasharray={level === 'subtle' ? '3 3' : 'none'}
        />
      )}
      {type === 'v-neck' && (
        <path
          d="M165 90 L200 132 L235 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth={isHeavy ? 2.8 : 1.8}
        />
      )}
      {type === 'round' && (
        <path
          d="M165 90 Q200 128 235 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth={isHeavy ? 2.8 : 1.8}
        />
      )}
      {type === 'mandarin' && (
        <path
          d="M182 82 C182 74 218 74 218 82 L218 92 L182 92 Z"
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
          strokeDasharray="2 2"
        />
      )}
      {type === 'plunge' && (
        <path
          d="M170 90 L200 148 L230 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth={isHeavy ? 3 : 2}
        />
      )}
      {type === 'square' && (
        <path
          d="M170 90 L170 120 L230 120 L230 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth={isHeavy ? 2.5 : 1.8}
        />
      )}

      {/* Pearl bead dots along neckline */}
      {isHeavy && (
        <g fill="#ffffff" opacity={0.9}>
          <circle cx="180" cy="100" r="1.5" />
          <circle cx="190" cy="110" r="1.5" />
          <circle cx="200" cy="118" r="2" fill="url(#zariGold)" />
          <circle cx="210" cy="110" r="1.5" />
          <circle cx="220" cy="100" r="1.5" />
        </g>
      )}
    </g>
  );
};
