import React from 'react';
import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';

const serviceLinks = [
  ['Hot Shot & Expedited', '/hot-shot-expedited-freight'],
  ['Airport Recovery / NFO / AOG', '/airport-recovery-next-flight-out'],
  ['Manufacturing Line-Down', '/manufacturing-line-down-delivery'],
  ['Air Hand Carry / OBC', '/air-hand-carry-on-board-courier'],
  ['Legal Document Courier', '/legal-courier-court-filing'],
  ['All Services', '/services']
] as const;

const companyLinks = [
  ['Service Areas', '/service-areas'],
  ['How It Works', '/how-it-works'],
  ['About', '/about'],
  ['FAQ', '/faq'],
  ['Privacy', '/privacy'],
  ['Service Terms', '/terms']
] as const;

export const Footer: React.FC = () => (
  <footer role="contentinfo" className="relative overflow-hidden bg-ink text-paper">
    <div className="absolute inset-0 ink-grid pointer-events-none" aria-hidden="true" />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[42rem] max-w-full rounded-full bg-signal/10 blur-[120px] pointer-events-none" aria-hidden="true" />

    {/* Contact strip */}
    <div className="relative border-b border-paper/10">
      <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-paper/55 font-display">
            <span className="h-[6px] w-[6px] rounded-full bg-signal" aria-hidden="true" />
            Dispatch is reviewing requests now
          </p>
          <h2 className="text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.04] font-extrabold tracking-tight font-display text-paper">
            Have an urgent job that starts in Austin?
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/#quick-quote-form"
            className="inline-flex min-h-12 items-center gap-2 bg-signal hover:bg-signal-strong text-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:-translate-y-px shadow-[0_16px_32px_-14px_rgba(232,73,15,0.65)]"
          >
            Request a review
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+15129104938"
            className="inline-flex min-h-12 items-center gap-2 border border-paper/15 hover:border-paper/40 text-paper px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
          >
            <Phone className="h-4 w-4 text-signal" />
            Call
          </a>
          <a
            href="sms:+15129104938"
            className="inline-flex min-h-12 items-center gap-2 border border-paper/15 hover:border-paper/40 text-paper px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-full transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-signal" />
            Text
          </a>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-6 relative z-10 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-28 md:pb-16">
        <div className="md:col-span-5 space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-paper/50 font-display">Speedy Bat Couriers</p>
          <p className="text-paper/70 text-sm leading-relaxed max-w-sm">
            Urgent courier requests for businesses and individuals originating in the Austin metro. Dispatch confirms availability, timing, vehicle, route, handling, custody, access, and applicable coverage for each accepted job.
          </p>
          <p className="text-[11px] leading-relaxed text-paper/45 max-w-md border-l-2 border-signal/50 pl-3">
            Do not submit health information, patient names, IDs, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS.
          </p>
        </div>

        <nav className="md:col-span-4" aria-label="Priority services">
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-paper/50 font-display mb-5">Priority services</h2>
          <ul className="space-y-1">
            {serviceLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-paper/75 hover:text-paper transition-colors md:min-h-0 md:py-1.5">
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-signal opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Company and policies">
          <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-paper/50 font-display mb-5">Company &amp; policies</h2>
          <ul className="space-y-1">
            {companyLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-paper/75 hover:text-paper transition-colors md:min-h-0 md:py-1.5">
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-signal opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="pt-6 border-t border-paper/10 flex flex-col sm:flex-row justify-between gap-3 text-paper/40 text-[11px] tracking-widest uppercase font-mono" suppressHydrationWarning>
        <span>&copy; {new Date().getFullYear()} Speedy Bat Couriers · Austin, TX · All rights reserved.</span>
        <span>speedybat.com</span>
      </div>
    </div>

    {/* Courier vehicle */}
    <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] z-0 opacity-90 transition-transform duration-500 ease-out hover:-translate-y-2">
      <img src="/speedybat-crossover.webp" alt="" width="1666" height="944" className="w-full h-auto object-contain block mix-blend-screen" loading="lazy" aria-hidden="true" />
    </div>
  </footer>
);
