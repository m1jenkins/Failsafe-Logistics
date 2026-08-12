import { ServiceData } from '../types';

const BASE_URL = 'https://speedybat.com';

export const ORGANIZATION_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * The site's single public business identity. Route-level Service entities
 * reference this node by @id rather than creating additional business nodes.
 * Unverified address, geo, price, social-profile, and coverage claims are
 * intentionally omitted.
 */
export const buildHomepageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      'name': 'Speedy Bat Couriers',
      'url': `${BASE_URL}/`,
      'logo': `${BASE_URL}/speedy-bat-logo.png`,
      'telephone': '+1-512-910-4938'
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      'name': 'Speedy Bat Couriers',
      'url': `${BASE_URL}/`,
      'publisher': { '@id': ORGANIZATION_ID },
      'inLanguage': 'en-US'
    }
  ]
});

/**
 * A route-specific service entity containing only facts also exposed by the
 * rendered page and its metadata. The provider resolves to the homepage's
 * stable Organization node.
 */
export const buildServiceSchema = (service: ServiceData) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/${service.id}#service`,
  'name': service.name,
  'description': service.metaDescription,
  'url': `${BASE_URL}/${service.id}`,
  'provider': { '@id': ORGANIZATION_ID }
});

/** Build FAQPage markup from the same question-and-answer copy users see. */
export const buildFaqSchema = (faqItems: readonly FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer
    }
  }))
});

/** Build a two-level Home > page breadcrumb for a canonical route. */
export const buildBreadcrumbSchema = (slug: string, name: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `${BASE_URL}/`
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': name,
      'item': `${BASE_URL}/${slug}`
    }
  ]
});
