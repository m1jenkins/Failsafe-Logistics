import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, MessageSquare, Phone, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' }
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container mx-auto px-5 sm:px-6">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled || mobileMenuOpen ? 'py-3' : 'py-4.5'}`}>
          <a href="/" className="flex items-center gap-3 shrink-0 group" aria-label="Speedy Bat Couriers home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-signal text-white shadow-[0_8px_18px_-8px_rgba(232,73,15,0.7)] transition-transform duration-300 group-hover:-rotate-6">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 3 L5 14 h6 l-1.5 7 L19 10 h-6 z" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-extrabold tracking-tight font-display text-ink">
                Speedy Bat
              </span>
              <span className="text-[9px] text-signal font-bold tracking-[0.34em] uppercase mt-1">Couriers</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center mx-auto" aria-label="Main navigation">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-[12px] font-bold text-ink-soft hover:text-ink uppercase tracking-[0.14em] px-3.5 py-2.5 transition-colors font-display"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+15129104938"
              className="hidden min-h-11 sm:inline-flex items-center gap-2 bg-white/80 hover:bg-white text-ink px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border border-ink/10 shadow-sm transition-all hover:-translate-y-px"
            >
              <Phone className="h-3.5 w-3.5 text-signal" />
              Call
            </a>
            <a
              href="sms:+15129104938"
              className="inline-flex min-h-11 items-center gap-2 bg-ink hover:bg-ink-deep text-paper px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_10px_22px_-12px_rgba(22,24,29,0.6)] transition-all hover:-translate-y-px"
            >
              <MessageSquare className="h-3.5 w-3.5 text-signal" />
              <span className="hidden md:inline">Text </span>(512) 910-4938
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(open => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-white/80 text-ink lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      <div
        id="mobile-navigation"
        className={`lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-paper/97 backdrop-blur-xl transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-6 pt-6 pb-10 flex flex-col" aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ transitionDelay: `${mobileMenuOpen ? index * 45 + 60 : 0}ms` }}
              className={`flex min-h-14 items-center justify-between border-b border-ink/8 py-4 font-display text-2xl font-bold tracking-tight text-ink transition-all duration-500 ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {link.label}
              <ArrowUpRight className="h-5 w-5 text-signal" />
            </a>
          ))}
          <p className="mt-8 text-xs leading-relaxed text-ink-soft">
            Austin-based service-area courier. Dispatch confirms availability and job details before acceptance.
          </p>
        </nav>
      </div>
    </header>
  );
};
