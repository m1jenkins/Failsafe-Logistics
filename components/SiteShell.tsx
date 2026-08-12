import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-obsidian min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
    <div className="relative z-10">
      <Header />
      {children}
      <Footer />
    </div>
  </div>
);
