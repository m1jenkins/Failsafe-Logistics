import React from 'react';

export interface Destination {
  name: string;
  miles: number;
}

export interface TestimonialData {
  quote: string;
  role: string;
  location: string;
}

export interface FeatureData {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface LocationData {
  id: string;
  name: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  zipCodes: string[];
  areaServed: string;
  priceRange?: string;
  transitInfo: string;
  localHighlights: string[];
  localServices: string[];
}

export interface ServiceFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  name: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  tagline: string;
  overview: string;
  features: ServiceFeature[];
  capabilities: string[];
  faq: ServiceFAQ[];
  flagship?: boolean;
  priceRange?: string;
}