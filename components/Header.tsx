import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Service area', href: '/service-areas' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'About', href: '/about' }
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 1024px)');
    const closeMenuOnDesktop = () => {
      if (desktopViewport.matches) setMobileMenuOpen(false);
    };
    closeMenuOnDesktop();
    desktopViewport.addEventListener('change', closeMenuOnDesktop);
    return () => desktopViewport.removeEventListener('change', closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = mobileNavRef.current;
    const focusableElements: HTMLElement[] = panel
      ? Array.from(panel.querySelectorAll('a[href], button:not([disabled])')) as HTMLElement[]
      : [];
    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`site-header fixed inset-x-0 top-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
        <div className="mx-auto flex h-[76px] max-w-[1536px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-10">
          <a href="/" className="flex flex-col leading-none text-ink" aria-label="Speedy Bat Couriers home">
            <span className="display-face text-[20px] leading-[0.85] sm:text-[24px]">SPEEDY BAT</span>
            <span className="mt-1 text-[8px] font-bold tracking-[0.34em] sm:text-[9px]">COURIERS</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            <nav className="flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav-link py-2 text-sm font-semibold text-ink transition-colors hover:text-signal">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3 text-sm font-semibold" aria-label="Call or text Speedy Bat Couriers">
              <span className="text-ink">Call or text:</span>
              <a href="tel:+15129104938" className="text-ink hover:text-signal">(512) 910-4938</a>
              <a href="sms:+15129104938" className="text-ink underline decoration-ink/30 underline-offset-4 hover:text-signal">Text</a>
            </div>
            <a href="/#quick-quote-form" className="inline-flex min-h-11 items-center justify-center rounded-[5px] bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-signal">
              Get a quote
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(open => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-[5px] border border-ink/20 bg-white text-ink lg:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            ref={mobileNavRef}
            id="mobile-navigation"
            className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto overscroll-contain bg-white px-5 pb-28 pt-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="mx-auto flex max-w-xl flex-col" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="display-face flex min-h-16 items-center border-b border-ink/15 text-[clamp(1.8rem,9vw,3rem)] uppercase leading-none text-ink">
                  {link.label}
                </a>
              ))}
              <a href="/#quick-quote-form" onClick={() => setMobileMenuOpen(false)} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[5px] bg-signal px-6 py-3 font-bold text-white">
                Get a quote
              </a>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href="tel:+15129104938" className="inline-flex min-h-12 items-center justify-center rounded-[5px] border border-ink/20 font-bold text-ink">Call</a>
                <a href="sms:+15129104938" className="inline-flex min-h-12 items-center justify-center rounded-[5px] border border-ink/20 font-bold text-ink">Text</a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/20 bg-ink text-white lg:hidden">
        <a href="tel:+15129104938" className="inline-flex min-h-14 items-center justify-center border-r border-white/20 text-sm font-bold">Call (512) 910-4938</a>
        <a href="sms:+15129104938" className="inline-flex min-h-14 items-center justify-center text-sm font-bold">Text us</a>
      </div>
    </>
  );
};
