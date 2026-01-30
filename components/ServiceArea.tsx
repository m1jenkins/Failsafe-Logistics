import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Crosshair, Map, Plane } from 'lucide-react';

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

export const ServiceArea: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionHeading title="Austin Courier Service Area" subtitle="Last-minute delivery and expedited delivery solutions originating from Austin/Waco Hub to all major Texas metros." />
        
        {/* Main Hubs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center space-x-2 bg-slate-800 px-6 py-4 border border-red-900/50 shadow-lg shadow-red-900/10 rounded-lg">
                <Crosshair className="text-red-600 h-5 w-5 animate-[spin_10s_linear_infinite]" />
                <span className="text-white font-bold uppercase tracking-widest">Austin (HQ)</span>
            </div>
            {hubs.map((hub) => (
                <div key={hub} className="flex items-center space-x-2 bg-slate-800 px-6 py-4 border border-slate-700 opacity-75 rounded-lg">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-slate-300 font-bold uppercase tracking-widest">{hub}</span>
                </div>
            ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          
          {/* Central Texas Rapid Response */}
          <div className="bg-slate-950 border border-slate-800 p-8 relative overflow-hidden group rounded-lg">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Map size={100} />
             </div>
             <h3 className="text-xl font-bold text-white uppercase mb-4 flex items-center">
                <span className="w-2 h-8 bg-red-600 mr-3 rounded-full"></span>
                Austin Last Minute Delivery Zone
             </h3>
             <p className="text-slate-400 mb-6 font-light leading-relaxed">
               Immediate dispatch to the following cities within <span className="text-white font-bold">60 minutes</span> of driving from Austin HQ:
             </p>
             <div className="flex flex-wrap gap-2">
                {centralTexasCities.map(city => (
                  <span key={city} className="text-xs font-medium text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 uppercase hover:border-slate-600 hover:text-slate-300 transition-colors cursor-default rounded">
                    {city}
                  </span>
                ))}
                <span className="text-xs font-medium text-red-500 bg-red-950/20 border border-red-900/30 px-2 py-1 uppercase rounded">
                  + All Points Between
                </span>
             </div>
          </div>

          {/* US Domestic Hand Carry */}
          <div className="bg-slate-950 border border-slate-800 p-8 relative overflow-hidden group rounded-lg">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plane size={100} />
             </div>
             <h3 className="text-xl font-bold text-white uppercase mb-4 flex items-center">
                <span className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></span>
                US Domestic & International Hand Carry
             </h3>
             <p className="text-slate-400 mb-6 font-light leading-relaxed">
               For ultra-critical assets that cannot leave human custody. Our courier flies with your package as carry-on luggage to any major airport in the United States.
             </p>
             <ul className="space-y-2">
               <li className="flex items-center space-x-2 text-sm text-slate-300 font-medium">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                 <span>Chain of custody never broken</span>
               </li>
               <li className="flex items-center space-x-2 text-sm text-slate-300 font-medium">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                 <span>Real-time flight tracking updates</span>
               </li>
               <li className="flex items-center space-x-2 text-sm text-slate-300 font-medium">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                 <span>Direct delivery from airport to recipient</span>
               </li>
             </ul>
          </div>

        </div>
      </div>
    </section>
  );
};