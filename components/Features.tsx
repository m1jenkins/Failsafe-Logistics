import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Clock, Plane, Cpu, FileText, Wrench, ShieldAlert, ArrowRight } from 'lucide-react';

interface CargoItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const cargoItems: CargoItem[] = [
  {
    title: "Aircraft Parts & AOG",
    description: "Avionics, grounding parts, and critical aviation components to keep aircraft flying.",
    icon: Plane
  },
  {
    title: "Manufacturing & Wafers",
    description: "Silicon wafers, specialized widgets, prototypes, and fab line logistics.",
    icon: Cpu
  },
  {
    title: "Legal & Secure Documents",
    description: "Time-sensitive court filings, original deeds, contracts, and secure chain-of-custody runs.",
    icon: FileText
  },
  {
    title: "Critical Tools & Machinery",
    description: "Emergency replacement parts, diagnostic tools, and hardware to resume operations.",
    icon: Wrench
  }
];

export const Features: React.FC = () => {
  return (
    <section
      id="services"
      className="py-24 border-b border-white/[0.03] relative overflow-hidden bg-obsidian"
    >
      {/* Subtle top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-ember/15 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Consolidated Hot Shot Services"
          subtitle="For when tomorrow is too late. Direct-drive logistics designed for the high-stakes jobs others aren't willing to do."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 items-stretch">
          {/* Left Column: The overnight/emergency focus statement */}
          <div className="lg:col-span-6 flex flex-col justify-between glass-panel-elevated p-8 md:p-10 rounded-3xl border border-white/[0.06] relative group overflow-hidden">
            {/* Liquid shimmer line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase text-white font-display tracking-tight leading-tight">
                For when tomorrow is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-ember to-molten font-black">
                  Too Late
                </span>
              </h3>

              <p className="text-slate-300 font-light text-base leading-relaxed">
                When next-day air cutoff has passed, hubs are shut down, and cargo absolutely has to be in another city by 8:00 AM next morning, overnight courier networks can't help. 
              </p>
              
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                We specialize in last-minute, overnight direct-drive runs up to 1,000+ miles. One dedicated vehicle, one courier driver, zero transfers, non-stop to destination. We do the jobs other carriers aren't willing to take.
              </p>

              {/* Status details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.04] text-xs font-display">
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Route status</div>
                  <div className="text-white font-bold uppercase flex items-center">
                    <Clock className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                    24/7/365 Run
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Transit type</div>
                  <div className="text-white font-bold uppercase flex items-center">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                    Dedicated Drive
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Range capability</div>
                  <div className="text-white font-bold uppercase flex items-center font-bold">
                    <ArrowRight className="w-3.5 h-3.5 text-red-500 mr-1.5 animate-pulse" />
                    1000+ Miles
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#booking"
                className="inline-flex items-center space-x-2 text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest font-display transition-colors group/link"
              >
                <span>Initiate Urgent Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: 2x2 Cargo categories grid */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-display block mb-2">
                // cargo compatibility
              </span>
              <h4 className="text-xl font-bold uppercase text-white font-display tracking-wider">
                What We Transport
              </h4>
              <p className="text-slate-400 font-light text-sm leading-relaxed mt-2">
                Whether it's an envelope of documents or a critical manufacturing widget, we treat every single run as a highest-priority hot shot.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cargoItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/[0.04] hover:border-red-500/20"
                >
                  <div>
                    <div className="bg-white/[0.02] border border-white/[0.06] w-10 h-10 flex items-center justify-center mb-4 group-hover:border-ember/30 group-hover:bg-red-950/20 transition-all duration-300 rounded-xl">
                      <item.icon className="text-slate-400 h-4.5 w-4.5 group-hover:text-red-500 transition-colors duration-300" />
                    </div>

                    <h5 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">
                      {item.title}
                    </h5>
                    <p className="text-slate-400 leading-relaxed text-xs font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};