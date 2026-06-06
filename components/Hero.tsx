import React from 'react';
import { ArrowRight, Clock, Shield } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  region?: string;
}

export const Hero: React.FC<HeroProps> = ({ region = "Austin & Central TX" }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-obsidian">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-obsidian/40 to-obsidian z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10"></div>
        <img
          src="/austin-bats.png"
          alt="Speedy Bat Couriers - Premier courier service in Austin Texas providing same day delivery and rush logistics"
          className="w-full h-full object-cover object-center lg:object-right opacity-40 mix-blend-lighten"
          width="1200"
          height="800"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10"></div>

      <div className="container mx-auto px-6 md:px-8 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7.5xl font-black text-white leading-[1.08] mb-6 tracking-tight font-display">
            On-Time Same-Day Delivery <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              in {region}
            </span>
            <br />
            <span className="text-slate-200">Guaranteed.</span>
          </h1>

          <div className="backdrop-blur-md bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 mb-10 max-w-2xl shadow-xl shadow-black/30">
            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
              We deploy dedicated direct-drive vehicles for your time-critical logistics. From medical STAT deliveries to urgent semiconductor parts and secure legal documents—we bypass regional traffic bottlenecks to guarantee zero transit delays.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10">
            <Button 
              variant="alert" 
              className="flex items-center justify-center space-x-2 shadow-lg shadow-red-950/20 px-8 py-4 text-sm md:text-base transition-transform hover:scale-[1.02]" 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Calculate Delivery Cost</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              className="flex items-center justify-center space-x-2 px-8 py-4 text-sm md:text-base hover:bg-white/[0.06] transition-all" 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Book Now in 60 Seconds</span>
            </Button>
          </div>

          <p className="text-slate-400 text-xs md:text-sm">
            Need urgent setup? <a href="sms:5129104938" className="text-red-500 hover:text-red-400 font-bold underline transition-colors">Text us at (512) 910-4938</a> for a direct line to dispatch.
          </p>

          <div className="mt-16 flex flex-wrap items-center gap-y-3 gap-x-6 text-slate-500 font-bold text-xs tracking-widest uppercase font-display">
            <span className="flex items-center"><Shield className="h-4 w-4 text-red-500/80 mr-2" /> DEDICATED FLEET</span>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full hidden md:block"></span>
            <span className="flex items-center"><Clock className="h-4 w-4 text-red-500/80 mr-2" /> DIRECT DRIVE</span>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full hidden md:block"></span>
            <span>ZERO TRANSIT DELAYS</span>
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