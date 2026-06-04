import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Calculator } from './components/Calculator';
import { Reviews } from './components/Reviews';
import { ServiceArea } from './components/ServiceArea';
import { ContactForm } from './components/ContactForm';
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
      {/* Floating Liquid Glass Backdrop Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-red-600/10 to-royal-indigo/15 blur-[100px] animate-blob1" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-blue-600/10 to-royal-violet/15 blur-[120px] animate-blob2" />
        <div className="absolute top-[50%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-red-500/5 to-royal-indigo/5 blur-[90px] animate-blob3" />
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