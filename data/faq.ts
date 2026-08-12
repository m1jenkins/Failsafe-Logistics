export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What does Speedy Bat do?',
    answer: 'Speedy Bat is an Austin-based service-area courier business for urgent business delivery requests. Dispatch reviews the pickup, destination, deadline, cargo category, vehicle needs, access, and handling requirements before accepting a job.'
  },
  {
    question: 'How quickly can pickup happen?',
    answer: 'There is no universal pickup-time promise. Dispatch provides a job-specific estimate after reviewing the Austin pickup location, cargo, suitable courier and vehicle availability, traffic, site access, and requested deadline.'
  },
  {
    question: 'Can I submit a request after normal business hours?',
    answer: 'Urgent requests can be submitted at any time. Submission is not job acceptance; pickup and delivery timing are confirmed only when dispatch accepts the request.'
  },
  {
    question: 'What is the routine pickup area?',
    answer: 'Routine pickup is limited to the Austin metro. Pickup eligibility is confirmed for each request. Farther cities are described as possible destinations for accepted Austin-origin jobs, not as staffed Speedy Bat locations or routine local pickup markets.'
  },
  {
    question: 'What information is needed for a quote?',
    answer: 'Provide the pickup and destination ZIPs, requested deadline, broad cargo category, approximate dimensions or weight, site-access needs, and a contact method. Dispatch may request more information through an appropriate channel before deciding whether to quote or accept the job.'
  },
  {
    question: 'How is courier pricing determined?',
    answer: 'Pricing is job-specific. Relevant factors can include distance, urgency, vehicle, cargo size and weight, waiting, tolls, airport handling, access requirements, and after-hours work. Dispatch confirms the quoted scope and price before booking.'
  },
  {
    question: 'Is every shipment direct drive or assigned one courier?',
    answer: 'No universal configuration is promised. Vehicle, routing, stops, couriers, handoffs, custody, and update methods are confirmed for each accepted job. Request a dedicated or direct configuration when it is required so dispatch can evaluate it explicitly.'
  },
  {
    question: 'Can Speedy Bat handle airport recovery, NFO, or AOG requests?',
    answer: 'Austin airport and cargo-terminal requests may be evaluated. Dispatch must confirm the airline or handler, shipment release, documents, cargo, public or authorized access, operating hours, timing, and onward route. Speedy Bat does not represent customs-broker authority, security clearance, or guaranteed ramp access.'
  },
  {
    question: 'What is air hand carry or on-board courier service?',
    answer: 'Air hand carry is accompanied transport on a passenger flight. An Austin-origin request is accepted only after dispatch confirms the item, packaging, dimensions, weight, traveler, flight, screening, carrier rules, documents, custody plan, and final handoff. No item or itinerary is automatically eligible.'
  },
  {
    question: 'Do you provide process service or guarantee court filing?',
    answer: 'No process service, legal advice, filing acceptance, filing deadline, or court-admissibility guarantee is represented. A legal-document delivery or courthouse task is considered only after dispatch reviews the requested action, clerk or recipient requirements, timing, access, and receipt method.'
  },
  {
    question: 'Do you advertise medical specimen or cold-chain transport?',
    answer: 'No. The public site does not claim HIPAA or OSHA certification, UN3373 handling, organ or blood transport, specimen transport, or validated cold-chain capability. Do not submit health information or patient details through the public form or SMS.'
  },
  {
    question: 'What insurance or security applies to a shipment?',
    answer: 'No universal insurance amount, screening status, custody method, or security configuration is advertised. Dispatch must review the cargo and confirm any available coverage, exclusions, vehicle, custody, packaging, access, and receipt requirements in the accepted job scope.'
  },
  {
    question: 'Will I receive tracking or proof of delivery?',
    answer: 'The update and receipt method is agreed for each accepted job. Depending on the service, the scope may include milestone updates, recipient signature, photo confirmation, or another documented handoff method.'
  },
  {
    question: 'What should I leave out of the public form or SMS?',
    answer: 'Do not submit health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables. Use a broad cargo category and let dispatch arrange an appropriate next step if more detail is necessary.'
  }
];
