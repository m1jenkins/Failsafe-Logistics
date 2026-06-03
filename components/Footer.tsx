import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4 text-center">
        <div className="text-2xl font-black text-white uppercase tracking-tight mb-2">Speedy Bat Couriers</div>
        <p className="text-slate-400 text-sm mb-1 font-medium">Courier Service in Austin, Texas</p>
        <p className="text-slate-500 text-sm mb-4">Same Day Delivery · Air Hand Carry · Medical Courier · Hot Shot · Legal Courier</p>
        <p className="text-slate-600 text-xs mb-6 max-w-xl mx-auto leading-relaxed">
          Austin's trusted 24/7 courier service for time-critical, same day, and emergency deliveries throughout Central Texas and nationwide. Serving Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Taylor, and beyond.
        </p>
        <div className="mb-8">
          <a
            href="sms:5129104938"
            aria-label="Text Speedy Bat Couriers at (512) 910-4938"
            className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 font-bold text-xl transition-colors"
          >
            <span>Text or Call: (512) 910-4938</span>
          </a>
        </div>
        <div className="text-slate-700 text-xs font-mono">
          &copy; {new Date().getFullYear()} SPEEDY BAT COURIERS · AUSTIN, TX · ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};