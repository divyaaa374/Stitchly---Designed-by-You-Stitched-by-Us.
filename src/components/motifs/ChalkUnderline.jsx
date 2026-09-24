import React from 'react';

export const ChalkUnderline = ({ color = '#F9D5DC', className = '' }) => {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[240px] h-3 inline-block -mt-1 ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 13C45 4 110 5 237 11C185 14 100 15 35 15"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
};

export default ChalkUnderline;
