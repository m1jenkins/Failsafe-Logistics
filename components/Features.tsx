import React from 'react';
import { Clock, Plane, Cpu, FileText, Wrench, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface CargoItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  routeId: string;
  ctaText: string;
}

const cargoItems: CargoItem[] = [
  {
    title: "Aircraft Parts & AOG",
    description: "Avionics, grounding parts, and critical aviation components to keep aircraft flying.",
    icon: Plane,
    routeId: "airport-recovery-next-flight-out",
    ctaText: "AOG Dispatch"
  },
  {
    title: "Manufacturing Samples",
    description: "Urgent prototypes, pre-production samples, and critical components to keep validation and assembly lines moving.",
    icon: Cpu,
    routeId: "manufacturing-line-down-delivery",
    ctaText: "Line-Down Support"
  },
  {
    title: "Legal & Secure Documents",
    description: "Time-sensitive court filings, original deeds, contracts, and secure chain-of-custody runs.",
    icon: FileText,
    routeId: "legal-courier-court-filing",
    ctaText: "Secure Document Run"
  },
  {
    title: "Critical Tools & Machinery",
    description: "Emergency replacement parts, diagnostic tools, and hardware to resume operations.",
    icon: Wrench,
    routeId: "hot-shot-expedited-freight",
    ctaText: "Emergency Parts Delivery"
  }
];

interface FeaturesProps {
  onNavigate?: (routeId: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  return (
    <section
      id="services"
      className="py-24 border-b border-white/[0.03] relative overflow-hidden bg-obsidian"
    >
      {/* Subtle top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-ember/15 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: The overnight/emergency focus statement */}
          <div className="lg:col-span-6 flex flex-col justify-between glass-panel-elevated p-8 md:p-12 rounded-3xl border border-white/[0.06] relative group overflow-hidden">
            {/* Liquid shimmer line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            
            <div className="space-y-8 lg:space-y-10">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white font-display tracking-tight leading-tight">
                  For when tomorrow is <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-ember to-molten font-black">
                    Too Late
                  </span>
                </h3>

                <p className="text-slate-300 font-light text-base lg:text-lg leading-relaxed">
                  Every run is direct-drive: one vehicle, one courier, zero transfers. Your shipment gets a dedicated driver who doesn't stop until the job is done.
                </p>
              </div>

              {/* Status details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.04] text-xs font-display">
                <div className="space-y-2">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Route status</div>
                  <div className="text-white font-bold uppercase flex items-center text-xs sm:text-sm md:text-base">
                    <Clock className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                    24/7/365 Run
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Transit type</div>
                  <div className="text-white font-bold uppercase flex items-center text-xs sm:text-sm md:text-base">
                    <ShieldAlert className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                    Dedicated Drive
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-500 uppercase font-bold tracking-wider text-[9px]">Range capability</div>
                  <div className="text-white font-bold uppercase flex items-center text-xs sm:text-sm md:text-base font-bold">
                    <ArrowRight className="w-5 h-5 text-red-500 mr-2 shrink-0 animate-pulse" />
                    1000+ Miles
                  </div>
                </div>
              </div>

              {/* Trust Line */}
              <div className="text-slate-400 uppercase font-bold tracking-wider text-[9px] font-display">
                Fully insured · $100K cargo coverage · Chain of custody on every run
              </div>
            </div>

            <div className="pt-8">
              <Button
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  const input = document.getElementById('contactFullName');
                  if (input) {
                    (input as HTMLInputElement).focus({ preventScroll: true });
                  }
                }}
                variant="alert"
                className="w-full group/link"
              >
                <span>Initiate Urgent Dispatch</span>
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column: 2x2 Cargo categories grid */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <h4 className="text-2xl md:text-3xl font-extrabold uppercase text-white font-display tracking-wider">
                What We Transport
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cargoItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onNavigate && onNavigate(item.routeId)}
                  className="group relative glass-panel p-6 rounded-2xl flex flex-col justify-between border border-white/[0.04] hover:border-red-500/20 cursor-pointer transition-all duration-300"
                >
                  <div>
                    <div className="bg-white/[0.02] border border-white/[0.06] w-10 h-10 flex items-center justify-center mb-4 group-hover:border-ember/30 group-hover:bg-red-950/20 transition-all duration-300 rounded-xl">
                      <item.icon className="text-slate-400 h-4.5 w-4.5 group-hover:text-red-500 transition-colors duration-300" />
                    </div>

                    <h5 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">
                      {item.title}
                    </h5>
                    <p className="text-slate-400 leading-relaxed text-xs font-light mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-widest font-display flex items-center space-x-1.5 transition-all duration-300 opacity-60 group-hover:opacity-100">
                      <span>{item.ctaText}</span>
                      <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                    </span>
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