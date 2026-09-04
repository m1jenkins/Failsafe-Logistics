import React from 'react';

const pageLinks = [
  ['Services', '/services'],
  ['Service area', '/service-areas'],
  ['How it works', '/how-it-works'],
  ['About', '/about'],
  ['FAQ', '/faq']
] as const;

const policyLinks = [['Privacy', '/privacy'], ['Service terms', '/terms']] as const;

export const Footer: React.FC = () => (
  <footer className="bg-ink pb-20 text-white lg:pb-0" role="contentinfo">
    <div className="mx-auto max-w-[1536px] px-5 py-14 sm:px-8 md:py-20 lg:px-10">
      <div className="grid gap-12 border-b border-white/20 pb-14 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-5">
          <a href="/" className="inline-flex flex-col leading-none" aria-label="Speedy Bat Couriers home">
            <span className="display-face text-4xl leading-[0.82] text-white md:text-5xl">SPEEDY BAT</span>
            <span className="mt-2 text-[10px] font-bold tracking-[0.36em] text-white/60">COURIERS</span>
          </a>
          <p className="mt-7 max-w-md text-[16px] leading-relaxed text-white/65">Same-day delivery, expedited freight, and scheduled routes from the Austin metro.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/#quick-quote-form" className="inline-flex min-h-12 items-center rounded-[5px] bg-signal px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">Get a quote</a>
            <a href="tel:+15129104938" className="inline-flex min-h-12 items-center rounded-[5px] border border-white/30 px-5 py-3 text-sm font-bold text-white hover:border-white">Call (512) 910-4938</a>
            <a href="sms:+15129104938" className="inline-flex min-h-12 items-center rounded-[5px] border border-white/30 px-5 py-3 text-sm font-bold text-white hover:border-white">Text us</a>
          </div>
        </div>
        <nav className="md:col-span-3 md:col-start-8" aria-label="Footer pages">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Navigate</h2>
          <ul className="mt-5 space-y-1">
            {pageLinks.map(([label, href]) => <li key={href}><a href={href} className="inline-flex min-h-10 items-center text-[16px] text-white/70 hover:text-white">{label}</a></li>)}
          </ul>
        </nav>
        <nav className="md:col-span-2" aria-label="Footer policies">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Policies</h2>
          <ul className="mt-5 space-y-1">
            {policyLinks.map(([label, href]) => <li key={href}><a href={href} className="inline-flex min-h-10 items-center text-[16px] text-white/70 hover:text-white">{label}</a></li>)}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col gap-2 pt-7 text-[11px] uppercase tracking-[0.14em] text-white/60 sm:flex-row sm:justify-between">
        <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Speedy Bat Couriers · Austin, Texas</span>
        <span>speedybat.com</span>
      </div>
    </div>
  </footer>
);
