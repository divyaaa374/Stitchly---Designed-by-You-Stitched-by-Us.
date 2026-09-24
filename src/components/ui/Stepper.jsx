import React from 'react';
import { Check } from 'lucide-react';

export const Stepper = ({
  steps = [],
  currentStep = 0,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full flex items-center justify-between ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isUpcoming = idx > currentStep;

        return (
          <React.Fragment key={step.id || idx}>
            <div
              className={`flex flex-col items-center relative group ${
                onStepClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onStepClick && onStepClick(idx)}
            >
              {/* Step Circle */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-serif text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-rose-deep text-white shadow-pastel'
                    : isCurrent
                    ? 'bg-blush text-plum border-2 border-rose-deep shadow-md scale-105 ring-4 ring-blush/40'
                    : 'bg-white/80 text-plum-soft border border-blush/80'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <span
                  className={`text-[11px] sm:text-xs block font-medium transition-colors ${
                    isCurrent
                      ? 'text-plum font-bold'
                      : isCompleted
                      ? 'text-plum'
                      : 'text-plum-soft'
                  }`}
                >
                  {step.label}
                </span>
                {step.sublabel && (
                  <span className="text-[10px] text-plum-soft/80 hidden sm:block">
                    {step.sublabel}
                  </span>
                )}
              </div>
            </div>

            {/* Stitch connector line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4 h-0 border-t-2 border-dashed transition-all duration-300 mb-6"
                style={{
                  borderColor: isCompleted ? '#D9718A' : 'rgba(232, 167, 181, 0.45)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
