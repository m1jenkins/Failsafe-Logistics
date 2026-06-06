import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What is a last-minute courier service?",
    answer: "A last-minute courier service provides urgent, time-critical delivery when you need something shipped immediately. Speedy Bat Couriers offers 24/7 same-day pickup and delivery throughout Austin, Texas and nationwide. We specialize in the jobs other carriers won't take — after hours, weekends, holidays, and when every minute counts."
  },
  {
    question: "What is air hand carry service?",
    answer: "Air hand carry is a premium courier service where a dedicated courier personally accompanies your package on a commercial flight as carry-on luggage. The chain of custody is never broken. Speedy Bat Couriers offers hand carry from Austin-Bergstrom International Airport to any US destination and select international hubs."
  },
  {
    question: "How fast can you pick up in Austin?",
    answer: "For urgent shipments we can pick up within 30–60 minutes of your call or text. We maintain 24/7 readiness across Central Texas with dedicated vehicles positioned for rapid dispatch."
  },
  {
    question: "What areas do you serve near Austin?",
    answer: "We serve all of Central Texas from our Austin headquarters — Round Rock, Georgetown, Cedar Park, Taylor, Kyle, Pflugerville, Leander, Hutto, Buda, Bastrop, San Marcos, and every community in between. We also provide expedited ground delivery to Houston, Dallas/Fort Worth, San Antonio, and El Paso, plus nationwide air hand carry."
  },
  {
    question: "Do you operate 24/7?",
    answer: "Yes. Speedy Bat Couriers operates 24 hours a day, 7 days a week, 365 days a year. We're always available for emergency and time-critical deliveries, including holidays and overnight runs."
  },
  {
    question: "How much does a courier cost in Austin?",
    answer: "Pricing varies based on distance, urgency, and service type. Our ground expedited rates start with a $175 base fee plus mileage. Air hand carry and specialized services like medical or legal courier are quoted individually. Text us at (512) 910-4938 for a fast quote."
  },
  {
    question: "Do you offer medical courier services?",
    answer: "Yes, we provide HIPAA-compliant medical courier services throughout Austin and Central Texas. We handle UN3373 Biological Substance transport, cold chain logistics, STAT medical delivery, and secure specimen transport for hospitals, labs, and healthcare providers."
  },
  {
    question: "What is on-board courier (OBC) service?",
    answer: "On-board courier is when a dedicated Speedy Bat courier personally flies with your shipment as carry-on luggage. This ensures chain of custody is never broken and provides the fastest possible transit for ultra-critical shipments — semiconductor wafers, legal documents, medical specimens, and more."
  },
  {
    question: "How far will you drive for a hot shot delivery?",
    answer: "We regularly handle overnight direct-drive runs of 1,000+ miles. One dedicated vehicle, one driver, zero transfers, non-stop to destination. Common routes include Austin to Houston, Dallas, San Antonio, El Paso, and across state lines."
  },
  {
    question: "Can I track my delivery?",
    answer: "Yes. We provide real-time tracking updates for all deliveries — ground and air. For hand carry shipments, you'll receive live flight tracking. For ground shipments, we provide GPS-based location updates and ETAs throughout the run."
  }
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] text-red-500/70 font-bold uppercase tracking-[0.3em] font-display block">
            Common Questions
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white font-display tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our courier services, delivery areas, and how we operate.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-bold text-white uppercase tracking-wider font-display pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 group-hover:text-red-500 shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="h-[1px] bg-white/[0.04] mb-4" />
                    <p className="text-slate-400 font-light text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm font-light mb-4">
            Still have questions? We respond fast.
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
