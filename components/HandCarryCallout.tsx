import React from 'react';
import { ArrowRight, CheckCircle, Plane, Truck } from 'lucide-react';
import { Reveal } from './Reveal';

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
  <section className="relative overflow-hidden bg-ink py-16 md:py-24" aria-labelledby="route-choice-heading">
    <div className="absolute inset-0 ink-grid pointer-events-none" aria-hidden="true" />
    <div
      className="absolute -bottom-48 left-[-8%] h-96 w-[46rem] max-w-full rounded-full bg-signal/[0.09] blur-[120px] pointer-events-none"
      aria-hidden="true"
    />

    <div className="container mx-auto px-5 sm:px-6 relative z-10">
      <Reveal className="max-w-3xl mx-auto text-center space-y-5 mb-12 md:mb-16">
        <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-paper/55 font-display">
          <span className="h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true" />
          Route choice
          <span className="hidden sm:inline-block h-px w-10 bg-signal/50" aria-hidden="true" />
        </p>
        <h2 id="route-choice-heading" className="text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-paper font-display">
          Choose the route from the deadline backward
        </h2>
        <p className="text-paper/65 leading-relaxed text-base md:text-lg">
          Direct ground, next-flight-out support, and air hand carry solve different constraints. Dispatch compares the actual lane, cargo, documents, access, and deadline before proposing one.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {comparisons.map((item, index) => (
          <Reveal key={item.title} delay={index * 110} as="article" className="flex">
            <div className="card-lift flex flex-col rounded-2xl border border-paper/12 bg-paper/[0.05] p-6 md:p-7 backdrop-blur-sm transition-colors hover:border-paper/25 w-full">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-signal/40 bg-signal/15">
                <item.icon className="h-5 w-5 text-signal" />
              </div>
              <h3 className="text-lg font-bold text-paper mb-2 tracking-tight font-display leading-snug">{item.title}</h3>
              <p className="text-paper/60 text-sm leading-relaxed mb-6">{item.bestFor}</p>
              <ul className="space-y-3 mb-7 flex-1">
                {item.checks.map(check => (
                  <li key={check} className="flex items-start gap-2.5 text-paper/80 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
              <a
                href={item.href}
                className="group inline-flex items-center justify-between gap-3 w-full rounded-xl border border-paper/12 bg-paper/[0.04] p-4 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-all duration-300 hover:border-signal/50 hover:bg-signal/10"
              >
                Review this service
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
