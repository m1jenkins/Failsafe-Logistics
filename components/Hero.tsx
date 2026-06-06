import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { QuoteForm } from './QuoteForm';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[auto] lg:min-h-screen flex items-center pt-20 pb-6 lg:pt-24 lg:pb-8 overflow-hidden bg-obsidian">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-obsidian/40 to-obsidian z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10"></div>
        <img
          src="/austin-bats.png"
          alt="Speedy Bat Couriers - Premier courier service in Austin Texas providing same day delivery and rush logistics"
          className="w-full h-full object-cover object-center lg:object-right opacity-30 mix-blend-lighten"
          width="1200"
          height="800"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
          
          {/* Left Column: Headline and text */}
          <div className="lg:col-span-7 space-y-3 lg:space-y-4">
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight font-display">
              Austin Same-Day <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">Courier</span>
              <br />
              <span className="text-slate-200">& Expedited Rush Logistics</span>
            </h1>

            <div className="hidden sm:block backdrop-blur-md bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4 lg:p-5 shadow-xl shadow-black/30 max-w-2xl">
              <p className="text-sm md:text-base lg:text-[17px] text-slate-300 font-light leading-relaxed">
                The time-critical infrastructure partner for <strong className="text-white font-medium">Austin</strong>, <strong className="text-white font-medium">Round Rock</strong>, and the <strong className="text-white font-medium">Taylor Semiconductor Corridor</strong>. Delivering hot shot parts, medical STAT, and secure chain of custody documents with dedicated direct-drive vehicles.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:gap-4 pt-1 lg:pt-2">
              <a href="#quick-quote-form" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center space-x-2 font-display">
                <span>Get Quote in Minutes</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a href="sms:5129104938" className="bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs md:text-sm px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-md transition-all inline-flex items-center space-x-2 font-display">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                <span>Text Dispatch (512) 910-4938</span>
              </a>
            </div>


          </div>

          {/* Right Column: Reusable Quote Form */}
          <div className="lg:col-span-5" id="quick-quote-form">
            <QuoteForm sourceName="Austin Main Page" routeId="" pageType="main" />
          </div>

        </div>
      </div>

      {/* Decorative location indicators */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <div className="text-right space-y-1 font-display">
          <div className="text-[10px] text-slate-500 font-bold tracking-widest">AUSTIN HQ & CENTRAL TX</div>
          <div className="text-[10px] text-slate-600 font-bold tracking-widest">NATIONWIDE LOGISTICS DEPLOYMENT</div>
        </div>
      </div>
    </section>
  );
};