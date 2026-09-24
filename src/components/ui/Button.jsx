import React from 'react';
import { motion } from 'framer-motion';
import { NeedleIcon } from '../motifs/Doodles';

export const Button = React.forwardRef(({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'tailor', 'admin', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep/50 focus-visible:ring-offset-2 overflow-hidden select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md',
  };

  const variantClasses = {
    // Rose-deep signature with soft shimmer
    primary:
      'bg-gradient-to-r from-rose-deep via-[#e07d96] to-rose-deep text-white shadow-pastel hover:shadow-soft-lift hover:brightness-105 border border-rose-soft/40',
    // Pastel blush outline / glass card
    secondary:
      'bg-white/80 hover:bg-white text-plum border border-blush hover:border-rose-deep/40 shadow-sm hover:shadow-pastel',
    // Clean transparent with hover pastel
    ghost:
      'bg-transparent hover:bg-blush/30 text-plum hover:text-rose-deep',
    // Tailor Mint signature
    tailor:
      'bg-mint hover:bg-mint-dark text-plum font-semibold border border-mint-dark/50 shadow-pastel-mint',
    // Admin Sky signature
    admin:
      'bg-sky hover:bg-sky-dark text-plum font-semibold border border-sky-dark/50 shadow-pastel-sky',
    // Danger
    danger:
      'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${className}`}
      {...props}
    >
      {/* Soft shimmer gleam on primary button */}
      {variant === 'primary' && !disabled && !isLoading && (
        <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full animate-shimmer pointer-events-none" />
      )}

      {isLoading ? (
        <>
          <NeedleIcon className="w-4 h-4 animate-spin text-current" />
          <span>Stitching...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
