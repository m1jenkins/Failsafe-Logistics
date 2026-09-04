import { ServiceData } from '../types';

export const services: Record<string, ServiceData> = {
  'same-day-on-demand-courier': {
    id: 'same-day-on-demand-courier',
    name: 'Same-Day Courier',
    group: 'Local & direct',
    title: 'Same-Day Courier Service in Austin, TX | Speedy Bat',
    metaDescription: 'Request same-day courier pickup in the Austin metro. Speedy Bat confirms availability, timing, vehicle, route, and handling for each accepted job.',
    headline: 'Same-day courier service in Austin',
    summary: 'Documents, parcels, parts, and supplies delivered across the Austin metro.',
    goodFor: ['Business documents and small parcels', 'Parts, samples, and supplies', 'Urgent office-to-office delivery'],
    howItWorks: 'Send the route and deadline. Dispatch confirms availability, price, and delivery details. The courier completes the accepted route and provides the arranged delivery confirmation.',
    whatToSend: 'Pickup and destination ZIPs, deadline, item type, approximate size, and contact information.',
    beforeYouBook: 'Pickup and delivery timing depend on availability, traffic, access, and the shipment. Ask for direct service or a particular receipt method when you request the quote.',
    cta: 'Get a same-day quote',
    image: '/courier-handoff-illustrative.webp',
    imageAlt: 'A small parcel being handed to a recipient at a business entrance.',
    faq: [
      { question: 'How quickly can pickup happen?', answer: 'Dispatch provides a current estimate after reviewing the pickup location, cargo, available courier and vehicle, traffic, access, and deadline.' },
      { question: 'Can I request direct delivery?', answer: 'Yes. Ask for direct service when you request the quote. It is included only when dispatch confirms it in the accepted job details.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'long-distance-intercity-courier', 'scheduled-dedicated-routes']
  },
  'hot-shot-expedited-freight': {
    id: 'hot-shot-expedited-freight',
    name: 'Hot Shot & Expedited Freight',
    group: 'Urgent freight',
    title: 'Hot Shot Delivery from Austin, TX | Speedy Bat',
    metaDescription: 'Request Austin-origin hot shot and expedited ground delivery. Dispatch confirms cargo fit, vehicle, route, custody, timing, and coverage for each job.',
    headline: 'Expedited freight from Austin',
    summary: 'Time-critical parts and freight moved by an Austin-origin ground route.',
    goodFor: ['Urgent business freight', 'Replacement parts and equipment', 'Regional and interstate ground delivery'],
    howItWorks: 'Send the lane, deadline, cargo dimensions, weight, and site details. Dispatch confirms vehicle fit, price, route, and handoff requirements before pickup.',
    whatToSend: 'Pickup and destination, deadline, dimensions, weight, packaging, loading needs, and dock contacts.',
    beforeYouBook: 'Vehicle availability and cargo fit must be confirmed. Oversized, hazardous, temperature-controlled, or regulated cargo may be declined. Dedicated or nonstop service applies only when included in the quote.',
    cta: 'Get an expedited quote',
    image: '/courier-parts-illustrative.webp',
    imageAlt: 'A precision machine part in a protective case being loaded into a compact cargo van.',
    faq: [
      { question: 'What makes a shipment a hot shot job?', answer: 'It is generally a time-critical ground shipment that needs a job-specific vehicle and route. Dispatch confirms whether hot shot service fits the cargo and deadline.' },
      { question: 'Can you quote an interstate route?', answer: 'Austin-origin interstate requests can be reviewed. Dispatch confirms the lane, vehicle and courier availability, safe-driving needs, timing, and price.' }
    ],
    relatedServiceIds: ['manufacturing-line-down-delivery', 'long-distance-intercity-courier', 'airport-recovery-next-flight-out']
  },
  'long-distance-intercity-courier': {
    id: 'long-distance-intercity-courier',
    name: 'Long-Distance Direct Drive',
    group: 'Local & direct',
    title: 'Long-Distance Courier from Austin, TX | Speedy Bat',
    metaDescription: 'Request Austin-origin long-distance courier service. Route, vehicle, custody, driver plan, timing, and delivery confirmation are quoted per job.',
    headline: 'Long-distance courier from Austin',
    summary: 'Direct ground delivery from Austin to destinations across Texas and beyond.',
    goodFor: ['Time-critical intercity delivery', 'Items that cannot wait for a parcel network', 'Austin-origin regional and interstate routes'],
    howItWorks: 'Send the route, deadline, cargo details, and destination hours. Dispatch confirms the vehicle, route, price, updates, and handoff plan before departure.',
    whatToSend: 'Origin, destination, deadline, item type, dimensions, weight, site hours, and recipient contact.',
    beforeYouBook: 'Travel time can change with traffic, weather, distance, and safe-driving requirements. Destination cities are delivery markets for Austin-origin jobs, not routine local pickup locations.',
    cta: 'Get a long-distance quote',
    image: '/courier-road-illustrative.webp',
    imageAlt: 'A compact courier van traveling on a Central Texas road.',
    faq: [
      { question: 'How far can a route go?', answer: 'Distance is reviewed per request. Dispatch considers the lane, deadline, safe-driving plan, available courier and vehicle, cargo, and destination access.' },
      { question: 'Do you pick up in destination cities?', answer: 'Routine pickup is in the Austin metro. Farther cities are destinations for Austin-origin jobs unless dispatch confirms a separate arrangement.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'air-hand-carry-on-board-courier', 'same-day-on-demand-courier']
  },
  'legal-courier-court-filing': {
    id: 'legal-courier-court-filing',
    name: 'Legal Courier & Document Delivery',
    group: 'Airport & specialty',
    title: 'Legal Document Courier in Austin, TX | Speedy Bat',
    metaDescription: 'Request time-sensitive legal document transport in Austin. Dispatch confirms deadline, destination access, custody notes, and receipt requirements per job.',
    headline: 'Legal document courier in Austin',
    summary: 'Time-sensitive document delivery between authorized offices and recipients.',
    goodFor: ['Contracts, deeds, and exhibits', 'Office-to-office document delivery', 'Courthouse delivery tasks accepted in advance'],
    howItWorks: 'Send the pickup, destination, deadline, authorized contacts, and requested receipt. Dispatch confirms the exact delivery task and access requirements.',
    whatToSend: 'Addresses or ZIPs, deadline, authorized contacts, destination hours, and the receipt needed. Do not put sensitive document contents in the public form or text.',
    beforeYouBook: 'Speedy Bat provides courier transport, not legal advice or service of process. Filing or clerk-facing tasks must be explicitly accepted, and no filing outcome is guaranteed.',
    cta: 'Get a document-delivery quote',
    image: '/courier-handoff-illustrative.webp',
    imageAlt: 'A slim parcel being handed to a recipient at a business entrance.',
    faq: [
      { question: 'Do you provide service of process?', answer: 'No. This service is courier transport, not service of process.' },
      { question: 'Can you deliver documents to a courthouse?', answer: 'A courthouse or clerk-facing task must be reviewed and accepted in advance, including the destination rules, deadline, access, and return requirements.' }
    ],
    relatedServiceIds: ['high-value-secure-courier', 'same-day-on-demand-courier', 'long-distance-intercity-courier']
  },
  'manufacturing-line-down-delivery': {
    id: 'manufacturing-line-down-delivery',
    name: 'Manufacturing Line-Down Delivery',
    group: 'Urgent freight',
    title: 'Manufacturing Line-Down Courier from Austin | Speedy Bat',
    metaDescription: 'Request Austin-origin line-down parts delivery. Speedy Bat reviews cargo fit, dock access, deadline, vehicle, routing, and handoff requirements per job.',
    headline: 'Urgent line-down parts delivery',
    summary: 'Urgent parts delivery planned around your production deadline and receiving dock.',
    goodFor: ['Replacement parts and components', 'Prototypes, tools, and samples', 'Time-critical plant or supplier handoffs'],
    howItWorks: 'Send the part details, route, deadline, and dock contacts. Dispatch confirms vehicle fit, site access, price, and the handoff plan.',
    whatToSend: 'Part type, dimensions, weight, packaging, pickup dock, receiving dock, deadline, and contacts.',
    beforeYouBook: 'Special securement, equipment, cleanroom, hazardous-material, or other controlled requirements need advance review and may be declined.',
    cta: 'Get a line-down quote',
    image: '/courier-parts-illustrative.webp',
    imageAlt: 'A protected precision part being loaded into a compact cargo vehicle.',
    faq: [
      { question: 'What details help with a line-down quote?', answer: 'Provide dimensions, weight, packaging, pickup and receiving dock details, authorized contacts, the needed-on-site deadline, and any handling constraints.' },
      { question: 'Can you enter a restricted facility?', answer: 'Access is never assumed. Dispatch confirms visitor, vehicle, identification, escort, and dock requirements before accepting the job.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'airport-recovery-next-flight-out', 'same-day-on-demand-courier']
  },
  'airport-recovery-next-flight-out': {
    id: 'airport-recovery-next-flight-out',
    name: 'Airport Recovery / NFO / AOG',
    group: 'Airport & specialty',
    title: 'Austin Airport Recovery, NFO & AOG Courier | Speedy Bat',
    metaDescription: 'Request Austin airport recovery, next-flight-out, or AOG ground support. Access, documents, cargo release, timing, and tender scope are confirmed per job.',
    headline: 'Austin airport courier and cargo recovery',
    summary: 'Pickup, tender, transfer, and onward delivery for eligible Austin airport shipments.',
    goodFor: ['Cargo-terminal recovery', 'Next-flight-out tender or transfer', 'AOG parts and onward ground delivery'],
    howItWorks: 'Send the airport or handler, shipment number, deadline, cargo details, and release contact. Dispatch confirms the permitted task, documents, access, vehicle, price, and onward route.',
    whatToSend: 'Airline or handler, terminal, shipment number, cargo size, release documents, deadline, and authorized contacts.',
    beforeYouBook: 'Cargo release depends on the airline or handler. Speedy Bat does not claim customs authority, ramp access, security clearance, or control over flight operations.',
    cta: 'Get an airport courier quote',
    image: '/courier-airport-illustrative.webp',
    imageAlt: 'A compact courier van on a public airport cargo-terminal access road.',
    faq: [
      { question: 'Can you recover cargo from any airline?', answer: 'Not automatically. Dispatch must confirm the airline or handler, release requirements, public or authorized access, cargo, operating hours, and shipment status.' },
      { question: 'Do you clear customs?', answer: 'No customs-broker or clearance authority is represented. The shipper or appointed broker must complete required customs work and provide releasable cargo documentation.' }
    ],
    relatedServiceIds: ['air-hand-carry-on-board-courier', 'manufacturing-line-down-delivery', 'hot-shot-expedited-freight']
  },
  'scheduled-dedicated-routes': {
    id: 'scheduled-dedicated-routes',
    name: 'Scheduled & Recurring Routes',
    group: 'Local & direct',
    title: 'Scheduled Courier Routes in Austin, TX | Speedy Bat',
    metaDescription: 'Plan recurring Austin courier routes with agreed stops, windows, cargo categories, contacts, exceptions, and reporting. Availability is reviewed before setup.',
    headline: 'Scheduled courier routes in Austin',
    summary: 'Regular Austin-area pickups and deliveries built around your stops and schedule.',
    goodFor: ['Daily or weekly business routes', 'Interoffice documents and supplies', 'Planned parts and inventory movement'],
    howItWorks: 'Share the stops, windows, frequency, cargo, and expected volume. Dispatch proposes a route, price, reporting method, and process for changes.',
    whatToSend: 'Stops, operating windows, frequency, cargo type, volume, vehicle needs, contacts, and holiday or exception rules.',
    beforeYouBook: 'Extra stops, volume changes, waiting, closures, after-hours work, or different cargo may change the route and price. Urgent work is quoted separately.',
    cta: 'Plan a recurring route',
    image: '/courier-scheduled-illustrative.webp',
    imageAlt: 'Organized parcels and document totes prepared for a recurring business pickup.',
    faq: [
      { question: 'Can a route run daily or weekly?', answer: 'Frequency is part of the route proposal. Dispatch confirms capacity, stops, windows, cargo, reporting, and price before the schedule is accepted.' },
      { question: 'What happens when a stop changes?', answer: 'Use the agreed change process. Added stops, different cargo, closures, waiting, and volume changes may affect timing and price.' }
    ],
    relatedServiceIds: ['same-day-on-demand-courier', 'manufacturing-line-down-delivery', 'legal-courier-court-filing']
  },
  'air-hand-carry-on-board-courier': {
    id: 'air-hand-carry-on-board-courier',
    name: 'Air Hand Carry / On-Board Courier',
    group: 'Airport & specialty',
    title: 'Air Hand Carry & On-Board Courier from Austin | Speedy Bat',
    metaDescription: 'Request Austin-origin air hand carry or on-board courier service. Flight, traveler, screening, baggage, documents, custody, and final-mile scope are confirmed per job.',
    headline: 'Air hand carry from Austin',
    summary: 'Accompanied air transport from Austin for eligible time-critical shipments.',
    goodFor: ['Small time-critical business items', 'Shipments that may benefit from an accompanying traveler', 'Airport-to-recipient delivery when included'],
    howItWorks: 'Send the route, deadline, item category, dimensions, weight, and documents. Dispatch reviews traveler and flight options, screening, carrier rules, price, and each handoff.',
    whatToSend: 'Route, deadline, item category, dimensions, weight, packaging, documents, and contacts.',
    beforeYouBook: "Traveler and flight availability, screening, baggage acceptance, border rules, and carrier decisions are outside Speedy Bat's control. International requests require separate review and may be declined.",
    cta: 'Request a hand-carry quote',
    image: '/courier-airport-illustrative.webp',
    imageAlt: 'A compact courier van outside a public airport cargo-terminal building.',
    faq: [
      { question: 'Is hand carry always the fastest option?', answer: 'Not necessarily. Dispatch compares flight availability, screening, documents, final-mile needs, and ground alternatives before proposing a route.' },
      { question: 'Can any item travel as carry-on baggage?', answer: 'No. The carrier and applicable authorities control eligibility. Accurate contents, dimensions, weight, packaging, value, and documents are required for review.' }
    ],
    relatedServiceIds: ['airport-recovery-next-flight-out', 'long-distance-intercity-courier', 'high-value-secure-courier']
  },
  'high-value-secure-courier': {
    id: 'high-value-secure-courier',
    name: 'High-Value & Secure-Item Courier',
    group: 'Airport & specialty',
    title: 'High-Value & Secure-Item Courier in Austin | Speedy Bat',
    metaDescription: 'Request Austin secure-item transport. Acceptance, packaging, declared value, vehicle, custody, coverage, access, and receipt method are reviewed per job.',
    headline: 'Secure-item courier in Austin',
    summary: 'Case-by-case transport for sensitive or difficult-to-replace items.',
    goodFor: ['Sensitive business documents', 'Difficult-to-replace items', 'Jobs with specific custody and receipt needs'],
    howItWorks: 'Use the public form for the route, deadline, broad item category, and approximate size. Dispatch moves detailed risk review to an appropriate channel before confirming service.',
    whatToSend: 'Route, deadline, broad item category, approximate size, and contact information. Keep detailed value, IDs, account information, and access codes out of the public form and text.',
    beforeYouBook: 'Packaging, custody, vehicle, access, coverage, and receipt requirements are confirmed for the specific job. Speedy Bat may decline a request based on value, legality, risk, packaging, destination, or available coverage.',
    cta: 'Request a private review',
    image: '/courier-handoff-illustrative.webp',
    imageAlt: 'A small parcel handed directly between two authorized business contacts.',
    faq: [
      { question: 'What details should I put in the public form?', answer: 'Only the route, deadline, broad item category, approximate size or weight, and contact information. Keep detailed value, account numbers, IDs, and access codes out.' },
      { question: 'Is a special vehicle or custody method included?', answer: 'Only when the accepted scope says so. Vehicle, routing, custody, handoffs, packaging, coverage, and receipt controls are confirmed for the job.' }
    ],
    relatedServiceIds: ['legal-courier-court-filing', 'air-hand-carry-on-board-courier', 'same-day-on-demand-courier']
  }
};

export const serviceList = Object.values(services);
