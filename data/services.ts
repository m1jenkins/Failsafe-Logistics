import { ServiceData } from '../types';

const LAST_REVIEWED = '2026-08-12';
const COMMON_CLAIMS = [
  'austin-service-area-business',
  'request-availability',
  'job-specific-configuration',
  'austin-origin-coverage'
];

export const services: Record<string, ServiceData> = {
  'same-day-on-demand-courier': {
    id: 'same-day-on-demand-courier',
    name: 'Same-Day Courier',
    group: 'Urgent ground',
    title: 'Same-Day Courier Service in Austin, TX | Speedy Bat',
    metaDescription: 'Request same-day courier pickup in the Austin metro. Speedy Bat confirms availability, timing, vehicle, route, and handling for each accepted job.',
    tagline: 'Austin-metro pickup and direct delivery planned around your actual deadline.',
    overview: 'Speedy Bat evaluates urgent document, parcel, and business-cargo requests that originate in the Austin metro. Dispatch reviews the pickup, destination, deadline, item category, and vehicle needs before confirming whether the job can be accepted.',
    eligibility: [
      'Pickup originates in the Austin metro',
      'The item can be described without sensitive personal or account data',
      'The sender can provide an authorized pickup and delivery contact'
    ],
    limits: [
      'Pickup and arrival times are estimates until dispatch confirms the job',
      'Restricted, regulated, hazardous, or unusually valuable items require advance review',
      'Vehicle type, routing, custody, tracking, and coverage are job-specific'
    ],
    process: [
      'Share pickup ZIP, destination ZIP, deadline, cargo category, and approximate size or weight',
      'Dispatch checks availability, route conditions, handling needs, and price factors',
      'Speedy Bat confirms the accepted scope and update method before pickup',
      'The delivery contact confirms receipt using the method agreed for the job'
    ],
    exceptions: [
      'Traffic, site access, weather, recipient availability, and incomplete shipment details can change timing',
      'Jobs outside the routine pickup area are evaluated as Austin-origin routes or by special arrangement'
    ],
    features: [
      { title: 'Deadline Review', description: 'Dispatch compares the requested deadline with the route before accepting the job.', iconName: 'Clock' },
      { title: 'Vehicle Fit', description: 'Cargo dimensions and handling needs determine the vehicle proposed for the run.', iconName: 'Truck' },
      { title: 'Receipt Plan', description: 'Pickup, updates, and proof-of-delivery options are agreed before dispatch.', iconName: 'FileText' }
    ],
    capabilities: [
      'Urgent Austin business documents and parcels',
      'Same-day parts, samples, and supplies',
      'Direct delivery when confirmed for the accepted job',
      'Recipient signature or delivery confirmation when arranged'
    ],
    faq: [
      { question: 'How quickly can pickup happen?', answer: 'Dispatch provides a job-specific estimate after reviewing the pickup ZIP, cargo, driver and vehicle availability, traffic, and site access. The website does not promise a universal pickup window.' },
      { question: 'What information is needed for a quote?', answer: 'Provide pickup and destination ZIPs, the deadline, cargo category, approximate size or weight, and a contact method. Do not send health information, IDs, financial details, access codes, or detailed descriptions of valuables through the public form or SMS.' },
      { question: 'Is every same-day job direct?', answer: 'Routing and custody are confirmed for each job. If direct service is required, state that requirement so dispatch can quote and accept the correct configuration.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'long-distance-intercity-courier', 'scheduled-dedicated-routes'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED
  },
  'hot-shot-expedited-freight': {
    id: 'hot-shot-expedited-freight',
    name: 'Hot Shot & Expedited Freight',
    group: 'Urgent ground',
    title: 'Hot Shot Delivery from Austin, TX | Speedy Bat',
    metaDescription: 'Request Austin-origin hot shot and expedited ground delivery. Dispatch confirms cargo fit, vehicle, route, custody, timing, and coverage for each job.',
    tagline: 'Austin-origin expedited ground transport for time-critical business cargo.',
    overview: 'Hot shot delivery is considered when a business shipment needs a faster, more controlled ground route than a scheduled carrier can provide. Speedy Bat reviews the Austin pickup, cargo dimensions, handling constraints, destination, deadline, and vehicle requirements before acceptance.',
    eligibility: [
      'The shipment originates in the Austin metro or is accepted by special arrangement',
      'Dimensions, weight, packaging, and loading requirements are known',
      'Pickup and delivery sites can authorize the handoff'
    ],
    limits: [
      'Vehicle availability and cargo fit must be confirmed before pickup',
      'Drive times depend on routing, weather, traffic, rest and safety requirements, and site access',
      'Special equipment, securement, insurance, and custody requirements must be approved in writing'
    ],
    process: [
      'Dispatch collects lane, deadline, cargo, dock, equipment, and contact details',
      'The proposed vehicle, route, handling, price, and update cadence are reviewed',
      'The job begins only after the sender accepts the confirmed scope',
      'Delivery is documented using the agreed receipt method'
    ],
    exceptions: [
      'Cargo that is oversized, hazardous, temperature-controlled, export-controlled, or otherwise regulated may be declined',
      'A requested nonstop or dedicated configuration is not assumed unless it appears in the accepted scope'
    ],
    features: [
      { title: 'Cargo Fit', description: 'Dimensions, weight, securement, and access details inform the proposed vehicle.', iconName: 'Truck' },
      { title: 'Lane Review', description: 'Dispatch checks the Austin-origin lane and requested deadline before acceptance.', iconName: 'MapPin' },
      { title: 'Defined Handoffs', description: 'Authorized pickup and delivery contacts are recorded for the job.', iconName: 'Shield' }
    ],
    capabilities: [
      'Time-critical parts and business freight',
      'Austin-origin regional and interstate lanes',
      'Cargo-appropriate vehicle selection when available',
      'Job-specific status and delivery confirmation'
    ],
    faq: [
      { question: 'What makes a shipment a hot shot job?', answer: 'It is generally a time-critical ground shipment that needs a job-specific vehicle and route. Dispatch determines whether hot shot service fits the cargo and deadline.' },
      { question: 'Can you quote an interstate route?', answer: 'Austin-origin interstate requests can be evaluated. Dispatch must confirm the lane, driver and vehicle availability, safety constraints, timing, and price.' },
      { question: 'Is the vehicle dedicated?', answer: 'A dedicated configuration can be requested, but it is only part of the service when dispatch confirms it in the accepted job scope.' }
    ],
    relatedServiceIds: ['manufacturing-line-down-delivery', 'long-distance-intercity-courier', 'airport-recovery-next-flight-out'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED,
    flagship: true
  },
  'long-distance-intercity-courier': {
    id: 'long-distance-intercity-courier',
    name: 'Long-Distance Direct Drive',
    group: 'Urgent ground',
    title: 'Long-Distance Courier from Austin, TX | Speedy Bat',
    metaDescription: 'Request Austin-origin long-distance courier service. Route, vehicle, custody, driver plan, timing, and delivery confirmation are quoted per job.',
    tagline: 'Austin-origin intercity delivery with route and custody details agreed before departure.',
    overview: 'Long-distance direct drive can suit time-critical cargo that cannot wait for a standard parcel network. Speedy Bat evaluates the lane, deadline, cargo, vehicle, safe driving plan, handoffs, and delivery contact before confirming service.',
    eligibility: [
      'Pickup originates in the Austin metro',
      'Cargo dimensions, weight, packaging, and any securement needs are disclosed',
      'The destination has an authorized recipient and usable delivery window'
    ],
    limits: [
      'Travel estimates can change with distance, weather, traffic, road conditions, and safe-driving requirements',
      'Driver changes, stops, or team-driver needs are disclosed when they affect the proposed configuration',
      'Regulated or restricted cargo requires separate approval and may be declined'
    ],
    process: [
      'Provide the lane, deadline, cargo details, site hours, and contacts',
      'Dispatch proposes a safe route, vehicle, custody plan, and update cadence',
      'The accepted scope identifies material handoffs or planned stops',
      'The recipient confirms delivery using the agreed method'
    ],
    exceptions: [
      'An Austin-origin quote does not imply a staffed fleet or routine local pickup at the destination',
      'Requests that conflict with safety, access, or cargo restrictions are revised or declined'
    ],
    features: [
      { title: 'Origin Clarity', description: 'The service is presented as Austin-origin transport, not local service in destination cities.', iconName: 'MapPin' },
      { title: 'Safe Route Plan', description: 'Distance and deadline are evaluated with traffic, weather, and driving constraints.', iconName: 'Globe' },
      { title: 'Known Recipient', description: 'Delivery hours and authorized recipient details are checked before departure.', iconName: 'FileText' }
    ],
    capabilities: [
      'Austin-to-Texas metro delivery requests',
      'Austin-origin interstate courier requests',
      'Direct-drive configuration when specifically accepted',
      'Agreed status updates and receipt confirmation'
    ],
    faq: [
      { question: 'How far can a route go?', answer: 'Distance is evaluated per request. Dispatch considers the lane, deadline, safe driving plan, driver and vehicle availability, cargo, and destination access before quoting.' },
      { question: 'Does long distance always mean one driver?', answer: 'No universal driver configuration is promised. The accepted scope identifies material handoffs, planned stops, or team-driver needs when applicable.' },
      { question: 'Do you pick up in destination cities?', answer: 'Routine pickup is limited to the Austin metro. Farther cities on this site are destinations for Austin-origin jobs unless dispatch confirms a special arrangement.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'air-hand-carry-on-board-courier', 'same-day-on-demand-courier'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED
  },
  'legal-courier-court-filing': {
    id: 'legal-courier-court-filing',
    name: 'Legal Courier & Document Delivery',
    group: 'Secure and legal',
    title: 'Legal Document Courier in Austin, TX | Speedy Bat',
    metaDescription: 'Request time-sensitive legal document transport in Austin. Dispatch confirms deadline, destination access, custody notes, and receipt requirements per job.',
    tagline: 'Time-sensitive transport for legal documents, with scope and receipt requirements confirmed in advance.',
    overview: 'Speedy Bat evaluates courier requests for law firms, businesses, and individuals who need documents moved between authorized parties. The service is transportation and delivery; any clerk-facing task or special handoff must be described and accepted before dispatch.',
    eligibility: [
      'Pickup and delivery contacts are authorized to release and receive the documents',
      'The destination, deadline, access rules, and required receipt are known',
      'The request is limited to transportation or an explicitly accepted administrative handoff'
    ],
    limits: [
      'Speedy Bat does not provide legal advice or determine filing sufficiency',
      'Service of process is not offered through the public website',
      'No representation is made that custody records satisfy a court, agency, or evidentiary standard'
    ],
    process: [
      'Provide pickup, destination, deadline, authorized contacts, and requested receipt method',
      'Dispatch checks operating hours, public access, parking or loading constraints, and scope',
      'Sensitive document contents should not be entered in the public form or SMS',
      'Delivery is completed only to the recipient or location agreed for the job'
    ],
    exceptions: [
      'Court, clerk, building, and recipient availability can affect completion',
      'A filing, copy return, wait, or multiple-stop task is excluded unless dispatch accepts it explicitly'
    ],
    features: [
      { title: 'Scope First', description: 'The transport task and any administrative handoff are defined before dispatch.', iconName: 'FileText' },
      { title: 'Access Check', description: 'Destination hours and access constraints are reviewed against the deadline.', iconName: 'Clock' },
      { title: 'Receipt Choice', description: 'Signature or another delivery confirmation method can be requested for review.', iconName: 'Shield' }
    ],
    capabilities: [
      'Contracts, deeds, exhibits, and business documents',
      'Authorized office-to-office document transport',
      'Deadline-aware routing within the accepted scope',
      'Job-specific delivery confirmation'
    ],
    faq: [
      { question: 'Do you provide service of process?', answer: 'No. The public service is courier transport, not service of process.' },
      { question: 'Can you file documents with a clerk?', answer: 'A clerk-facing task is considered only when its exact scope, deadline, destination rules, and return requirements are reviewed and accepted by dispatch. Acceptance is not a legal sufficiency guarantee.' },
      { question: 'Is your delivery record court admissible?', answer: 'Speedy Bat does not make that representation. Tell dispatch what receipt information you need so the available method can be described before acceptance.' }
    ],
    relatedServiceIds: ['high-value-secure-courier', 'same-day-on-demand-courier', 'long-distance-intercity-courier'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED
  },
  'manufacturing-line-down-delivery': {
    id: 'manufacturing-line-down-delivery',
    name: 'Manufacturing Line-Down Delivery',
    group: 'Urgent ground',
    title: 'Manufacturing Line-Down Courier from Austin | Speedy Bat',
    metaDescription: 'Request Austin-origin line-down parts delivery. Speedy Bat reviews cargo fit, dock access, deadline, vehicle, routing, and handoff requirements per job.',
    tagline: 'Urgent Austin-origin parts transport planned around the receiving dock and production deadline.',
    overview: 'When a production delay creates an urgent parts need, Speedy Bat evaluates whether an Austin-origin courier route can meet the requested handoff. Dispatch needs accurate dimensions, weight, packaging, dock details, contacts, and deadline before confirming service.',
    eligibility: [
      'The pickup is in the Austin metro or accepted by special arrangement',
      'Part dimensions, weight, packaging, and handling constraints are known',
      'Both sites can provide authorized contacts and access instructions'
    ],
    limits: [
      'Production impact does not override vehicle, road, site, or driver safety constraints',
      'Cleanroom, contamination, vibration, hazardous-material, or export-control requirements need written review',
      'No destination facility or named manufacturer relationship is implied'
    ],
    process: [
      'Share part category, dimensions, weight, pickup dock, destination dock, and deadline',
      'Dispatch checks vehicle fit, route, access, contacts, and any wait-time requirement',
      'The sender approves the confirmed scope and price',
      'The receiving contact confirms the handoff'
    ],
    exceptions: [
      'Incomplete part or site details can delay or prevent acceptance',
      'Special packaging, securement, or equipment remains the sender\'s responsibility unless explicitly included'
    ],
    features: [
      { title: 'Part Profile', description: 'Dimensions, weight, packaging, and handling constraints drive the proposed setup.', iconName: 'Cpu' },
      { title: 'Dock Coordination', description: 'Dispatch records site hours, access instructions, and authorized contacts.', iconName: 'Truck' },
      { title: 'Deadline Check', description: 'The requested production handoff is evaluated against the actual route.', iconName: 'Clock' }
    ],
    capabilities: [
      'Urgent replacement parts and components',
      'Prototypes, samples, tools, and production supplies',
      'Austin-origin regional or interstate routes',
      'Job-specific status and handoff confirmation'
    ],
    faq: [
      { question: 'What details speed up a line-down quote?', answer: 'Provide exact dimensions and weight, packaging, pickup and receiving dock details, authorized contacts, the needed-on-site deadline, and any handling constraints.' },
      { question: 'Can you enter a restricted facility?', answer: 'Access is never assumed. Dispatch confirms visitor, vehicle, identification, escort, and dock requirements with the sender before accepting the job.' },
      { question: 'Can you move sensitive manufacturing material?', answer: 'Disclose handling, contamination, vibration, security, and regulatory constraints. Dispatch will confirm what can be accepted or decline the request.' }
    ],
    relatedServiceIds: ['hot-shot-expedited-freight', 'airport-recovery-next-flight-out', 'same-day-on-demand-courier'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED,
    flagship: true
  },
  'airport-recovery-next-flight-out': {
    id: 'airport-recovery-next-flight-out',
    name: 'Airport Recovery / NFO / AOG',
    group: 'Air and airport',
    title: 'Austin Airport Recovery, NFO & AOG Courier | Speedy Bat',
    metaDescription: 'Request Austin airport recovery, next-flight-out, or AOG ground support. Access, documents, cargo release, timing, and tender scope are confirmed per job.',
    tagline: 'Austin airport pickup or tender support when release, access, and timing can be confirmed.',
    overview: 'Speedy Bat evaluates Austin airport and cargo-terminal courier tasks tied to next-flight-out shipments, aircraft-on-ground parts, and urgent recoveries. The exact terminal, airline or handler, release documents, cargo size, access rules, deadline, and onward route must be reviewed before acceptance.',
    eligibility: [
      'The task involves an Austin airport, cargo handler, or accepted Austin-origin route',
      'The sender can provide shipment identifiers, release documents, contacts, and cargo details',
      'The requested action is permitted by the airline, handler, airport, and applicable authorities'
    ],
    limits: [
      'No security clearance, ramp access, customs authority, or cargo-release authority is implied',
      'Airline, handler, screening, terminal, weather, and flight conditions are outside Speedy Bat\'s control',
      'Tender, recovery, waiting, storage, parking, and after-hours fees are quoted when known'
    ],
    process: [
      'Share airport, terminal or handler, shipment number, cargo, deadline, and release contact',
      'Dispatch checks public or authorized access, documents, vehicle fit, and onward route',
      'The accepted scope identifies whether the job is recovery, tender, transfer, or ground delivery',
      'Status and handoff evidence follow the method agreed for the job'
    ],
    exceptions: [
      'Cargo cannot be released without the documents and authorization required by the handler',
      'A missed or changed flight can require a revised quote and deadline'
    ],
    features: [
      { title: 'Release Check', description: 'Shipment identifiers, documents, and the releasing contact are confirmed first.', iconName: 'FileText' },
      { title: 'Access Scope', description: 'The quote covers only access and actions the relevant facility permits.', iconName: 'Shield' },
      { title: 'Onward Plan', description: 'Recovery, transfer, tender, or ground delivery is named in the accepted scope.', iconName: 'Plane' }
    ],
    capabilities: [
      'Austin cargo-terminal recovery requests',
      'Next-flight-out tender or transfer support when permitted',
      'AOG parts pickup and onward ground delivery',
      'Job-specific updates and handoff confirmation'
    ],
    faq: [
      { question: 'Can you recover cargo from any airline?', answer: 'Not automatically. Dispatch must confirm the airline or handler, release requirements, public or authorized access, cargo details, operating hours, and shipment status.' },
      { question: 'Do you clear customs?', answer: 'No customs-broker or clearance authority is represented. The shipper or its appointed broker must complete required customs work and provide releasable cargo documentation.' },
      { question: 'What do you need for an AOG request?', answer: 'Provide the part and packaging details, pickup or cargo-release location, authorized contacts, aircraft or receiving destination, deadline, and any access or handling constraints.' }
    ],
    relatedServiceIds: ['air-hand-carry-on-board-courier', 'manufacturing-line-down-delivery', 'hot-shot-expedited-freight'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED,
    flagship: true
  },
  'scheduled-dedicated-routes': {
    id: 'scheduled-dedicated-routes',
    name: 'Scheduled & Recurring Routes',
    group: 'Recurring',
    title: 'Scheduled Courier Routes in Austin, TX | Speedy Bat',
    metaDescription: 'Plan recurring Austin courier routes with agreed stops, windows, cargo categories, contacts, exceptions, and reporting. Availability is reviewed before setup.',
    tagline: 'Recurring Austin routes built from documented stops, windows, cargo, and exception rules.',
    overview: 'Scheduled service is for recurring business movements that benefit from a documented route plan. Speedy Bat reviews the Austin-area stops, frequency, cargo, site windows, contacts, vehicle needs, reporting, holidays, and exception handling before proposing service.',
    eligibility: [
      'The recurring pickup pattern is in the Austin metro or specifically approved',
      'Stops, windows, contacts, cargo categories, and expected volume are documented',
      'The customer can identify changes and exceptions before each affected run'
    ],
    limits: [
      'A recurring route does not create universal on-demand availability',
      'Extra stops, volume changes, waiting, after-hours work, or different cargo may require re-approval',
      'No service to a named institution is implied unless it appears in an executed agreement'
    ],
    process: [
      'Map stops, windows, frequency, cargo, volume, site contacts, and exceptions',
      'Review vehicle, route timing, reporting, holidays, pricing factors, and backup handling',
      'Document the agreed route and change process',
      'Review performance and update the route when operations change'
    ],
    exceptions: [
      'Closures, contact changes, unexpected volume, access changes, and severe conditions can alter a run',
      'Regulated or sensitive cargo requires separate operational approval'
    ],
    features: [
      { title: 'Route Specification', description: 'Stops, windows, contacts, cargo, and exceptions are documented together.', iconName: 'Calendar' },
      { title: 'Change Control', description: 'Customers receive a clear process for additions, closures, and volume changes.', iconName: 'FileText' },
      { title: 'Operations Review', description: 'The route can be reviewed when timing, volume, or service needs change.', iconName: 'Clock' }
    ],
    capabilities: [
      'Recurring inter-office documents and business materials',
      'Planned parts, supply, and inventory movements',
      'Defined stop windows and authorized contacts',
      'Agreed reporting and exception handling'
    ],
    faq: [
      { question: 'Can a route run daily or weekly?', answer: 'Frequency is part of the proposed route. Dispatch confirms capacity, stops, windows, cargo, and pricing before any recurring schedule is accepted.' },
      { question: 'What happens when a stop changes?', answer: 'Use the agreed change process. Added stops, different cargo, closures, waiting, and volume changes may affect timing and price.' },
      { question: 'Can urgent work be added to a scheduled route?', answer: 'Urgent work is evaluated separately so it does not silently change the route or compromise other accepted stops.' }
    ],
    relatedServiceIds: ['same-day-on-demand-courier', 'manufacturing-line-down-delivery', 'legal-courier-court-filing'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED
  },
  'air-hand-carry-on-board-courier': {
    id: 'air-hand-carry-on-board-courier',
    name: 'Air Hand Carry / On-Board Courier',
    group: 'Air and airport',
    title: 'Air Hand Carry & On-Board Courier from Austin | Speedy Bat',
    metaDescription: 'Request Austin-origin air hand carry or on-board courier service. Flight, traveler, screening, baggage, documents, custody, and final-mile scope are confirmed per job.',
    tagline: 'Austin-origin accompanied air transport when the shipment, traveler, route, and carrier rules align.',
    overview: 'Air hand carry, also called on-board courier service, may suit small time-critical shipments that can travel under an airline\'s rules. Speedy Bat reviews the item, dimensions, weight, packaging, documents, screening, traveler availability, flight options, destination entry rules, custody plan, and final handoff before acceptance.',
    eligibility: [
      'The shipment originates in the Austin metro or is accepted by special arrangement',
      'The item is lawful and eligible under applicable airline, screening, baggage, and destination rules',
      'The sender supplies accurate contents, value, dimensions, weight, documents, and contacts'
    ],
    limits: [
      'Traveler availability, tickets, flight operations, screening, baggage decisions, and border rules are not guaranteed',
      'No security status, expedited screening, customs authority, or unrestricted airport access is implied',
      'Carry-on, checked-baggage, cargo, and final-mile handling are distinct scopes'
    ],
    process: [
      'Share route, deadline, item category, dimensions, weight, value band, documents, and contacts',
      'Dispatch checks traveler and flight options plus carrier, screening, and destination constraints',
      'The quote identifies the accepted transport mode, handoffs, planned updates, and contingencies',
      'The destination recipient confirms the final handoff'
    ],
    exceptions: [
      'Flight cancellation, delay, screening, refusal, document issues, or destination restrictions can change or stop the movement',
      'International work requires a separate document and entry review and may be declined'
    ],
    features: [
      { title: 'Rule Check', description: 'Item, packaging, documents, screening, and carrier constraints are reviewed before booking.', iconName: 'Shield' },
      { title: 'Flight Plan', description: 'Traveler and viable flight options are checked against the requested deadline.', iconName: 'Plane' },
      { title: 'Handoff Map', description: 'Origin, airport, arrival, and final-recipient handoffs are named in the scope.', iconName: 'MapPin' }
    ],
    capabilities: [
      'Austin-origin domestic accompanied-air requests',
      'Small time-critical business items eligible for the selected flight',
      'Airport-to-recipient final mile when included',
      'Agreed milestone and handoff updates'
    ],
    faq: [
      { question: 'Is hand carry always the fastest option?', answer: 'Not necessarily. Dispatch compares flight availability, screening, documents, final-mile needs, and ground alternatives before proposing a route.' },
      { question: 'Can any item travel as carry-on baggage?', answer: 'No. The carrier and applicable authorities control eligibility. Accurate contents, dimensions, weight, packaging, value, and documents are required before review.' },
      { question: 'Do you offer international hand carry?', answer: 'International requests may be evaluated, but traveler, passport, visa, customs, import or export, screening, airline, and destination requirements must be confirmed. The request may be declined.' }
    ],
    relatedServiceIds: ['airport-recovery-next-flight-out', 'long-distance-intercity-courier', 'high-value-secure-courier'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED,
    flagship: true
  },
  'high-value-secure-courier': {
    id: 'high-value-secure-courier',
    name: 'High-Value & Secure-Item Courier',
    group: 'Secure and legal',
    title: 'High-Value & Secure-Item Courier in Austin | Speedy Bat',
    metaDescription: 'Request Austin secure-item transport. Acceptance, packaging, declared value, vehicle, custody, coverage, access, and receipt method are reviewed per job.',
    tagline: 'Austin secure-item requests evaluated individually for packaging, risk, custody, and coverage.',
    overview: 'Items with unusual value, sensitivity, or replacement difficulty need a job-specific risk review before transport. Speedy Bat asks for a non-sensitive item category, value band, dimensions, packaging, pickup and delivery controls, custody requirements, and requested receipt method before deciding whether to quote.',
    eligibility: [
      'The sender can establish authority to release the item and the recipient can accept it',
      'A non-sensitive item category, value band, dimensions, weight, and packaging are disclosed privately through the approved process',
      'Requested custody, vehicle, access, and receipt controls can be documented'
    ],
    limits: [
      'No blanket insurance amount, screening status, vehicle type, concealment method, or custody configuration is promised',
      'Do not describe account numbers, access credentials, identification data, or detailed valuables through the public form or SMS',
      'Speedy Bat may decline an item because of value, legality, packaging, risk, destination, or coverage limits'
    ],
    process: [
      'Use the public form only for route, timing, broad cargo category, and approximate size or weight',
      'Dispatch moves detailed risk review to an appropriate private channel',
      'The accepted scope records packaging, custody, vehicle, coverage, handoffs, and receipt method',
      'Any material change requires renewed approval before pickup'
    ],
    exceptions: [
      'Extraordinary value, cash-like instruments, weapons, controlled items, irreplaceable records, and personal identity materials may be declined',
      'Coverage and liability terms must be confirmed in writing for the specific item and job'
    ],
    features: [
      { title: 'Private Risk Review', description: 'Sensitive details move off the public form before an acceptance decision.', iconName: 'EyeOff' },
      { title: 'Defined Controls', description: 'Packaging, custody, vehicle, access, and receipt requirements are written into scope.', iconName: 'Shield' },
      { title: 'Coverage Confirmation', description: 'Any available coverage and material exclusions are confirmed for the specific job.', iconName: 'FileText' }
    ],
    capabilities: [
      'Sensitive business documents and irreplaceable items considered case by case',
      'Job-specific custody and handoff requirements',
      'Packaging and vehicle review before acceptance',
      'Requested receipt method when available and agreed'
    ],
    faq: [
      { question: 'What insurance applies to a high-value item?', answer: 'No universal amount is advertised. Dispatch must review the item category and value, then confirm any available coverage, exclusions, documentation, and approval in writing before pickup.' },
      { question: 'What details should I put in the public form?', answer: 'Only the route, deadline, broad cargo category, and approximate size or weight. Do not include account numbers, IDs, access codes, detailed descriptions of valuables, or other sensitive data.' },
      { question: 'Is a special vehicle or custody method included?', answer: 'Only when the accepted scope says so. Vehicle, routing, custody, handoffs, tracking, packaging, and receipt controls are job-specific.' }
    ],
    relatedServiceIds: ['legal-courier-court-filing', 'air-hand-carry-on-board-courier', 'same-day-on-demand-courier'],
    claimIds: COMMON_CLAIMS,
    lastReviewed: LAST_REVIEWED,
    flagship: true
  }
};

export const serviceList = Object.values(services);
