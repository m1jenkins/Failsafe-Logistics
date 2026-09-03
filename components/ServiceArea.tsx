import React from 'react';
import { ArrowRight, CheckCircle, FileText, ShieldCheck, Truck } from 'lucide-react';
import { Reveal } from './Reveal';

const planningSteps = [
  {
    icon: FileText,
    number: '01',
    title: 'Start with the shipment details',
    description: 'Have the pickup and delivery ZIP codes, deadline, cargo category, dimensions, weight, packaging, site access, and authorized contacts ready.',
    note: 'Clear inputs help dispatch evaluate the request accurately.'
  },
  {
    icon: Truck,
    number: '02',
    title: 'Match the route to the deadline',
    description: 'Direct ground delivery may fit cargo that can reach its destination by road. Airport recovery, next-flight-out, and air hand carry solve different time and handling constraints.',
    note: 'The practical option depends on the actual lane, cargo, traffic, flights, and handoff.'
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Define the handoff and receipt',
    description: 'Tell dispatch who can release and receive the shipment, what updates matter, and whether you need a signed receipt, delivery confirmation, or another agreed record.',
    note: 'Keep IDs, access codes, financial details, and other sensitive data out of the public form.'
  }
];

export const ServiceArea: React.FC = () => (
  <section
    id="courier-planning-guide"
    className="relative overflow-hidden bg-cream py-16 md:py-24 border-t border-ink/8"
    aria-labelledby="courier-planning-heading"
  >
    <div className="container mx-auto px-5 sm:px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-soft mb-4 font-display">
              <span className="h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true" />
              Planning guide
            </p>
            <h2
              id="courier-planning-heading"
              className="text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.06] font-extrabold tracking-tight text-ink font-display"
            >
              How to plan an urgent courier shipment
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-ink-soft">
              The right delivery approach depends on the deadline, cargo, route, and handoff requirements. Use this quick guide to prepare a clear dispatch request.
            </p>
          </Reveal>

          <Reveal delay={160} className="mt-8 flex flex-col gap-3">
            <a
              href="/how-it-works"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-signal px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-px hover:bg-signal-strong shadow-[0_16px_30px_-14px_rgba(232,73,15,0.55)] sm:w-fit"
            >
              See how dispatch reviews a request
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/services"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink/35 sm:w-fit"
            >
              Compare courier services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <ol className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {planningSteps.map(({ icon: Icon, number, title, description, note }, index) => (
            <Reveal key={number} delay={index * 120} as="li">
              <article className="card-lift flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 md:p-7 shadow-[0_14px_34px_-24px_rgba(22,24,29,0.25)]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-parchment">{number}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-tint border border-signal/20">
                    <Icon className="h-5 w-5 text-signal" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-ink mb-2.5 font-display leading-snug">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft mb-5 flex-1">{description}</p>
                <p className="flex items-start gap-2 border-t border-dashed border-ink/12 pt-4 text-xs leading-relaxed text-ink-soft/80">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                  <span>{note}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
