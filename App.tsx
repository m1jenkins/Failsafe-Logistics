import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Calculator } from './components/Calculator';
import { Reviews } from './components/Reviews';
import { ContactForm } from './components/ContactForm';
import { ServiceArea } from './components/ServiceArea';
import { Footer } from './components/Footer';
import { LocationLandingPage } from './components/LocationLandingPage';
import { locations } from './data/locations';
import { injectLocationSchema } from './utils/schemaHelper';

interface BookingDetails {
  pickupAddress?: string;
  deliveryAddress?: string;
  itemDescription?: string;
}

const App: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});
  
  // Custom router state based on window path
  const [currentLocationId, setCurrentLocationId] = useState<string>(() => {
    const path = window.location.pathname;
    const cleanPath = path.replace(/^\//, '');
    return locations[cleanPath] ? cleanPath : '';
  });

  const handleBook = (details: BookingDetails) => {
    setBookingDetails(details);
    // Give state a brief moment to update and render before scrolling
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigate = (locationId: string) => {
    setCurrentLocationId(locationId);
    const newPath = locationId ? `/${locationId}` : '/';
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with back/forward history events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const cleanPath = path.replace(/^\//, '');
      setCurrentLocationId(locations[cleanPath] ? cleanPath : '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Manage SEO metadata & JSON-LD schema dynamically
  useEffect(() => {
    const activeLocation = locations[currentLocationId];
    
    // Store original document values (from index.html)
    const originalTitle = "Last Minute Courier Service Austin | Air Hand Carry & Same Day Delivery TX";
    const originalDescription = "Speedy Bat Couriers offers last minute courier service in Austin TX. Air hand carry, same day delivery, expedited ground transport & emergency logistics. 24/7 service in Austin, Round Rock & Nationwide.";
    const originalKeywords = "courier in austin texas, courier austin, courier service austin tx, same day courier austin, same day delivery austin tx, last minute courier service austin, air hand carry austin, on board courier austin, hand carry courier austin, expedited delivery austin, emergency courier texas, urgent delivery austin, medical courier austin, hot shot delivery austin, legal courier austin tx, courier near me austin, austin texas courier company, rush delivery austin, dedicated courier austin texas, overnight courier austin tx";

    const descMeta = document.querySelector('meta[name="description"]');
    const kwMeta = document.querySelector('meta[name="keywords"]');

    if (activeLocation) {
      document.title = activeLocation.title;
      
      if (descMeta) {
        descMeta.setAttribute('content', activeLocation.metaDescription);
      }
      if (kwMeta) {
        kwMeta.setAttribute('content', activeLocation.keywords.join(', '));
      }

      const cleanupSchema = injectLocationSchema(activeLocation);
      return () => {
        cleanupSchema();
      };
    } else {
      document.title = originalTitle;
      if (descMeta) {
        descMeta.setAttribute('content', originalDescription);
      }
      if (kwMeta) {
        kwMeta.setAttribute('content', originalKeywords);
      }
    }
  }, [currentLocationId]);

  const activeLocation = locations[currentLocationId];

  return (
    <div className="bg-obsidian min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white relative overflow-x-hidden">
      {/* Ink Diffusion Backdrop — organic warm shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Deep red-brown ink cloud — top left */}
        <div className="absolute top-[5%] left-[-15%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-br from-red-950/20 via-ember/8 to-transparent blur-[120px] animate-ink1 mix-blend-screen" />
        {/* Warm soot cloud — bottom right */}
        <div className="absolute bottom-[5%] right-[-12%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tl from-soot/40 via-red-900/8 to-transparent blur-[140px] animate-ink2 mix-blend-screen" />
        {/* Subtle ember wash — center */}
        <div className="absolute top-[45%] left-[25%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-tr from-ember/5 via-graphite/10 to-transparent blur-[100px] animate-ink3 mix-blend-screen" />
      </div>

      <div className="relative z-10">
        <Header onNavigate={handleNavigate} />
        {activeLocation ? (
          <LocationLandingPage location={activeLocation} onNavigate={handleNavigate} />
        ) : (
          <main>
            <Hero />
            <Features />
            <Calculator onBook={handleBook} />
            <Reviews />
            <ContactForm prefilledDetails={bookingDetails} />
            <ServiceArea onNavigate={handleNavigate} />
          </main>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;