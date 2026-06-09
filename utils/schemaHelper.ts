import { LocationData, ServiceData } from '../types';

/**
 * Pure builder for the location CourierService JSON-LD structure.
 * Used both client-side (injectLocationSchema) and at build time (prerender.js).
 */
export const buildLocationSchema = (location: LocationData) => {
  return {
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
};

/**
 * Dynamically injects the location JSON-LD into the document head.
 * Replaces any statically prerendered copy (same element id).
 */
export const injectLocationSchema = (location: LocationData): () => void => {
  const existingScript = document.getElementById('jsonld-location-schema');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = 'jsonld-location-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(buildLocationSchema(location));
  document.head.appendChild(script);

  return () => {
    const scriptToRemove = document.getElementById('jsonld-location-schema');
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
};

/**
 * Pure builder for the service Service + FAQPage JSON-LD structure.
 * Used both client-side (injectServiceSchema) and at build time (prerender.js).
 */
export const buildServiceSchema = (service: ServiceData) => {
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

  // Build the FAQPage schema if FAQs exist
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

  return faqSchema ? [serviceSchema, faqSchema] : serviceSchema;
};

/**
 * Dynamically injects the service JSON-LD into the document head.
 * Replaces any statically prerendered copy (same element id).
 */
export const injectServiceSchema = (service: ServiceData): () => void => {
  const existingScript = document.getElementById('jsonld-service-schema');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = 'jsonld-service-schema';
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(buildServiceSchema(service));
  document.head.appendChild(script);

  return () => {
    const scriptToRemove = document.getElementById('jsonld-service-schema');
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
};
