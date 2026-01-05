import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="AI Cycle Logo"
        className="h-20 md:h-24 w-auto object-contain"
      />
    </div>
  );
};
