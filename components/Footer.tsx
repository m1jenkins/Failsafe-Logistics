import React from 'react';
import { services } from '../data/services';

interface FooterProps {
  onNavigate?: (routeId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer role="contentinfo" className="bg-obsidian py-16 border-t border-white/[0.03] relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Column 1: Main Business Info */}
          <div className="md:col-span-5 text-center md:text-left order-3 md:order-1">
            <div 
              className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter font-display mb-2 cursor-pointer inline-block"
              onClick={() => onNavigate && onNavigate('')}
            >
              Speedy Bat Couriers
            </div>
            <p className="text-slate-400 text-xs md:text-sm mb-1 font-medium font-display tracking-wider uppercase">
              Courier Service in Austin, Texas
            </p>
            <p className="text-slate-500 text-xs mb-4 font-sans font-light">
              Same Day Delivery · Air Hand Carry · Medical Courier · Hot Shot · Legal Courier
            </p>
            
            <div className="h-[1px] w-12 bg-white/[0.04] my-6 md:mx-0 mx-auto" />

            <p className="text-slate-600 text-xs mb-6 max-w-sm leading-relaxed font-sans font-light">
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

          {/* Column 2: Specialized Services (Internal SEO Links) */}
          <div className="md:col-span-4 text-center md:text-left order-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-6 flex items-center justify-center md:justify-start">
              <span className="w-1.5 h-4 bg-red-600 mr-2.5 rounded-full"></span>
              Specialized Services
            </h3>
            <ul className="space-y-3 font-display text-xs">
              {Object.values(services).map((service) => (
                <li key={service.id}>
                  <a
                    href={`/${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) {
                        onNavigate(service.id);
                      }
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors duration-200 block py-0.5"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Vehicle Crossover Image */}
          <div className="md:col-span-3 flex justify-center md:justify-end order-1 md:order-3">
            <div className="relative group max-w-xs w-full">
              {/* Glassy border decoration */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-amber-500/10 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-700"></div>
              <div className="relative bg-black/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/speedybat-crossover.png"
                  alt="SpeedyBat Courier Crossover Vehicle"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-[1.01] group-hover:scale-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};