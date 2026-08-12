import { RedirectDefinition, RouteDefinition } from '../types';
import { coverageRedirects } from './locations';
import { serviceList } from './services';

const staticRoutes: RouteDefinition[] = [
  {
    slug: '',
    kind: 'home',
    label: 'Home',
    title: 'Urgent Courier Service in Austin, TX | Speedy Bat',
    description: 'Request urgent Austin courier service for same-day, hot shot, AOG/NFO, air hand carry, legal-document, secure-item, and recurring delivery needs.'
  },
  {
    slug: 'services',
    kind: 'hub',
    label: 'Services',
    title: 'Courier Services from Austin, TX | Speedy Bat',
    description: 'Compare Speedy Bat courier services for urgent ground, air and airport, secure and legal, and recurring Austin-origin delivery needs.'
  },
  {
    slug: 'service-areas',
    kind: 'hub',
    label: 'Service Areas',
    title: 'Austin Courier Pickup Area & Destinations | Speedy Bat',
    description: 'See how Speedy Bat describes Austin-metro pickup coverage and farther Austin-origin destinations without implying staffed fleets in other cities.'
  },
  {
    slug: 'how-it-works',
    kind: 'hub',
    label: 'How It Works',
    title: 'How Speedy Bat Courier Dispatch Works | Austin, TX',
    description: 'Learn what to send, what dispatch confirms, how an accepted courier job proceeds, and which sensitive or restricted details not to submit online.'
  },
  {
    slug: 'faq',
    kind: 'faq',
    label: 'FAQ',
    title: 'Austin Courier FAQ | Speedy Bat',
    description: 'Answers about Austin pickup eligibility, quotes, timing, direct drive, airport work, hand carry, legal documents, tracking, and sensitive information.'
  },
  {
    slug: 'about',
    kind: 'about',
    label: 'About',
    title: 'About Speedy Bat Couriers | Austin, TX',
    description: 'Speedy Bat is an Austin-based service-area courier business focused on urgent B2B requests and clear job-specific operating limits.'
  },
  {
    slug: 'privacy',
    kind: 'policy',
    label: 'Privacy',
    title: 'Privacy Notice | Speedy Bat Couriers',
    description: 'Read what Speedy Bat collects through the quote form and analytics, why it is used, and what sensitive information should not be submitted.'
  },
  {
    slug: 'terms',
    kind: 'policy',
    label: 'Service Terms',
    title: 'Service Request Terms | Speedy Bat Couriers',
    description: 'Read the public request terms for quotes, job acceptance, sender responsibilities, timing, restricted items, and job-specific service details.'
  }
];

const serviceRoutes: RouteDefinition[] = serviceList.map(service => ({
  slug: service.id,
  kind: 'service',
  label: service.name,
  title: service.title,
  description: service.metaDescription,
  serviceId: service.id
}));

export const routeManifest: RouteDefinition[] = [...staticRoutes, ...serviceRoutes];

export const routeBySlug = Object.fromEntries(
  routeManifest.map(route => [route.slug, route])
) as Record<string, RouteDefinition>;

export const redirects: RedirectDefinition[] = [
  ...coverageRedirects,
  {
    source: '/medical-stat-courier',
    destination: '/services',
    permanent: true
  }
];

export const redirectBySource = Object.fromEntries(
  redirects.map(redirect => [redirect.source, redirect])
) as Record<string, RedirectDefinition>;

export const normalizeSlug = (pathname: string): string =>
  pathname.replace(/^\/+/, '').replace(/\/+$/, '');
