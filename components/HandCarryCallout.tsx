import React from 'react';
import { QuoteForm } from './QuoteForm';
import { Reveal } from './Reveal';

export const HandCarryCallout: React.FC = () => (
  <section id="quick-quote-form" className="scroll-mt-20 bg-signal py-16 md:py-24" aria-labelledby="quote-heading">
    <div className="mx-auto grid max-w-[1536px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
      <Reveal className="text-white lg:col-span-5 lg:pt-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">Get moving</p>
        <h2 id="quote-heading" className="display-face mt-5 max-w-xl text-[clamp(3rem,6vw,5.75rem)] uppercase leading-[0.86] text-white">Get a courier quote</h2>
        <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-white/85">Share the route, deadline, and item size. We’ll follow up with availability and price.</p>
        <div className="mt-10 hidden border-t border-white/30 pt-5 text-sm leading-relaxed text-white/75 lg:block">
          <p>Austin metro pickup</p>
          <p>Austin-origin routes</p>
        </div>
      </Reveal>
      <Reveal className="lg:col-span-7" delay={100}>
        <QuoteForm sourceName="Austin Main Page" routeId="" pageType="main" />
      </Reveal>
    </div>
  </section>
);
