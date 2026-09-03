import React from 'react';
import { ArrowRight, Clock, Plane, Truck } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const priorityServices = [
  {
    title: 'Hot Shot & Expedited Freight',
    description: 'Time-critical Austin-origin ground freight with vehicle, lane, cargo fit, and custody confirmed per job.',
    href: '/hot-shot-expedited-freight',
    icon: Truck,
    tag: 'Urgent ground'
  },
  {
    title: 'Airport Recovery / NFO / AOG',
    description: 'Austin airport recovery or tender requests subject to cargo release, documents, access, and handler rules.',
    href: '/airport-recovery-next-flight-out',
    icon: Plane,
    tag: 'Air and airport'
  },
  {
    title: 'Manufacturing Line-Down',
    description: 'Urgent parts transport planned around cargo dimensions, dock access, site contacts, and the requested handoff.',
    href: '/manufacturing-line-down-delivery',
    icon: Clock,
    tag: 'Urgent ground'
  }
];

const additionalServices = [
  ['Air hand carry / OBC', '/air-hand-carry-on-board-courier'],
  ['Legal document courier', '/legal-courier-court-filing'],
  ['High-value & secure items', '/high-value-secure-courier']
] as const;

export const Features: React.FC = () => (
  <section id="services" className="relative overflow-hidden bg-paper py-16 md:py-24">
    <div className="container mx-auto px-5 sm:px-6 relative z-10">
      <SectionHeading
        eyebrow="Services provided"
        title="Courier options built around the deadline"
        subtitle="Speedy Bat provides time-critical courier and freight solutions for urgent ground, airport, and manufacturing needs. Explore the services we offer and contact dispatch to discuss your shipment."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {priorityServices.map((item, index) => (
          <Reveal key={item.href} delay={index * 110}>
            <a
              href={item.href}
              className="card-lift group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 md:p-7 shadow-[0_14px_34px_-22px_rgba(22,24,29,0.25)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal-tint border border-signal/20 transition-colors duration-300 group-hover:bg-signal group-hover:border-signal">
                  <item.icon className="h-5 w-5 text-signal transition-colors duration-300 group-hover:text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft/70 font-display">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-ink mb-2.5 tracking-tight font-display leading-snug">{item.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
              <span className="inline-flex items-center gap-2 text-signal-strong text-xs font-bold uppercase tracking-[0.14em] font-display">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-2xl border border-dashed border-ink/15 bg-white/50 px-6 py-4">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft font-display">Also available</span>
          {additionalServices.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal-strong md:min-h-0"
            >
              {label}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={280} className="mt-8 flex justify-start">
        <a
          href="/services"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-paper transition-all duration-300 hover:-translate-y-px hover:bg-ink-deep"
        >
          Compare all services
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </div>
  </section>
);
