import React from 'react';
import { ShieldCheck, FileCheck, HeartPulse, Clock, Stethoscope, Scale, Cpu, Plane, EyeOff, Gem, Landmark } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const credentials = [
  {
    icon: ShieldCheck,
    title: 'Fully Insured',
    description: '$100K cargo coverage on every run, with dedicated single-driver custody from pickup to drop.',
  },
  {
    icon: FileCheck,
    title: 'Chain of Custody',
    description: 'Documented handoffs and SMS tracking updates on every job — you always know where your shipment is.',
  },
  {
    icon: HeartPulse,
    title: 'HIPAA-Trained Drivers',
    description: 'Trained in biohazard handling, UN3373 transport, and temperature-sensitive medical logistics.',
  },
  {
    icon: Clock,
    title: '24/7/365 Live Dispatch',
    description: 'A real dispatcher answers any hour, any day. Urgent pickups roll in 30-60 minutes.',
  },
  {
    icon: EyeOff,
    title: 'Discreet Transport',
    description: 'Unmarked vehicles, plain-clothes couriers, and zero external signage. Your high-value shipment stays invisible.',
  },
];

const industries = [
  { icon: Stethoscope, label: 'Healthcare & Labs' },
  { icon: Scale, label: 'Legal & Court Filings' },
  { icon: Cpu, label: 'Semiconductor & Manufacturing' },
  { icon: Plane, label: 'Aviation & AOG' },
  { icon: Gem, label: 'Precious Goods & Valuables' },
  { icon: Landmark, label: 'Financial & Estate Services' },
];

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="py-16 md:py-20 bg-obsidian border-b border-white/[0.03] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Built for loads you can't afford to lose"
          subtitle="When a shipment is worth a 2am phone call, credentials matter more than promises."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="glass-panel p-6 rounded-2xl border border-white/[0.04] hover:border-red-500/20 transition-all duration-300"
            >
              <div className="bg-red-950/20 border border-red-500/20 w-10 h-10 flex items-center justify-center mb-4 rounded-xl text-red-500">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-[13px] font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Industries served */}
        <div className="mt-10 flex flex-col items-center space-y-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-display">
            Trusted by time-critical teams in
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((item) => (
              <div
                key={item.label}
                className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.05] px-4 py-2 rounded-full text-slate-300"
              >
                <item.icon className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider font-display">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
