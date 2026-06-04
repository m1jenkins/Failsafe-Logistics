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
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white">
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
  );
};

export default App;