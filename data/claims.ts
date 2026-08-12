import { ClaimRecord } from '../types';

const REVIEW_DATE = '2026-11-12';
const LAST_VERIFIED = '2026-08-12';

export const claims: ClaimRecord[] = [
  {
    id: 'austin-service-area-business',
    approvedWording: 'Speedy Bat is an Austin-based service-area courier business. Pickup eligibility is confirmed by dispatch for each request.',
    status: 'verified',
    evidenceRef: 'Operations model supplied in the 2026-08-12 implementation brief.',
    applicableRoutes: ['*'],
    owner: 'Speedy Bat Operations',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'request-availability',
    approvedWording: 'Urgent requests can be submitted at any time; job acceptance, pickup timing, and delivery timing are confirmed by dispatch.',
    status: 'qualified',
    evidenceRef: 'Public wording is intentionally limited pending dispatch-hours documentation.',
    applicableRoutes: ['*'],
    owner: 'Speedy Bat Operations',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'job-specific-configuration',
    approvedWording: 'Vehicle, routing, custody, tracking, handling, access, and coverage are confirmed for each accepted job.',
    status: 'qualified',
    evidenceRef: 'Job-specific qualification required by the 2026-08-12 implementation brief.',
    applicableRoutes: ['*'],
    owner: 'Speedy Bat Operations',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'austin-origin-coverage',
    approvedWording: 'Routine pickup is limited to the Austin metro; farther markets are described only as destinations for Austin-origin jobs.',
    status: 'verified',
    evidenceRef: 'Coverage model supplied in the 2026-08-12 implementation brief.',
    applicableRoutes: ['service-areas', '*service'],
    owner: 'Speedy Bat Operations',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'restricted-public-form',
    approvedWording: 'Do not submit health information, patient names, identification numbers, financial account data, access credentials, or detailed descriptions of valuables through the public form or SMS.',
    status: 'verified',
    evidenceRef: 'Privacy minimization requirement supplied in the 2026-08-12 implementation brief.',
    applicableRoutes: ['*'],
    owner: 'Privacy and Engineering',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'regulated-medical-handling',
    approvedWording: '',
    status: 'prohibited',
    evidenceRef: 'No approved training, packaging, temperature-control, or regulated-material evidence is recorded.',
    applicableRoutes: [],
    owner: 'Operations and Legal',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'blanket-insurance-or-security',
    approvedWording: '',
    status: 'prohibited',
    evidenceRef: 'No approved universal insurance, screening, access, or custody evidence is recorded.',
    applicableRoutes: [],
    owner: 'Operations and Legal',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  },
  {
    id: 'guaranteed-pickup-or-filing',
    approvedWording: '',
    status: 'prohibited',
    evidenceRef: 'No approved universal pickup-time, filing, service-of-process, or evidentiary guarantee is recorded.',
    applicableRoutes: [],
    owner: 'Operations and Legal',
    lastVerified: LAST_VERIFIED,
    reviewDate: REVIEW_DATE
  }
];

export const claimById = Object.fromEntries(claims.map(claim => [claim.id, claim])) as Record<string, ClaimRecord>;
