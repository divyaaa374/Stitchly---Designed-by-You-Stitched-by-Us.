import React from 'react';

/**
 * Fabric definitions and SVG defs (gradients, patterns, filters)
 * Soft atelier aesthetic with pastel-friendly texturing.
 */

export const FABRICS = {
  silk: {
    id: 'silk',
    name: 'Raw Mulberry Silk',
    sheen: 'high',
    opacity: 1,
    filterId: 'url(#silkSheen)',
    textureOverlay: 'silk',
    description: 'Lustrous, crisp handloom drape with natural slub sheen.',
    priceMultiplier: 1.25,
    daysModifier: 1,
    swatchColor: '#FFE2CF',
  },
  velvet: {
    id: 'velvet',
    name: 'Micro Velvet',
    sheen: 'deep-plush',
    opacity: 1,
    filterId: 'url(#velvetTexture)',
    textureOverlay: 'velvet',
    description: 'Opulent, matte-rich micro velvet ideal for heavy zardozi.',
    priceMultiplier: 1.45,
    daysModifier: 3,
    swatchColor: '#4A3F5C',
  },
  georgette: {
    id: 'georgette',
    name: 'Silk Georgette',
    sheen: 'soft-matte',
    opacity: 0.88,
    filterId: 'url(#georgetteWeave)',
    textureOverlay: 'georgette',
    description: 'Airy, semi-sheer cascading fabric with ethereal bounce.',
    priceMultiplier: 1.0,
    daysModifier: 0,
    swatchColor: '#D5EFE3',
  },
  banarasi: {
    id: 'banarasi',
    name: 'Banarasi Katan Brocade',
    sheen: 'metallic-zari',
    opacity: 1,
    filterId: 'url(#banarasiBrocade)',
    textureOverlay: 'banarasi',
    description: 'Handwoven in Varanasi with antique gold floral jaal.',
    priceMultiplier: 1.6,
    daysModifier: 4,
    swatchColor: '#FFF1B8',
  },
  cotton: {
    id: 'cotton',
    name: 'Chanderi Mulmul Cotton',
    sheen: 'matte',
    opacity: 0.95,
    filterId: 'url(#cottonMatte)',
    textureOverlay: 'cotton',
    description: 'Breathable, featherlight cotton weave for effortless day festivities.',
    priceMultiplier: 0.85,
    daysModifier: -1,
    swatchColor: '#F9D5DC',
  },
};

/**
 * Fabric SVG Defs Component
 * Renders reusable SVG filters and patterns inside the garment SVG.
 */
export const FabricDefs = () => {
  return (
    <defs>
      {/* 1. Silk Sheen: Diagonal glossy luminance gradient */}
      <linearGradient id="silkSheenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="35%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="85%" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
      </linearGradient>

      {/* 2. Velvet Noise Filter */}
      <filter id="velvetTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.08   0 0 0 0 0.12  0 0 0 0.12 0" />
        <feBlend mode="multiply" in="SourceGraphic" result="blend" />
      </filter>

      {/* 3. Banarasi Brocade Floral Motif Pattern */}
      <pattern id="banarasiBrocade" width="28" height="28" patternUnits="userSpaceOnUse">
        {/* Subtle gold floral buti */}
        <circle cx="14" cy="14" r="2.5" fill="#FFE2CF" opacity="0.65" />
        <path
          d="M14 8 C11 11, 11 17, 14 20 C17 17, 17 11, 14 8 Z"
          fill="none"
          stroke="#FFF1B8"
          strokeWidth="0.8"
          opacity="0.8"
        />
        <path
          d="M8 14 C11 11, 17 11, 20 14 C17 17, 11 17, 8 14 Z"
          fill="none"
          stroke="#FFF1B8"
          strokeWidth="0.8"
          opacity="0.8"
        />
        <circle cx="4" cy="4" r="1" fill="#FFE2CF" opacity="0.4" />
        <circle cx="24" cy="4" r="1" fill="#FFE2CF" opacity="0.4" />
        <circle cx="4" cy="24" r="1" fill="#FFE2CF" opacity="0.4" />
        <circle cx="24" cy="24" r="1" fill="#FFE2CF" opacity="0.4" />
      </pattern>

      {/* 4. Georgette Crinkled Weave Pattern */}
      <pattern id="georgetteWeave" width="6" height="6" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="6" y2="3" stroke="#4A3F5C" strokeWidth="0.4" opacity="0.15" strokeDasharray="1 1" />
        <line x1="3" y1="0" x2="3" y2="6" stroke="#4A3F5C" strokeWidth="0.4" opacity="0.15" strokeDasharray="1 1" />
      </pattern>

      {/* 5. Cotton Texture Pattern */}
      <pattern id="cottonMatte" width="8" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="8" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.25" />
        <line x1="8" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="0.3" opacity="0.25" />
      </pattern>

      {/* Drop shadow for garment silhouette */}
      <filter id="garmentShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#4A3F5C" floodOpacity="0.16" />
      </filter>

      {/* Zari Gold Gradient for Embroidery */}
      <linearGradient id="zariGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE2CF" />
        <stop offset="40%" stopColor="#FFF1B8" />
        <stop offset="70%" stopColor="#FDE075" />
        <stop offset="100%" stopColor="#E8A7B5" />
      </linearGradient>

      {/* Silver / Pearl Mukaish Gradient */}
      <linearGradient id="pearlWhite" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#F0EAFB" />
        <stop offset="100%" stopColor="#E4DAF6" />
      </linearGradient>
    </defs>
  );
};
