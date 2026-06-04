import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, align = 'left' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <span className={`text-[10px] text-red-500 font-bold uppercase tracking-[0.3em] font-display block mb-2`}>
        // dispatch operations
      </span>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 font-display">
        {title}
      </h2>
      <div className={`h-[1px] w-32 mb-6 ${
        align === 'center' 
          ? 'mx-auto bg-gradient-to-r from-transparent via-red-600/40 to-transparent' 
          : 'bg-gradient-to-r from-red-600/40 to-transparent'
      }`}></div>
      {subtitle && (
        <p className={`text-slate-400 text-base md:text-lg font-light tracking-wide max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};