import React, { useState, useEffect } from 'react';
import { ServiceData } from '../types';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { 
  ArrowRight, Shield, Zap, CheckCircle, MapPin, 
  Phone, Plus, Minus, Clock, Truck, Globe, Cpu, Plane, Calendar, 
  Activity, FileText, Briefcase
} from 'lucide-react';
import { QuoteForm } from './QuoteForm';

interface ServiceLandingPageProps {
  service: ServiceData;
  onNavigate: (routeId: string) => void;
}

// Icon helper map to dynamically render Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Zap, Shield, Truck, Globe, Cpu, Plane, Calendar, Activity, FileText, Briefcase, MapPin
};

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({ service, onNavigate }) => {
  // Track open FAQ accordion index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Other services lists for navigation links
  const otherServices = Object.values(services).filter(s => s.id !== service.id);

  // Scroll to top on service change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpenFaqIndex(null);
  }, [service.id]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="relative pt-24 pb-16 min-h-screen bg-obsidian">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <main className="container mx-auto px-6 relative z-10">
        
        {/* =========================================================================
            1. HERO & INTRODUCTION SECTION
            ========================================================================= */}
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="hero-heading">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-950/30 border border-red-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md liquid-shimmer">
              <Shield className="h-3.5 w-3.5 text-red-500 animate-pulse" />
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest font-display">
                {service.flagship ? 'Flagship Service' : 'Specialized Logistics'} Active
              </span>
            </div>

            {/* Service title */}
            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-display">
              {service.name.split(' / ').map((chunk, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-slate-500 font-light mx-2">/</span>}
                  <span className={service.flagship ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-ember to-molten font-black" : "text-white"}>
                    {chunk}
                  </span>
                </React.Fragment>
              ))}
              <span className="text-slate-300 block text-xl sm:text-2xl font-light mt-4 tracking-normal font-sans">
                {service.tagline}
              </span>
            </h1>

            {/* Detailed service overview */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] shadow-lg max-w-2xl">
              <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                {service.overview} We combine professional direct-drive courier fleets with 24/7/365 active dispatch operators to ensure your critical logistics runs are executed without delay.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#quick-quote-form" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border border-red-500/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-lg shadow-red-950/30 transition-all inline-flex items-center space-x-2 font-display">
                <span>Book Courier Run</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="sms:5129104938" className="bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-4 rounded-full shadow-md transition-all inline-flex items-center space-x-2 font-display">
                <Phone className="h-4 w-4 text-red-500" />
                <span>Text Dispatch (512) 910-4938</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="flex items-center gap-6 pt-4 text-[10px] text-slate-500 font-bold tracking-wider uppercase font-display border-t border-white/[0.02] max-w-lg">
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> 30-60 Min Pickup</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> HIPAA Compliant</span>
              <span className="flex items-center"><CheckCircle className="h-3 w-3 text-red-500 mr-1.5" /> Chain of Custody</span>
            </div>

          </div>

          {/* =========================================================================
              2. LEAD CAPTURE FORM SECTION
              ========================================================================= */}
          <div className="lg:col-span-5" id="quick-quote-form">
            <QuoteForm 
              sourceName={`${service.name}`} 
              routeId={service.id} 
              pageType="service" 
            />
          </div>
        </section>

        {/* =========================================================================
            3. FEATURES DETAIL GRID
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="features-heading">
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="features-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Service Capabilities & Features
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                How our operations are configured to execute this service at a premium tier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {service.features.map((feature, idx) => {
                const IconComponent = iconMap[feature.iconName] || Shield;
                return (
                  <div key={idx} className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="bg-red-950/20 border border-red-500/20 w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-red-950/30 group-hover:border-red-500/40 transition-all duration-300 rounded-xl">
                      <IconComponent className="text-red-500 h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold text-white uppercase mb-3 font-display tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. CAPABILITIES CHECKLIST
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="capabilities-heading">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-5 space-y-4">
                <h2 id="capabilities-heading" className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider font-display">
                  What We Deliver
                </h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  We handle various cargo matrices under our specialized routing network, maintaining complete control at every node.
                </p>
                <div className="p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl text-xs text-slate-500 font-sans italic leading-relaxed">
                  "Our couriers are extensively verified and carry specialized equipment to support these transport operations."
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.03]">
                  <ul className="space-y-4">
                    {service.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start space-x-3.5">
                        <CheckCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            5. INTERACTIVE FAQ SECTION (SEO accordion)
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto space-y-12">
            
            <div className="text-center space-y-4">
              <h2 id="faq-heading" className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wider font-display">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                Critical information concerning our specialized logistics and route guidelines.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              {service.faq.map((faqItem, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="glass-panel rounded-2xl border border-white/[0.03] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-5 flex justify-between items-center text-left text-white hover:text-red-400 font-display font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span>{faqItem.question}</span>
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-red-500 shrink-0 ml-4" />
                      ) : (
                        <Plus className="h-4 w-4 text-red-500 shrink-0 ml-4" />
                      )}
                    </button>

                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-[300px] border-t border-white/[0.02]' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 text-slate-400 font-sans font-light text-sm leading-relaxed">
                        {faqItem.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            6. CROSS LINKING SERVICES & LOCATIONS DIRECTORIES
            ========================================================================= */}
        <section className="py-20 border-t border-white/[0.03]" aria-labelledby="directory-heading">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Services navigation links */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider font-display">
                  Explore Other Specialized Services
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                  We maintain separate dedicated networks for different logistical requirements. Select a service to explore capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {otherServices.map((other) => (
                  <a
                    key={other.id}
                    href={`/${other.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(other.id);
                    }}
                    className="glass-panel p-4 text-center rounded-xl border border-white/[0.03] hover:border-red-500/25 hover:bg-white/[0.01] transition-all duration-300 font-display font-medium text-xs text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer flex flex-col justify-center items-center h-24"
                  >
                    <span className="leading-snug">{other.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Locations link directory */}
            <div className="space-y-6 pt-12 border-t border-white/[0.02]">
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider font-display">
                  Local Dispatch Neighborhood Directory
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                  Need dispatch in a specific neighborhood? Select a city hub for customized routes.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Object.values(locations)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((loc) => (
                    <a
                      key={loc.id}
                      href={`/${loc.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(loc.id);
                      }}
                      className="glass-panel p-3 text-center rounded-lg border border-white/[0.02] hover:border-red-500/20 hover:bg-white/[0.01] transition-all duration-300 font-display font-medium text-[10px] text-slate-500 hover:text-slate-200 uppercase tracking-wider cursor-pointer"
                    >
                      <span>{loc.name}</span>
                    </a>
                  ))}
              </div>
            </div>

            <div className="pt-10 text-center">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('');
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest font-display transition-colors cursor-pointer"
              >
                <span>&larr; Return to Austin Main Page</span>
              </a>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};
