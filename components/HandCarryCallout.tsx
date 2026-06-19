import React from 'react';
import { Plane, ArrowRight, Shield, Clock, Globe, UserCheck, Scale } from 'lucide-react';
import { scrollToElement } from '../utils/scrollHelper';

export const HandCarryCallout: React.FC = () => {
  return (
    <section id="hand-carry" className="py-24 bg-obsidian relative overflow-hidden">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Title, Description, and Custody Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] text-blue-400 font-bold uppercase tracking-[0.3em] font-display block">
                Air Hand Carry Service
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white font-display tracking-tight leading-none">
                US Domestic &amp; International <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500">
                  On-Board Custody
                </span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-display font-semibold tracking-wide">
                A dedicated courier boards a flight with your package — never leaving human hands.
              </p>
              <p className="text-slate-400 font-light leading-relaxed text-sm max-w-xl">
                For ultra-critical, high-priority assets that cannot leave human custody or risk transit delay. Our professional courier flies with your shipment as cabin carry-on luggage directly to any major domestic airport or global transit hub.
              </p>
            </div>

            {/* Custody-Flow Timeline */}
            <div className="space-y-6 pt-2 border-t border-white/[0.04]">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest font-display">
                Custody Chain Protocol
              </h3>
              
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-blue-500/40 before:to-cyan-500/10">
                {/* Step 1 */}
                <div className="flex items-start space-x-4 relative group">
                  <div className="flex items-center justify-center w-6.5 h-6.5 rounded-full bg-slate-950 border border-blue-500/40 text-xs font-bold text-blue-400 font-display z-10 transition-colors group-hover:border-blue-400">
                    01
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display transition-colors group-hover:text-blue-400">
                      Secure Pick-Up &amp; Seal
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
                      Courier takes physical possession at your door, sealing the cargo in a tamper-evident pouch and logging custody initialization.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4 relative group">
                  <div className="flex items-center justify-center w-6.5 h-6.5 rounded-full bg-slate-950 border border-blue-500/40 text-xs font-bold text-blue-400 font-display z-10 transition-colors group-hover:border-blue-400">
                    02
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display transition-colors group-hover:text-blue-400">
                      Cabin Flight Transit
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
                      Immediate transit to airport (AUS, DFW, etc.). Courier boards the next available commercial flight with the package as carry-on luggage.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4 relative group">
                  <div className="flex items-center justify-center w-6.5 h-6.5 rounded-full bg-slate-950 border border-blue-500/40 text-xs font-bold text-blue-400 font-display z-10 transition-colors group-hover:border-blue-400">
                    03
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display transition-colors group-hover:text-blue-400">
                      Direct Hand-off Delivery
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
                      Upon landing, the courier travels directly from the airport terminal to the recipient, executing a verified, face-to-face signature release.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Specifications Card */}
          <div className="lg:col-span-5 flex items-center">
            <div className="glass-panel-elevated w-full p-8 md:p-10 rounded-3xl border border-blue-500/10 relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]">
              {/* Highlight top border gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

              {/* Subtle background airplane vector or shadow */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none text-white">
                <Plane size={240} className="rotate-45" />
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                    Transit Specifications
                  </h3>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    Operational standards for time-critical air courier missions.
                  </p>
                </div>

                {/* Grid of specifications */}
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Shield size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">Custody Level</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">100% Constant Companion</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">Response Time</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">Next Available Flight Booked</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Globe size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">Service Range</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">Worldwide &amp; US Domestic Hubs</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <UserCheck size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">Agent Vetting</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">TSA-Cleared &amp; Background Checked</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-blue-500/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Scale size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-display">Weight Capacity</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">Under 40 lbs (Cabin Carry-on Limit)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-8 border-t border-white/[0.04] mt-8 relative z-10">
                <a
                  href="#quick-quote-form"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement('quick-quote-form');
                    const input = document.getElementById('fullName');
                    if (input) {
                      (input as HTMLInputElement).focus({ preventScroll: true });
                    }
                  }}
                  className="inline-flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-500 hover:to-blue-600 border border-blue-500/20 text-white font-bold uppercase tracking-wider text-xs font-display transition-all group/btn shadow-md hover:shadow-blue-900/30"
                >
                  <span>Request Hand Carry Quote</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
