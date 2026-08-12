import { CoverageArea, RedirectDefinition } from '../types';

const AUSTIN_NEIGHBORHOODS = [
  ['downtown-austin', 'Downtown Austin'],
  ['south-austin', 'South Austin'],
  ['east-austin', 'East Austin'],
  ['mueller', 'Mueller'],
  ['west-campus', 'West Campus'],
  ['hyde-park', 'Hyde Park']
] as const;

const METRO_REQUESTS = [
  ['west-lake-hills', 'West Lake Hills'],
  ['cedar-park', 'Cedar Park'],
  ['round-rock', 'Round Rock'],
  ['georgetown', 'Georgetown'],
  ['pflugerville', 'Pflugerville'],
  ['lakeway', 'Lakeway'],
  ['bee-cave', 'Bee Cave'],
  ['kyle', 'Kyle'],
  ['leander', 'Leander'],
  ['liberty-hill', 'Liberty Hill'],
  ['lago-vista', 'Lago Vista'],
  ['taylor', 'Taylor'],
  ['hutto', 'Hutto'],
  ['buda', 'Buda'],
  ['bastrop', 'Bastrop'],
  ['elgin', 'Elgin'],
  ['san-marcos', 'San Marcos']
] as const;

const AUSTIN_ORIGIN_DESTINATIONS = [
  ['salado', 'Salado'],
  ['killeen', 'Killeen'],
  ['temple', 'Temple'],
  ['new-braunfels', 'New Braunfels']
] as const;

export const coverageAreas: CoverageArea[] = [
  ...AUSTIN_NEIGHBORHOODS.map(([id, name]) => ({
    id,
    name,
    kind: 'austin-neighborhood' as const,
    pickupEligibility: 'Austin pickup requests are reviewed by dispatch for each job.',
    responseCopy: `${name} is covered by the Austin section of the service-area hub.`,
    portfolioAction: 'redirect' as const,
    redirectDestination: '/service-areas#austin'
  })),
  ...METRO_REQUESTS.map(([id, name]) => ({
    id,
    name,
    kind: 'metro-request' as const,
    pickupEligibility: 'Pickup eligibility and response timing must be confirmed by dispatch.',
    responseCopy: `${name} requests are evaluated from the Austin dispatch area without implying a staffed local fleet.`,
    portfolioAction: 'redirect' as const,
    redirectDestination: '/service-areas#coverage'
  })),
  ...AUSTIN_ORIGIN_DESTINATIONS.map(([id, name]) => ({
    id,
    name,
    kind: 'austin-origin-destination' as const,
    pickupEligibility: 'Presented as an Austin-origin destination, not a routine local pickup market.',
    responseCopy: `${name} may be quoted as a destination for an accepted Austin-origin job.`,
    portfolioAction: 'redirect' as const,
    redirectDestination: '/service-areas#destinations'
  }))
];

export const coverageRedirects: RedirectDefinition[] = coverageAreas.map(area => ({
  source: `/${area.id}`,
  destination: area.redirectDestination,
  permanent: true
}));

export const coverageAreaById = Object.fromEntries(
  coverageAreas.map(area => [area.id, area])
) as Record<string, CoverageArea>;
