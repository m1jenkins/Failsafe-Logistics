import React, { useState, useEffect } from 'react';
import { Phone, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="text-red-600 h-8 w-8" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">FailSafe</span>
            <span className="text-xs text-slate-400 tracking-[0.2em] uppercase leading-none">Logistics Texas</span>
          </div>
        </div>

        <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 font-bold uppercase tracking-wide transition-colors animate-pulse-heartbeat shadow-lg shadow-red-900/20 rounded">
          <Phone className="h-4 w-4" />
          <span>Call 24/7</span>
        </button>
      </div>
    </header>
  );
};