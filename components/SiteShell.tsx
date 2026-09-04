import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen overflow-x-hidden bg-white font-sans text-ink">
    <Header />
    {children}
    <Footer />
  </div>
);
