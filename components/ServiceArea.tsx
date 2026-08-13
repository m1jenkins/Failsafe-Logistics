import React from 'react';
import { ArrowRight, CheckCircle, FileText, ShieldCheck, Truck } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const planningSteps = [
  {
    icon: FileText,
    title: 'Start with the shipment details',
    description: 'Have the pickup and delivery ZIP codes, deadline, cargo category, dimensions, weight, packaging, site access, and authorized contacts ready.',
    note: 'Clear inputs help dispatch evaluate the request accurately.'
  },
  {
    icon: Truck,
    title: 'Match the route to the deadline',
    description: 'Direct ground delivery may fit cargo that can reach its destination by road. Airport recovery, next-flight-out, and air hand carry solve different time and handling constraints.',
    note: 'The practical option depends on the actual lane, cargo, traffic, flights, and handoff.'
  },
  {
    icon: ShieldCheck,
    title: 'Define the handoff and receipt',
    description: 'Tell dispatch who can release and receive the shipment, what updates matter, and whether you need a signed receipt, delivery confirmation, or another agreed record.',
    note: 'Keep IDs, access codes, financial details, and other sensitive data out of the public form.'
  }
];

export const ServiceArea: React.FC = () => (
  <section id="courier-planning-guide" className="relative overflow-hidden bg-obsidian py-14 md:py-20" aria-labelledby="courier-planning-heading">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ember/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeading
        headingId="courier-planning-heading"
        title="How to Plan an Urgent Courier Shipment"
        subtitle="The right delivery approach depends on the deadline, cargo, route, and handoff requirements. Use this quick guide to prepare a clear dispatch request."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {planningSteps.map(({ icon: Icon, title, description, note }) => (
          <article key={title} className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="bg-red-950/20 border border-red-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
              <Icon className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>
            <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
              <CheckCircle className="h-4 w-4 shrink-0 text-red-500/80" />
              <span>{note}</span>
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 text-center">
        <a href="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold uppercase tracking-wider font-display">
          See how dispatch reviews a request
          <ArrowRight className="h-4 w-4" />
        </a>
        <a href="/services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white hover:border-red-500/30 text-sm font-bold uppercase tracking-wider font-display transition-colors">
          Compare courier services
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);
