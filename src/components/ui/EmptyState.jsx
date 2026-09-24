import React from 'react';
import { SpoolIcon } from '../motifs/Doodles';
import Button from './Button';

export const EmptyState = ({
  title = 'No items found on the cutting table',
  description = 'Your studio collection will appear here once you begin crafting your bespoke designs.',
  actionLabel = 'Start Designing',
  onAction,
  icon: CustomIcon,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto rounded-3xl bg-white/60 border border-blush/60 shadow-sm ${className}`}>
      <div className="w-16 h-16 rounded-full bg-blush/40 flex items-center justify-center text-rose-deep mb-4 shadow-inner">
        {CustomIcon ? <CustomIcon className="w-8 h-8" /> : <SpoolIcon className="w-8 h-8" />}
      </div>
      <h3 className="font-serif text-xl font-semibold text-plum mb-2">
        {title}
      </h3>
      <p className="text-sm text-plum-soft mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
