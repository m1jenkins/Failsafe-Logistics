import { LocationData, ServiceData } from '../types';

/**
 * Dynamically injects a JSON-LD LocalBusiness (CourierService) and Service schema
 * tailored to the current location into the head of the document.
 * 
 * @param location The LocationData profile for the active neighborhood.
 */
export const injectLocationSchema = (location: LocationData): () => void => {
  // 1. Remove any existing location schema tags to avoid duplicate metadata
  const existingScript = document.getElementById('jsonld-location-schema');
  if (existingScript) {
    existingScript.remove();
  }

  // 2. Build the CourierService / LocalBusiness JSON-LD structure
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CourierService',
    '@id': `https://speedybat.com/${location.id}#courierservice`,
    'name': `Speedy Bat Couriers - ${location.name} Delivery Hub`,
    'image': 'https://speedybat.com/speedy-bat-logo.png',
    'telephone': '+1-512-910-4938',
    'priceRange': location.priceRange || '$$$',
    'url': `https://speedybat.com/${location.id}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Austin',
      'addressRegion': 'TX',
      'postalCode': location.zipCodes[0],
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': location.coordinates.latitude,
      'longitude': location.coordinates.longitude
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': location.name,
      'description': location.areaServed
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    },
    'sameAs': [
      'https://www.facebook.com/speedybatcouriers',
      'https://twitter.com/speedybatcouriers'
    ],
    'description': location.metaDescription,
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${location.name} Courier Service Offerings`,
      'itemListElement': location.localServices.map((serviceName, idx) => ({
        '@type': 'Offer',
        'position': idx + 1,
        'itemOffered': {
          '@type': 'Service',
          'name': serviceName,
          'description': `Professional, fast-response delivery service specifically serving the ${location.name} area and connecting to the wider Austin region.`
        }
      }))
    }
  };

  // 3. Create the script element and append it to head
  const script = document.createElement('script');
  script.id = 'jsonld-location-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(schema);
  document.head.appendChild(script);

  // 4. Return cleanup function
  return () => {
    const scriptToRemove = document.getElementById('jsonld-location-schema');
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
};

/**
 * Dynamically injects a JSON-LD Service and FAQPage schema
 * tailored to the current service page into the head of the document.
 * 
 * @param service The ServiceData profile for the active service.
 */
export const injectServiceSchema = (service: ServiceData): () => void => {
  // 1. Remove any existing service schema tags to avoid duplicate metadata
  const existingScript = document.getElementById('jsonld-service-schema');
  if (existingScript) {
    existingScript.remove();
  }

  // 2. Build the Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://speedybat.com/${service.id}#service`,
    'name': service.title,
    'description': service.metaDescription,
    'provider': {
      '@type': 'CourierService',
      'name': 'Speedy Bat Couriers',
      'telephone': '+1-512-910-4938',
      'url': 'https://speedybat.com',
      'image': 'https://speedybat.com/speedy-bat-logo.png',
      'priceRange': service.priceRange || '$$'
    },
    'areaServed': [
      {
        '@type': 'AdministrativeArea',
        'name': 'Austin',
        'sameAs': 'https://en.wikipedia.org/wiki/Austin,_Texas'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Round Rock'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Cedar Park'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Georgetown'
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${service.name} Capabilities`,
      'itemListElement': service.capabilities.map((cap, idx) => ({
        '@type': 'Offer',
        'position': idx + 1,
        'itemOffered': {
          '@type': 'Service',
          'name': cap
        }
      }))
    }
  };

  // 3. Build the FAQPage schema if FAQs exist
  const faqSchema = service.faq && service.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faq.map(faqItem => ({
      '@type': 'Question',
      'name': faqItem.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faqItem.answer
      }
    }))
  } : null;

  // 4. Combine into an array if FAQ exists
  const combinedSchema = faqSchema ? [serviceSchema, faqSchema] : serviceSchema;

  // 5. Create the script element and append to head
  const script = document.createElement('script');
  script.id = 'jsonld-service-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(combinedSchema);
  document.head.appendChild(script);

  // 6. Return cleanup function
  return () => {
    const scriptToRemove = document.getElementById('jsonld-service-schema');
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
};
