import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <main className="mt-[76px] min-h-[calc(100svh-76px)] bg-ink text-white lg:mt-[84px] lg:min-h-[calc(100svh-84px)]">
    <section className="mx-auto grid min-h-[700px] max-w-[1536px] grid-cols-1 lg:grid-cols-12" aria-labelledby="about-heading">
      <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:col-span-7 lg:px-10 lg:py-24">
        <h1 id="about-heading" className="display-face max-w-5xl text-[clamp(3.2rem,7vw,6rem)] uppercase leading-[0.84] text-white">Austin courier service for the jobs that cannot wait</h1>
        <p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-white/75">Speedy Bat Couriers arranges same-day delivery, expedited freight, airport recovery, scheduled routes, and specialized courier work from the Austin metro. Send us the route, deadline, and item details. We’ll tell you whether we can take the job and what it will cost.</p>
        <a href="/#quick-quote-form" className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-[5px] bg-signal px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">Get a quote<ArrowUpRight className="h-4 w-4" /></a>
      </div>
      <div className="relative flex min-h-[360px] items-center overflow-hidden bg-black lg:col-span-5">
        <img src="/speedybat-crossover.webp" alt="Speedy Bat Couriers compact company vehicle." width="1666" height="944" className="w-[120%] max-w-none -translate-x-[8%] object-contain lg:w-[135%] lg:-translate-x-[18%]" />
      </div>
    </section>
  </main>
);
