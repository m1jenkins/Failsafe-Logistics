import React from 'react';

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
  <footer role="contentinfo" className="bg-obsidian pt-16 pb-0 border-t border-white/[0.03] relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10 pb-36 md:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 text-center md:text-left">
          <a href="/" className="mb-2 inline-flex min-h-11 items-center text-xl font-black uppercase tracking-tighter text-white font-display md:min-h-0 md:text-2xl">Speedy Bat Couriers</a>
          <p className="text-slate-400 text-xs md:text-sm mb-4 font-medium font-display tracking-wider uppercase">Austin-based service-area courier</p>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed mx-auto md:mx-0">
            Urgent courier requests for businesses and individuals originating in the Austin metro. Dispatch confirms availability, timing, vehicle, routing, handling, custody, access, and applicable coverage for each accepted job.
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
            <a href="tel:+15129104938" className="inline-flex min-h-11 items-center text-red-500 hover:text-red-400 font-bold text-sm font-display md:min-h-0">Call (512) 910-4938</a>
            <span className="text-slate-700" aria-hidden="true">·</span>
            <a href="sms:+15129104938" className="inline-flex min-h-11 items-center text-red-500 hover:text-red-400 font-bold text-sm font-display md:min-h-0">Text dispatch</a>
          </div>
          <p className="mt-5 text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto md:mx-0">
            Do not submit health information, patient names, IDs, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS.
          </p>
        </div>

        <div className="md:col-span-4 text-center md:text-left">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-5">Priority services</h2>
          <ul className="space-y-3 text-xs">
            {serviceLinks.map(([label, href]) => (
              <li key={href}><a href={href} className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-400 hover:text-red-500 transition-colors md:min-h-0 md:min-w-0 md:justify-start">{label}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 text-center md:text-left">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-display mb-5">Company & policies</h2>
          <ul className="space-y-3 text-xs">
            {companyLinks.map(([label, href]) => (
              <li key={href}><a href={href} className="inline-flex min-h-11 min-w-11 items-center justify-center text-slate-400 hover:text-red-500 transition-colors md:min-h-0 md:min-w-0 md:justify-start">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/[0.04] text-center md:text-left text-slate-500 text-[11px] font-mono tracking-widest uppercase" suppressHydrationWarning>
        &copy; {new Date().getFullYear()} Speedy Bat Couriers · Austin, TX · All rights reserved.
      </div>
    </div>

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 lg:right-12 max-w-[240px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[420px] w-full z-10 transition-transform duration-500 ease-out hover:-translate-y-2">
      <img src="/speedybat-crossover.webp" alt="Speedy Bat courier vehicle" width="800" height="447" className="w-full h-auto object-contain block opacity-85 hover:opacity-100 transition-opacity duration-500" loading="lazy" />
    </div>
  </footer>
);
