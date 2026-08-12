import React from 'react';
import { ArrowRight, Clock, Plane, Truck } from 'lucide-react';

const priorityServices = [
  {
    title: 'Hot Shot & Expedited Freight',
    description: 'Time-critical Austin-origin ground freight with vehicle, lane, cargo fit, and custody confirmed per job.',
    href: '/hot-shot-expedited-freight',
    icon: Truck
  },
  {
    title: 'Airport Recovery / NFO / AOG',
    description: 'Austin airport recovery or tender requests subject to cargo release, documents, access, and handler rules.',
    href: '/airport-recovery-next-flight-out',
    icon: Plane
  },
  {
    title: 'Manufacturing Line-Down',
    description: 'Urgent parts transport planned around cargo dimensions, dock access, site contacts, and the requested handoff.',
    href: '/manufacturing-line-down-delivery',
    icon: Clock
  }
];

const additionalServices = [
  ['Air hand carry / OBC', '/air-hand-carry-on-board-courier'],
  ['Legal document courier', '/legal-courier-court-filing'],
  ['High-value & secure items', '/high-value-secure-courier']
] as const;

export const Features: React.FC = () => (
  <section id="services" className="relative overflow-hidden border-b border-white/[0.03] bg-obsidian py-14 md:py-24">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-ember/15 to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="mb-8 max-w-3xl space-y-4 md:mb-12">
        <p className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display">Priority courier services</p>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white font-display tracking-tight leading-tight">
          Start with the shipment’s real constraint
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Choose the closest service type, then let dispatch qualify the cargo, route, deadline, access, and handoffs. A service page explains what is eligible, what is not assumed, and which details affect acceptance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {priorityServices.map(item => (
          <a key={item.href} href={item.href} className="group glass-panel rounded-2xl border border-white/[0.04] p-6 transition-colors hover:border-red-500/20 md:p-7">
            <div className="bg-red-950/20 border border-red-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
              <item.icon className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-base font-bold uppercase text-white mb-3 tracking-wider font-display">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.description}</p>
            <span className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider font-display">
              Review eligibility and limits
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-xs font-bold uppercase tracking-wider font-display">
        <span className="w-full text-slate-400 md:w-auto">Also available:</span>
        {additionalServices.map(([label, href]) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center text-slate-300 transition-colors hover:text-red-500 md:min-h-0">
            {label}
          </a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white hover:border-red-500/30 text-sm font-bold uppercase tracking-wider font-display transition-colors">
          Compare all services
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);
