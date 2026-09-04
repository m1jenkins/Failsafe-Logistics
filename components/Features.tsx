import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { Reveal } from './Reveal';

const serviceModules = [
  { id: 'same-day-on-demand-courier', link: 'View same-day service', span: 'md:col-span-7', aspect: 'aspect-[16/9]' },
  { id: 'hot-shot-expedited-freight', link: 'View expedited freight', span: 'md:col-span-5', aspect: 'aspect-[5/4]' },
  { id: 'long-distance-intercity-courier', link: 'View long-distance service', span: 'md:col-span-5', aspect: 'aspect-[4/3]' },
  { id: 'airport-recovery-next-flight-out', link: 'View airport service', span: 'md:col-span-7', aspect: 'aspect-[16/9]' },
  { id: 'manufacturing-line-down-delivery', link: 'View line-down service', span: 'md:col-span-4', aspect: 'aspect-square' },
  { id: 'scheduled-dedicated-routes', link: 'View scheduled routes', span: 'md:col-span-8', aspect: 'aspect-[16/9]' },
  { id: 'air-hand-carry-on-board-courier', link: 'View hand-carry service', span: 'md:col-span-5', aspect: 'aspect-[5/4]' },
  { id: 'legal-courier-court-filing', link: 'View document service', span: 'md:col-span-3', aspect: 'aspect-[3/4]' },
  { id: 'high-value-secure-courier', link: 'View secure-item service', span: 'md:col-span-4', aspect: 'aspect-square' }
] as const;

export const Features: React.FC = () => (
  <section id="services" className="bg-white pb-20 pt-12 md:pb-28 md:pt-16" aria-labelledby="services-heading">
    <div className="mx-auto max-w-[1536px] px-5 sm:px-8 lg:px-10">
      <div className="grid grid-cols-1 gap-5 border-b border-ink/20 pb-10 md:grid-cols-12 md:items-end md:gap-6 md:pb-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-signal md:col-span-3 md:self-start md:pt-2">Our services</p>
        <h2 id="services-heading" className="display-face text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[0.88] text-ink md:col-span-6">
          What do you<br />need to move?
        </h2>
        <p className="max-w-xs text-[17px] leading-relaxed text-ink-soft md:col-span-3 md:justify-self-end">
          From documents and parcels to urgent parts and freight.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-12 md:gap-y-20">
        {serviceModules.map((item, index) => {
          const service = services[item.id];
          return (
            <Reveal key={service.id} delay={(index % 3) * 70} as="article" className={item.span}>
              <a href={`/${service.id}`} className="group block h-full text-ink">
                <div className={`image-frame ${item.aspect}`}>
                  <img src={service.image} alt="" width="1536" height="1024" loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 right-3 bg-ink/75 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white">Illustrative image</span>
                </div>
                <div className="mt-5 border-t border-ink/25 pt-4">
                  <h3 className="display-face max-w-2xl text-[clamp(1.4rem,2.4vw,2.25rem)] uppercase leading-[0.95] transition-colors group-hover:text-signal">{service.name}</h3>
                  <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-soft">{service.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink underline decoration-ink/30 underline-offset-4 group-hover:text-signal">
                    {item.link}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-16 border-t border-ink/20 pt-8 md:mt-24">
        <a href="/services" className="inline-flex min-h-12 items-center gap-2 rounded-[5px] bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-signal">
          See all services
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </Reveal>
    </div>
  </section>
);
