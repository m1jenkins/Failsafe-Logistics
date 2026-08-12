export type ClaimStatus = 'verified' | 'qualified' | 'prohibited';

export interface ClaimRecord {
  id: string;
  approvedWording: string;
  status: ClaimStatus;
  evidenceRef: string;
  applicableRoutes: string[];
  owner: string;
  lastVerified: string;
  reviewDate: string;
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

export type ServiceGroup =
  | 'Urgent ground'
  | 'Air and airport'
  | 'Secure and legal'
  | 'Recurring';

export interface ServiceData {
  id: string;
  name: string;
  group: ServiceGroup;
  title: string;
  metaDescription: string;
  tagline: string;
  overview: string;
  eligibility: string[];
  limits: string[];
  process: string[];
  exceptions: string[];
  features: ServiceFeature[];
  capabilities: string[];
  faq: ServiceFAQ[];
  relatedServiceIds: string[];
  claimIds: string[];
  lastReviewed: string;
  flagship?: boolean;
}

export type CoveragePortfolioAction = 'redirect' | 'retain';

export interface CoverageArea {
  id: string;
  name: string;
  kind: 'austin-neighborhood' | 'metro-request' | 'austin-origin-destination';
  pickupEligibility: string;
  responseCopy: string;
  portfolioAction: CoveragePortfolioAction;
  redirectDestination: string;
}

export type RouteKind = 'home' | 'hub' | 'service' | 'about' | 'faq' | 'policy';

export interface RouteDefinition {
  slug: string;
  kind: RouteKind;
  label: string;
  title: string;
  description: string;
  serviceId?: string;
}

export interface RedirectDefinition {
  source: string;
  destination: string;
  permanent: true;
}
