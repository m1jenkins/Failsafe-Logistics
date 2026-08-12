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
  <section id="dispatch-confirmations" className="relative overflow-hidden border-b border-white/[0.03] bg-obsidian py-14 md:py-20">
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading
        title="What dispatch confirms before pickup"
        subtitle="Urgent service works best when the important operating facts are explicit, job-specific, and agreed in advance."
        align="center"
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {confirmations.map(item => (
          <article key={item.title} className="glass-panel rounded-2xl border border-white/[0.04] p-4 transition-colors hover:border-red-500/20 sm:p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-950/20 text-red-500 sm:mb-4 sm:h-10 sm:w-10">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">{item.title}</h3>
            <p className="text-[12px] font-light leading-relaxed text-slate-400 sm:text-[13px]">{item.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Need a specialized requirement? State it during the quote process. The website does not turn a requested feature into a promise; the accepted scope does.
      </p>
    </div>
  </section>
);
