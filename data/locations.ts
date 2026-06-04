import { LocationData } from '../types';

export const locations: Record<string, LocationData> = {
  'downtown-austin': {
    id: 'downtown-austin',
    name: 'Downtown Austin',
    title: 'Downtown Austin Courier Service | Same-Day Document & Rush Messenger',
    metaDescription: 'Speedy Bat Couriers offers 24/7 same-day document delivery and rush business courier services in Downtown Austin, TX. Fast, secure, and dedicated messengers.',
    keywords: [
      'Downtown Austin courier service',
      'same-day document delivery',
      'rush business courier',
      'corporate messenger',
      'Austin TX courier service'
    ],
    coordinates: {
      latitude: 30.2686,
      longitude: -97.7422
    },
    zipCodes: ['78701', '78705'],
    areaServed: 'Downtown Austin, including the Central Business District, Capitol Complex, Rainey Street, and West Campus.',
    priceRange: '$$$',
    transitInfo: 'Navigating central routes like I-35, MoPac, or Congress Avenue traffic to ensure your urgent deliveries bypass local bottlenecks without delay.',
    localHighlights: [
      'Texas State Capitol',
      'Austin Convention Center',
      'Dell Medical School',
      'St. David\'s Medical Center',
      'Congress Avenue business towers'
    ],
    localServices: [
      'Same-day legal document filing and process delivery',
      'Expedited corporate messenger services between downtown offices',
      'STAT medical specimen and equipment logistics',
      'Confidential and secure document chain-of-custody transport'
    ]
  },
  'south-austin': {
    id: 'south-austin',
    name: 'South Austin',
    title: 'South Austin Delivery Services | Local On-Demand Courier Near Me',
    metaDescription: 'Need a local courier near you in South Austin? Speedy Bat Couriers provides on-demand package delivery and neighborhood courier fleets 24/7.',
    keywords: [
      'South Austin delivery services',
      'local courier near me',
      'on-demand package delivery',
      'neighborhood courier fleet',
      'South Lamar courier'
    ],
    coordinates: {
      latitude: 30.2241,
      longitude: -97.7715
    },
    zipCodes: ['78704', '78745', '78748'],
    areaServed: 'South Austin, covering South Congress (SoCo), South Lamar, Barton Hills, Bouldin Creek, and Sunset Valley.',
    priceRange: '$$',
    transitInfo: 'Navigating South Austin transit corridors including US-290, Hwy 71 (Ben White Boulevard), South Congress Avenue, and South Lamar to ensure rapid transit.',
    localHighlights: [
      'South Congress (SoCo) District',
      'St. Edward\'s University',
      'Barton Creek Square Mall',
      'South Austin Medical Center',
      'South Lamar Business District'
    ],
    localServices: [
      'On-demand retail and merchant delivery',
      'Residential parcel and subscription box distribution',
      'STAT specimen transport for local clinics',
      'Scheduled courier routes for South Austin businesses'
    ]
  },
  'west-lake-hills': {
    id: 'west-lake-hills',
    name: 'West Lake Hills',
    title: 'West Lake Hills Courier Service | Secure & Confidential Parcel Delivery',
    metaDescription: 'Secure parcel delivery and scheduled courier routes in West Lake Hills, TX. Speedy Bat offers confidential, direct-drive shipping you can trust.',
    keywords: [
      'West Lake Hills courier service',
      'secure parcel delivery',
      'scheduled courier routes',
      'confidential courier',
      'Loop 360 courier'
    ],
    coordinates: {
      latitude: 30.2910,
      longitude: -97.8014
    },
    zipCodes: ['78746', '78733', '78735'],
    areaServed: 'West Lake Hills, Rollingwood, Lost Creek, and the Loop 360 (Capital of Texas Highway) corridor.',
    priceRange: '$$$$',
    transitInfo: 'Bypassing heavy traffic along Loop 360 (Capital of Texas Highway), Bee Cave Road (FM 2244), and Westlake Drive to secure direct-drive deliveries.',
    localHighlights: [
      'Eanes ISD Campuses',
      'Loop 360 Professional Plazas',
      'Davenport Village',
      'Rollingwood City Hall',
      'Westlake Drive Estates'
    ],
    localServices: [
      'Highly secure and confidential legal and financial transport',
      'Scheduled high-priority executive routing',
      'Direct-drive hot-shot delivery for high-value assets',
      'Residential courier services for secure, gated estates'
    ]
  },
  'east-austin': {
    id: 'east-austin',
    name: 'East Austin',
    title: 'East Austin Courier Network | Prompt Local Business Messenger',
    metaDescription: 'Get prompt package delivery and local business messenger services in East Austin. Speedy Bat connects the Eastside with reliable, 24/7 same-day delivery.',
    keywords: [
      'East Austin courier network',
      'prompt package delivery',
      'local business messenger',
      'same-day delivery service',
      'East Austin same-day'
    ],
    coordinates: {
      latitude: 30.2618,
      longitude: -97.7150
    },
    zipCodes: ['78702', '78721', '78723'],
    areaServed: 'East Austin, including Plaza Saltillo, Holly, Cherrywood, Rosewood, and Govalle neighborhoods.',
    priceRange: '$$',
    transitInfo: 'Leveraging local knowledge of East 7th Street, Airport Boulevard, and Chicon Street to skip central expressway bottlenecks and speed up your shipments.',
    localHighlights: [
      'Plaza Saltillo Commercial Complex',
      'Eastside Creative Studios & Tech Plazas',
      'Huston-Tillotson University',
      'Airport Boulevard Corridor',
      'Springdale General Business Park'
    ],
    localServices: [
      'Prompt delivery for local tech startups and creative studios',
      'Same-day retail and e-commerce distribution',
      'Boutique manufacturing parts and tool transport',
      'Daily local post office and bank routing'
    ]
  },
  'mueller': {
    id: 'mueller',
    name: 'Mueller',
    title: 'Mueller Neighborhood Delivery | Dell Children\'s STAT Medical Courier',
    metaDescription: 'STAT medical courier services to Dell Children\'s Hospital and local residential/retail messenger services in Mueller Austin. 24/7 dispatch.',
    keywords: [
      'Mueller neighborhood delivery',
      'retail logistics',
      'residential courier',
      'same-day local messenger',
      'Dell Childrens medical courier'
    ],
    coordinates: {
      latitude: 30.3013,
      longitude: -97.7025
    },
    zipCodes: ['78723', '78752'],
    areaServed: 'Mueller mixed-use development, Dell Children\'s Medical Center, and surrounding Windsor Park neighborhoods.',
    priceRange: '$$',
    transitInfo: 'Navigating around Aldrich Street, Berkman Drive, and the I-35 corridor near 51st Street to ensure immediate specimen and cargo dispatch.',
    localHighlights: [
      'Dell Children\'s Medical Center',
      'Mueller Lake Park & Retail Center',
      'Thinkery Museum Complex',
      'Windsor Park Professional Building',
      'Aldrich Street Town Center'
    ],
    localServices: [
      'STAT medical specimen and pharmaceutical transport',
      'Last-mile residential retail package delivery',
      'Office-to-office document couriers',
      'Honeypot/quick distribution logistics for local shops'
    ]
  },
  'cedar-park': {
    id: 'cedar-park',
    name: 'Cedar Park',
    title: 'Cedar Park Courier Service | North Austin Business & Medical Courier',
    metaDescription: 'Prompt package delivery and medical courier services in Cedar Park and RM 1431 corridors. 24/7 same-day logistics and hot-shot delivery.',
    keywords: [
      'Cedar Park courier service',
      'north Austin delivery network',
      'medical courier Cedar Park',
      'business package courier',
      '183 Toll courier'
    ],
    coordinates: {
      latitude: 30.5060,
      longitude: -97.8303
    },
    zipCodes: ['78613', '78641', '78717'],
    areaServed: 'Cedar Park, Leander, Brushy Creek, and the North Austin technology corridor.',
    priceRange: '$$',
    transitInfo: 'Utilizing US-183 (183A Toll), RM 1431 (Whitestone Blvd), and Parmer Lane to bypass rush hour congestion and expedite your northern route deliveries.',
    localHighlights: [
      'Cedar Park Regional Medical Center',
      'H-E-B Center at Cedar Park',
      'La Frontera / Parmer tech centers',
      'Brushy Creek Industrial Parks',
      'Leander Transit Center'
    ],
    localServices: [
      'Expedited corporate logistics and parts transport',
      'Medical clinic Specimen STAT delivery paths',
      'North-to-South Austin direct-drive routes',
      'Industrial and parts warehouse hot-shot dispatch'
    ]
  },
  'west-campus': {
    id: 'west-campus',
    name: 'West Campus',
    title: 'West Campus Student Courier | UT Austin Document & Specimen Delivery',
    metaDescription: 'Urgent document pick-up and department messenger services for UT Austin & West Campus area. Quick same-day courier dispatch.',
    keywords: [
      'West Campus student courier',
      'UT Austin delivery',
      'document pick-up',
      'retail delivery',
      'Guadalupe Street messenger'
    ],
    coordinates: {
      latitude: 30.2855,
      longitude: -97.7460
    },
    zipCodes: ['78705'],
    areaServed: 'University of Texas at Austin (UT Campus), West Campus student housing district, and North University.',
    priceRange: '$$',
    transitInfo: 'Mastering the dense student traffic of Guadalupe Street (The Drag), Lamar Boulevard, and Martin Luther King Jr. Boulevard for fast courier dispatch.',
    localHighlights: [
      'University of Texas at Austin Main Campus',
      'UT System Administration Offices',
      'Darrell K Royal-Texas Memorial Stadium',
      'Co-op Guadalupe Landmark',
      'West Campus Housing High-Rises'
    ],
    localServices: [
      'Academic and administrative department dispatch',
      'Thesis, transcript, and sensitive material courier',
      'Student residential parcel and retail delivery coordination',
      'Off-campus legal document routing for UT alumni and affiliates'
    ]
  },
  'hyde-park': {
    id: 'hyde-park',
    name: 'Hyde Park',
    title: 'Hyde Park Courier | Central Austin Historic Neighborhood Delivery',
    metaDescription: 'Same-day courier and residential delivery services in historic Hyde Park and Duval corridors. HIPAA-compliant specimen logistics and document pick-up.',
    keywords: [
      'Hyde Park courier',
      'historic neighborhood delivery',
      'academic delivery',
      'residential package courier',
      'Duval Street delivery'
    ],
    coordinates: {
      latitude: 30.3018,
      longitude: -97.7288
    },
    zipCodes: ['78751', '78705'],
    areaServed: 'Historic Hyde Park, North Loop, Hancock, and Central Austin residential sectors.',
    priceRange: '$$',
    transitInfo: 'Weaving through Duval Street, 45th Street, and RM 2222 (Koenig Lane) to execute neighborhood deliveries bypassing central highway queues.',
    localHighlights: [
      'Hancock Shopping Center',
      'Elisabet Ney Museum',
      '45th Street Medical Plazas',
      'Shipe Park District',
      'Duval Street Local Commerce'
    ],
    localServices: [
      'STAT medical courier for 45th street clinics and pharmacies',
      'Boutique local retailer inventory delivery',
      'Residential secure package hand-off and signature service',
      'Historical archives and legal filings transfer'
    ]
  }
};
