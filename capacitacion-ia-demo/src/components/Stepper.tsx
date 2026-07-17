import React from 'react';
import { User, Cpu, Terminal, Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <User className="w-3.5 h-3.5" />;
      case 1:
        return <Cpu className="w-3.5 h-3.5" />;
      case 2:
        return <Terminal className="w-3.5 h-3.5" />;
      default:
        return index + 1;
    }
  };

  const getStepCode = (index: number) => {
    switch (index) {
      case 0:
        return "CORE.INPUT";
      case 1:
        return "CORE.SYNTHESIS";
      case 2:
        return "CORE.UPLINK";
      default:
        return "SYS.STEP";
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2">
      <style>{`
        @keyframes connector-pulse {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .connector-flow-active {
          animation: connector-pulse 1.8s infinite linear;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), transparent);
        }
      `}</style>

      {steps.map((label, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <React.Fragment key={index}>
            {/* Step Item */}
            <div className="flex items-center space-x-3.5 z-10 flex-1">
              {/* Node Icon Box */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono transition-all duration-500 relative border ${
                  isCompleted
                    ? 'bg-gold/10 border-gold text-gold shadow-[0_0_10px_rgba(232,163,61,0.2)]'
                    : isActive
                    ? 'bg-teal/15 border-teal text-teal shadow-[0_0_12px_rgba(34,211,184,0.35)]'
                    : 'bg-navyLight border-border text-textMuted'
                }`}
              >
                {/* Micro tech node lights */}
                {isActive && (
                  <span className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-teal rounded-full animate-ping" />
                )}
                {isCompleted ? <Check className="w-4 h-4 stroke-[3px]" /> : getIcon(index)}
              </div>
              
              {/* Step info labels */}
              <div className="flex flex-col">
                <span
                  className={`font-mono text-[9px] tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-teal/80 font-bold' : isCompleted ? 'text-gold/70' : 'text-textMuted/50'
                  }`}
                >
                  {getStepCode(index)}
                </span>
                <span
                  className={`font-display text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white font-bold glow-text-magenta' : isCompleted ? 'text-gold' : 'text-textMuted'
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>

            {/* Connecting Line (Only between steps) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block flex-1 mx-4 h-[2px] relative bg-border min-w-[60px] overflow-hidden rounded-full">
                {/* The background progress line */}
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold to-teal transition-all duration-700 ease-in-out"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
                {/* Glowing light pulse flowing through the active step's next connector */}
                {index === activeStep && (
                  <div className="absolute top-0 left-0 w-full h-full connector-flow-active" />
                )}
                {isCompleted && index === activeStep - 1 && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gold/30 animate-pulse" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
