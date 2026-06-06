import React from 'react';
import { Plane, ArrowRight } from 'lucide-react';

export const HandCarryCallout: React.FC = () => {
  return (
    <section id="hand-carry" className="py-20 bg-obsidian relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-panel-elevated p-10 md:p-14 rounded-3xl border border-blue-500/10 relative overflow-hidden max-w-4xl mx-auto">
          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Background plane icon */}
          <div className="absolute top-6 right-6 opacity-[0.03] pointer-events-none">
            <Plane size={160} />
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-10">
            {/* Left: Text content */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] text-blue-400/70 font-bold uppercase tracking-[0.3em] font-display block">
                  Air Hand Carry Service
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-white font-display tracking-tight leading-tight">
                  US Domestic &amp; International{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-black">
                    Hand Carry
                  </span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 font-display font-semibold tracking-wide">
                  A dedicated courier boards a flight with your package — never leaving human hands.
                </p>
              </div>

              <p className="text-slate-400 font-light leading-relaxed text-sm max-w-xl">
                For ultra-critical assets that cannot leave human custody. Our courier flies with your package as carry-on luggage to any major airport in the United States and global hubs.
              </p>

              {/* 3 Bullet points */}
              <ul className="space-y-4 font-display pt-2">
                <li className="flex items-center space-x-3 text-sm text-slate-200 font-bold uppercase tracking-wider">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shrink-0" />
                  <span>Chain of custody never broken</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-200 font-bold uppercase tracking-wider">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shrink-0" />
                  <span>Real-time flight tracking updates</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-200 font-bold uppercase tracking-wider">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shrink-0" />
                  <span>Direct delivery from airport to recipient</span>
                </li>
              </ul>

              <div className="pt-4">
                <a
                  href="#booking"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest font-display transition-colors group/link"
                >
                  <span>Request Hand Carry Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
