import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const steps = [
  { title: 'Send the basics', copy: 'Give us the pickup, destination, deadline, item type, and approximate size.' },
  { title: 'Confirm the job', copy: 'Dispatch confirms availability, price, service, and handoff details.' },
  { title: 'Hand it over', copy: 'The courier completes the accepted route and provides the update or delivery confirmation arranged for the job.' }
];

const imageStrip = [
  { src: '/courier-handoff-illustrative.webp', alt: 'A parcel handoff at a business entrance.' },
  { src: '/courier-airport-illustrative.webp', alt: 'A compact courier van outside a public airport cargo terminal.' },
  { src: '/courier-scheduled-illustrative.webp', alt: 'Organized parcels prepared for a scheduled business pickup.' }
];

export const ServiceArea: React.FC = () => (
  <>
    <section className="bg-ink py-20 text-white md:py-28" aria-labelledby="home-process-heading">
      <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
        <Reveal className="grid gap-6 border-b border-white/20 pb-10 md:grid-cols-12 md:items-end md:pb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 md:col-span-3 md:self-start md:pt-2">How it works</p>
          <h2 id="home-process-heading" className="display-face text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[0.88] text-white md:col-span-7">Three steps from request to delivery</h2>
          <a href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-white/40 underline-offset-4 md:col-span-2 md:justify-self-end">See how it works <ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 80} className="border-t border-white/30 pt-5">
              <span className="display-face text-5xl text-signal">{index + 1}</span>
              <h3 className="display-face mt-8 text-2xl uppercase leading-none text-white">{step.title}</h3>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-white/70">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="bg-white py-20 md:py-28" aria-labelledby="home-area-heading">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
        <Reveal className="md:col-span-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-signal">Service area</p>
          <h2 id="home-area-heading" className="display-face mt-5 max-w-4xl text-[clamp(3rem,6vw,5.75rem)] uppercase leading-[0.86] text-ink">Pickup in Austin. Delivery where the job needs to go.</h2>
        </Reveal>
        <Reveal className="md:col-span-4 md:col-start-9 md:self-end" delay={100}>
          <p className="text-[18px] leading-relaxed text-ink-soft">We handle pickup requests across the Austin metro. Ask about direct delivery to other Texas cities and longer Austin-origin routes.</p>
          <p className="mt-5 border-t border-ink/20 pt-5 text-sm font-semibold leading-relaxed text-ink">Availability depends on the route, deadline, cargo, and vehicle needed.</p>
          <a href="/service-areas" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:text-signal">Check the service area <ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>

    <section className="grid grid-cols-1 bg-ink md:grid-cols-12" aria-label="Courier work in context">
      {imageStrip.map((image, index) => (
        <figure key={image.src} className={`image-frame m-0 h-[280px] md:h-[420px] ${index === 1 ? 'md:col-span-5' : index === 0 ? 'md:col-span-3' : 'md:col-span-4'}`}>
          <img src={image.src} alt={image.alt} width="1536" height="1024" loading="lazy" className="h-full w-full object-cover" />
          <figcaption className="absolute bottom-3 right-3 bg-ink/75 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white">Illustrative image</figcaption>
        </figure>
      ))}
    </section>

    <section className="bg-signal py-16 text-white md:py-20" aria-labelledby="home-close-heading">
      <div className="mx-auto flex max-w-[1536px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <Reveal>
          <h2 id="home-close-heading" className="display-face text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.84] text-white">Where does it need to go?</h2>
          <p className="mt-5 text-[18px] text-white/85">Send the route and deadline for a quote.</p>
        </Reveal>
        <Reveal className="flex shrink-0 flex-wrap gap-3" delay={100}>
          <a href="/#quick-quote-form" className="inline-flex min-h-12 items-center rounded-[5px] bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-white">Get a quote</a>
          <a href="tel:+15129104938" className="inline-flex min-h-12 items-center rounded-[5px] border border-white/50 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">Call (512) 910-4938</a>
          <a href="sms:+15129104938" className="inline-flex min-h-12 items-center rounded-[5px] border border-white/50 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">Text us</a>
        </Reveal>
      </div>
    </section>
  </>
);
