import React from 'react';

/**
 * Atelier Dress-Form Mannequin SVG Component
 * Provides an authentic tailor's studio stage backdrop for the layered parametric garment.
 */
export const Mannequin = ({ className = '', showStand = true, showTorso = true }) => {
  return (
    <g className={`mannequin-stand ${className}`} pointerEvents="none">
      {/* 1. Wooden Finial Neck Cap */}
      <circle cx="200" cy="54" r="8" fill="#4A3F5C" opacity="0.85" />
      <path
        d="M192 60 Q200 58 208 60 L206 72 Q200 74 194 72 Z"
        fill="#8A7F9C"
        opacity="0.8"
      />
      <ellipse cx="200" cy="72" rx="14" ry="4" fill="#4A3F5C" opacity="0.6" />

      {/* 2. Dress-form Torso Canvas Core (Visible underneath or as silhouette guide) */}
      {showTorso && (
        <g opacity="0.45">
          {/* Natural linen torso contour */}
          <path
            d="M165 80 C155 85, 148 105, 150 135 C152 165, 160 178, 168 195 C176 210, 164 240, 158 275 L242 275 C236 240, 224 210, 232 195 C240 178, 248 165, 250 135 C252 105, 245 85, 235 80 Z"
            fill="#FFF1B8"
            stroke="#4A3F5C"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          {/* Princess dart lines on dress form */}
          <path d="M182 95 Q180 150 188 275" fill="none" stroke="#4A3F5C" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <path d="M218 95 Q220 150 212 275" fill="none" stroke="#4A3F5C" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <line x1="200" y1="80" x2="200" y2="275" stroke="#4A3F5C" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
        </g>
      )}

      {/* 3. Mannequin Stand Pole & Tripod Base */}
      {showStand && (
        <g>
          {/* Vertical central metal pole */}
          <line x1="200" y1="270" x2="200" y2="445" stroke="#4A3F5C" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="198" y1="270" x2="198" y2="445" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />

          {/* Height adjustment tension knob */}
          <circle cx="206" cy="390" r="3.5" fill="#D9718A" />
          <line x1="200" y1="390" x2="206" y2="390" stroke="#4A3F5C" strokeWidth="2" />

          {/* Arched French Atelier Tripod Base */}
          {/* Center pole collar */}
          <path d="M192 445 L208 445 L204 455 L196 455 Z" fill="#4A3F5C" />

          {/* Left curved leg */}
          <path
            d="M197 452 Q180 470 145 480"
            fill="none"
            stroke="#4A3F5C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="145" cy="480" r="2.5" fill="#D9718A" />

          {/* Right curved leg */}
          <path
            d="M203 452 Q220 470 255 480"
            fill="none"
            stroke="#4A3F5C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="255" cy="480" r="2.5" fill="#D9718A" />

          {/* Center back stabilizing leg */}
          <path
            d="M200 454 L200 478"
            fill="none"
            stroke="#4A3F5C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="200" cy="478" r="2.5" fill="#D9718A" />

          {/* Soft ground contact shadow */}
          <ellipse cx="200" cy="484" rx="65" ry="6" fill="#4A3F5C" opacity="0.08" />
        </g>
      )}
    </g>
  );
};

export default Mannequin;
