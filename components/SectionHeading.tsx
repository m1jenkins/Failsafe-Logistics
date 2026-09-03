import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  headingId?: string;
  tone?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  headingId,
  tone = 'light'
}) => {
  const isDark = tone === 'dark';

  return (
    <Reveal className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {eyebrow && (
        <p
          className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] mb-4 font-display ${
            isDark ? 'text-paper/60' : 'text-ink-soft'
          }`}
        >
          <span className="h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true" />
          {eyebrow}
          <span className="hidden sm:inline-block h-px w-10 bg-signal/50" aria-hidden="true" />
        </p>
      )}
      <h2
        id={headingId}
        className={`text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.06] font-extrabold tracking-tight font-display ${
          isDark ? 'text-paper' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${
            isDark ? 'text-paper/65' : 'text-ink-soft'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};
