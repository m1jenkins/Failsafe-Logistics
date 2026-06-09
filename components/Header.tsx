import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (locationId: string) => void;
}

const navLinks = [
  { label: 'Home', route: '' },
  { label: 'FAQ', route: 'faq' },
  { label: 'About', route: 'about' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (route: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 floating-header transition-all duration-300 ${scrolled ? 'scrolled py-3' : 'py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex flex-col cursor-pointer shrink-0" 
          onClick={() => handleNav('')}
        >
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-display text-white">Speedy Bat</span>
          <span className="text-[10px] text-red-500 font-bold tracking-[0.4em] uppercase mt-0.5 ml-0.5">Couriers</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 mx-6" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.route}
              href={link.route ? `/${link.route}` : '/'}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.route);
              }}
              className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest font-display px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-white/[0.03]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: CTA + Mobile menu toggle */}
        <div className="flex items-center space-x-3">
          <a href="sms:5129104938" className="group flex items-center space-x-1.5 sm:space-x-2 bg-white/[0.03] hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-slate-200 hover:text-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-black/20 rounded-full border border-red-500/30 hover:border-red-500/50 backdrop-blur-sm whitespace-nowrap shrink-0">
            <MessageSquare className="h-3.5 w-3.5 shrink-0 text-red-500 group-hover:text-white transition-colors" />
            <span>
              <span className="hidden sm:inline">Text or Call </span>
              (512) 910-4938
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.1] transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-6 pb-4 pt-2 flex flex-col space-y-1" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.route}
              href={link.route ? `/${link.route}` : '/'}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.route);
              }}
              className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest font-display px-4 py-3 transition-colors duration-200 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};