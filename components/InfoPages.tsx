import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  PackageCheck,
  Plane,
  ShieldAlert,
  Truck
} from 'lucide-react';
import { coverageAreas } from '../data/locations';
import { serviceList } from '../data/services';
import { ServiceGroup } from '../types';

const LAST_REVIEWED = '2026-08-12';

const SERVICE_GROUP_ORDER: ServiceGroup[] = [
  'Urgent ground',
  'Air and airport',
  'Secure and legal',
  'Recurring'
];

const SERVICE_GROUP_DESCRIPTIONS: Record<ServiceGroup, string> = {
  'Urgent ground': 'Austin-origin ground options for deadlines that need a job-specific vehicle and route review.',
  'Air and airport': 'Airport, cargo-terminal, and accompanied-air requests subject to carrier, access, screening, and document rules.',
  'Secure and legal': 'Document and sensitive-item requests with scope, custody, access, and receipt details confirmed before acceptance.',
  Recurring: 'Planned Austin business routes with documented stops, windows, cargo, contacts, and exception handling.'
};

const SERVICE_GROUPS = SERVICE_GROUP_ORDER.map((group) => ({
  group,
  description: SERVICE_GROUP_DESCRIPTIONS[group],
  services: serviceList.filter((service) => service.group === group)
}));

const AUSTIN_NEIGHBORHOODS = coverageAreas.filter((area) => area.kind === 'austin-neighborhood');
const METRO_REQUEST_AREAS = coverageAreas.filter((area) => area.kind === 'metro-request');
const AUSTIN_ORIGIN_DESTINATIONS = coverageAreas.filter((area) => area.kind === 'austin-origin-destination');

const REQUEST_STEPS = [
  {
    number: '01',
    title: 'Send the essentials',
    description: 'Share pickup and destination ZIPs, deadline, broad cargo category, approximate size or weight, and a contact method.'
  },
  {
    number: '02',
    title: 'Dispatch reviews fit',
    description: 'Dispatch checks pickup eligibility, timing, vehicle, route, access, handling, restrictions, and price factors.'
  },
  {
    number: '03',
    title: 'Confirm the job scope',
    description: 'A job starts only after availability, timing, price, material handoffs, updates, and receipt method are agreed.'
  },
  {
    number: '04',
    title: 'Complete the handoff',
    description: 'Pickup, status updates, exceptions, and delivery confirmation follow the method recorded for the accepted job.'
  }
] as const;

const JOB_SPECIFIC_DETAILS = [
  'Pickup and delivery timing',
  'Courier and vehicle assignment',
  'Direct, dedicated, or multi-stop routing',
  'Material custody and handoff steps',
  'Tracking and update method',
  'Airport or facility access',
  'Special handling and packaging',
  'Insurance availability and exclusions'
] as const;

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description }) => (
  <header className="text-center mb-14 space-y-4">
    <span className="text-[11px] text-red-500/80 font-bold uppercase tracking-[0.3em] font-display block">
      {eyebrow}
    </span>
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white font-display tracking-tight">
      {title}
    </h1>
    <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
      {description}
    </p>
  </header>
);

const ReviewStamp: React.FC = () => (
  <p className="text-slate-500 text-xs font-light text-center">
    Reviewed by Speedy Bat Operations · {LAST_REVIEWED}
  </p>
);

interface PageLinkProps {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}

const PageLink: React.FC<PageLinkProps> = ({ href, children, secondary = false }) => (
  <a
    href={href}
    className={secondary
      ? 'inline-flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-full border border-white/[0.08] font-display'
      : 'inline-flex items-center justify-center bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-full border border-red-500/20 font-display shadow-md shadow-red-950/20'}
  >
    {children}
    <ArrowRight className="h-3.5 w-3.5 ml-2" aria-hidden="true" />
  </a>
);

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <section className="glass-panel p-6 md:p-8 rounded-2xl space-y-4">
    <h2 className="text-lg md:text-xl font-bold uppercase text-white font-display tracking-wider">
      {title}
    </h2>
    <div className="text-slate-400 font-light text-sm leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

interface AreaListProps {
  areas: typeof coverageAreas;
}

const AreaList: React.FC<AreaListProps> = ({ areas }) => (
  <ul className="flex flex-wrap gap-2.5" aria-label="Areas in this category">
    {areas.map((area) => (
      <li key={area.id} className="text-[11px] font-bold text-slate-300 bg-white/[0.02] border border-white/[0.06] px-3 py-2 uppercase tracking-wider rounded-full font-display">
        {area.name}
      </li>
    ))}
  </ul>
);

export const ServicesPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <PageHeader
          eyebrow="Courier Services"
          title="Courier Options from Austin"
          description="Speedy Bat evaluates urgent business delivery requests that originate in the Austin metro. Each service page explains who the option may fit, what dispatch needs, material limits, and what must be confirmed before acceptance."
        />

        <div className="space-y-10">
          {SERVICE_GROUPS.map(({ group, description, services }) => (
            <section key={group} className="space-y-5" aria-labelledby={`group-${group.replaceAll(' ', '-').toLowerCase()}`}>
              <div className="max-w-3xl">
                <h2 id={`group-${group.replaceAll(' ', '-').toLowerCase()}`} className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
                  {group}
                </h2>
                <p className="text-slate-400 text-sm font-light leading-relaxed mt-2">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service) => (
                  <article key={service.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-64 border border-white/[0.04]">
                    <div>
                      <p className="text-[10px] text-red-500/80 font-bold uppercase tracking-[0.22em] font-display mb-3">
                        Reviewed {service.lastReviewed}
                      </p>
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                        {service.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-light leading-relaxed mt-3">
                        {service.tagline}
                      </p>
                    </div>
                    <a href={`/${service.id}`} className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 font-display mt-6 transition-colors">
                      Review eligibility and limits
                      <ArrowRight className="h-3.5 w-3.5 ml-2" aria-hidden="true" />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 glass-panel-elevated p-8 md:p-10 rounded-3xl border border-white/[0.06]" aria-labelledby="services-confirmed-heading">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div>
              <Clock className="h-6 w-6 text-red-500 mb-4" aria-hidden="true" />
              <h2 id="services-confirmed-heading" className="text-sm font-bold uppercase text-white tracking-wider font-display">Timing Is Confirmed</h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-2">The website does not promise a universal pickup or delivery window.</p>
            </div>
            <div>
              <Truck className="h-6 w-6 text-red-500 mb-4" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase text-white tracking-wider font-display">Configuration Is Confirmed</h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-2">Vehicle, route, couriers, stops, custody, tracking, and coverage are job-specific.</p>
            </div>
            <div>
              <ShieldAlert className="h-6 w-6 text-red-500 mb-4" aria-hidden="true" />
              <h2 className="text-sm font-bold uppercase text-white tracking-wider font-display">Restrictions Are Reviewed</h2>
              <p className="text-slate-400 text-xs font-light leading-relaxed mt-2">Regulated, hazardous, unusually valuable, or access-controlled requests may be revised or declined.</p>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-6">
          <ReviewStamp />
          <div className="flex flex-wrap justify-center gap-3">
            <PageLink href="/#quick-quote-form">Request a Quote</PageLink>
            <PageLink href="/how-it-works" secondary>How It Works</PageLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export const ServiceAreasPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <PageHeader
          eyebrow="Service Areas"
          title="Austin Pickup and Destinations"
          description="Speedy Bat is one Austin-based service-area business. Routine pickup is limited to the Austin metro and remains subject to dispatch confirmation. Area names do not represent separate offices, local fleets, or guaranteed response times."
        />

        <div className="space-y-7">
          <section id="austin" className="glass-panel-elevated p-7 md:p-9 rounded-3xl border border-white/[0.06] scroll-mt-28" aria-labelledby="austin-heading">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-red-500 shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-4">
                <div>
                  <h2 id="austin-heading" className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
                    Austin Neighborhoods
                  </h2>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mt-2">
                    These labels organize Austin-area coverage information. Dispatch still confirms the exact pickup address, suitable courier and vehicle availability, traffic, access, cargo, and requested deadline.
                  </p>
                </div>
                <AreaList areas={AUSTIN_NEIGHBORHOODS} />
              </div>
            </div>
          </section>

          <section id="coverage" className="glass-panel p-7 md:p-9 rounded-3xl scroll-mt-28" aria-labelledby="coverage-heading">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="h-6 w-6 text-red-500 shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-4">
                <div>
                  <h2 id="coverage-heading" className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
                    Requests Reviewed from Austin
                  </h2>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mt-2">
                    Requests involving these communities are evaluated from the Austin dispatch area. Listing a place does not promise routine local pickup, a staffed local vehicle, or previous service to any named organization there.
                  </p>
                </div>
                <AreaList areas={METRO_REQUEST_AREAS} />
              </div>
            </div>
          </section>

          <section id="destinations" className="glass-panel p-7 md:p-9 rounded-3xl scroll-mt-28" aria-labelledby="destinations-heading">
            <div className="flex items-start gap-4">
              <Truck className="h-6 w-6 text-red-500 shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-4">
                <div>
                  <h2 id="destinations-heading" className="text-xl md:text-2xl font-extrabold uppercase text-white font-display tracking-wider">
                    Austin-Origin Destinations
                  </h2>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mt-2">
                    These markets may be quoted as destinations for an accepted Austin-origin job. They are not represented as routine pickup markets or staffed Speedy Bat locations.
                  </p>
                </div>
                <AreaList areas={AUSTIN_ORIGIN_DESTINATIONS} />
              </div>
            </div>
          </section>
        </div>

        <aside className="mt-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-950/10" aria-label="Coverage reminder">
          <p className="text-amber-100/80 text-sm leading-relaxed font-light">
            A place name is not an availability promise. Dispatch confirms whether the exact pickup, route, vehicle, access conditions, cargo, and deadline can be accepted.
          </p>
        </aside>

        <div className="mt-12 space-y-6">
          <ReviewStamp />
          <div className="flex flex-wrap justify-center gap-3">
            <PageLink href="/#quick-quote-form">Check a Route</PageLink>
            <PageLink href="/services" secondary>Compare Services</PageLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export const HowItWorksPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <PageHeader
          eyebrow="How It Works"
          title="From Request to Confirmed Delivery"
          description="A public quote request starts a dispatch review; it does not book a courier by itself. Speedy Bat confirms whether the route, cargo, deadline, vehicle, access, and handling requirements can be accepted."
        />

        <section aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="sr-only">Courier request steps</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REQUEST_STEPS.map((step) => (
              <li key={step.number} className="glass-panel p-7 rounded-2xl flex gap-5">
                <span className="text-red-500 text-sm font-black tracking-wider font-display" aria-hidden="true">{step.number}</span>
                <div>
                  <h3 className="text-base font-bold uppercase text-white tracking-wider font-display">{step.title}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mt-2">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7" aria-label="Request details and job scope">
          <div className="glass-panel-elevated p-7 md:p-9 rounded-3xl border border-white/[0.06]">
            <PackageCheck className="h-7 w-7 text-red-500 mb-5" aria-hidden="true" />
            <h2 className="text-xl font-extrabold uppercase text-white font-display tracking-wider">What to Send First</h2>
            <ul className="mt-5 space-y-3 text-slate-400 text-sm font-light">
              {[
                'Pickup and destination ZIPs',
                'Requested pickup and delivery deadline',
                'Broad cargo category',
                'Approximate dimensions and weight',
                'Known site-access or loading needs',
                'Phone number or email for follow-up'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel-elevated p-7 md:p-9 rounded-3xl border border-white/[0.06]">
            <FileText className="h-7 w-7 text-red-500 mb-5" aria-hidden="true" />
            <h2 className="text-xl font-extrabold uppercase text-white font-display tracking-wider">What Dispatch Confirms</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400 text-sm font-light">
              {JOB_SPECIFIC_DETAILS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 p-7 md:p-9 rounded-3xl border border-red-500/20 bg-red-950/10" aria-labelledby="sensitive-heading">
          <div className="flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-red-500 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h2 id="sensitive-heading" className="text-lg font-bold uppercase text-white font-display tracking-wider">Keep Sensitive Details Out of the Public Form</h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed mt-3">
                Do not submit health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS. Use a broad cargo category; dispatch can arrange an appropriate next step if more detail is necessary.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <a href="/privacy" className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 font-display">Read the Privacy Notice</a>
                <a href="/terms" className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 font-display">Read the Request Terms</a>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 space-y-6">
          <ReviewStamp />
          <div className="flex flex-wrap justify-center gap-3">
            <PageLink href="/#quick-quote-form">Start a Request</PageLink>
            <PageLink href="/faq" secondary>Read the FAQ</PageLink>
          </div>
        </div>
      </div>
    </main>
  );
};

// DEPLOYMENT DEPENDENCY: PrivacyPage and TermsPage require legal/privacy review before production publication.
// The visible copy intentionally does not claim attorney, legal, or privacy-professional review.

export const PrivacyPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <PageHeader
          eyebrow="Privacy Notice"
          title="Website and Quote-Request Privacy"
          description="This notice describes the data flow visible in the Speedy Bat website source as reviewed on August 12, 2026. It covers the public quote form, Web3Forms submission processing, and the Google Analytics tag."
        />

        <div className="space-y-5">
          <PolicySection title="Information the Quote Form Collects">
            <p>The public form asks for a full name or company name, preferred contact method, phone number or email, pickup ZIP, destination ZIP, delivery deadline, broad cargo category, and approximate size or weight.</p>
            <p>The submission also includes the source page, page type, applicable service ID, campaign parameters present in the URL, and the referring page so the inquiry can be attributed and routed.</p>
            <p>Use broad route and cargo details only. The form is intended to start a quote review, not to collect everything needed to perform an accepted job.</p>
          </PolicySection>

          <PolicySection title="How Quote Requests Are Sent and Used">
            <p>When the form is submitted, the browser sends its fields in a JSON request to the Web3Forms submission service. Web3Forms processes the request using the site&apos;s account configuration so the inquiry can be routed for Speedy Bat follow-up.</p>
            <p>Speedy Bat uses request information to review the inquiry, respond, prepare or discuss a quote, decide whether the job can be accepted, and administer an accepted request. Submission does not by itself create a booked job.</p>
          </PolicySection>

          <PolicySection title="Google Analytics and Technical Data">
            <p>The site loads a Google Analytics tag with measurement ID G-3M0NV2T1HB. Google Analytics may process page visits, referrer information, browser and device details, approximate location derived from network information, and cookies or similar identifiers, depending on Google&apos;s configuration and the visitor&apos;s settings.</p>
            <p>The site records a <code>generate_lead</code> event only after the form processor confirms success, and separate <code>click_call</code> and <code>click_text</code> events when those contact controls are used. Event context includes route, page type, service ID, campaign parameters, and referrer; the form&apos;s name, contact value, ZIPs, deadline, cargo category, and size or weight are not intentionally sent in these custom analytics events.</p>
            <p>The reviewed source does not implement a separate cookie-preference control. Any consent or regional configuration required for production remains an implementation and policy dependency.</p>
          </PolicySection>

          <PolicySection title="Sensitive Information">
            <p>Do not submit health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS.</p>
            <p>If a request may require sensitive detail, provide only a broad cargo category first. Dispatch can determine whether the request must be declined or whether another communication method is appropriate.</p>
          </PolicySection>

          <PolicySection title="Processors, Storage, and Retention">
            <p>Web3Forms receives quote-form submissions, and Google receives analytics data when its tag loads. Website hosting and network providers also necessarily process technical request data such as IP addresses to deliver the site.</p>
            <p>The public website source does not set or expose fixed retention periods for Web3Forms, Google Analytics, or quote records received by Speedy Bat. Retention can depend on processor configuration, quote follow-up, accepted-job administration, business-record needs, security, dispute handling, and applicable requirements.</p>
          </PolicySection>

          <PolicySection title="Security and Your Choices">
            <p>No internet transmission or third-party service can be guaranteed completely secure. Minimize what you send and do not use the public form for restricted sensitive information.</p>
            <p>You can choose not to submit the form, limit analytics through browser settings or blocking tools, or contact Speedy Bat by phone or text with a privacy question. Do not include additional sensitive information in the initial privacy message.</p>
          </PolicySection>

          <PolicySection title="Contact and Updates">
            <p>For a question about this notice or a quote request, <a href="tel:+15129104938" className="text-red-500 hover:text-red-400">call (512) 910-4938</a> or <a href="sms:+15129104938" className="text-red-500 hover:text-red-400">text dispatch</a>.</p>
            <p>This notice may be updated when the form, analytics setup, processors, or operating practices change. The review date below identifies the version inspected in the site source.</p>
          </PolicySection>
        </div>

        <div className="mt-10 space-y-6">
          <ReviewStamp />
          <div className="flex flex-wrap justify-center gap-3">
            <PageLink href="/terms">Service Request Terms</PageLink>
            <PageLink href="/how-it-works" secondary>How It Works</PageLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <main className="pt-24 pb-20 bg-obsidian min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <PageHeader
          eyebrow="Service Request Terms"
          title="Public Quote and Dispatch Terms"
          description="These terms govern use of the public quote and dispatch-request paths. They explain what a submission means, what the sender must disclose, and which details remain job-specific."
        />

        <div className="space-y-5">
          <PolicySection title="A Request Is Not Job Acceptance">
            <p>Submitting a form, calling, or texting asks Speedy Bat to review a potential job. A request is accepted only when dispatch confirms the scope, availability, timing, price, and any material conditions.</p>
            <p>Do not tender an item or rely on a proposed deadline until dispatch has confirmed acceptance.</p>
          </PolicySection>

          <PolicySection title="Accurate Request Information">
            <p>The sender is responsible for providing accurate pickup and destination details, deadlines, cargo category, dimensions, weight, packaging, value information when requested through an appropriate channel, site-access requirements, and authorized contacts.</p>
            <p>The sender must have authority to release the item and must identify a recipient authorized to accept it. A material change can require a revised quote or a new acceptance decision.</p>
          </PolicySection>

          <PolicySection title="Sensitive and Restricted Information">
            <p>Do not place health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables in the public form or SMS.</p>
            <p>Regulated, hazardous, illegal, inadequately packaged, access-controlled, unusually valuable, or otherwise restricted items may be declined. No medical, biohazard, UN3373, organ or blood, or validated cold-chain capability is represented by the public site.</p>
          </PolicySection>

          <PolicySection title="Job-Specific Configuration">
            <p>Vehicle, route, stops, courier assignment, material handoffs, custody, tracking, packaging, handling, airport access, security measures, receipt method, and any available insurance coverage or exclusions are confirmed for each accepted job.</p>
            <p>No direct-drive route, single courier, uninterrupted custody, screening status, security clearance, universal coverage amount, or other configuration is included unless it appears in the accepted scope.</p>
          </PolicySection>

          <PolicySection title="Timing, Access, and External Conditions">
            <p>Pickup and delivery times are estimates unless expressly confirmed as part of the accepted scope. Traffic, weather, safe-driving requirements, site access, waiting, recipient availability, carrier schedules, screening, cargo release, and incomplete information can change timing.</p>
            <p>For airport or air work, the airline, handler, airport, security authority, customs process, and destination rules control access and cargo eligibility. Speedy Bat does not represent customs-broker authority or guaranteed secured-area access.</p>
          </PolicySection>

          <PolicySection title="Legal-Document Requests">
            <p>Speedy Bat does not represent itself as providing legal advice or process service. Courthouse delivery or filing assistance is subject to the requested scope, clerk rules, hours, fees, access, and document eligibility.</p>
            <p>Delivery records document the courier transaction only. The public site does not guarantee filing acceptance, a legal deadline, service of process, or court admissibility.</p>
          </PolicySection>

          <PolicySection title="Quotes and Changes">
            <p>Quotes can reflect distance, urgency, vehicle, cargo size and weight, waiting, tolls, parking, airport handling, access requirements, and after-hours work. A change to the route, cargo, timing, access, waiting, or handling can require a revised price and scope.</p>
            <p>Any job-specific written quote or accepted scope supplements these public request terms for that job.</p>
          </PolicySection>

          <PolicySection title="Contact and Version">
            <p>Questions about a request can be directed to Speedy Bat by <a href="tel:+15129104938" className="text-red-500 hover:text-red-400">calling (512) 910-4938</a> or <a href="sms:+15129104938" className="text-red-500 hover:text-red-400">texting dispatch</a>.</p>
            <p>The review date below identifies this public version. Terms can be updated when the request process, services, or operating requirements change.</p>
          </PolicySection>
        </div>

        <div className="mt-10 space-y-6">
          <ReviewStamp />
          <div className="flex flex-wrap justify-center gap-3">
            <PageLink href="/privacy">Privacy Notice</PageLink>
            <PageLink href="/how-it-works" secondary>How It Works</PageLink>
          </div>
        </div>
      </div>
    </main>
  );
};
