import React from 'react';
import { Clock, Shield, Truck, Plane, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Hero heading */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display block">
            About Speedy Bat
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white font-display tracking-tight">
            Austin's Trusted Courier
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Speedy Bat Couriers is a dedicated courier service based in Austin, Texas — built for businesses that need reliable, time-critical delivery when standard carriers can't deliver.
          </p>
        </div>

        {/* Mission statement */}
        <div className="glass-panel-elevated p-10 md:p-14 rounded-3xl border border-white/[0.06] relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="space-y-6 max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
              Why We Exist
            </h2>
            <p className="text-slate-300 font-light text-base leading-relaxed">
              When FedEx cut-off has passed, the hubs are closed, and your cargo absolutely has to be somewhere by morning — that's when we go to work. We specialize in last-minute, after-hours, and emergency logistics that traditional carriers aren't equipped to handle.
            </p>
            <p className="text-slate-400 font-light text-sm leading-relaxed">
              Every run is direct-drive: one vehicle, one courier, zero transfers. Whether it's a 30-minute crosstown rush or an overnight 1,000-mile haul, your shipment gets a dedicated driver who doesn't stop until the job is done.
            </p>
          </div>
        </div>

        {/* Key values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Clock,
              title: "24/7/365",
              desc: "Always on. Nights, weekends, holidays — we never close. Text or call anytime for immediate dispatch."
            },
            {
              icon: Shield,
              title: "Chain of Custody",
              desc: "Your package stays in our hands from pickup to delivery. One driver, one vehicle, no hub transfers."
            },
            {
              icon: Truck,
              title: "Dedicated Fleet",
              desc: "Every shipment gets its own dedicated vehicle. No shared loads, no detours, no delays."
            },
            {
              icon: Plane,
              title: "Air Hand Carry",
              desc: "For the most critical shipments, a courier boards a flight with your package as carry-on luggage."
            },
            {
              icon: MapPin,
              title: "Austin Based",
              desc: "Headquartered in Austin with coverage across Central Texas and expedited routes to every major Texas city."
            },
            {
              icon: Shield,
              title: "HIPAA Compliant",
              desc: "Certified for medical specimen transport, cold chain logistics, and secure document handling."
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-white/[0.02] border border-white/[0.06] w-10 h-10 flex items-center justify-center mb-4 group-hover:border-ember/30 group-hover:bg-red-950/20 transition-all duration-300 rounded-xl">
                <item.icon className="text-slate-400 h-4.5 w-4.5 group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-bold uppercase text-white mb-2 tracking-wider font-display">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-xs font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Service area summary */}
        <div className="glass-panel p-8 md:p-10 rounded-2xl text-center space-y-4">
          <h2 className="text-lg font-bold uppercase text-white font-display tracking-wider">
            Where We Operate
          </h2>
          <p className="text-slate-400 font-light text-sm leading-relaxed max-w-2xl mx-auto">
            From our Austin headquarters, we serve Round Rock, Georgetown, Cedar Park, Taylor, Kyle, Pflugerville, Leander, Hutto, Buda, Bastrop, San Marcos, and the entire Central Texas corridor. We also run dedicated expedited ground routes to Houston, Dallas/Fort Worth, San Antonio, and El Paso — plus nationwide air hand carry from Austin-Bergstrom International Airport.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm font-light mb-4">
            Ready to ship? We respond in minutes.
          </p>
          <a
            href="sms:5129104938"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/20 rounded-full border border-red-500/20"
          >
            <span>Text Us: (512) 910-4938</span>
          </a>
        </div>
      </div>
    </main>
  );
};
