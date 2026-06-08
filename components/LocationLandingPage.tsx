import React, { useEffect } from 'react';
import { LocationData } from '../types';
import { locations } from '../data/locations';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { QuoteForm } from './QuoteForm';

interface LocationLandingPageProps {
  location: LocationData;
  onNavigate: (locationId: string) => void;
}

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({ location, onNavigate }) => {
  // Filter out the current location for the neighboring directories section
  const otherLocations = Object.values(locations).filter(loc => loc.id !== location.id);

  // Scroll to top on location change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.id]);

  return (
    <div className="relative pt-24 pb-16 min-h-screen bg-obsidian">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <main className="container mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            1. HERO & INTRODUCTION SECTION
            ========================================================================= */}
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="hero-heading">
          <div className="lg:col-span-7 space-y-6">

            {/* Keyword-optimized H1 */}
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-display">
              Reliable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                {location.name} Courier Service
              </span>
              <span className="text-slate-300 block text-2xl sm:text-3xl font-light mt-4 tracking-normal">
                On-Demand Logistics & Same-Day Courier Fleet
              </span>
            </h1>

            {/* Geographical Transit E-E-A-T introduction */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] shadow-lg max-w-xl">
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                Speedy Bat Couriers is the premier local solution for secure, prompt transport in the <strong className="text-white font-semibold">{location.name}</strong> area. 
                {location.transitInfo} We provide 24/7 dedicated direct-drive delivery solutions to corporate, legal, and medical teams who cannot afford delay.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#quick-quote-form" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('quick-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                  const input = document.getElementById('fullName');
                  if (input) {
                    (input as HTMLInputElement).focus({ preventScroll: true });
                  }
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center space-x-2 font-display"
              >
                <span>Get Quote in Minutes</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="sms:5129104938" className="bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-md transition-all inline-flex items-center space-x-2 font-display">
                <Phone className="h-4 w-4 text-red-500" />
                <span>Text Dispatch (512) 910-4938</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="flex items-center gap-6 pt-4 text-[10px] text-slate-500 font-bold tracking-wider uppercase font-display border-t border-white/[0.02] max-w-lg">
              <span className="flex items-center">30-60 Min Pickup</span>
              <span className="flex items-center">HIPAA Compliant</span>
              <span className="flex items-center">Chain of Custody</span>
            </div>

          </div>

          {/* =========================================================================
              2. LEAD CAPTURE FORM SECTION
              ========================================================================= */}
          <div className="lg:col-span-5" id="quick-quote-form">
            <QuoteForm 
              sourceName={`${location.name} Courier Service`} 
              routeId={location.id} 
              pageType="location" 
              defaultPickup={location.zipCodes[0]}
            />
          </div>
        </section>

        {/* =========================================================================
            3. LOCAL INSIGHTS SECTION (SEO/E-E-A-T)
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="insights-heading">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="insights-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Austin Hub Geographic Familiarity
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Why central logistics requires more than just navigation software. How Speedy Bat secures speed and reliability inside the {location.name} corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              
              {/* Transit & Bottleneck Familiarity card */}
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
                  <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
                  Traffic & Infrastructure Bypasses
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
                  Every courier knows the coordinates, but local dispatch dictates routes that skip notorious bottlenecks. We understand when the I-35 deck split is backed up, how Congress Avenue events create detours, and how to optimize MoPac express lanes for time-sensitive cargo.
                </p>
                <div className="p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl text-xs text-slate-500 font-sans italic leading-relaxed">
                  "For immediate {location.name} dispatch, our drivers route through local transit cuts, avoiding highway back-ups to maintain our 60-minute pickup promise."
                </div>
              </div>

              {/* Local Landmarks & Coordinates card */}
              <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-lg font-bold text-white uppercase mb-4 flex items-center font-display tracking-wider">
                  <span className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></span>
                  Serving Local Hubs & Institutions
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                  We are intimately familiar with high-priority pickup and dropoff docks in this area. Our drivers serve local institutions daily, meaning we don't get lost inside campus maps or dock directories.
                </p>
                <div className="space-y-3 font-display">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Frequently Serviced Landmark Nodes:</div>
                  <div className="flex flex-wrap gap-2">
                    {location.localHighlights.map((landmark) => (
                      <span key={landmark} className="text-[10px] font-bold text-slate-300 bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 uppercase rounded-full">
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            4. LOCAL SERVICE MATRIX
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="services-heading">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="services-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Courier Service Specialties in {location.name}
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                Direct-drive logistics specifically configured for local corporate, legal, and industrial requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {location.localServices.map((service, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between hover:border-red-500/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-red-950/20 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500 font-bold font-display text-sm">
                      0{idx + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display leading-snug">
                      {service.split(' ').slice(0, 3).join(' ')}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {service}
                    </p>
                  </div>
                  <div className="pt-6 mt-auto">
                    <a 
                      href="#quick-quote-form" 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('quick-quote-form')?.scrollIntoView({ behavior: 'smooth' });
                        const input = document.getElementById('fullName');
                        if (input) {
                          (input as HTMLInputElement).focus({ preventScroll: true });
                        }
                      }}
                      className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest font-display flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Dispatch Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            5. NEIGHBORHOOD DIRECTORY & ROUTING LINKS (SEO)
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="directory-heading">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="directory-heading" className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider font-display">
                Austin Service Directory
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                Speedy Bat Couriers serves all of Central Austin and the surrounding metro area. Choose your neighborhood for specialized regional dispatch info.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {otherLocations.map((loc) => (
                <a
                  key={loc.id}
                  href={`/${loc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(loc.id);
                  }}
                  className="glass-panel p-4 text-center rounded-xl border border-white/[0.03] hover:border-red-500/25 hover:bg-white/[0.01] transition-all duration-300 font-display font-medium text-xs text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5 text-red-500/60 mx-auto mb-2 group-hover:text-red-500" />
                  <span>{loc.name}</span>
                </a>
              ))}
            </div>

            <div className="pt-10 text-center">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('');
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest font-display transition-colors cursor-pointer"
              >
                <span>&larr; Return to Austin Main Page</span>
              </a>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};
