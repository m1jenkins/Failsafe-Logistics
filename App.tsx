import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrustSection } from './components/TrustSection';
import { HandCarryCallout } from './components/HandCarryCallout';
import { ServiceArea } from './components/ServiceArea';
import { Footer } from './components/Footer';
import { FaqPage } from './components/FaqPage';
import { AboutPage } from './components/AboutPage';
import { NotFound } from './components/NotFound';
import { LocationLandingPage } from './components/LocationLandingPage';
import { ServiceLandingPage } from './components/ServiceLandingPage';
import { locations } from './data/locations';
import { services } from './data/services';
import { injectLocationSchema, injectServiceSchema, injectBreadcrumbSchema } from './utils/schemaHelper';

const STATIC_PAGES = ['faq', 'about'];

type Route =
  | { type: 'home' }
  | { type: 'page'; id: string }
  | { type: 'location'; id: string }
  | { type: 'service'; id: string }
  | { type: 'notFound' };

const resolveRoute = (pathname: string): Route => {
  const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (cleanPath === '') return { type: 'home' };
  if (STATIC_PAGES.includes(cleanPath)) return { type: 'page', id: cleanPath };
  if (locations[cleanPath]) return { type: 'location', id: cleanPath };
  if (services[cleanPath]) return { type: 'service', id: cleanPath };
  return { type: 'notFound' };
};

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>(() => resolveRoute(window.location.pathname));

  const handleNavigate = (routeId: string) => {
    const next = resolveRoute(`/${routeId}`);
    if (next.type === 'notFound') {
      setRoute({ type: 'home' });
      window.history.pushState({}, '', '/');
    } else {
      setRoute(next);
      window.history.pushState({}, '', routeId ? `/${routeId}` : '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with back/forward history events
  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Manage SEO metadata & JSON-LD schema dynamically
  useEffect(() => {
    const originalTitle = "Courier Austin TX | 24/7 Same-Day & Rush Delivery | Speedy Bat";
    const originalDescription = "Speedy Bat Couriers — Austin's 24/7 courier for same-day delivery, air hand carry, hot shot & emergency logistics. Pickup in 30-60 min. Text (512) 910-4938.";

    const descMeta = document.querySelector('meta[name="description"]');
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    // Prerendered pages carry a breadcrumb script (id="jsonld-breadcrumb") for
    // every route except home/404. On a pure client-side route change, only
    // the branches below ever touch it — so without this, navigating away
    // from a page leaves its breadcrumb (and, on /faq, its FAQPage schema
    // sitting alongside it) stuck in <head> under the new route.
    const removeBreadcrumbSchema = () => {
      document.getElementById('jsonld-breadcrumb')?.remove();
    };

    if (route.type === 'notFound') {
      document.title = "Page Not Found | Speedy Bat Couriers";
      // A notFound route is only ever reached via a bad initial URL or
      // browser back/forward through history — never via in-app navigation —
      // but reset every tag a real route could have left behind regardless,
      // since a 404 should never inherit the previous page's indexable meta.
      if (descMeta) descMeta.setAttribute('content', originalDescription);
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://speedybat.com/');
      if (robotsMeta) robotsMeta.setAttribute('content', 'noindex, follow');
      removeBreadcrumbSchema();
      return () => {
        if (robotsMeta) robotsMeta.setAttribute('content', 'index, follow');
      };
    }

    if (route.type === 'page' && route.id === 'faq') {
      document.title = "FAQ | Speedy Bat Couriers — Austin TX Courier Service";
      if (descMeta) descMeta.setAttribute('content', 'Frequently asked questions about Speedy Bat Couriers. Learn about our same-day delivery, air hand carry, pricing, service areas, and 24/7 courier operations in Austin, Texas.');
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://speedybat.com/faq');
      return injectBreadcrumbSchema('faq', 'FAQ');
    } else if (route.type === 'page' && route.id === 'about') {
      document.title = "About | Speedy Bat Couriers — Austin TX Courier Service";
      if (descMeta) descMeta.setAttribute('content', "Learn about Speedy Bat Couriers — Austin, Texas's trusted 24/7 courier service for time-critical, same-day, and emergency deliveries across Central Texas and nationwide.");
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://speedybat.com/about');
      return injectBreadcrumbSchema('about', 'About');
    } else if (route.type === 'location') {
      const activeLocation = locations[route.id];
      document.title = activeLocation.title;
      if (descMeta) descMeta.setAttribute('content', activeLocation.metaDescription);
      if (canonicalLink) canonicalLink.setAttribute('href', `https://speedybat.com/${activeLocation.id}`);

      const cleanupSchema = injectLocationSchema(activeLocation);
      const cleanupBreadcrumb = injectBreadcrumbSchema(activeLocation.id, `${activeLocation.name} Courier Service`);
      return () => {
        cleanupSchema();
        cleanupBreadcrumb();
      };
    } else if (route.type === 'service') {
      const activeService = services[route.id];
      document.title = activeService.title;
      if (descMeta) descMeta.setAttribute('content', activeService.metaDescription);
      if (canonicalLink) canonicalLink.setAttribute('href', `https://speedybat.com/${activeService.id}`);

      const cleanupSchema = injectServiceSchema(activeService);
      const cleanupBreadcrumb = injectBreadcrumbSchema(activeService.id, activeService.name);
      return () => {
        cleanupSchema();
        cleanupBreadcrumb();
      };
    } else {
      document.title = originalTitle;
      if (descMeta) descMeta.setAttribute('content', originalDescription);
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://speedybat.com/');
      removeBreadcrumbSchema();
    }
  }, [route]);

  const renderContent = () => {
    if (route.type === 'page' && route.id === 'faq') return <FaqPage />;
    if (route.type === 'page' && route.id === 'about') return <AboutPage />;
    if (route.type === 'location') return <LocationLandingPage location={locations[route.id]} onNavigate={handleNavigate} />;
    if (route.type === 'service') return <ServiceLandingPage service={services[route.id]} onNavigate={handleNavigate} />;
    if (route.type === 'notFound') return <NotFound onNavigate={handleNavigate} />;

    return (
      <main>
        <Hero />
        <Features onNavigate={handleNavigate} />
        <TrustSection />
        <HandCarryCallout />
        <ServiceArea onNavigate={handleNavigate} />
      </main>
    );
  };

  return (
    <div className="bg-obsidian min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      <div className="relative z-10">
        <Header onNavigate={handleNavigate} />
        {renderContent()}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default App;
