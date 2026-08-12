import React from 'react';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { QuoteForm } from './QuoteForm';
import { scrollToElement } from '../utils/scrollHelper';

export const Hero: React.FC = () => {
  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('quick-quote-form');
    document.getElementById('fullName')?.focus({ preventScroll: true });
  };

  return (
    <section id="hero" className="relative min-h-[auto] lg:min-h-screen flex items-center pt-24 pb-10 lg:py-28 overflow-hidden bg-obsidian">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-obsidian/40 to-obsidian z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
        <img
          src="/austin-bats.webp"
          alt="Austin skyline and bats at dusk"
          className="w-full h-full object-cover object-center lg:object-right opacity-30 mix-blend-lighten"
          width="1024"
          height="1024"
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10" />

      <div className="container mx-auto px-6 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display">
              Austin-based service-area courier · urgent B2B requests
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.03] tracking-tight font-display">
              Urgent Courier Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">in Austin, TX</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-display font-bold">
              The courier Austin calls <span className="hero-emphasis">at 2am</span>
            </p>
            <div className="backdrop-blur-md bg-white/[0.02] border border-white/[0.04] rounded-2xl p-5 shadow-xl shadow-black/30 max-w-2xl space-y-3">
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Request same-day, hot shot, line-down, airport recovery, air hand carry, legal-document, secure-item, or recurring courier service originating in the Austin metro.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Dispatch confirms availability, pickup timing, vehicle, route, handling, custody, access, and any applicable coverage for each accepted job.
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
