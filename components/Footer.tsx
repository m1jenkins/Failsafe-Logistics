import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="bg-obsidian py-16 border-t border-white/5 relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter font-display mb-2">
          Speedy Bat Couriers
        </div>
        <p className="text-slate-400 text-xs md:text-sm mb-1 font-medium font-display tracking-wider uppercase">
          Courier Service in Austin, Texas
        </p>
        <p className="text-slate-500 text-xs mb-4 font-sans font-light">
          Same Day Delivery · Air Hand Carry · Medical Courier · Hot Shot · Legal Courier
        </p>
        
        <div className="h-[1px] w-12 bg-white/5 mx-auto my-6" />

        <p className="text-slate-600 text-xs mb-6 max-w-xl mx-auto leading-relaxed font-sans font-light">
          Austin's trusted 24/7 courier service for time-critical, same day, and emergency deliveries throughout Central Texas and nationwide. Serving Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Taylor, and beyond.
        </p>
        <div className="mb-8">
          <a
            href="sms:5129104938"
            aria-label="Text Speedy Bat Couriers at (512) 910-4938"
            className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 font-bold text-lg font-display transition-colors"
          >
            <span>Text or Call: (512) 910-4938</span>
          </a>
        </div>
        <div className="text-slate-700 text-[10px] font-mono tracking-widest uppercase">
          &copy; {new Date().getFullYear()} SPEEDY BAT COURIERS · AUSTIN, TX · ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};