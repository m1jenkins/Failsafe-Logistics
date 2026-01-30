import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 px-3 py-1 mb-8 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">Status: Available | 24/7 Service</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-tight mb-2 tracking-tight">
            Last Minute <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Courier Austin</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-slate-400 font-medium uppercase tracking-widest mb-8">
             Professional Expedited Logistics
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-2xl border-l-4 border-red-600 pl-6 py-2">
            The premier <strong>last minute delivery</strong> and <strong>emergency courier</strong> service for Austin, TX. Specialized in dedicated direct-drive transport and secure US Domestic Hand Carry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="alert" className="flex items-center justify-center space-x-2" onClick={() => document.getElementById('booking')?.scrollIntoView({behavior: 'smooth'})}>
              <span>Book Courier</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>View Transit Times</span>
            </Button>
          </div>

          <p className="mt-12 text-slate-500 font-medium text-sm tracking-wider uppercase">
            Dedicated Vehicles. Direct Delivery. Zero Compromise.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
         <div className="text-right space-y-1">
            <div className="text-xs text-slate-600 font-medium">AUSTIN HQ</div>
            <div className="text-xs text-slate-600 font-medium">CENTRAL TEXAS REGION</div>
         </div>
      </div>
    </section>
  );
};