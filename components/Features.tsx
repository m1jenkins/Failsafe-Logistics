import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Zap, Stethoscope, Briefcase, Plane } from 'lucide-react';
import { FeatureData } from '../types';

const features: FeatureData[] = [
  {
    title: "Last Minute Delivery",
    description: "When overnight isn't fast enough. Expedited direct-drive service for urgent, time-critical deliveries. We pick up within the hour and drive straight through to the destination.",
    icon: Zap
  },
  {
    title: "Medical Courier",
    description: "Stat transport for specimens, pharmaceuticals, and surgical equipment. Professional medical couriers ensuring sterile, temperature-aware handling for healthcare providers.",
    icon: Stethoscope
  },
  {
    title: "Legal Courier Services",
    description: "Secure chain of custody for court filings, evidence, and sensitive documents. We provide professional, verified hand-to-hand delivery for law firms and government.",
    icon: Briefcase
  },
  {
    title: "Air Hand Carry Austin",
    description: "On-board courier service (OBC) for domestic & international air delivery. Your critical asset never leaves our personal possession, flying in the cabin for immediate hand-off at any major airport globally.",
    icon: Plane
  }
];

export const Features: React.FC = () => {
  return (
    <section
      className="py-24 border-b border-slate-800 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.97) 100%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(51, 65, 85, 0.1) 10px,
            rgba(51, 65, 85, 0.1) 11px
          )
        `
      }}
    >
      {/* Subtle glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Services Offered"
          subtitle="Specialized logistics solutions for high-stakes, time-critical, and sensitive requirements in Austin and Nationwide."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-slate-800/50 border border-slate-700 p-6 hover:bg-slate-800 transition-all duration-300 flex flex-col rounded-lg">

              <div className="bg-slate-900 w-12 h-12 flex items-center justify-center mb-6 border border-slate-600 group-hover:border-red-600 transition-colors shrink-0 rounded">
                <feature.icon className="text-white h-5 w-5 group-hover:text-red-500 transition-colors" />
              </div>

              <h3 className="text-lg font-bold uppercase text-white mb-3 tracking-wide">{feature.title}</h3>
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