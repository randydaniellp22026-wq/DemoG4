import React from 'react';

interface StepperProps {
  steps: string[];
  activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((label, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <React.Fragment key={index}>
            {/* Step Item */}
            <div className="flex items-center space-x-2.5 z-10">
              {/* Circle (24px) */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[12px] font-bold border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gold border-gold text-bg'
                    : isActive
                    ? 'bg-surface2 border-gold text-gold shadow-[0_0_8px_rgba(232,163,61,0.25)]'
                    : 'bg-surface2 border-border text-textMuted'
                }`}
              >
                {index + 1}
              </div>
              {/* Label: 12px mono uppercase */}
              <span
                className={`font-mono text-[12px] uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-gold font-semibold' : isCompleted ? 'text-text' : 'text-textMuted'
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector Line (changes color from border to gold based on completed state) */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-[2px] relative bg-border min-w-[30px]">
                <div
                  className="absolute left-0 top-0 h-full bg-gold transition-all duration-500 ease-in-out"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
