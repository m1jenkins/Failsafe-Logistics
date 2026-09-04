import React from 'react';
import { RouteDefinition } from '../types';
import { services } from '../data/services';
import { AboutPage } from './AboutPage';
import { FaqPage } from './FaqPage';
import { Features } from './Features';
import { HandCarryCallout } from './HandCarryCallout';
import { Hero } from './Hero';
import {
  HowItWorksPage,
  PrivacyPage,
  ServiceAreasPage,
  ServicesPage,
  TermsPage
} from './InfoPages';
import { ServiceArea } from './ServiceArea';
import { ServiceLandingPage } from './ServiceLandingPage';

export const RouteContent: React.FC<{ route: RouteDefinition }> = ({ route }) => {
  if (route.kind === 'home') {
    return (
      <main className="flex flex-col">
        <Hero />
        <div className="order-3 lg:order-2"><Features /></div>
        <div className="order-2 lg:order-3"><HandCarryCallout /></div>
        <div className="order-4"><ServiceArea /></div>
      </main>
    );
  }

  if (route.kind === 'service' && route.serviceId) {
    return <ServiceLandingPage service={services[route.serviceId]} />;
  }

  if (route.slug === 'services') return <ServicesPage />;
  if (route.slug === 'service-areas') return <ServiceAreasPage />;
  if (route.slug === 'how-it-works') return <HowItWorksPage />;
  if (route.slug === 'faq') return <FaqPage />;
  if (route.slug === 'about') return <AboutPage />;
  if (route.slug === 'privacy') return <PrivacyPage />;
  if (route.slug === 'terms') return <TermsPage />;

  return null;
};
