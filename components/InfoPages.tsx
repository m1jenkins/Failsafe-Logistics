import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { coverageAreas } from '../data/locations';
import { services } from '../data/services';
import { ServiceGroup } from '../types';

const groupOrder: ServiceGroup[] = ['Local & direct', 'Urgent freight', 'Airport & specialty'];
const groupServiceIds: Record<ServiceGroup, string[]> = {
  'Local & direct': ['same-day-on-demand-courier', 'long-distance-intercity-courier', 'scheduled-dedicated-routes'],
  'Urgent freight': ['hot-shot-expedited-freight', 'manufacturing-line-down-delivery'],
  'Airport & specialty': ['airport-recovery-next-flight-out', 'air-hand-carry-on-board-courier', 'legal-courier-court-filing', 'high-value-secure-courier']
};
const groupDescriptions: Record<ServiceGroup, string> = {
  'Local & direct': 'Austin-area delivery, longer direct drives, and recurring business routes.',
  'Urgent freight': 'Time-critical parts and freight planned around the cargo, vehicle, and deadline.',
  'Airport & specialty': 'Airport, accompanied-air, document, and sensitive-item requests reviewed case by case.'
};

const austinNeighborhoods = coverageAreas.filter(area => area.kind === 'austin-neighborhood');
const metroAreas = coverageAreas.filter(area => area.kind === 'metro-request');
interface PageHeroProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
}

const PageHero: React.FC<PageHeroProps> = ({ title, description, action }) => (
  <header className="bg-ink py-16 text-white md:py-24">
    <div className="mx-auto grid max-w-[1536px] gap-8 px-5 sm:px-8 md:grid-cols-12 md:items-end lg:px-10">
      <h1 className="display-face text-[clamp(3.2rem,7.2vw,6rem)] uppercase leading-[0.84] text-white md:col-span-8">{title}</h1>
      <div className="md:col-span-4">
        <p className="max-w-xl text-[18px] leading-relaxed text-white/75">{description}</p>
        {action && <a href={action.href} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[5px] bg-signal px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">{action.label}<ArrowUpRight className="h-4 w-4" /></a>}
      </div>
    </div>
  </header>
);

const AreaList: React.FC<{ areas: typeof coverageAreas }> = ({ areas }) => (
  <ul className="grid border-t border-ink/20 sm:grid-cols-2 lg:grid-cols-3">
    {areas.map(area => <li key={area.id} className="border-b border-ink/20 py-4 text-[16px] font-semibold text-ink sm:pr-5">{area.name}</li>)}
  </ul>
);

const PageClose: React.FC<{ title: string; body: string; label: string }> = ({ title, body, label }) => (
  <section className="bg-signal py-16 text-white md:py-20">
    <div className="mx-auto flex max-w-[1536px] flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
      <div>
        <h2 className="display-face text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.86] text-white">{title}</h2>
        <p className="mt-5 max-w-xl text-[18px] text-white/85">{body}</p>
      </div>
      <a href="/#quick-quote-form" className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-[5px] bg-white px-6 py-3 text-sm font-bold text-ink hover:bg-ink hover:text-white md:self-auto">{label}<ArrowUpRight className="h-4 w-4" /></a>
    </div>
  </section>
);

export const ServicesPage: React.FC = () => (
  <main className="mt-[76px] bg-white lg:mt-[84px]">
    <PageHero
      title="Courier services from Austin"
      description="Choose the service that fits the shipment and deadline. If you are unsure, send the route and item details and dispatch will help identify an option."
      action={{ label: 'Get a quote', href: '/#quick-quote-form' }}
    />
    {groupOrder.map((group, groupIndex) => {
      const groupServices = groupServiceIds[group].map(id => services[id]);
      return (
        <section key={group} className={`py-20 md:py-28 ${groupIndex === 1 ? 'bg-cream' : 'bg-white'}`} aria-labelledby={`group-${groupIndex}`}>
          <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
            <div className="md:col-span-4">
              <h2 id={`group-${groupIndex}`} className="display-face text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.88] text-ink">{group}</h2>
              <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink-soft">{groupDescriptions[group]}</p>
            </div>
            <div className="border-t border-ink/25 md:col-span-7 md:col-start-6">
              {groupServices.map(service => (
                <article key={service.id} className="border-b border-ink/25 py-6">
                  <a href={`/${service.id}`} className="group grid gap-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center">
                    <img src={service.image} alt="" width="240" height="180" loading="lazy" className="aspect-[4/3] w-full object-cover sm:w-36" />
                    <div>
                      <h3 className="display-face text-2xl uppercase leading-none text-ink group-hover:text-signal">{service.name}</h3>
                      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-soft">{service.summary}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-ink/30 underline-offset-4 group-hover:text-signal">View service<ArrowUpRight className="h-4 w-4" /></span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    })}
    <PageClose title="Not sure which service fits?" body="Send the route, deadline, and item size. Dispatch will review the options with you." label="Get a quote" />
  </main>
);

export const ServiceAreasPage: React.FC = () => (
  <main className="mt-[76px] bg-white lg:mt-[84px]">
    <PageHero
      title="Courier pickup in the Austin metro"
      description="We pick up across Austin and nearby communities, subject to availability. Need delivery farther away? Ask about an Austin-origin direct route."
      action={{ label: 'Check a route', href: '/#quick-quote-form' }}
    />
    <section className="py-20 md:py-28" aria-labelledby="metro-heading">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-4">
          <h2 id="metro-heading" className="display-face text-[clamp(2.8rem,5.5vw,5rem)] uppercase leading-[0.88] text-ink">Austin metro pickup</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">Austin neighborhoods and nearby communities currently listed in the site data.</p>
        </div>
        <div className="space-y-12 md:col-span-7 md:col-start-6">
          <div id="austin" className="scroll-mt-28"><h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-signal">Austin neighborhoods</h3><AreaList areas={austinNeighborhoods} /></div>
          <div id="coverage" className="scroll-mt-28"><h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-signal">Nearby communities</h3><AreaList areas={metroAreas} /></div>
        </div>
      </div>
    </section>
    <section id="destinations" className="scroll-mt-28 bg-cream py-20 md:py-28" aria-labelledby="destinations-heading">
      <div className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-end lg:px-10">
        <div className="md:col-span-5">
          <h2 id="destinations-heading" className="display-face text-[clamp(2.8rem,5.5vw,5rem)] uppercase leading-[0.88] text-ink">Austin-origin destinations</h2>
        </div>
        <p className="border-t border-ink/25 pt-5 text-[18px] leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">Ask about direct delivery from Austin to Salado, Killeen, Temple, New Braunfels, other Texas cities, and longer routes.</p>
      </div>
    </section>
    <section className="border-y border-ink/20 bg-white py-8"><p className="mx-auto max-w-[1536px] px-5 text-[16px] font-bold text-ink sm:px-8 lg:px-10">A listed area is not a guarantee of availability. Send the route and deadline for confirmation.</p></section>
    <PageClose title="Have a route in mind?" body="Share the pickup, destination, and deadline for a current answer." label="Check a route" />
  </main>
);

export const HowItWorksPage: React.FC = () => {
  const steps = [
    { title: 'Send the basics', body: 'Give us the pickup, destination, deadline, item type, approximate size, and contact information.' },
    { title: 'Confirm the job', body: 'Dispatch confirms availability, price, service, vehicle, and any important handling or handoff details.' },
    { title: 'Hand it over', body: 'The courier completes the accepted route and provides the update or delivery confirmation arranged for the job.' }
  ];
  return (
    <main className="mt-[76px] bg-white lg:mt-[84px]">
      <PageHero title="From pickup request to delivery" description="Start with the route, deadline, and item. Dispatch confirms the job before a courier is booked." action={{ label: 'Get a quote', href: '/#quick-quote-form' }} />
      <section className="py-20 md:py-28" aria-label="Courier request steps">
        <ol className="mx-auto grid max-w-[1536px] gap-10 px-5 sm:px-8 md:grid-cols-3 md:gap-7 lg:px-10">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-ink/30 pt-5">
              <span className="display-face text-6xl text-signal">{index + 1}</span>
              <h2 className="display-face mt-10 text-3xl uppercase leading-none text-ink">{step.title}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-cream py-16 md:py-20" aria-labelledby="sensitive-details-heading">
        <div className="mx-auto grid max-w-[1536px] gap-6 px-5 sm:px-8 md:grid-cols-12 lg:px-10">
          <h2 id="sensitive-details-heading" className="display-face text-4xl uppercase leading-none text-ink md:col-span-4">Keep sensitive details out</h2>
          <p className="text-[17px] leading-relaxed text-ink-soft md:col-span-7 md:col-start-6"><strong className="text-ink">Keep sensitive details out of the public form and text messages.</strong> Do not send health information, patient names, account numbers, IDs, access codes, or detailed descriptions of valuables. Start with a broad item category and dispatch will arrange the next step if more information is needed.</p>
        </div>
      </section>
      <PageClose title="Ready to send the basics?" body="Share the route, deadline, and item size for a quote." label="Get a quote" />
    </main>
  );
};

interface PolicySectionProps { title: string; children: React.ReactNode; }
const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <section className="grid gap-5 border-t border-ink/25 py-9 md:grid-cols-12">
    <h2 className="display-face text-2xl uppercase leading-none text-ink md:col-span-4">{title}</h2>
    <div className="space-y-4 text-[16px] leading-relaxed text-ink-soft md:col-span-7 md:col-start-6">{children}</div>
  </section>
);

const PolicyPage: React.FC<{ kind: 'privacy' | 'terms' }> = ({ kind }) => {
  const privacy = kind === 'privacy';
  return (
    <main className="mt-[76px] bg-white lg:mt-[84px]">
      <PageHero
        title={privacy ? 'Website and quote-request privacy' : 'Public quote and dispatch terms'}
        description={privacy ? 'This notice describes the information used by the public quote form, Web3Forms submission processing, and Google Analytics.' : 'These terms explain what a public request means, what the sender must disclose, and which details remain job-specific.'}
      />
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 md:py-16 lg:px-10">
        {privacy ? (
          <>
            <PolicySection title="Information the quote form collects"><p>The form asks for a name or company, phone or email, pickup ZIP, destination ZIP, delivery deadline, broad cargo category, approximate size and weight, and optional details.</p><p>The submission also includes the source page, page type, applicable service ID, campaign parameters present in the URL, and referring page so the inquiry can be attributed and routed.</p></PolicySection>
            <PolicySection title="How requests are sent and used"><p>The browser sends form fields in a JSON request to Web3Forms, which processes the request using the site&apos;s account configuration so the inquiry can be routed for follow-up.</p><p>Speedy Bat uses request information to review the inquiry, respond, discuss a quote, decide whether a job can be accepted, and administer an accepted request. Submission does not book a job.</p></PolicySection>
            <PolicySection title="Google Analytics and technical data"><p>The site loads Google Analytics measurement ID G-3M0NV2T1HB. Google may process visits, referrer information, browser and device details, approximate location derived from network information, and cookies or similar identifiers, depending on configuration and visitor settings.</p><p>The site records <code>generate_lead</code> only after the processor confirms success, plus <code>click_call</code> and <code>click_text</code> events. Event context includes route, page type, service ID, campaign parameters, and referrer. Name, contact, ZIPs, deadline, cargo category, size, and details are not intentionally sent in these custom analytics events.</p><p>The site does not currently provide a separate cookie-preference control.</p></PolicySection>
            <PolicySection title="Sensitive information"><p>Do not submit health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS.</p><p>Start with a broad cargo category. Dispatch can determine whether the request must be declined or another communication method is appropriate.</p></PolicySection>
            <PolicySection title="Processors, storage, and retention"><p>Web3Forms receives form submissions, Google receives analytics data when its tag loads, and website hosting and network providers process technical request data needed to deliver the site.</p><p>The public site does not set fixed retention periods. Retention can depend on processor configuration, quote follow-up, accepted-job administration, business records, security, disputes, and applicable requirements.</p></PolicySection>
            <PolicySection title="Security and your choices"><p>No internet transmission or third-party service can be guaranteed completely secure. Minimize what you send and do not use the public form for restricted sensitive information.</p><p>You can choose not to submit the form, limit analytics through browser settings or blocking tools, or contact Speedy Bat by phone or text with a privacy question.</p></PolicySection>
            <PolicySection title="Contact and updates"><p>For a question, <a href="tel:+15129104938" className="font-bold text-signal underline">call (512) 910-4938</a> or <a href="sms:+15129104938" className="font-bold text-signal underline">text dispatch</a>.</p><p>This notice may be updated when the form, analytics setup, processors, or operating practices change. Last reviewed August 12, 2026.</p></PolicySection>
          </>
        ) : (
          <>
            <PolicySection title="A request is not job acceptance"><p>Submitting a form, calling, or texting asks Speedy Bat to review a potential job. A request is accepted only when dispatch confirms scope, availability, timing, price, and material conditions.</p><p>Do not tender an item or rely on a proposed deadline until dispatch confirms acceptance.</p></PolicySection>
            <PolicySection title="Accurate request information"><p>The sender is responsible for accurate pickup and destination details, deadlines, cargo category, dimensions, weight, packaging, value information when requested through an appropriate channel, site access, and authorized contacts.</p><p>The sender must have authority to release the item and identify a recipient authorized to accept it. A material change can require a revised quote or acceptance decision.</p></PolicySection>
            <PolicySection title="Sensitive and restricted information"><p>Do not place health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables in the public form or SMS.</p><p>Regulated, hazardous, illegal, inadequately packaged, access-controlled, unusually valuable, or otherwise restricted items may be declined. The public site does not represent medical, biohazard, UN3373, organ or blood, or validated cold-chain capability.</p></PolicySection>
            <PolicySection title="Job-specific configuration"><p>Vehicle, route, stops, courier assignment, handoffs, custody, tracking, packaging, handling, airport access, security measures, receipt method, and any available insurance coverage or exclusions are confirmed for each accepted job.</p><p>No direct-drive route, single courier, uninterrupted custody, screening status, security clearance, universal coverage amount, or other configuration is included unless it appears in the accepted scope.</p></PolicySection>
            <PolicySection title="Timing, access, and external conditions"><p>Pickup and delivery times are estimates unless expressly confirmed in the accepted scope. Traffic, weather, safe-driving requirements, site access, waiting, recipient availability, carrier schedules, screening, cargo release, and incomplete information can change timing.</p><p>For airport or air work, the airline, handler, airport, security authority, customs process, and destination rules control access and cargo eligibility. Speedy Bat does not represent customs-broker authority or guaranteed secured-area access.</p></PolicySection>
            <PolicySection title="Legal-document requests"><p>Speedy Bat provides courier transport, not legal advice or process service. Courthouse delivery or filing assistance depends on the accepted scope, clerk rules, hours, fees, access, and document eligibility.</p><p>Delivery records document the courier transaction only. The public site does not guarantee filing acceptance, a legal deadline, service of process, or court admissibility.</p></PolicySection>
            <PolicySection title="Quotes and changes"><p>Quotes can reflect distance, urgency, vehicle, cargo size and weight, waiting, tolls, parking, airport handling, access requirements, and after-hours work. Changes can require a revised price and scope.</p><p>Any job-specific written quote or accepted scope supplements these public request terms for that job.</p></PolicySection>
            <PolicySection title="Contact and version"><p>Questions can be directed to Speedy Bat by <a href="tel:+15129104938" className="font-bold text-signal underline">calling (512) 910-4938</a> or <a href="sms:+15129104938" className="font-bold text-signal underline">texting dispatch</a>.</p><p>Last reviewed August 12, 2026. Terms can be updated when the request process, services, or operating requirements change.</p></PolicySection>
          </>
        )}
      </div>
    </main>
  );
};

export const PrivacyPage: React.FC = () => <PolicyPage kind="privacy" />;
export const TermsPage: React.FC = () => <PolicyPage kind="terms" />;
