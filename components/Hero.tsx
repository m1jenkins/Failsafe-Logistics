import React from 'react';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { QuoteForm } from './QuoteForm';
import { scrollToElement } from '../utils/scrollHelper';

export const Hero: React.FC = () => {
  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('quick-quote-form');
    document.getElementById('pickupZip')?.focus({ preventScroll: true });
  };

  return (
    <section id="hero" className="relative flex min-h-[auto] items-center overflow-hidden bg-obsidian pb-8 pt-24 lg:min-h-screen lg:py-24">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[70%]">
        <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-obsidian/25 to-obsidian" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-transparent to-obsidian/15" />
        <img
          src="/austin-bats.webp"
          alt="Austin skyline and bats at dusk"
          className="h-full w-full object-cover object-center opacity-45 mix-blend-lighten lg:object-right"
          width="1024"
          height="1024"
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

      <div className="container mx-auto px-6 md:px-8 relative z-20">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="space-y-4 lg:col-span-7 lg:space-y-5">
            <p className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display">
              Austin-based courier for businesses and individuals
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.03] tracking-tight font-display">
              Urgent Courier Service <span className="text-red-500">in Austin, TX</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-display font-bold">
              Quick dispatch review when timing matters.
            </p>
            <div className="max-w-2xl rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 shadow-xl shadow-black/30 backdrop-blur-md sm:p-5">
              <p className="text-sm font-light leading-relaxed text-slate-300 md:text-base">
                Request same-day, hot shot, line-down, airport recovery, air hand carry, legal-document, secure-item, or recurring courier service originating in the Austin metro.
                <span className="mt-2 block text-slate-400">Dispatch confirms availability, pickup timing, vehicle, route, handling, custody, access, and any applicable coverage for each accepted job.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#quick-quote-form" onClick={focusQuoteForm} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-5 sm:px-6 py-3.5 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center gap-2 font-display">
                Request a job review
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+15129104938" className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-5 py-3.5 rounded-full inline-flex items-center gap-2 font-display">
                <Phone className="h-4 w-4 text-red-500" />
                Call dispatch
              </a>
              <a href="sms:+15129104938" className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-5 py-3.5 rounded-full inline-flex items-center gap-2 font-display">
                <MessageSquare className="h-4 w-4 text-red-500" />
                Text dispatch
              </a>
            </div>
          </div>

          <div className="lg:col-span-5" id="quick-quote-form">
            <QuoteForm sourceName="Austin Main Page" routeId="" pageType="main" />
          </div>
        </div>
      </div>
    </section>
  );
};
