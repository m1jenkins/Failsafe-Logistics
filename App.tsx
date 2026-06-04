import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Calculator } from './components/Calculator';
import { Reviews } from './components/Reviews';
import { ContactForm } from './components/ContactForm';
import { ServiceArea } from './components/ServiceArea';
import { Footer } from './components/Footer';

interface BookingDetails {
  pickupAddress?: string;
  deliveryAddress?: string;
  itemDescription?: string;
}

const App: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});

  const handleBook = (details: BookingDetails) => {
    setBookingDetails(details);
    // Give state a brief moment to update and render before scrolling
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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
        <Header />
        <main>
          <Hero />
          <Features />
          <Calculator onBook={handleBook} />
          <Reviews />
          <ContactForm prefilledDetails={bookingDetails} />
          <ServiceArea />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;