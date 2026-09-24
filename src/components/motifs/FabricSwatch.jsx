import React from 'react';

export const FabricSwatch = ({
  color = '#F9D5DC',
  label = 'Silk Crepe',
  selected = false,
  onClick,
  size = 'md', // 'sm', 'md', 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center focus:outline-none transition-transform duration-300 ${
        selected ? 'scale-110' : 'hover:scale-105'
      }`}
      aria-label={`Fabric Swatch: ${label}`}
    >
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full shadow-md border-2 transition-all duration-300 relative overflow-hidden ${
          selected ? 'border-plum ring-2 ring-rose-deep/60 ring-offset-2 ring-offset-cream' : 'border-white/80 group-hover:border-blush-dark'
        }`}
        style={{ backgroundColor: color }}
      >
        {/* Fabric sheen reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-60 pointer-events-none" />
        {/* Subtle cloth weave texture line */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4a3f5c_1px,transparent_1px)] [background-size:4px_4px]" />
      </div>

      {label && (
        <span className="text-[11px] font-medium text-plum-soft mt-1.5 opacity-90 group-hover:opacity-100 whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
};

export default FabricSwatch;
