import React from 'react';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const ServiceArea: React.FC = () => (
  <section id="service-area" className="py-20 bg-obsidian relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ember/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading
        title="Austin Pickup Area, Clearly Defined"
        subtitle="Speedy Bat is one Austin-based service-area business. Other cities are not presented as staffed local offices."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">
        <article className="glass-panel p-8 rounded-2xl">
          <div className="bg-red-950/20 border border-red-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
            <MapPin className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display mb-3">Routine pickup</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Routine pickup requests are limited to the Austin metro. Dispatch still confirms the exact address, vehicle, access, cargo, and earliest available timing for every job.
          </p>
          <p className="text-xs text-slate-500">Austin neighborhood pages are consolidated into one coverage source so the business identity stays accurate.</p>
        </article>

        <article className="glass-panel p-8 rounded-2xl">
          <div className="bg-red-950/20 border border-red-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
            <Navigation className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display mb-3">Austin-origin destinations</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            An accepted Austin-origin job may travel to another Texas city or beyond. Naming a destination does not imply routine pickup, a local office, a positioned fleet, or guaranteed availability there.
          </p>
          <p className="text-xs text-slate-500">Long-distance and air routes are quoted from the actual origin, destination, deadline, and operating constraints.</p>
        </article>
      </div>

      <div className="mt-10 text-center">
        <a href="/service-areas" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold uppercase tracking-wider font-display">
          Review service-area details
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);
