import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

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
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none text-white">Speedy Bat</span>
          <span className="text-xs text-red-500 font-bold tracking-[0.3em] uppercase mt-1">Couriers</span>
        </div>

        <a href="sms:5129104938" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 font-bold uppercase tracking-wide transition-colors animate-pulse-heartbeat shadow-lg shadow-red-900/20 rounded">
          <MessageSquare className="h-4 w-4" />
          <span>Text or Call (512) 910-4938</span>
        </a>
      </div>
    </header>
  );
};