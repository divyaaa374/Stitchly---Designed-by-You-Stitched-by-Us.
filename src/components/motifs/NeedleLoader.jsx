import React from 'react';
import { motion } from 'framer-motion';

export const NeedleLoader = ({
  size = 'md', // 'sm', 'md', 'lg'
  text = 'Threading your custom design...',
  className = '',
}) => {
  const sizeMap = {
    sm: { w: 100, h: 40, needleW: 16 },
    md: { w: 160, h: 60, needleW: 24 },
    lg: { w: 220, h: 80, needleW: 32 },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center ${className}`}>
      <div className="relative" style={{ width: dim.w, height: dim.h }}>
        <svg viewBox="0 0 160 60" className="w-full h-full overflow-visible">
          {/* Fabric line */}
          <line x1="10" y1="30" x2="150" y2="30" stroke="#E8A7B5" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

          {/* Undulating Thread */}
          <path
            d="M 10 30 Q 35 10, 60 30 T 110 30 T 150 30"
            fill="none"
            stroke="#D9718A"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-stitch"
            strokeDasharray="6 6"
          />

          {/* Bobbing Needle */}
          <motion.g
            animate={{
              y: [-8, 8, -8],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <path
              d="M 85 10 L 98 48 L 94 49 L 81 12 Z"
              fill="#4A3F5C"
            />
            {/* Eye of the needle */}
            <ellipse cx="84" cy="15" rx="1.5" ry="3" fill="#FFF9F5" />
          </motion.g>
        </svg>
      </div>

      {text && (
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-xs font-serif text-plum-soft mt-2 italic tracking-wide"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default NeedleLoader;
