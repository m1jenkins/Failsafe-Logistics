import React from 'react';
import { ClipboardCheck, Clock, MapPin, Plane, ShieldCheck, Truck } from 'lucide-react';

const LAST_REVIEWED = '2026-08-12';

const operatingPrinciples = [
  {
    icon: MapPin,
    title: 'Austin Based',
    description: 'Speedy Bat operates as one Austin-based service-area courier business. Routine pickup is limited to the Austin metro.'
  },
  {
    icon: Clock,
    title: 'Requests Reviewed',
    description: 'Urgent requests can be submitted at any time. Dispatch confirms acceptance and timing for each job.'
  },
  {
    icon: Truck,
    title: 'Vehicle Fit',
    description: 'Cargo dimensions, weight, loading conditions, and handling needs inform the vehicle proposed in a quote.'
  },
  {
    icon: ClipboardCheck,
    title: 'Defined Scope',
    description: 'The accepted scope identifies the route, material handoffs, update method, and requested receipt evidence.'
  },
  {
    icon: Plane,
    title: 'Air Requests',
    description: 'Airport recovery and accompanied-air requests are evaluated against access, carrier, screening, and document rules.'
  },
  {
    icon: ShieldCheck,
    title: 'Limits Up Front',
    description: 'Coverage, custody, special handling, screening, and security details are job-specific rather than blanket promises.'
  }
] as const;

export const AboutPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white font-display tracking-tight">
            Austin-Based Courier Service
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Speedy Bat evaluates urgent business courier requests that originate in the Austin metro. Dispatch reviews the route, deadline, cargo, vehicle, access, and handling details before accepting a job.
          </p>
        </header>

        <section className="glass-panel-elevated p-8 md:p-12 rounded-3xl border border-white/[0.06] relative overflow-hidden mb-12" aria-labelledby="operating-model-heading">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <h2 id="operating-model-heading" className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
              A Job-Specific Operating Model
            </h2>
            <p className="text-slate-300 font-light text-base leading-relaxed">
              Courier jobs differ by cargo, lane, deadline, site access, and risk. Speedy Bat asks for enough non-sensitive information to decide whether a request fits, then confirms the accepted configuration before pickup.
            </p>
            <p className="text-slate-400 font-light text-sm leading-relaxed">
              Vehicle, routing, custody, tracking, handling, airport access, insurance coverage, and timing are not universal. When one of those details matters, it belongs in the accepted quote or job scope.
            </p>
          </div>
        </section>

        <section aria-labelledby="principles-heading" className="mb-12">
          <div className="text-center mb-8 space-y-3">
            <h2 id="principles-heading" className="text-2xl md:text-3xl font-extrabold uppercase text-white font-display tracking-wider">
              How Requests Are Evaluated
            </h2>
            <p className="text-slate-400 text-sm font-light max-w-2xl mx-auto leading-relaxed">
              These principles describe the public request process; the accepted scope controls the details of an individual job.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatingPrinciples.map((item) => (
              <article key={item.title} className="glass-panel p-7 rounded-2xl group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-white/[0.02] border border-white/[0.06] w-10 h-10 flex items-center justify-center mb-4 group-hover:border-ember/30 group-hover:bg-red-950/20 transition-all duration-300 rounded-xl">
                  <item.icon className="text-slate-400 h-4.5 w-4.5 group-hover:text-red-500 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-xs font-light">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel p-8 md:p-10 rounded-2xl text-center space-y-4 mb-12" aria-labelledby="coverage-heading">
          <h2 id="coverage-heading" className="text-lg font-bold uppercase text-white font-display tracking-wider">
            Austin Pickup, Austin-Origin Destinations
          </h2>
          <p className="text-slate-400 font-light text-sm leading-relaxed max-w-2xl mx-auto">
            Routine pickup is limited to the Austin metro and remains subject to dispatch confirmation. Farther cities may be quoted as destinations for accepted Austin-origin jobs; they are not represented as staffed Speedy Bat locations or routine local pickup markets.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="/service-areas" className="text-xs font-bold uppercase tracking-wider font-display text-red-500 hover:text-red-400 transition-colors">
              Review Service Areas
            </a>
            <span className="text-slate-700" aria-hidden="true">•</span>
            <a href="/how-it-works" className="text-xs font-bold uppercase tracking-wider font-display text-red-500 hover:text-red-400 transition-colors">
              See How Dispatch Works
            </a>
          </div>
        </section>

        <div className="text-center space-y-5">
          <p className="text-slate-500 text-xs font-light">
            Reviewed by Speedy Bat Operations · {LAST_REVIEWED}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/#quick-quote-form"
              className="inline-flex items-center bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 text-white px-7 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/20 rounded-full border border-red-500/20"
            >
              Request a Quote
            </a>
            <a
              href="sms:+15129104938"
              className="inline-flex items-center bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white px-7 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full border border-white/[0.08]"
            >
              Text Dispatch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
