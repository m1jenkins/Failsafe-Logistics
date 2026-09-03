import React from 'react';
import { Zap } from 'lucide-react';
import { serviceList } from '../data/services';

export const Marquee: React.FC = () => {
  const items = [...serviceList.map(service => service.name)];
  const track = [...items, ...items];

  return (
    <div className="relative z-20 -mt-px select-none" aria-hidden="true">
      <div className="overflow-hidden bg-ink py-3.5 border-y border-ink-deep shadow-[0_18px_36px_-24px_rgba(22,24,29,0.55)]">
        <div className="marquee-track flex w-max items-center gap-8 pr-8">
          {track.map((label, index) => (
            <span key={`${label}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.22em] text-paper/85">
                {label}
              </span>
              <Zap className="h-3.5 w-3.5 text-signal" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
