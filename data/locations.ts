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
  },
  // 19 New Cities Requested in the Delivery Zone Badge Grid
  'round-rock': {
    id: 'round-rock',
    name: 'Round Rock',
    title: 'Round Rock Courier Service | Same-Day Delivery & Express Logistics',
    metaDescription: '24/7 same-day courier service and express delivery in Round Rock, TX. Speedy Bat offers rapid hot-shot transport, medical STAT, and freight.',
    keywords: ['Round Rock courier service', 'same-day delivery Round Rock', 'express logistics', 'medical specimen courier', 'Round Rock shipping'],
    coordinates: { latitude: 30.5083, longitude: -97.6789 },
    zipCodes: ['78664', '78665', '78681'],
    areaServed: 'Round Rock metro area, including Dell HQ campus, Chisholm Trail, and university boulevard corridors.',
    priceRange: '$$$',
    transitInfo: 'Navigating round-the-clock traffic on I-35, Toll 45, and RM 1431 to bypass commuter delays and execute direct-drive deliveries.',
    localHighlights: ['Dell Technologies Global Headquarters', 'Round Rock Premium Outlets', 'Ascension Seton Williamson', 'Texas State University Round Rock', 'Kalamata business parks'],
    localServices: ['Same-day corporate logistics for tech campuses', 'STAT medical courier routes', 'Secure legal messenger runs', 'Commercial freight transport']
  },
  'georgetown': {
    id: 'georgetown',
    name: 'Georgetown',
    title: 'Georgetown Courier Service | STAT Medical & Same-Day Shipping',
    metaDescription: 'Emergency courier services and STAT medical specimen transport in Georgetown, TX. Direct-drive logistics and scheduled route services available 24/7.',
    keywords: ['Georgetown courier service', 'STAT medical courier', 'same-day delivery Georgetown', 'direct-drive logistics', 'expedited shipping'],
    coordinates: { latitude: 30.6383, longitude: -97.6784 },
    zipCodes: ['78626', '78628', '78633'],
    areaServed: 'Georgetown municipal area, Sun City, Southwestern University campus, and surrounding Williamson County corridors.',
    transitInfo: 'Bypassing congestion at the I-35 and Hwy 29 interchange, leveraging DB Wood Road and inner loops to maintain urgent delivery times.',
    localHighlights: ['Historic Georgetown Square', 'Southwestern University', 'St. David\'s Georgetown Hospital', 'Williamson County Courthouse', 'Sun City Business Park'],
    localServices: ['Court filing delivery and legal documents', 'Healthcare specimens STAT transport', 'Manufacturing components hot-shot delivery', 'Residential route drops']
  },
  'pflugerville': {
    id: 'pflugerville',
    name: 'Pflugerville',
    title: 'Pflugerville Courier Service | On-Demand Parcel & Freight Delivery',
    metaDescription: 'Pflugerville\'s premier on-demand courier and same-day delivery service. 24/7 logistics solutions for businesses and residents in Pflugerville, TX.',
    keywords: ['Pflugerville courier service', 'on-demand courier', 'same-day delivery Pflugerville', 'local business shipping', 'SH 130 toll courier'],
    coordinates: { latitude: 30.4399, longitude: -97.6200 },
    zipCodes: ['78660', '78691'],
    areaServed: 'Pflugerville, Stone Hill, and surrounding commercial corridors near SH-130 and toll roads.',
    transitInfo: 'Utilizing SH-130 and SH-45 tollways to completely bypass I-35 congestion and accelerate transport times into Pflugerville.',
    localHighlights: ['Stone Hill Shopping Center', 'Pflugerville industrial parks', 'Hawaiian Falls business complexes', 'Heatherwilde district', '130 Corridor hubs'],
    localServices: ['Last-mile warehouse fulfillment logistics', 'Express business document delivery', 'Scheduled commercial routes', 'Fast-response hot-shot parts']
  },
  'lakeway': {
    id: 'lakeway',
    name: 'Lakeway',
    title: 'Lakeway Courier Service | Secure Estate & Medical Specimen Delivery',
    metaDescription: 'Confidential and secure courier services in Lakeway, TX. 24/7 express package delivery, medical STAT transport, and executive legal logistics.',
    keywords: ['Lakeway courier service', 'secure delivery Lakeway', 'medical courier Lakeway', 'confidential shipping', 'RM 620 courier'],
    coordinates: { latitude: 30.3658, longitude: -97.9861 },
    zipCodes: ['78734', '78738'],
    areaServed: 'Lakeway, Lake Travis region, Hudson Bend, and rough hollow residential communities.',
    transitInfo: 'Expert navigation of RM 620, Lakeway Boulevard, and Lohmans Crossing to ensure prompt routing around lake area bottlenecks.',
    localHighlights: ['Baylor Scott & White Medical Center - Lakeway', 'Lake Travis Marina', 'Lakeway Commons', 'Hills of Lakeway', 'local medical plazas'],
    localServices: ['STAT specimen and pharmaceutical courier', 'Executive documents and contracts transport', 'Residential estate package drop-off', 'Local merchant delivery']
  },
  'bee-cave': {
    id: 'bee-cave',
    name: 'Bee Cave',
    title: 'Bee Cave Courier Service | Retail & Executive Route Delivery',
    metaDescription: '24/7 same-day courier service in Bee Cave, TX. On-demand shipping, retail inventory logistics, and secure executive routes.',
    keywords: ['Bee Cave courier service', 'same-day delivery Bee Cave', 'retail inventory courier', 'Hill Country Galleria courier', 'Hwy 71 logistics'],
    coordinates: { latitude: 30.3060, longitude: -97.9525 },
    zipCodes: ['78738', '78735'],
    areaServed: 'Bee Cave municipality, Hill Country Galleria area, Falconhead, and surrounding HWY 71 development zones.',
    transitInfo: 'Leveraging Highway 71, Highway 2244 (Bee Cave Road), and Hamilton Pool Road to speed past bottlenecks and execute deliveries.',
    localHighlights: ['Hill Country Galleria', 'Bee Cave City Hall', 'Falconhead Golf Club area', 'Bee Cave business complexes', 'local retail plazas'],
    localServices: ['Galleria retail logistics and inventory balancing', 'Confidential contract routing', 'Scheduled route delivery for local offices', 'Immediate residential transport']
  },
  'kyle': {
    id: 'kyle',
    name: 'Kyle',
    title: 'Kyle Courier Service | Same-Day Logistics & Medical Specimen Transport',
    metaDescription: 'Expedited courier and same-day delivery service in Kyle, TX. Available 24/7 for medical STAT, industrial parts, and corporate document transport.',
    keywords: ['Kyle courier service', 'same-day delivery Kyle', 'medical courier Kyle', 'industrial parts delivery', 'I-35 south logistics'],
    coordinates: { latitude: 29.9888, longitude: -97.8767 },
    zipCodes: ['78640'],
    areaServed: 'Kyle municipality, Plum Creek, Seton medical campus, and the high-growth I-35 south corridor.',
    transitInfo: 'Direct-drive dispatch via I-35 and FM 1626, executing express delivery routes bypassing commuter backups between Austin and Kyle.',
    localHighlights: ['Ascension Seton Hays', 'Plum Creek District', 'Kyle Crossing', 'Kyle ER', 'local manufacturing hubs'],
    localServices: ['STAT clinical logistics and laboratory specimen delivery', 'High-growth construction material courier', 'Commercial document dispatch', 'Retail distribution transport']
  },
  'leander': {
    id: 'leander',
    name: 'Leander',
    title: 'Leander Courier Service | Expedited Same-Day Package Delivery',
    metaDescription: 'Express same-day shipping and business courier routes in Leander, TX. 24/7 hot-shot transport and confidential document delivery.',
    keywords: ['Leander courier service', 'same-day delivery Leander', 'express business courier', 'hot-shot transport', '183A Toll logistics'],
    coordinates: { latitude: 30.5788, longitude: -97.8531 },
    zipCodes: ['78641', '78646'],
    areaServed: 'Leander residential districts, Crystal Falls, metro rail transit corridors, and RM 2243 developments.',
    transitInfo: 'Utilizing 183A Tollway, Highway 183, and Hero Way to bypass northern Williamson County commuter patterns and speed up deliveries.',
    localHighlights: ['Leander Metro Rail Station', 'Crystal Falls Center', 'Leander High School area', 'local clinic complexes', 'RM 2243 business parks'],
    localServices: ['Same-day administrative and legal filings courier', 'Residential secure parcel delivery', 'Scheduled commercial shipping', 'Immediate hot-shot medical specimen routes']
  },
  'liberty-hill': {
    id: 'liberty-hill',
    name: 'Liberty Hill',
    title: 'Liberty Hill Courier Service | Secure On-Demand Business Transport',
    metaDescription: 'On-demand courier service in Liberty Hill, TX. 24/7 same-day delivery for corporate, construction, and residential clients.',
    keywords: ['Liberty Hill courier service', 'same-day delivery Liberty Hill', 'construction logistics', 'business courier', 'Hwy 29 shipping'],
    coordinates: { latitude: 30.6646, longitude: -97.9228 },
    zipCodes: ['78642'],
    areaServed: 'Liberty Hill, Seward Junction, and surrounding Highway 29 / RM 1869 industrial and residential areas.',
    transitInfo: 'Routing along Highway 29 and Highway 183 to manage express transport into outlying development zones with zero downtime.',
    localHighlights: ['Liberty Hill High School district', 'industrial development parks', 'Seward Junction commercial centers', 'local ranch estates'],
    localServices: ['Construction material and tools hot-shot delivery', 'manufacturing logistics', 'corporate document transport', 'on-demand residential package distribution']
  },
  'lago-vista': {
    id: 'lago-vista',
    name: 'Lago Vista',
    title: 'Lago Vista Courier Service | Expedited Lake Area Parcel Shipping',
    metaDescription: 'Express courier and same-day delivery service in Lago Vista, TX. We serve the North Lake Travis region 24/7 with secure transport.',
    keywords: ['Lago Vista courier service', 'same-day delivery Lago Vista', 'lake area courier', 'FM 1431 delivery', 'Lago Vista shipping'],
    coordinates: { latitude: 30.4533, longitude: -97.9897 },
    zipCodes: ['78645'],
    areaServed: 'Lago Vista, Jonestown, Point Venture, and the north shore Lake Travis region.',
    transitInfo: 'Traversing RM 1431 and Lohman Ford Road to navigate winding lake terrain efficiently and secure direct delivery times.',
    localHighlights: ['Lago Vista Golf Course area', 'Rusty Allen Airport', 'Point Venture Marina', 'local medical clinics', 'Jonestown commercial strip'],
    localServices: ['Lake community custom courier', 'clinic specimen routing', 'secure banking and legal transport', 'critical parts delivery']
  },
  'taylor': {
    id: 'taylor',
    name: 'Taylor',
    title: 'Taylor Courier Service | Samsung Fab Semiconductor & Industrial Logistics',
    metaDescription: 'STAT semiconductor parts delivery and same-day industrial courier service in Taylor, TX. Serving the Samsung Fab corridor 24/7.',
    keywords: ['Taylor courier service', 'Samsung Taylor courier', 'semiconductor logistics', 'same-day industrial delivery', 'Hwy 79 courier'],
    coordinates: { latitude: 30.5708, longitude: -97.4094 },
    zipCodes: ['78674'],
    areaServed: 'Taylor municipality, Samsung Semiconductor campus, and East Williamson County industrial zones.',
    transitInfo: 'Direct-drive routes via US-79, FM 973, and Toll 130 to ensure semiconductor parts and critical cargo bypass regional traffic.',
    localHighlights: ['Samsung Semiconductor Taylor Fab', 'Historic Downtown Taylor', 'Taylor Regional Park', 'local manufacturing facilities'],
    localServices: ['High-value semiconductor tool and wafer hot-shot delivery', 'STAT medical logistics for clinics', 'manufacturing raw material transport', 'express business filings']
  },
  'hutto': {
    id: 'hutto',
    name: 'Hutto',
    title: 'Hutto Courier Service | Same-Day Logistics & Industrial Parts Courier',
    metaDescription: 'Hutto\'s reliable 24/7 same-day courier and express delivery provider. Hot-shot parts, medical STAT, and business delivery solutions.',
    keywords: ['Hutto courier service', 'same-day delivery Hutto', 'industrial parts courier', 'Hwy 79 logistics', 'Hutto business shipping'],
    coordinates: { latitude: 30.5427, longitude: -97.5472 },
    zipCodes: ['78634'],
    areaServed: 'Hutto municipal limits, Co-Op district, and industrial areas flanking Toll 130.',
    transitInfo: 'Using US-79 and Toll 130 to maintain high-speed routing bypassing the major East Austin commuter paths.',
    localHighlights: ['Hutto Co-Op District', 'Hutto High School complex', 'local industrial logistics parks', 'Fritz Park area'],
    localServices: ['Expedited machinery parts hot-shot delivery', 'local school and clinic document transport', 'scheduled logistics runs', 'residential drops']
  },
  'salado': {
    id: 'salado',
    name: 'Salado',
    title: 'Salado Courier Service | Secure Historic District Business Courier',
    metaDescription: 'Express same-day shipping and historic route courier service in Salado, TX. 24/7 secure logistics and package delivery.',
    keywords: ['Salado courier service', 'same-day delivery Salado', 'business courier Salado', 'I-35 north shipping', 'Salado logistics'],
    coordinates: { latitude: 30.9416, longitude: -97.5386 },
    zipCodes: ['78671'],
    areaServed: 'Historic Salado, local artisan districts, and Williamson/Bell county boundary zones along I-35.',
    transitInfo: 'Rapid interstate driving via I-35 North, maintaining direct routes with local detour knowledge to avoid construction slowdowns.',
    localHighlights: ['Historic Main Street Salado', 'Stagecoach Inn', 'local art galleries', 'Mill Creek Golf Club', 'Bell County offices'],
    localServices: ['Artisan logistics and high-value fragile goods transport', 'local administrative document courier', 'retail supply chain transit', 'scheduled residential delivery']
  },
  'killeen': {
    id: 'killeen',
    name: 'Killeen',
    title: 'Killeen Courier Service | Same-Day Military & Medical Cargo Transport',
    metaDescription: 'Emergency courier and same-day delivery service in Killeen, TX. Serving Fort Cavazos (Fort Hood) and local hospitals 24/7.',
    keywords: ['Killeen courier service', 'same-day delivery Killeen', 'military logistics', 'medical courier Killeen', 'Fort Cavazos courier'],
    coordinates: { latitude: 31.1171, longitude: -97.7278 },
    zipCodes: ['76541', '76542', '76543', '76549'],
    areaServed: 'Killeen, Fort Cavazos (Fort Hood), Harker Heights, and surrounding Central Texas military hubs.',
    transitInfo: 'Utilizing I-14 (US-190) and Highway 195 to optimize heavy-freight and courier routes into Killeen bypassing congestion.',
    localHighlights: ['Fort Cavazos (Fort Hood) main gate', 'Carl R. Darnall Army Medical Center', 'Killeen Mall', 'Texas A&M University - Central Texas'],
    localServices: ['Fort Cavazos logistics and administrative document courier', 'STAT laboratory specimen and pharmacy delivery', 'industrial machinery parts hot-shot', 'legal courier services']
  },
  'temple': {
    id: 'temple',
    name: 'Temple',
    title: 'Temple Courier Service | Baylor Scott & White Medical STAT Courier',
    metaDescription: 'Specialized medical STAT specimen transport and same-day business courier in Temple, TX. Serving Baylor Scott & White daily.',
    keywords: ['Temple courier service', 'medical courier Temple', 'Baylor Scott and White courier', 'same-day delivery Temple', 'specimen transport'],
    coordinates: { latitude: 31.0982, longitude: -97.3428 },
    zipCodes: ['76501', '76502', '76504'],
    areaServed: 'Temple, local medical district, industrial manufacturing parks, and Bell County offices.',
    transitInfo: 'Navigating I-35, Loop 363, and West Adams Avenue with urgency to meet crucial medical and industrial timetables.',
    localHighlights: ['Baylor Scott & White Medical Center - Temple', 'McLane Children\'s Hospital', 'Temple VA Clinic', 'Temple industrial park'],
    localServices: ['HIPAA-compliant STAT laboratory specimen logistics', 'blood bank and organ transport', 'manufacturing assembly hot-shot parts', 'daily legal filings']
  },
  'buda': {
    id: 'buda',
    name: 'Buda',
    title: 'Buda Courier Service | On-Demand Industrial & Retail Logistics',
    metaDescription: 'Expedited courier and same-day delivery service in Buda, TX. Available 24/7 for retail logistics, warehouse transport, and corporate documents.',
    keywords: ['Buda courier service', 'same-day delivery Buda', 'industrial logistics', 'Buda warehouse courier', 'FM 1626 courier'],
    coordinates: { latitude: 30.0841, longitude: -97.8403 },
    zipCodes: ['78610'],
    areaServed: 'Buda municipal area, Main Street, industrial warehouse parks, and northern Hays County.',
    transitInfo: 'Fast route execution utilizing I-35, Toll 45, and FM 1626 to connect Buda to Austin and San Marcos hubs without delay.',
    localHighlights: ['Buda historic downtown', 'Cabela\'s complex area', 'industrial warehouse district along I-35', 'local business hubs'],
    localServices: ['Industrial warehouse stock balancing and parts transfer', 'retail distribution delivery', 'legal document courier', 'local business logistics routes']
  },
  'bastrop': {
    id: 'bastrop',
    name: 'Bastrop',
    title: 'Bastrop Courier Service | Hwy 71 Same-Day Courier & Specimen Delivery',
    metaDescription: 'Reliable same-day courier service and STAT medical delivery in Bastrop, TX. 24/7 express shipping along the Hwy 71 corridor.',
    keywords: ['Bastrop courier service', 'same-day delivery Bastrop', 'medical courier Bastrop', 'Hwy 71 courier', 'Bastrop shipping'],
    coordinates: { latitude: 30.1105, longitude: -97.3153 },
    zipCodes: ['78602'],
    areaServed: 'Bastrop, Tahitian Village, and eastern corridor developments along Highway 71.',
    transitInfo: 'Direct transit via Highway 71 and Highway 95, maintaining speed through local intersections to avoid holiday/weekend corridor bottlenecks.',
    localHighlights: ['Historic Downtown Bastrop', 'Bastrop Memorial Hospital', 'McKinney Roughs', 'tahitian village commercial complexes'],
    localServices: ['Medical STAT clinic Specimen routing, regional construction site hot-shot tools transport, residential parcel routing, and legal contracts delivery']
  },
  'elgin': {
    id: 'elgin',
    name: 'Elgin',
    title: 'Elgin Courier Service | Prompt Same-Day Package & Cargo Delivery',
    metaDescription: 'Same-day courier and express parcel delivery in Elgin, TX. 24/7 logistics and secure courier routes along US-290 East.',
    keywords: ['Elgin courier service', 'same-day delivery Elgin', 'US 290 courier', 'local business messenger', 'Elgin shipping'],
    coordinates: { latitude: 30.3502, longitude: -97.3705 },
    zipCodes: ['78621'],
    areaServed: 'Elgin municipality, local historic districts, and US-290 East commercial routes.',
    transitInfo: 'Straightforward high-speed routing via US-290 East, bypassing metro area traffic to deliver cargo into Elgin.',
    localHighlights: ['Historic Downtown Elgin', 'local brickworks industrial zones', 'Elgin business park', 'regional agricultural logistics hubs'],
    localServices: ['Industrial parts and brickworks material hot-shot, local retail inventory delivery, legal document route drops, and secure banking transits']
  },
  'new-braunfels': {
    id: 'new-braunfels',
    name: 'New Braunfels',
    title: 'New Braunfels Courier Service | Same-Day Tourism & Corporate Logistics',
    metaDescription: '24/7 same-day courier and expedited freight services in New Braunfels, TX. Medical STAT specimen transport and business delivery.',
    keywords: ['New Braunfels courier service', 'same-day delivery New Braunfels', 'tourism logistics', 'medical courier New Braunfels', 'I-35 logistics'],
    coordinates: { latitude: 29.7030, longitude: -98.1242 },
    zipCodes: ['78130', '78132', '78133', '78135'],
    areaServed: 'New Braunfels, Gruene, Comal County municipal zones, and the high-growth I-35 corridor between Austin and San Antonio.',
    transitInfo: 'Routing via I-35 and Highway 46, using local bypass routes near the Guadalupe and Comal rivers to ensure timely dropoffs.',
    localHighlights: ['Historic Gruene District', 'Comal County Courthouse', 'Christus Santa Rosa Hospital - New Braunfels', 'Resolute Health Hospital', 'local manufacturing hubs'],
    localServices: ['Medical Specimen STAT logistics for hospital networks, tourism/resort inventory logistics, legal process routing and court documents, and commercial parts delivery']
  },
  'san-marcos': {
    id: 'san-marcos',
    name: 'San Marcos',
    title: 'San Marcos Courier Service | Same-Day College Campus & Industrial Courier',
    metaDescription: '24/7 express courier service in San Marcos, TX. Serving Texas State University, outlet malls, and medical centers with same-day transport.',
    keywords: ['San Marcos courier service', 'same-day delivery San Marcos', 'Texas State University courier', 'San Marcos outlets courier', 'Hays County shipping'],
    coordinates: { latitude: 29.8782, longitude: -97.9414 },
    zipCodes: ['78666', '78667'],
    areaServed: 'San Marcos, Texas State University campus, Outlet Mall corridors, and surrounding Hays County areas.',
    transitInfo: 'Utilizing I-35, Highway 80, and RM 12, coordinating bypass routes during heavy traffic peaks around the university and outlet plazas.',
    localHighlights: ['Texas State University', 'San Marcos Outlets', 'Central Texas Medical Center', 'Hays County Government Center', 'San Marcos River parkways'],
    localServices: ['Academic and administrative department logistics, high-volume retail outlet shipping and supply chain balancing, hospital specimen STAT deliveries, and legal document transport']
  }
};
