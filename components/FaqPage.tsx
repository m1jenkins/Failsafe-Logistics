import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/faq';
export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display block">
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
            href="sms:+15129104938"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/20 rounded-full border border-red-500/20"
          >
            <span>Text Us: (512) 910-4938</span>
          </a>
        </div>
      </div>
    </main>
  );
};
