import React from 'react';

export const NeedleIcon = ({ className = "w-5 h-5", strokeColor = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={strokeColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2.5a2.12 2.12 0 0 0-3 0L3.5 17.5a1.5 1.5 0 0 0-.4 1.1v2.4h2.4a1.5 1.5 0 0 0 1.1-.4L21.5 5.5a2.12 2.12 0 0 0 0-3z" />
    <circle cx="19" cy="5" r="0.75" fill={strokeColor} />
    <path d="M19 5.5 C 16 9, 21 13, 17 18" strokeDasharray="2 2" strokeWidth="1.25" />
  </svg>
);

export const SpoolIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M8 6h8v12H8z" />
    <line x1="8" y1="9" x2="16" y2="9" strokeDasharray="1.5 1.5" />
    <line x1="8" y1="12" x2="16" y2="12" strokeDasharray="1.5 1.5" />
    <line x1="8" y1="15" x2="16" y2="15" strokeDasharray="1.5 1.5" />
    <path d="M6 18h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
  </svg>
);

export const ScissorsIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export const PinIcon = ({ className = "w-5 h-5", fillColor = "#D9718A" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" fill={fillColor} />
    <path d="M12 11v11l-2-2" />
    <circle cx="12" cy="7" r="1.5" fill="#FFF9F5" />
  </svg>
);

export const ButtonDoodleIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="9" />
    <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="1" fill="currentColor" />
    <circle cx="14.5" cy="14.5" r="1" fill="currentColor" />
    <line x1="9.5" y1="9.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1" />
    <line x1="14.5" y1="9.5" x2="9.5" y2="14.5" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const SparkleDoodle = ({ className = "w-4 h-4 text-butter-dark" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);
