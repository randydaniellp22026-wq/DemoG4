import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`cyber-card tech-corner-tl tech-corner-tr p-6 md:p-8 ${className}`}>
      {/* Decorative Grid Overlay inside card */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,38,74,0.1)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none opacity-40" />
      
      {/* Top light bar */}
      <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
