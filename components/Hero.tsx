import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { QuoteForm } from './QuoteForm';
import { Reveal } from './Reveal';
import { scrollToElement } from '../utils/scrollHelper';

const ROUTE_PATH = 'M 24 64 C 130 10, 250 118, 360 58 S 480 22, 496 40';

export const Hero: React.FC = () => {
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionAllowed(false);
    }
  }, []);

  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('quick-quote-form');
    document.getElementById('pickupZip')?.focus({ preventScroll: true });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-paper">
      {/* Backdrops */}
      <div className="absolute inset-0 paper-grid pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-32 right-[-10%] h-[34rem] w-[52rem] max-w-full rounded-full bg-signal/[0.07] blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <img
        src="/austin-bats.webp"
        alt=""
        width="1717"
        height="916"
        className="halftone-fade pointer-events-none absolute bottom-0 left-1/2 w-full min-w-[64rem] -translate-x-1/2 opacity-[0.16] mix-blend-multiply"
        aria-hidden="true"
        loading="eager"
        fetchPriority="low"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Copy column */}
          <div className="space-y-7 lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 py-1.5 pl-3 pr-4 shadow-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft font-display">
                  Austin, TX · Service-area courier
                </span>
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.98] tracking-tight font-extrabold font-display text-ink">
                Urgent courier service{' '}
                <span className="relative whitespace-nowrap text-signal">
                  in Austin, TX
                  {/* Hand-drawn underline */}
                  <svg
                    viewBox="0 0 220 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-signal/45"
                    aria-hidden="true"
                  >
                    <path d="M3 9 C 60 2, 150 2, 217 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-xl text-lg md:text-xl leading-relaxed text-ink-soft">
                Quick dispatch review when timing matters.
              </p>
              <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-ink-soft/85">
                Request same-day, hot shot, line-down, airport recovery, air hand carry, legal-document, secure-item, or recurring courier service originating in the Austin metro. Dispatch confirms availability, pickup timing, vehicle, route, handling, custody, access, and any applicable coverage for each accepted job.
              </p>
            </Reveal>

            <Reveal delay={240} className="flex flex-wrap gap-3 pt-1">
              <a
                href="#quick-quote-form"
                onClick={focusQuoteForm}
                className="group inline-flex min-h-12 items-center gap-2 bg-signal hover:bg-signal-strong text-white font-bold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-px shadow-[0_18px_34px_-14px_rgba(232,73,15,0.6)]"
              >
                Request a job review
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+15129104938"
                className="group inline-flex min-h-12 items-center gap-2 bg-white/80 border border-ink/12 hover:border-ink/30 text-ink font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-300"
              >
                <Phone className="h-4 w-4 text-signal" />
                Call dispatch
              </a>
              <a
                href="sms:+15129104938"
                className="group inline-flex min-h-12 items-center gap-2 bg-white/80 border border-ink/12 hover:border-ink/30 text-ink font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-full transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4 text-signal" />
                Text dispatch
              </a>
            </Reveal>

            {/* Animated route diagram */}
            <Reveal delay={320} className="hidden sm:block max-w-xl pt-4" aria-hidden="true">
              <div className="relative">
                <svg viewBox="0 0 520 96" className="w-full" fill="none">
                  {/* Pickup node */}
                  <circle cx="24" cy="64" r="14" fill="#E8490F" opacity="0.14" />
                  <circle cx="24" cy="64" r="6" fill="#E8490F" />
                  {motionAllowed && (
                    <circle cx="24" cy="64" r="6" fill="#E8490F" className="pulse-ring" style={{ transformBox: 'fill-box' }} />
                  )}
                  {/* Route */}
                  <path d={ROUTE_PATH} stroke="#16181D" strokeOpacity="0.16" strokeWidth="2.5" strokeLinecap="round" />
                  <path d={ROUTE_PATH} stroke="#E8490F" strokeWidth="2.5" strokeLinecap="round" className="route-dash" />
                  {/* Destination node */}
                  <rect x="488" y="32" width="17" height="17" rx="4" fill="#16181D" />
                  <rect x="493" y="37" width="7" height="7" rx="1.5" fill="#FAF6EE" />
                  {/* Traveling courier dot */}
                  {motionAllowed && (
                    <circle r="5" fill="#16181D" stroke="#FAF6EE" strokeWidth="2">
                      <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={ROUTE_PATH} />
                    </circle>
                  )}
                </svg>
                <div className="mt-1 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] font-display text-ink-soft/75">
                  <span>Pickup · Austin metro</span>
                  <span>Destination · confirmed per job</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={200} className="lg:col-span-5">
            <div id="quick-quote-form" className="scroll-mt-28">
              <QuoteForm sourceName="Austin Main Page" routeId="" pageType="main" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
