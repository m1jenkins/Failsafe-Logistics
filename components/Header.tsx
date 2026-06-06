import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (locationId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 floating-header transition-all duration-300 ${scrolled ? 'scrolled py-3' : 'py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex flex-col cursor-pointer" 
          onClick={() => {
            if (onNavigate) {
              onNavigate('');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-display text-white">Speedy Bat</span>
          <span className="text-[9px] text-red-500 font-bold tracking-[0.4em] uppercase mt-0.5 ml-0.5">Couriers</span>
        </div>

        <a 
          href="sms:5129104938" 
          className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.04] text-slate-300 hover:text-white px-5 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-black/20 rounded-full backdrop-blur-md"
        >
          <MessageSquare className="h-3.5 w-3.5 text-red-500 animate-pulse" />
          <span>Text or Call (512) 910-4938</span>
        </a>
      </div>
    </header>
  );
};