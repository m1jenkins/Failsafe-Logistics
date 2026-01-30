import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, align = 'left' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
        {title}
      </h2>
      <div className={`h-1 w-20 bg-red-600 mb-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
      {subtitle && (
        <p className={`text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};