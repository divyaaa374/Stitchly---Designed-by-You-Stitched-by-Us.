import React from 'react';

export const Chip = ({
  children,
  variant = 'blush', // 'blush', 'mint', 'lavender', 'peach', 'butter', 'sky'
  size = 'md', // 'sm', 'md'
  icon: Icon,
  selected = false,
  onClick,
  className = '',
}) => {
  const variantStyles = {
    blush: selected
      ? 'bg-blush border-rose-deep/40 text-plum font-semibold shadow-sm'
      : 'bg-blush/40 text-plum hover:bg-blush/70 border-blush/60',
    mint: selected
      ? 'bg-mint border-mint-dark text-plum font-semibold shadow-sm'
      : 'bg-mint/40 text-plum hover:bg-mint/70 border-mint/60',
    lavender: selected
      ? 'bg-lavender border-lavender-dark text-plum font-semibold shadow-sm'
      : 'bg-lavender/40 text-plum hover:bg-lavender/70 border-lavender/60',
    peach: selected
      ? 'bg-peach border-peach-dark text-plum font-semibold shadow-sm'
      : 'bg-peach/40 text-plum hover:bg-peach/70 border-peach/60',
    butter: selected
      ? 'bg-butter border-butter-dark text-plum font-semibold shadow-sm'
      : 'bg-butter/40 text-plum hover:bg-butter/70 border-butter/60',
    sky: selected
      ? 'bg-sky border-sky-dark text-plum font-semibold shadow-sm'
      : 'bg-sky/40 text-plum hover:bg-sky/70 border-sky/60',
  };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-200 select-none ${
        onClick ? 'cursor-pointer active:scale-95' : ''
      } ${variantStyles[variant] || variantStyles.blush} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />}
      <span>{children}</span>
    </Component>
  );
};

export default Chip;
