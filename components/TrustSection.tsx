import React from 'react';
import { Clock, FileCheck, MapPin, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const confirmations = [
  {
    icon: Clock,
    title: 'Availability & Timing',
    description: 'Dispatch checks the actual pickup, deadline, route, traffic, access, and current capacity before accepting a job.'
  },
  {
    icon: MapPin,
    title: 'Vehicle & Route',
    description: 'Cargo size, weight, handling needs, lane, stops, and safe-driving constraints shape the proposed configuration.'
  },
  {
    icon: ShieldCheck,
    title: 'Custody & Handling',
    description: 'Requested handoffs, tracking, packaging, access, and receipt controls are included only when confirmed in scope.'
  },
  {
    icon: FileCheck,
    title: 'Price & Coverage',
    description: 'Distance, urgency, vehicle, waiting, tolls, airport work, after-hours needs, and any applicable coverage are confirmed before booking.'
  }
];

export const TrustSection: React.FC = () => (
  <section id="dispatch-confirmations" className="py-16 md:py-20 bg-obsidian border-b border-white/[0.03] relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading
        title="What dispatch confirms before pickup"
        subtitle="Urgent service works best when the important operating facts are explicit, job-specific, and agreed in advance."
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {confirmations.map(item => (
          <article key={item.title} className="glass-panel p-6 rounded-2xl border border-white/[0.04] hover:border-red-500/20 transition-colors">
            <div className="bg-red-950/20 border border-red-500/20 w-10 h-10 flex items-center justify-center mb-4 rounded-xl text-red-500">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed text-[13px] font-light">{item.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Need a specialized requirement? State it during the quote process. The website does not turn a requested feature into a promise; the accepted scope does.
      </p>
    </div>
  </section>
);
