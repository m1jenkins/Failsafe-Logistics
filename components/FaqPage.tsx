import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqItems } from '../data/faq';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mt-[76px] bg-white lg:mt-[84px]">
      <header className="bg-ink py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-[1536px] gap-8 px-5 sm:px-8 md:grid-cols-12 md:items-end lg:px-10">
          <h1 className="display-face text-[clamp(3.2rem,7.2vw,6rem)] uppercase leading-[0.84] text-white md:col-span-8">Courier questions, answered</h1>
          <p className="max-w-lg text-[18px] leading-relaxed text-white/75 md:col-span-4">Clear answers about quotes, pickup, pricing, routes, airport work, and the details to leave out.</p>
        </div>
      </header>

      <section className="py-16 md:py-24" aria-labelledby="faq-list-heading">
        <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
          <h2 id="faq-list-heading" className="display-face text-[clamp(2.8rem,5vw,4.5rem)] uppercase leading-[0.88] text-ink md:col-span-4">Frequently asked questions</h2>
          <div className="border-t border-ink/25 md:col-span-7 md:col-start-6">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article key={item.question} className="border-b border-ink/25">
                  <h3>
                    <button id={`faq-button-${index}`} type="button" onClick={() => setOpenIndex(isOpen ? null : index)} className="flex min-h-20 w-full items-center justify-between gap-5 py-5 text-left text-[17px] font-bold text-ink hover:text-signal" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`}>
                      <span>{item.question}</span>
                      {isOpen ? <Minus className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />}
                    </button>
                  </h3>
                  <div id={`faq-panel-${index}`} className={`accordion-panel ${isOpen ? 'open' : ''}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!isOpen}>
                    <div><p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft">{item.answer}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-signal py-16 text-white md:py-20">
        <div className="mx-auto flex max-w-[1536px] flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
          <div><h2 className="display-face text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.86] text-white">Ready for a route answer?</h2><p className="mt-5 text-[18px] text-white/85">Send the pickup, destination, deadline, and item size.</p></div>
          <a href="/#quick-quote-form" className="inline-flex min-h-12 w-fit items-center rounded-[5px] bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-white">Get a quote</a>
        </div>
      </section>
    </main>
  );
};
