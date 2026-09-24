import React from 'react';
import { motion } from 'framer-motion';

export const TapeMeasure = ({
  progress = 50, // 0 to 100
  label = '',
  unit = 'inches',
  showTicks = true,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs font-semibold text-plum-soft mb-1.5 px-0.5">
          <span>{label}</span>
          <span className="font-mono text-plum">{Math.round(progress)}% complete</span>
        </div>
      )}
      <div className="relative h-6 bg-butter/40 border border-butter-dark/50 rounded-lg overflow-hidden shadow-inner flex items-center">
        {/* Repeating millimeter / inch tick marks */}
        {showTicks && (
          <div className="absolute inset-0 pointer-events-none opacity-40 tape-ruler-bg" />
        )}

        {/* Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-butter-dark via-peach to-blush border-r-2 border-rose-deep relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Metal tape end clip */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-rose-deep shadow-sm" />
        </motion.div>

        {/* Floating measurement callout */}
        <div className="absolute right-2 text-[10px] font-mono font-bold text-plum/70 select-none">
          {unit === 'inches' ? `${(progress * 0.4).toFixed(1)}"` : `${Math.round(progress)} cm`}
        </div>
      </div>
    </div>
  );
};

export default TapeMeasure;
