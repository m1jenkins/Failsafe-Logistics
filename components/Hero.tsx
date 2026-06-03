import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Bat Imagery */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/5 to-slate-900/80 z-10"></div>
        <img
          src="/austin-bats.png"
          alt="Speedy Bat Couriers - Premier courier service in Austin Texas providing same day delivery and rush logistics"
          className="w-full h-full object-cover object-center lg:object-right opacity-80"
        />
      </div>

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/10 z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">


          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-tight mb-2 tracking-tight">
            Austin's Premier <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Courier Service</span>
            <br />Rush Delivery & Critical Logistics
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-2xl border-l-4 border-red-600 pl-6 py-2">
            The on-demand infrastructure partner for <strong>Austin</strong>, <strong>Round Rock</strong>, and the <strong>Taylor Semiconductor Corridor</strong>. 24/7 Hot Shot, Medical STAT, and Legal Courier Services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="alert" className="flex items-center justify-center space-x-2" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Get Instant Quote</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" className="flex items-center justify-center space-x-2" onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}>
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