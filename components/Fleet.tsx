import React from 'react';
import { Shield, Zap, Navigation, UserCheck, Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const Fleet: React.FC = () => {
  const specs = [
    {
      icon: Navigation,
      title: "Real-Time Telemetry",
      description: "Every dispatch vehicle is equipped with live GPS tracking and automated transit updates directly to your phone."
    },
    {
      icon: Shield,
      title: "Secure Chain-of-Custody",
      description: "Direct-drive delivery means your cargo stays in one vehicle. No sorting hubs, no transfers, and zero risk of misrouting."
    },
    {
      icon: Zap,
      title: "Immediate Hot Shot Dispatch",
      description: "Dedicated courier cars stationed in Austin. Once loaded, the driver moves directly to destination with no third-party stops."
    },
    {
      icon: UserCheck,
      title: "Vetted Courier Drivers",
      description: "Background-checked, security-cleared professional drivers experienced in airport AOG, medical specimens, and cleanroom entry."
    }
  ];

  return (
    <section id="fleet" className="py-24 border-b border-white/[0.03] relative overflow-hidden bg-obsidian">
      {/* Background gradients */}
      <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-br from-red-950/15 via-ember/5 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Rapid Response Fleet"
          subtitle="Our dedicated courier vehicles are branded, secured, and ready for immediate hot shot dispatch across Central Texas and beyond."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          {/* Left: Spec Details */}
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-display block">
                // VEHICLE SPECIFICATIONS & STANDARDS
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase text-white font-display tracking-tight leading-tight">
                Designed for High-Stakes Logistics
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                We don't use standard gig-economy drivers. Speedy Bat runs a fleet of dedicated, fully insured transport vehicles designed to handle everything from micro-wafers to critical machine parts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {specs.map((spec, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl border border-white/[0.04] hover:border-red-500/20 transition-all duration-300">
                  <div className="bg-red-950/10 border border-red-500/10 w-9 h-9 flex items-center justify-center mb-3 rounded-lg text-red-500">
                    <spec.icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase text-white mb-1.5 tracking-wider font-display">
                    {spec.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-xs font-light">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Premium Showcase of the Car */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="glass-panel-elevated p-3 rounded-3xl border border-white/[0.06] overflow-hidden group shadow-2xl relative">
              {/* Corner tech lines */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-red-500/50" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-red-500/50" />
              <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-red-500/50" />
              <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-red-500/50" />
              
              <div className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.02] flex items-center justify-center p-4 min-h-[300px] md:min-h-[380px]">
                {/* Subtle light sweeps behind the car */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent opacity-60 z-0 pointer-events-none" />
                
                <img 
                  src="/speedybat-car.png" 
                  alt="Speedy Bat Couriers Dedicated Delivery Fleet Vehicle - Branded Unit 08 Courier Car" 
                  className="w-full h-auto max-w-[500px] object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Vehicle Identification Label overlay */}
                <div className="absolute bottom-4 left-4 z-20 glass-panel px-3.5 py-2 rounded-xl border border-white/[0.08] backdrop-blur-md">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest font-display">
                      Unit 08 &mdash; Rapid Crossover Deploy
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick specifications banner */}
            <div className="mt-4 flex justify-between items-center px-4 text-[9px] text-slate-500 font-bold tracking-widest uppercase font-display">
              <span className="flex items-center"><Check className="h-3 w-3 text-red-500 mr-1" /> FULLY INSURED cargo</span>
              <span className="flex items-center"><Check className="h-3 w-3 text-red-500 mr-1" /> CLIMATE CONTROLLED</span>
              <span className="flex items-center"><Check className="h-3 w-3 text-red-500 mr-1" /> 24/7 ACTIVE DISPATCH</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
