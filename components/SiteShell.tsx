import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-paper min-h-screen text-ink font-sans selection:bg-signal/20 relative overflow-x-hidden">
    <div className="relative z-10">
      <Header />
      {children}
      <Footer />
    </div>
  </div>
);
