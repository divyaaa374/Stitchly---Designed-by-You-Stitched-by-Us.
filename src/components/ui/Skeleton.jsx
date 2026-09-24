import React from 'react';

export const Skeleton = ({
  className = '',
  variant = 'rectangular', // 'rectangular', 'circular', 'text'
}) => {
  const variantStyles = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 my-1.5',
  };

  return (
    <div
      className={`relative overflow-hidden bg-blush/20 ${
        variantStyles[variant] || variantStyles.rectangular
      } ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
};

export default Skeleton;
