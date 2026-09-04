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
  | 'Local & direct'
  | 'Urgent freight'
  | 'Airport & specialty';

export interface ServiceData {
  id: string;
  name: string;
  group: ServiceGroup;
  title: string;
  metaDescription: string;
  headline: string;
  summary: string;
  goodFor: string[];
  howItWorks: string;
  whatToSend: string;
  beforeYouBook: string;
  cta: string;
  image: string;
  imageAlt: string;
  faq: ServiceFAQ[];
  relatedServiceIds: string[];
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
