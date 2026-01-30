import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

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
          <svg className="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.5 6.5L12 22l7.5-3.5C21 16.8 22 14.5 22 12c0-5.5-4.5-10-10-10zm0 2c1.5 0 3 .5 4.2 1.3C14.5 6.5 13 8.5 12 11c-1-2.5-2.5-4.5-4.2-5.7C9 3.5 10.5 3 12 3zm-6 6c1.8-1.5 3.5-2.5 5-3 .5 1.5 1 3 1 4.5 0 2-.5 3.8-1.5 5.5L6 14c0-2 .5-3.5 0-5zm12 0c-.5 1.5 0 3 0 5l-4.5 2c-1-1.7-1.5-3.5-1.5-5.5 0-1.5.5-3 1-4.5 1.5.5 3.2 1.5 5 3z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">Speedy Bat</span>
            <span className="text-xs text-slate-400 tracking-[0.2em] uppercase leading-none">Couriers</span>
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