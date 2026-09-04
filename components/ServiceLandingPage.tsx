import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { ServiceData } from '../types';
import { services } from '../data/services';
import { QuoteForm } from './QuoteForm';
import { Reveal } from './Reveal';
import { scrollToElement } from '../utils/scrollHelper';

interface ServiceLandingPageProps {
  service: ServiceData;
}

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({ service }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const relatedServices = service.relatedServiceIds.map(id => services[id]).filter(Boolean);

  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('service-quote');
    window.setTimeout(() => document.getElementById('pickupZip')?.focus({ preventScroll: true }), 350);
  };

  return (
    <main className="mt-[76px] bg-white lg:mt-[84px]">
      <section className="bg-ink py-16 text-white md:py-24" aria-labelledby="service-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-end lg:px-10">
          <div className="md:col-span-8">
            <a href="/services" className="inline-flex min-h-11 items-center text-sm font-bold text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white">All services</a>
            <h1 id="service-heading" className="display-face mt-5 max-w-5xl text-[clamp(3.2rem,7.2vw,6rem)] uppercase leading-[0.84] text-white">{service.headline}</h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-lg text-[18px] leading-relaxed text-white/75">{service.summary}</p>
            <a href="#service-quote" onClick={focusQuoteForm} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[5px] bg-signal px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">
              {service.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="good-for-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
          <h2 id="good-for-heading" className="display-face text-4xl uppercase leading-none text-ink md:col-span-4 md:text-6xl">Good for</h2>
          <ul className="divide-y divide-ink/20 border-y border-ink/20 md:col-span-7 md:col-start-6">
            {service.goodFor.map((item, index) => (
              <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 py-5 text-[18px] font-semibold leading-snug text-ink">
                <span className="text-sm font-bold text-signal">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <figure className="image-frame m-0 h-[52svh] min-h-[380px] max-h-[720px]">
        <img src={service.image} alt={service.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <figcaption className="absolute bottom-4 right-5 bg-ink/75 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white">Illustrative image</figcaption>
      </figure>

      <section className="bg-cream py-20 md:py-28" aria-labelledby="service-process-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-start lg:px-10">
          <h2 id="service-process-heading" className="display-face max-w-4xl text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.87] text-ink md:col-span-5">How it works</h2>
          <Reveal className="border-t border-ink/30 pt-6 md:col-span-6 md:col-start-7">
            <p className="max-w-2xl text-[clamp(1.25rem,2.1vw,1.75rem)] font-semibold leading-relaxed text-ink">{service.howItWorks}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1536px] gap-12 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
          <div className="border-t border-ink/25 pt-5 md:col-span-5">
            <h2 className="display-face text-4xl uppercase leading-none text-ink">What to send</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{service.whatToSend}</p>
          </div>
          <div className="border-t border-ink/25 pt-5 md:col-span-5 md:col-start-8">
            <h2 className="display-face text-4xl uppercase leading-none text-ink">Before you book</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{service.beforeYouBook}</p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-28" aria-labelledby="service-faq-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
          <h2 id="service-faq-heading" className="display-face text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.87] text-white md:col-span-5">Service questions</h2>
          <div className="border-t border-white/25 md:col-span-6 md:col-start-7">
            {service.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article key={item.question} className="border-b border-white/25">
                  <h3>
                    <button id={`service-faq-button-${index}`} type="button" onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="flex min-h-20 w-full items-center justify-between gap-5 py-5 text-left text-[17px] font-bold text-white hover:text-signal" aria-expanded={isOpen} aria-controls={`service-faq-panel-${index}`}>
                      <span>{item.question}</span>
                      {isOpen ? <Minus className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />}
                    </button>
                  </h3>
                  <div id={`service-faq-panel-${index}`} className={`accordion-panel ${isOpen ? 'open' : ''}`} role="region" aria-labelledby={`service-faq-button-${index}`} hidden={!isOpen}>
                    <div><p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-white/70">{item.answer}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" aria-labelledby="related-services-heading">
        <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
          <h2 id="related-services-heading" className="text-sm font-bold uppercase tracking-[0.16em] text-ink-soft">Related services</h2>
          <div className="mt-5 grid border-t border-ink/20 md:grid-cols-3">
            {relatedServices.map(related => (
              <a key={related.id} href={`/${related.id}`} className="group flex min-h-28 items-center justify-between gap-5 border-b border-ink/20 py-5 text-ink md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
                <span className="display-face text-xl uppercase leading-none group-hover:text-signal">{related.name}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="service-quote" className="scroll-mt-24 bg-signal py-16 md:py-24" aria-labelledby="service-quote-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
          <div className="text-white lg:col-span-5 lg:pt-3">
            <h2 id="service-quote-heading" className="display-face text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.87] text-white">{service.cta}</h2>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-white/85">Share the route, deadline, and item size. We’ll follow up with availability and price.</p>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm sourceName={service.name} routeId={service.id} pageType="service" />
          </div>
        </div>
      </section>
    </main>
  );
};
