import React from 'react';
import { renderToString } from 'react-dom/server';
import { NotFound } from './components/NotFound';
import { RouteContent } from './components/RouteContent';
import { SiteShell } from './components/SiteShell';
import { faqItems } from './data/faq';
import { redirects, routeBySlug, routeManifest } from './data/routes';
import { services } from './data/services';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHomepageSchema,
  buildServiceSchema,
  ORGANIZATION_ID
} from './utils/schemaHelper';

export {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHomepageSchema,
  buildServiceSchema,
  faqItems,
  ORGANIZATION_ID,
  redirects,
  routeManifest,
  services
};

export function renderRoute(routeId: string): string {
  const route = routeBySlug[routeId];
  if (!route) throw new Error(`Unknown route: ${routeId}`);
  return renderToString(<SiteShell><RouteContent route={route} /></SiteShell>);
}

export function renderNotFound(): string {
  return renderToString(<SiteShell><NotFound /></SiteShell>);
}
