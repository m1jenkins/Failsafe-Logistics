import React, { useEffect, useState } from 'react';
import { Menu, MessageSquare, Phone, X } from 'lucide-react';

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 floating-header transition-all duration-300 ${scrolled ? 'scrolled py-3' : 'py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex flex-col shrink-0" aria-label="Speedy Bat Couriers home">
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-display text-white">Speedy Bat</span>
          <span className="text-[10px] text-red-500 font-bold tracking-[0.4em] uppercase mt-0.5 ml-0.5">Couriers</span>
        </a>

        <nav className="hidden lg:flex items-center space-x-1 mx-5" aria-label="Main navigation">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-[11px] font-bold text-slate-400 hover:text-white uppercase tracking-widest font-display px-3 py-2 transition-colors rounded-lg hover:bg-white/[0.03]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="tel:+15129104938" className="hidden sm:inline-flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 px-3 md:px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border border-white/[0.06]">
            <Phone className="h-3.5 w-3.5 text-red-500" />
            Call
          </a>
          <a href="sms:+15129104938" className="inline-flex items-center gap-2 bg-white/[0.03] hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-slate-200 hover:text-white px-3 md:px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border border-red-500/30">
            <MessageSquare className="h-3.5 w-3.5 text-red-500" />
            <span className="hidden sm:inline">Text </span>(512) 910-4938
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(open => !open)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`lg:hidden overflow-hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/[0.04] shadow-2xl transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="container mx-auto px-6 pb-4 pt-3 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest font-display px-4 py-3 rounded-xl hover:bg-white/[0.03]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
