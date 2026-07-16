import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-surface border border-border rounded-[14px] p-8 ${className}`}>
      {children}
    </div>
  );
}
