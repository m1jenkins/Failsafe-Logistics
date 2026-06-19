import { ServiceData } from '../types';

export const services: Record<string, ServiceData> = {
  'same-day-on-demand-courier': {
    id: 'same-day-on-demand-courier',
    name: 'Same-Day / On-Demand Courier',
    title: 'Same-Day Courier Austin | On-Demand Courier Services TX',
    metaDescription: 'Speedy Bat Couriers offers 24/7 same-day and on-demand courier services in Austin, TX. Rapid 30-60 min pickup for documents, parcels, and secure freight.',
    keywords: [
      'Same-day courier Austin',
      'on-demand courier service',
      'last-minute courier delivery',
      'rush package delivery Austin',
      'express local courier'
    ],
    tagline: 'Local express delivery dispatched within minutes, not hours.',
    overview: 'When a critical delivery cannot wait for standard transit windows, our same-day, on-demand courier service is your ultimate response mechanism. We operate 24/7/365 to handle your most urgent shipments with dedicated, direct-drive vehicles that go straight from your pickup point to the recipient, bypassing traditional distribution hubs and eliminating risk.',
    features: [
      {
        title: '30-60 Min Local Pickup',
        description: 'Our dispatch grid responds instantly. We have couriers stationed throughout the Austin metro area ready to pick up within an hour.',
        iconName: 'Clock'
      },
      {
        title: 'Direct-Drive Transport',
        description: 'Your cargo is the only priority. The vehicle is dedicated to your delivery, with zero co-loading or intermediate stops.',
        iconName: 'Zap'
      },
      {
        title: 'Strict Chain of Custody',
        description: 'Every courier maintains constant physical control of your shipment, backed by signature verification and real-time hand-off logs.',
        iconName: 'Shield'
      }
    ],
    capabilities: [
      'Urgent medical specimens and STAT clinical deliveries',
      'Time-critical corporate contracts, closing documents, and legal filings',
      'Critical manufacturing parts, chips, and hardware replenishment',
      'High-value electronics, retail inventory balancing, and secure parcels'
    ],
    faq: [
      {
        question: 'What is your typical pickup time in Austin?',
        answer: 'For on-demand orders in central Austin, we typically achieve pickup within 30 to 60 minutes of your phone confirmation. Outer communities may take slightly longer depending on traffic.'
      },
      {
        question: 'Is the delivery driver dedicated solely to my package?',
        answer: 'Yes. Every same-day, on-demand dispatch is a direct-drive route. The vehicle picks up your package and drives straight to the destination with zero stops or other pickups in between.'
      },
      {
        question: 'Do you operate on weekends and holidays?',
        answer: 'Absolutely. We operate 24/7/365. Emergency dispatchers are always on duty to route couriers in the middle of the night, on weekends, or during federal holidays.'
      }
    ],
    priceRange: '$$'
  },
  'hot-shot-expedited-freight': {
    id: 'hot-shot-expedited-freight',
    name: 'Hot Shot & Expedited Freight',
    title: 'Hot Shot Delivery Austin | Expedited Freight Courier Services',
    metaDescription: 'Flagship hot shot and expedited freight logistics in Austin and Central Texas. 24/7 dedicated direct-drive cargo vans and trucks for critical parts & machinery.',
    keywords: [
      'Hot shot delivery Austin',
      'expedited freight service',
      'industrial cargo courier',
      'same-day freight logistics',
      'dedicated cargo van dispatch'
    ],
    tagline: 'Flagship high-stakes logistics for heavy cargo, machinery, and pallets.',
    overview: 'Our flagship hot shot and expedited freight service is built for high-stakes industrial, manufacturing, and heavy-cargo needs. When an assembly line goes down, or critical equipment requires immediate regional transport, we dispatch dedicated cargo vans or flatbeds directly to your dock. With non-stop transit up to 1,000+ miles, we keep your business moving when traditional carriers fall short.',
    features: [
      {
        title: 'Dedicated Cargo Vehicles',
        description: 'Vans, trucks, and flatbeds tailored to carry heavy cargo, industrial components, and oversized boxes safely.',
        iconName: 'Truck'
      },
      {
        title: 'Up to 1,000+ Mile Range',
        description: 'We drive your critical cargo across municipal lines, across the state of Texas, or nationwide without stopping.',
        iconName: 'Zap'
      },
      {
        title: 'Immediate Dock-to-Dock Routing',
        description: 'No cross-docks, no routing hubs. We load at your loading dock and drive directly to the receiving dock.',
        iconName: 'Shield'
      }
    ],
    capabilities: [
      'Line-down parts and heavy industrial machinery transport',
      'Palletized raw materials and manufactured inventory balancing',
      'Aviation grounding parts (AOG) and heavy machinery components',
      'Construction site equipment, tools, and structural materials'
    ],
    faq: [
      {
        question: 'What types of vehicles are available in your hot shot fleet?',
        answer: 'Our hot shot fleet includes fuel-efficient crossovers for medium parts, high-capacity cargo vans, and heavy-duty trucks to match different cargo sizes and weight requirements.'
      },
      {
        question: 'How far will your expedited freight drivers travel?',
        answer: 'We cover the entire state of Texas and can execute long-haul, direct-drive freight shipments up to 1,000+ miles across the continental United States.'
      },
      {
        question: 'How fast can a vehicle be at our loading dock?',
        answer: 'For hot shot and expedited freight, we aim to dispatch a cargo vehicle to your dock within 45 to 90 minutes in the Greater Austin area.'
      }
    ],
    flagship: true,
    priceRange: '$$$'
  },
  'long-distance-intercity-courier': {
    id: 'long-distance-intercity-courier',
    name: 'Long-Distance / Intercity Courier',
    title: 'Long-Distance Courier Austin | Intercity Overnight Courier',
    metaDescription: 'Secure intercity and long-distance courier services in Austin, TX. Dedicated overnight and odd-hours runs connecting Austin, DFW, Houston, and San Antonio.',
    keywords: [
      'Long-distance courier Austin',
      'intercity courier service',
      'overnight courier transport',
      '24/7 cross-city delivery',
      'odd-hours courier service'
    ],
    tagline: 'Non-stop intercity transit when next-day air cutoff has passed.',
    overview: 'When overnight express hubs are closed and morning delivery is non-negotiable, our long-distance intercity courier service steps in. We specialize in cross-state, overnight runs connecting Austin to Houston, Dallas-Fort Worth, San Antonio, and national hubs. Your package is hand-carried in a dedicated vehicle through the night, arriving directly at its destination with absolute reliability.',
    features: [
      {
        title: '24/7 Overnight Driving',
        description: 'We do not halt for the night. Our couriers drive through odd hours, bad weather, and holidays to hit your morning deadline.',
        iconName: 'Clock'
      },
      {
        title: 'Zero Transit Transfers',
        description: 'Your package stays in the exact same vehicle with the same driver from origin to destination, eliminating routing errors.',
        iconName: 'Shield'
      },
      {
        title: 'Texas & National Coverage',
        description: 'Connecting Central Texas to all major industrial and corporate centers in surrounding states with direct-drive paths.',
        iconName: 'Globe'
      }
    ],
    capabilities: [
      'Overnight corporate document exchanges between regional headquarters',
      'Intercity transport of critical parts and laboratory specimens',
      'Long-haul secure deliveries of confidential legal files or evidence',
      'Direct-drive emergency shipments bypassing air cargo delays'
    ],
    faq: [
      {
        question: 'Which cities do you service from Austin?',
        answer: 'We run regular long-distance routes to Houston, Dallas-Fort Worth, San Antonio, Waco, and Temple, and can coordinate custom routes anywhere in Texas and neighboring states.'
      },
      {
        question: 'Can you deliver packages in the middle of the night?',
        answer: 'Yes. We specialize in odd-hours and overnight deliveries. We can arrange secure hand-offs at 2:00 AM, 4:00 AM, or whenever your operations require it.'
      },
      {
        question: 'How do you guarantee security on long-distance runs?',
        answer: 'By maintaining a single driver and vehicle chain-of-custody. The package is never unloaded or left unattended, and we provide real-time updates directly from the road.'
      }
    ],
    priceRange: '$$$'
  },
  'medical-stat-courier': {
    id: 'medical-stat-courier',
    name: 'Medical / STAT Courier',
    title: 'Medical STAT Courier Austin | HIPAA Compliant Specimen Delivery',
    metaDescription: 'HIPAA-compliant medical courier services in Austin, TX. 24/7 STAT specimen runs, laboratory logistics, blood bank transport, and pharmacy routes.',
    keywords: [
      'Medical courier Austin',
      'STAT specimen delivery',
      'HIPAA compliant courier',
      'laboratory specimen transport',
      'medical supply logistics'
    ],
    tagline: 'HIPAA-compliant, temperature-controlled transport for specimens, labs, and equipment.',
    overview: 'Medical logistics require precise care, strict compliance, and rapid response. Our medical courier services are fully HIPAA-compliant, and our drivers are trained in biohazard handling, chain-of-custody documentation, and temperature-sensitive transport. We act as a vital link between clinics, imaging centers, testing laboratories, and regional hospital networks.',
    features: [
      {
        title: 'HIPAA & OSHA Compliant',
        description: 'Our couriers are certified in patient privacy protocols, biohazard safety, and secure clinical chain of custody.',
        iconName: 'Shield'
      },
      {
        title: 'STAT 30-Minute Dispatch',
        description: 'Critical lab work and emergency specimens receive highest-tier priority. We dispatch a specialized medical driver immediately.',
        iconName: 'Activity'
      },
      {
        title: 'Hospital & Lab Dock Familiarity',
        description: 'Our drivers know hospital loading zones, security desks, and specific lab drop points, avoiding lost time.',
        iconName: 'Clock'
      }
    ],
    capabilities: [
      'STAT transport of blood, urine, tissue, and pathology specimens',
      'Secure delivery of medical devices, diagnostic tools, and surgical kits',
      'HIPAA-compliant medical records, X-rays, and patient document transfer',
      'Dedicated pharmacy, prescription, and temperature-sensitive pharmaceutical runs'
    ],
    faq: [
      {
        question: 'Are your drivers certified to handle biohazard specimens?',
        answer: 'Yes. All medical couriers undergo training in OSHA biohazard safety, bloodborne pathogens, and HIPAA patient data privacy standards.'
      },
      {
        question: 'How do you handle temperature-sensitive specimens?',
        answer: 'We use insulated clinical coolers and gel packs to maintain required temperatures (ambient, chilled, or frozen) throughout the direct-drive route.'
      },
      {
        question: 'Do you deliver directly to specific departments inside hospitals?',
        answer: 'Yes. We do not just drop packages at the front desk. We navigate directly to laboratory intake docks, blood banks, or operating units as specified.'
      }
    ],
    priceRange: '$$'
  },
  'legal-courier-court-filing': {
    id: 'legal-courier-court-filing',
    name: 'Legal Courier & Court Filing',
    title: 'Legal Courier Austin | Same-Day Court Filing & Document Messenger',
    metaDescription: 'Secure legal courier services in Austin, TX. 24/7 same-day court filing, contract pickup, process serving, and confidential legal messenger runs.',
    keywords: [
      'Legal courier Austin',
      'court filing service',
      'legal document messenger',
      'same-day filing courthouse',
      'secure legal delivery'
    ],
    tagline: 'Uncompromising security for sensitive filings, deeds, and evidence.',
    overview: 'Legal documents require an absolute paper trail, timely delivery, and professional representation. Our legal courier service is designed for law firms, title companies, corporate legal departments, and public offices. We navigate local, state, and federal courthouses, ensuring that your filings, deeds, contracts, and evidence are hand-carried and processed before critical deadlines.',
    features: [
      {
        title: 'Courthouse Verification',
        description: 'We wait in line, present documents to filing clerks, and return stamped, physical or digital confirmation pages to your desk.',
        iconName: 'FileText'
      },
      {
        title: 'Chain-of-Custody Protocols',
        description: 'From pickup to final signature, we maintain a secure, audited logs process suitable for court-admissible evidence.',
        iconName: 'Shield'
      },
      {
        title: 'Time-Critical Execution',
        description: 'We coordinate closely with court schedules and clerk closing times, prioritizing routes to hit daily filing cuts.',
        iconName: 'Briefcase'
      }
    ],
    capabilities: [
      'Same-day courthouse filing runs (District, Federal, and County clerks)',
      'Title company deed pickups, mortgage files, and real estate closings',
      'Hand-delivery of sensitive contracts, NDA agreements, and partner signatures',
      'Secure transport of physical legal evidence, computers, and files'
    ],
    faq: [
      {
        question: 'Do you offer walk-in filing services at local courthouses?',
        answer: 'Yes. Our couriers can receive your documents, drive to the courthouse, stand in line, file the paperwork with the clerk, and return the stamped copies to you.'
      },
      {
        question: 'Can you collect signatures from clients at remote locations?',
        answer: 'Yes. We frequently run legal routes where we carry contracts to clients, obtain physical signatures, and return the executed documents directly to the law office.'
      },
      {
        question: 'What happens if a filing deadline is missed?',
        answer: 'We coordinate our routes and dispatch timing very carefully to ensure we arrive well before clerk windows close. We provide real-time updates so you always know your document\'s status.'
      }
    ],
    priceRange: '$$'
  },
  'manufacturing-line-down-delivery': {
    id: 'manufacturing-line-down-delivery',
    name: 'Manufacturing / Line-Down / Just-in-Time Parts Delivery',
    title: 'Manufacturing Line-Down Parts Delivery | Just-in-Time Courier',
    metaDescription: 'Emergency manufacturing line-down courier in Austin, TX. 24/7 same-day delivery of microchips, automotive components, and silicon wafers to factories.',
    keywords: [
      'Manufacturing courier service',
      'line-down parts delivery',
      'just-in-time logistics',
      'semiconductor parts courier',
      'industrial line down shipping'
    ],
    tagline: 'Minimizing factory downtime with rapid direct-drive parts delivery.',
    overview: 'In modern manufacturing, factory downtime costs thousands of dollars per minute. Our specialized manufacturing and line-down logistics service is engineered to prevent and resolve production bottlenecks. We carry critical components, silicon wafers, custom calibration tools, and replacement hardware directly from suppliers to cleanrooms and assembly floors, operating 24/7/365.',
    features: [
      {
        title: 'Semiconductor Hub Access',
        description: 'Intimate familiarity with cleanroom protocols, loading bays, and security checks at major Austin wafer fabrication sites.',
        iconName: 'Cpu'
      },
      {
        title: 'Immediate Hot-Shot Dispatch',
        description: 'Parts orders receive instant, top-priority routing. A dedicated driver is dispatched immediately with zero intermediate stops.',
        iconName: 'Zap'
      },
      {
        title: 'Industrial Heavy Duty',
        description: 'From lightweight silicon wafers to heavy steel components, our vehicles handle diverse payload weights securely.',
        iconName: 'Truck'
      }
    ],
    capabilities: [
      'High-priority semiconductor wafer and fab tool transport',
      'Critical electronics, printed circuit boards (PCBs), and hardware runs',
      'Automotive assembly line parts, specialized tools, and emergency supplies',
      'Just-in-Time (JIT) warehouse-to-factory stock balancing shipments'
    ],
    faq: [
      {
        question: 'Are your drivers familiar with semiconductor fab security protocols?',
        answer: 'Yes. Our couriers regularly service major fabrication campuses in Austin and Taylor, and understand badging, loading dock procedures, and secure drop-offs.'
      },
      {
        question: 'How do you protect delicate electronic wafers or calibration components?',
        answer: 'We utilize shock-absorbing storage containers, climate-appropriate vehicles, and secure cargo restraints to prevent vibration or thermal damage during transit.'
      },
      {
        question: 'Can you operate on a 24-hour JIT schedule?',
        answer: 'Yes. We integrate with your JIT supply chain, providing scheduled or on-demand dispatch at all hours of the day or night to maintain production flow.'
      }
    ],
    priceRange: '$$$'
  },
  'airport-recovery-next-flight-out': {
    id: 'airport-recovery-next-flight-out',
    name: 'Airport Recovery / Next-Flight-Out / AOG',
    title: 'Airport Recovery Courier | Next-Flight-Out & AOG Austin',
    metaDescription: '24/7 Airport recovery, Next-Flight-Out (NFO), and Aircraft on Ground (AOG) courier services at AUS and DFW. Direct air cargo pickup and delivery.',
    keywords: [
      'Airport recovery courier',
      'next flight out delivery',
      'AOG aviation courier',
      'AUS airport cargo pickup',
      'DFW air freight recovery'
    ],
    tagline: 'Critical aviation and cargo terminal logistics at AUS and DFW.',
    overview: 'Aviation delays and cargo terminal hold-ups are highly disruptive. Our airport recovery, Next-Flight-Out (NFO), and Aircraft on Ground (AOG) courier service is built to handle air cargo logjams. We coordinate direct recovery from commercial cargo facilities at Austin-Bergstrom (AUS) and Dallas-Fort Worth (DFW), driving critical avionics, grounding parts, or high-priority items straight to the hangar.',
    features: [
      {
        title: 'TSA and Air Cargo Access',
        description: 'Our couriers understand air cargo terminal guidelines, paper workflows, and recovery codes for rapid container retrieval.',
        iconName: 'Plane'
      },
      {
        title: 'Immediate Hangar Dispatch',
        description: 'Aviation groundings receive instant priority. We recover and drive components directly to tarmac gates or maintenance sites.',
        iconName: 'Zap'
      },
      {
        title: 'AUS & DFW Strategic Presence',
        description: 'Stationed near key airports, our drivers handle fast recoveries, customs clearings, and next-flight check-ins.',
        iconName: 'Clock'
      }
    ],
    capabilities: [
      'Aircraft on Ground (AOG) avionics, engines, and critical structural components',
      'Next-Flight-Out (NFO) document tender and package retrieval from airlines',
      'Airport cargo terminal recoveries (FedEx, Southwest Cargo, Delta, etc.)',
      'On-Board Courier (OBC) hand-carry flight escorts for sensitive items'
    ],
    faq: [
      {
        question: 'How quickly can you retrieve packages from airport cargo docks?',
        answer: 'Once the flight has landed and cargo is cleared by the carrier (usually 1-2 hours after landing), our airport couriers retrieve the package within 30 to 45 minutes of terminal tender.'
      },
      {
        question: 'Do you offer AOG service 24/7?',
        answer: 'Yes. Aviation emergencies happen at all hours. Our dispatchers and AOG specialists are available 24/7/365 to handle airport gate deliveries.'
      },
      {
        question: 'Which airports do you service directly?',
        answer: 'We provide direct, rapid recovery services at Austin-Bergstrom International Airport (AUS) and Dallas-Fort Worth International (DFW), and can coordinate runs to Houston (IAH/HOU) as needed.'
      }
    ],
    priceRange: '$$$$'
  },
  'scheduled-dedicated-routes': {
    id: 'scheduled-dedicated-routes',
    name: 'Scheduled & Dedicated Routes',
    title: 'Scheduled Courier Routes Austin | Dedicated Daily Deliveries',
    metaDescription: 'Optimize business operations with custom scheduled courier routes and dedicated daily delivery services in Austin, TX. 24/7 contract logistics.',
    keywords: [
      'Scheduled courier routes',
      'dedicated daily delivery',
      'recurring courier services',
      'interoffice mail route',
      'contract logistics Austin'
    ],
    tagline: 'Reliable, optimized recurring routes tailored to your operations.',
    overview: 'For businesses requiring consistent, recurring logistics, our scheduled and dedicated route service provides absolute predictability. We set up custom schedules for daily inter-office mail, weekly medical laboratory runs, bank deposits, or warehouse logistics. With dedicated drivers assigned to your account, you get seamless execution and familiarity with your specific pickup and dropoff requirements.',
    features: [
      {
        title: 'Optimized Routing Maps',
        description: 'We construct routes to hit all your nodes in the logical order, minimizing driving time and reducing operational costs.',
        iconName: 'Calendar'
      },
      {
        title: 'Dedicated Account Drivers',
        description: 'The same professional driver is assigned to your routine, ensuring familiarity with your docks, lockboxes, and staff.',
        iconName: 'MapPin'
      },
      {
        title: 'Flexible Recurring Slots',
        description: 'Choose daily, bi-weekly, weekly, or monthly slots, with 24/7 capability to support overnight or morning-early shifts.',
        iconName: 'Clock'
      }
    ],
    capabilities: [
      'Routine inter-office mail, documents, and corporate records loops',
      'Scheduled clinical laboratory specimen collections and clinic loops',
      'Consistent retail store inventory transfers and regional warehouse feeds',
      'Daily financial, banking deposit runs, and secure lockbox clearing'
    ],
    faq: [
      {
        question: 'Can we customize our scheduled route frequency?',
        answer: 'Yes. Routes are completely customizable. We can set up daily loops, multiple runs per day, weekly pickups, or custom-timed schedules to fit your workflow.'
      },
      {
        question: 'Will we have the same courier driver every day?',
        answer: 'Yes. We assign dedicated drivers to routine routes. This guarantees they understand your facility, access codes, security rules, and personnel.'
      },
      {
        question: 'What happens if a route needs to be changed temporarily?',
        answer: 'Simply notify our dispatch desk. We can adjust route stops, times, or vehicle capacity with short notice to adapt to your business needs.'
      }
    ],
    priceRange: '$$'
  },
  'air-hand-carry-on-board-courier': {
    id: 'air-hand-carry-on-board-courier',
    name: 'Air Hand Carry / On-Board Courier',
    title: 'Air Hand Carry Austin | On-Board Courier Service TX',
    metaDescription: 'Premium air hand carry and on-board courier (OBC) services in Austin, TX. A dedicated courier personally accompanies your package on commercial flights for secure, same-day delivery nationwide.',
    keywords: [
      'Air hand carry Austin',
      'on board courier Austin',
      'OBC courier service',
      'hand carry shipping Texas',
      'expedited air courier'
    ],
    tagline: 'A dedicated courier personally accompanies your critical shipment on commercial flights.',
    overview: 'For high-stakes cargo that absolutely cannot leave human custody or risk transit delay, our premium Air Hand Carry (On-Board Courier) service is the gold standard. A dedicated, background-checked Speedy Bat courier receives your package, immediately drives to the airport, boards the next available commercial flight, and hand-delivers the package directly to the recipient at destination. Your shipment never leaves human hands, ensuring a completely unbroken chain of custody.',
    features: [
      {
        title: 'Unbroken Chain of Custody',
        description: 'Our courier maintains constant physical possession of your package from initial pickup until final hand-delivery, completely eliminating handling errors.',
        iconName: 'Shield'
      },
      {
        title: 'Immediate Flight Booking',
        description: 'Our dispatch team actively monitors flight schedules and books the next available commercial routing out of AUS or DFW within minutes.',
        iconName: 'Plane'
      },
      {
        title: 'Real-Time Courier Updates',
        description: 'Receive continuous updates at key milestones: flight boarding, landing, terminal exit, and final delivery, complete with photo confirmation.',
        iconName: 'Globe'
      }
    ],
    capabilities: [
      'Delicate semiconductor wafers, fab tools, and microelectronics',
      'Critical legal files, evidence, and time-sensitive signed contracts',
      'Biological specimens, clinical trial samples, and urgent pharmaceuticals',
      'High-value jewelry, automotive prototypes, and critical aviation (AOG) components'
    ],
    faq: [
      {
        question: 'What is the maximum size and weight for hand carry shipments?',
        answer: 'Since packages must accompany our courier in the aircraft cabin, they must fit standard airline carry-on or personal item dimensions (typically up to 22" x 14" x 9") and weigh under 40 lbs. Larger items may be shipped via next-flight-out air cargo, which we can also coordinate.'
      },
      {
        question: 'Which airports do you operate out of?',
        answer: 'We primarily dispatch couriers out of Austin-Bergstrom International Airport (AUS) and Dallas-Fort Worth International Airport (DFW) for domestic and international destinations. We can also coordinate departures from Houston (IAH/HOU) or San Antonio (SAT) depending on the fastest flight availability.'
      },
      {
        question: 'Are your couriers fully vetted and secure?',
        answer: 'Yes. All on-board couriers are thoroughly vetted, background-checked, and highly experienced in high-security logistics. they carry international travel credentials and operate with the highest level of professionalism.'
      }
    ],
    priceRange: '$$$$'
  },
  'high-value-secure-courier': {
    id: 'high-value-secure-courier',
    name: 'High-Value & Secure Item Courier',
    title: 'High-Value Secure Courier Austin | Diamond, Bond & Document Transport',
    metaDescription: 'Secure courier for high-value items in Austin, TX. Discreet direct-drive transport for bearer bonds, loose diamonds, gold bullion, passports, original contracts, and irreplaceable assets. 24/7 chain of custody.',
    keywords: [
      'secure courier high value items Austin',
      'diamond courier service Texas',
      'bearer bond delivery service',
      'luxury watch courier Austin',
      'gold bullion transport courier',
      'secure document transport',
      'precious items courier'
    ],
    tagline: 'When the item is worth more than the vehicle carrying it.',
    overview: 'Some items cannot be risked in the mail — their value far exceeds any insurance claim, and many are simply irreplaceable. Our High-Value & Secure Item Courier service provides discreet, dedicated, direct-drive transport with court-grade chain of custody for financial instruments, precious goods, identity documents, and irreplaceable personal assets. Unmarked vehicles, plain-clothes couriers, tamper-evident packaging, and declared-value cargo coverage ensure your most valuable items arrive exactly as they left.',
    features: [
      {
        title: 'Tamper-Evident Chain of Custody',
        description: 'Sealed packaging with documented seal verification at origin and destination. Every handoff is photographed, timestamped, and logged for court-grade auditability.',
        iconName: 'Shield'
      },
      {
        title: 'Discreet Transport',
        description: 'Unmarked vehicles, plain-clothes couriers, and zero external signage. Your shipment travels invisibly — no one knows what is being carried or where.',
        iconName: 'EyeOff'
      },
      {
        title: 'Declared Value Coverage',
        description: 'Cargo insurance scaled to your item\'s declared value — not limited to standard carrier caps. Coverage tailored for diamonds, gold, bonds, and irreplaceable originals.',
        iconName: 'Gem'
      }
    ],
    capabilities: [
      'Bearer bonds, stock certificates, cashier\'s checks, and financial instruments',
      'Loose diamonds, luxury watches, gold bullion, rare coins, and rare stamps',
      'Original legal contracts, signed deeds, and court-admissible evidence',
      'Passports, visas, work permits, and sensitive identity documents',
      'Pharmaceutical prototypes, clinical trial samples, and specialized medical specimens',
      'Family heirlooms, estate items, original architectural blueprints, and small original artwork'
    ],
    faq: [
      {
        question: 'What insurance coverage do you carry for high-value items?',
        answer: 'We offer declared-value cargo coverage that scales with your item\'s worth, well beyond standard carrier limits. For items of extraordinary value, we coordinate supplemental coverage and can provide proof of insurance before pickup. Every run is fully insured with documented chain of custody.'
      },
      {
        question: 'Is there a size or weight limit for secure item transport?',
        answer: 'Our high-value service handles items that fit in a secure lockbox or hard-sided case — typically under 50 lbs and small enough for a single courier to maintain constant physical custody. For larger items, we coordinate dedicated cargo vehicles with enhanced security protocols.'
      },
      {
        question: 'How do you ensure discretion during transport?',
        answer: 'All high-value runs use unmarked personal vehicles with no company branding. Couriers dress in plain clothes and carry no documentation visible to third parties. Pickup and delivery are coordinated to minimize exposure, and we never disclose cargo contents to anyone outside the chain of custody.'
      }
    ],
    priceRange: '$$$$'
  }
};
