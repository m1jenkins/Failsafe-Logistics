/**
 * prerender-entry.tsx — Server-side rendering entry for build-time prerendering.
 *
 * Built via `vite build --ssr` and consumed by prerender.js to render every
 * route's real HTML into its static dist/<route>/index.html file, so crawlers
 * receive the actual page content without executing JavaScript.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrustSection } from './components/TrustSection';
import { HandCarryCallout } from './components/HandCarryCallout';
import { ServiceArea } from './components/ServiceArea';
import { FaqPage } from './components/FaqPage';
import { AboutPage } from './components/AboutPage';
import { LocationLandingPage } from './components/LocationLandingPage';
import { ServiceLandingPage } from './components/ServiceLandingPage';
import { locations } from './data/locations';
import { services } from './data/services';
import { faqItems } from './data/faq';
import { buildLocationSchema, buildServiceSchema } from './utils/schemaHelper';

export { locations, services, faqItems, buildLocationSchema, buildServiceSchema };

const noop = () => {};

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-obsidian min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
    <div className="relative z-10">
      <Header onNavigate={noop} />
      {children}
      <Footer onNavigate={noop} />
    </div>
  </div>
);

/** Render a route's full page markup. routeId '' is the homepage. */
export function renderRoute(routeId: string): string {
  let content: React.ReactNode;

  if (routeId === '') {
    content = (
      <main>
        <Hero />
        <Features onNavigate={noop} />
        <TrustSection />
        <HandCarryCallout />
        <ServiceArea onNavigate={noop} />
      </main>
    );
  } else if (routeId === 'faq') {
    content = <FaqPage />;
  } else if (routeId === 'about') {
    content = <AboutPage />;
  } else if (locations[routeId]) {
    content = <LocationLandingPage location={locations[routeId]} onNavigate={noop} />;
  } else if (services[routeId]) {
    content = <ServiceLandingPage service={services[routeId]} onNavigate={noop} />;
  } else {
    throw new Error(`Unknown route: ${routeId}`);
  }

  return renderToString(<Shell>{content}</Shell>);
}
