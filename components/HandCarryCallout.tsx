import React from 'react';
import { ArrowRight, CheckCircle, Plane, Truck } from 'lucide-react';

const comparisons = [
  {
    icon: Truck,
    title: 'Direct ground',
    bestFor: 'Time-critical cargo that can meet the deadline by road.',
    checks: ['Cargo fit and vehicle', 'Safe route and drive plan', 'Site access and recipient window'],
    href: '/hot-shot-expedited-freight'
  },
  {
    icon: Plane,
    title: 'Next-flight-out support',
    bestFor: 'Airport tender, recovery, or transfer tasks tied to an available flight.',
    checks: ['Release or tender documents', 'Airline or handler rules', 'Onward ground handoff'],
    href: '/airport-recovery-next-flight-out'
  },
  {
    icon: Plane,
    title: 'Air hand carry',
    bestFor: 'Eligible small shipments that may benefit from an accompanying traveler.',
    checks: ['Traveler and flight availability', 'Screening and carrier rules', 'Item documents and destination entry'],
    href: '/air-hand-carry-on-board-courier'
  }
];

export const HandCarryCallout: React.FC = () => (
  <section className="py-20 border-b border-white/[0.03] bg-deep-space" aria-labelledby="route-choice-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <p className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display">Ground or air?</p>
        <h2 id="route-choice-heading" className="text-3xl md:text-5xl font-extrabold uppercase text-white font-display tracking-tight">
          Choose the route from the deadline backward
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Direct ground, next-flight-out support, and air hand carry solve different constraints. Dispatch compares the actual lane, cargo, documents, access, and deadline before proposing one.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {comparisons.map(item => (
          <article key={item.title} className="glass-panel p-7 rounded-2xl flex flex-col">
            <div className="bg-blue-950/20 border border-blue-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
              <item.icon className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold uppercase text-white mb-3 tracking-wider font-display">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.bestFor}</p>
            <ul className="space-y-3 mb-7 flex-1">
              {item.checks.map(check => (
                <li key={check} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
            <a href={item.href} className="inline-flex items-center justify-between gap-3 w-full p-4 rounded-xl bg-white/[0.03] hover:bg-blue-950/20 border border-white/[0.05] hover:border-blue-500/20 text-white font-bold uppercase tracking-wider text-xs font-display transition-colors">
              Review this service
              <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
