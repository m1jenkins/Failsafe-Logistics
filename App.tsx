import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Calculator } from './components/Calculator';
import { ServiceArea } from './components/ServiceArea';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans selection:bg-red-600 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Calculator />
        <ContactForm />
        <ServiceArea />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;