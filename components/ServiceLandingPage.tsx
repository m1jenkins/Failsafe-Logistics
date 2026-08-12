import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Cpu,
  EyeOff,
  FileText,
  Globe,
  MapPin,
  Minus,
  Plane,
  Plus,
  Shield,
  Truck
} from 'lucide-react';
import { ServiceData } from '../types';
import { services } from '../data/services';
import { QuoteForm } from './QuoteForm';
import { scrollToElement } from '../utils/scrollHelper';

interface ServiceLandingPageProps {
  service: ServiceData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Briefcase,
  Calendar,
  Clock,
  Cpu,
  EyeOff,
  FileText,
  Globe,
  MapPin,
  Plane,
  Shield,
  Truck
};

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({ service }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const relatedServices = service.relatedServiceIds
    .map(id => services[id])
    .filter((related): related is ServiceData => Boolean(related));

  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('quick-quote-form');
    document.getElementById('fullName')?.focus({ preventScroll: true });
  };

  return (
    <main className="relative pt-24 pb-16 min-h-screen bg-obsidian">
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" aria-labelledby="service-heading">
          <div className="lg:col-span-7 space-y-6">
            <a href="/services" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 font-display">
              <span aria-hidden="true">&larr;</span>
              All courier services
            </a>
            <div className="space-y-4">
              <p className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display">
                {service.group} · Austin origin
              </p>
              <h1 id="service-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight font-display">
                {service.name}
              </h1>
              <p className="text-slate-300 text-xl sm:text-2xl font-light leading-relaxed">
                {service.tagline}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] max-w-2xl space-y-4">
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                {service.overview}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-red-500/60 pl-4">
                Availability, pickup timing, vehicle, route, handling, custody documentation, airport or facility access, and any applicable coverage are confirmed by dispatch for each job.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#quick-quote-form"
                onClick={focusQuoteForm}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center gap-2 font-display"
              >
                Request dispatch review
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+15129104938" className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-200 font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full transition-colors font-display">
                Call (512) 910-4938
              </a>
              <a href="sms:+15129104938" className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-200 font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full transition-colors font-display">
                Text dispatch
              </a>
            </div>
          </div>

          <div className="lg:col-span-5" id="quick-quote-form">
            <QuoteForm sourceName={service.name} routeId={service.id} pageType="service" />
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="eligibility-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-7 rounded-2xl">
              <h2 id="eligibility-heading" className="text-xl font-extrabold text-white uppercase tracking-wider font-display mb-5">
                Eligibility
              </h2>
              <ul className="space-y-4">
                {service.eligibility.map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <CheckCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-7 rounded-2xl">
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-display mb-5">
                Limits to know first
              </h2>
              <ul className="space-y-4">
                {service.limits.map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <span className="text-red-500 font-bold" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="process-heading">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 id="process-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                How this service works
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
                The exact job configuration is decided from the request—not inferred from a generic service label.
              </p>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.process.map((step, index) => (
                <li key={step} className="glass-panel p-6 rounded-2xl">
                  <div className="text-red-500 text-sm font-black font-display mb-3">0{index + 1}</div>
                  <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="capabilities-heading">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 id="capabilities-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Request scope
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
                These are requests dispatch can evaluate. They are not blanket promises of availability or acceptance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {service.features.map(feature => {
                const Icon = iconMap[feature.iconName] || Shield;
                return (
                  <article key={feature.title} className="glass-panel p-7 rounded-2xl">
                    <div className="bg-red-950/20 border border-red-500/20 w-11 h-11 flex items-center justify-center mb-5 rounded-xl">
                      <Icon className="text-red-500 h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white uppercase mb-2 tracking-wider font-display">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="glass-panel p-7 rounded-2xl max-w-4xl mx-auto">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.capabilities.map(capability => (
                  <li key={capability} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <CheckCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="exceptions-heading">
          <div className="max-w-4xl mx-auto glass-panel p-7 md:p-9 rounded-2xl">
            <h2 id="exceptions-heading" className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider font-display mb-5">
              Exceptions and decision points
            </h2>
            <ul className="space-y-4">
              {service.exceptions.map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span className="text-red-500 font-bold" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="service-faq-heading">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 id="service-faq-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Service questions
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Answers state the conditions that matter before dispatch can accept a job.
              </p>
            </div>
            <div className="space-y-3">
              {service.faq.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <article key={item.question} className="glass-panel rounded-2xl overflow-hidden">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full px-6 py-5 flex justify-between items-center text-left text-white hover:text-red-400 font-display font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        {isOpen ? <Minus className="h-4 w-4 text-red-500 shrink-0 ml-4" /> : <Plus className="h-4 w-4 text-red-500 shrink-0 ml-4" />}
                      </button>
                    </h3>
                    <div className={isOpen ? 'border-t border-white/[0.04]' : 'hidden'}>
                      <p className="p-6 text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/[0.04]" aria-labelledby="related-services-heading">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 id="related-services-heading" className="text-2xl font-extrabold text-white uppercase tracking-wider font-display">
                Related decisions
              </h2>
              <p className="text-slate-400 text-sm">Compare adjacent service types or check Austin pickup coverage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map(related => (
                <a key={related.id} href={`/${related.id}`} className="glass-panel p-5 rounded-xl text-slate-300 hover:text-white border border-white/[0.04] hover:border-red-500/20 transition-colors">
                  <span className="block text-sm font-bold uppercase tracking-wider font-display mb-2">{related.name}</span>
                  <span className="text-xs text-slate-500">Review eligibility and limits <span aria-hidden="true">→</span></span>
                </a>
              ))}
              <a href="/service-areas" className="glass-panel p-5 rounded-xl text-slate-300 hover:text-white border border-white/[0.04] hover:border-red-500/20 transition-colors">
                <span className="block text-sm font-bold uppercase tracking-wider font-display mb-2">Austin service areas</span>
                <span className="text-xs text-slate-500">Pickup versus destination coverage <span aria-hidden="true">→</span></span>
              </a>
            </div>
            <p className="text-center text-xs text-slate-500">
              Reviewed by Speedy Bat Operations · <time dateTime={service.lastReviewed}>August 12, 2026</time>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
