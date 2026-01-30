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