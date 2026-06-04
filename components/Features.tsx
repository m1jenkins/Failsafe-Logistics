import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Zap, Stethoscope, Briefcase } from 'lucide-react';
import { FeatureData } from '../types';

const features: FeatureData[] = [
  {
    title: "High-Tech & Semiconductor",
    description: "Specialized courier logistics for Austin's Taylor/Samsung semiconductor ecosystem. Wafer transport, Fab-to-Fab logistics, clean room protocol compliance, and NFO (Next Flight Out) services for time-critical components throughout Central Texas.",
    icon: Zap
  },
  {
    title: "Healthcare & Life Sciences",
    description: "HIPAA compliant medical courier services in Austin, Texas. UN3373 Biological Substance transport, Cold Chain logistics, STAT Medical delivery, and secure specimen transport for Austin-area hospitals, clinics, and healthcare providers.",
    icon: Stethoscope
  },
  {
    title: "Legal & Industrial Hot Shot",
    description: "Legal courier service in Austin TX with secure court filings and chain of custody documentation. Industrial hot shot parts delivery with 1-Hour Urgent service and 24/7 Dispatch for Austin law firms, manufacturers, and government agencies.",
    icon: Briefcase
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
          title="Services Offered"
          subtitle="Specialized logistics solutions for high-stakes, time-critical, and sensitive requirements in Austin and Nationwide."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative glass-panel p-8 flex flex-col rounded-2xl"
            >
              {/* Card accent top corner highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="bg-white/[0.02] border border-white/[0.06] w-12 h-12 flex items-center justify-center mb-6 group-hover:border-ember/30 group-hover:bg-red-950/20 transition-all duration-300 rounded-xl">
                <feature.icon className="text-slate-300 h-5 w-5 group-hover:text-red-500 transition-colors duration-300" />
              </div>

              <h3 className="text-base font-bold uppercase text-white mb-3 tracking-wider font-display">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};