import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  roleVariant = null, // 'customer' (blush), 'tailor' (mint), 'admin' (sky), or default
  onClick,
  as = 'div',
  ...props
}) => {
  const Component = onClick ? motion.button : motion.div;

  const roleStyles = {
    customer: 'border-blush/60 hover:border-blush shadow-pastel',
    tailor: 'border-mint-dark/40 hover:border-mint-dark shadow-pastel-mint',
    admin: 'border-sky-dark/40 hover:border-sky-dark shadow-pastel-sky',
    default: 'border-white/70 hover:border-blush/50 shadow-soft-lift',
  };

  const selectedBorder = roleVariant ? roleStyles[roleVariant] : roleStyles.default;

  return (
    <Component
      onClick={onClick}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } } : undefined}
      className={`relative rounded-3xl bg-white/75 backdrop-blur-md border ${selectedBorder} p-6 transition-colors duration-300 text-left ${
        onClick ? 'cursor-pointer select-none' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
