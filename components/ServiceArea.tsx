import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Crosshair, Map, Plane, MapPin, ArrowRight } from 'lucide-react';
import { locations } from '../data/locations';
import { services } from '../data/services';

const hubs = [
  "Houston", "Dallas / Fort Worth", "San Antonio", "El Paso"
];

const centralTexasCities = [
  "Round Rock", "Georgetown", "Cedar Park", "Pflugerville",
  "Lakeway", "Bee Cave", "West Lake Hills", "Kyle",
  "Leander", "Liberty Hill", "Lago Vista", "Taylor",
  "Hutto", "Salado", "Killeen", "Temple",
  "Buda", "Bastrop", "Elgin", "New Braunfels", "San Marcos"
];

interface ServiceAreaProps {
  onNavigate?: (locationId: string) => void;
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onNavigate }) => {
  return (
    <section id="service-area" className="py-20 bg-obsidian relative overflow-hidden">
      {/* Subtle bottom background glow — warm */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ember/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Austin Courier Service Area" subtitle="Last-minute delivery and expedited delivery solutions originating from Austin/Waco Hub to all major Texas metros." />

        {/* Main Hubs layout */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-red-950/30 to-red-900/10 px-5 py-3 border border-red-500/20 shadow-md shadow-red-950/10 rounded-full">
            <Crosshair className="text-red-500 h-4 w-4 animate-[spin_8s_linear_infinite]" />
            <span className="text-white font-bold uppercase tracking-widest text-xs font-display">Austin (HQ)</span>
          </div>
          {hubs.map((hub) => (
            <div key={hub} className="flex items-center space-x-2 bg-white/[0.02] px-5 py-3 border border-white/[0.04] opacity-80 rounded-full hover:border-white/[0.08] hover:opacity-100 transition-all duration-300">
              <div className="w-1.5 h-1.5 bg-smoke rounded-full"></div>
              <span className="text-slate-300 font-bold uppercase tracking-widest text-xs font-display">{hub}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">

          {/* Austin Neighborhood Dispatch Hubs */}
          <div className="glass-panel p-8 relative overflow-hidden group rounded-2xl lg:col-span-1">
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 text-slate-300 pointer-events-none">
              <Map size={100} />
            </div>
            
            <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
              Austin Neighborhood Dispatch Hubs
            </h3>
            <p className="text-slate-400 mb-6 font-light leading-relaxed text-sm">
              Select a neighborhood below to view specialized local dispatch details, transit routes, and pricing:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.values(locations)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(loc => (
                  <a
                    key={loc.id}
                    href={`/${loc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate(loc.id);
                    }}
                    className="text-[10px] font-bold text-red-400 bg-red-950/15 border border-red-500/25 px-3 py-1.5 uppercase hover:bg-red-950/25 hover:border-red-500/50 hover:text-white transition-all duration-300 rounded-full font-display cursor-pointer"
                  >
                    {loc.name}
                  </a>
                ))}
            </div>
          </div>

          {/* Specialized Courier Services */}
          <div className="glass-panel p-8 relative overflow-hidden group rounded-2xl lg:col-span-1">
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
              <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
              Specialized Courier Services
            </h3>
            <p className="text-slate-400 mb-6 font-light leading-relaxed text-sm">
              Select one of our dedicated delivery divisions for detailed service capabilities, pricing, and active routes:
            </p>
            <div className="flex flex-col space-y-2.5 font-display text-xs">
              {Object.values(services).map(service => (
                <a
                  key={service.id}
                  href={`/${service.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(service.id);
                  }}
                  className="flex items-center justify-between p-2.5 bg-white/[0.01] hover:bg-red-950/10 border border-white/[0.03] hover:border-red-500/20 text-slate-300 hover:text-white transition-all duration-300 rounded-xl cursor-pointer"
                >
                  <span className="font-semibold uppercase tracking-wider">{service.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-red-500/60 group-hover:text-red-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* US Domestic Hand Carry */}
          <div className="glass-panel p-8 relative overflow-hidden group rounded-2xl lg:col-span-1">
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 text-slate-300 pointer-events-none">
              <Plane size={100} />
            </div>
            
            <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
              <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full"></span>
              US Domestic & International Hand Carry
            </h3>
            <p className="text-slate-400 mb-6 font-light leading-relaxed text-sm">
              For ultra-critical assets that cannot leave human custody. Our courier flies with your package as carry-on luggage to any major airport in the United States and global hubs.
            </p>
            <ul className="space-y-3 font-display">
              <li className="flex items-center space-x-2.5 text-xs text-slate-300 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Chain of custody never broken</span>
              </li>
              <li className="flex items-center space-x-2.5 text-xs text-slate-300 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Real-time flight tracking updates</span>
              </li>
              <li className="flex items-center space-x-2.5 text-xs text-slate-300 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Direct delivery from airport to recipient</span>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO content paragraph */}
        <p className="mt-16 text-slate-500 text-xs md:text-sm leading-relaxed max-w-3xl mx-auto text-center font-sans font-light">
          Speedy Bat Couriers is the trusted courier in Austin, Texas for businesses that need reliable, time-critical delivery. From our Austin headquarters, we provide same day courier service to every community in Central Texas — whether you need a package delivered across town to Round Rock, a legal filing rushed to the courthouse, or a critical shipment hand-carried on the next flight out of Austin-Bergstrom International Airport. Our dedicated vehicles and professional couriers are available 24/7/365.
        </p>
      </div>
    </section>
  );
};