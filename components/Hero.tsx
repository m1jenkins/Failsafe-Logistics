import React from 'react';
import { ArrowRight } from 'lucide-react';
import { scrollToElement } from '../utils/scrollHelper';

export const Hero: React.FC = () => {
  const focusQuoteForm = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToElement('quick-quote-form');
    window.setTimeout(() => document.getElementById('pickupZip')?.focus({ preventScroll: true }), 350);
  };

  return (
    <section id="hero" className="relative mt-[76px] h-[68svh] min-h-[620px] overflow-hidden bg-ink lg:mt-[84px] lg:h-[75svh] lg:min-h-[650px] lg:max-h-[780px]" aria-labelledby="hero-heading">
      <img
        src="/courier-road-illustrative.webp"
        alt="A compact white courier van traveling on a Central Texas road."
        width="1536"
        height="1024"
        className="hero-photo absolute inset-0 h-full w-full object-cover object-[85%_center] sm:object-[72%_center] lg:object-center"
        loading="eager"
        fetchPriority="high"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1536px] items-end px-5 pb-10 sm:px-8 sm:pb-12 lg:items-center lg:px-10 lg:pb-0">
        <div className="hero-copy max-w-[760px] text-white">
          <h1 id="hero-heading" className="display-face text-[clamp(3.2rem,7vw,6rem)] uppercase leading-[0.82] text-white">
            <span className="block">Courier</span>
            <span className="block">service.</span>
            <span className="block">Austin &amp;</span>
            <span className="block">beyond.</span>
          </h1>
          <p className="mt-6 max-w-[470px] text-[17px] font-medium leading-[1.45] text-white sm:text-[19px]">
            Same-day delivery, expedited freight, and scheduled routes from Austin.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a href="#quick-quote-form" onClick={focusQuoteForm} className="inline-flex min-h-12 items-center gap-2 rounded-[5px] bg-white px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal hover:text-white">
              Get a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="hidden items-center gap-5 lg:flex" aria-label="Call or text Speedy Bat Couriers">
              <a href="tel:+15129104938" className="inline-flex min-h-12 items-center border-b border-white/70 text-sm font-bold text-white hover:border-white">Call us</a>
              <a href="sms:+15129104938" className="inline-flex min-h-12 items-center border-b border-white/70 text-sm font-bold text-white hover:border-white">Text us</a>
            </div>
          </div>
        </div>
      </div>

      <span className="absolute bottom-3 right-4 z-10 bg-ink/85 px-2 py-1 text-[10px] font-medium tracking-wide text-white">Illustrative image</span>
    </section>
  );
};
