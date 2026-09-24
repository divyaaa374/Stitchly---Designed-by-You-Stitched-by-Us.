import React from 'react';
import { NeedleIcon, ScissorsIcon } from './Doodles';

export const StitchDivider = ({
  color = 'rgba(217, 113, 138, 0.4)',
  withIcon = 'needle', // 'needle', 'scissors', or null
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center my-8 w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="flex-1 h-0 border-t-2 border-dashed" style={{ borderColor: color }} />
      {withIcon === 'needle' && (
        <div className="mx-3 p-1.5 rounded-full bg-cream border border-blush text-rose-deep shadow-sm">
          <NeedleIcon className="w-4 h-4 transform rotate-45" />
        </div>
      )}
      {withIcon === 'scissors' && (
        <div className="mx-3 p-1.5 rounded-full bg-cream border border-blush text-plum-soft shadow-sm">
          <ScissorsIcon className="w-4 h-4 transform rotate-12" />
        </div>
      )}
      <div className="flex-1 h-0 border-t-2 border-dashed" style={{ borderColor: color }} />
    </div>
  );
};

export default StitchDivider;
