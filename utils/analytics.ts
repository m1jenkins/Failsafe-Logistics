import { normalizeSlug, routeBySlug } from '../data/routes';

export interface AnalyticsContext {
  route_id: string;
  page_type: string;
  service_id: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

interface AnalyticsContextOverrides {
  routeId?: string;
  pageType?: string;
  serviceId?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __speedyBatContactTrackingInstalled?: boolean;
  }
}

export const getAnalyticsContext = (
  overrides: AnalyticsContextOverrides = {}
): AnalyticsContext => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      route_id: overrides.routeId ?? '',
      page_type: overrides.pageType ?? 'unknown',
      service_id: overrides.serviceId ?? '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      referrer: ''
    };
  }

  const routeId = overrides.routeId ?? normalizeSlug(window.location.pathname);
  const route = routeBySlug[routeId];
  const pageType = overrides.pageType ?? route?.kind ?? 'unknown';
  const serviceId = overrides.serviceId
    ?? route?.serviceId
    ?? (pageType === 'service' ? routeId : '');
  const searchParams = new URLSearchParams(window.location.search);
  let referrer = '';

  if (document.referrer) {
    try {
      referrer = new URL(document.referrer).origin;
    } catch {
      // Ignore malformed referrers instead of forwarding an untrusted value.
    }
  }

  return {
    route_id: routeId,
    page_type: pageType,
    service_id: serviceId,
    utm_source: searchParams.get('utm_source') ?? '',
    utm_medium: searchParams.get('utm_medium') ?? '',
    utm_campaign: searchParams.get('utm_campaign') ?? '',
    referrer
  };
};

const sendEvent = (
  eventName: 'generate_lead' | 'click_call' | 'click_text',
  parameters: AnalyticsContext & { contact_channel?: 'call' | 'text' }
) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', eventName, parameters);
  } catch {
    // Analytics must never interrupt navigation or a confirmed form success.
  }
};

export const trackGenerateLead = (context: AnalyticsContext) => {
  sendEvent('generate_lead', context);
};

/**
 * Installs one delegated listener for every current and future tel:/sms: link.
 * The window sentinel keeps module re-evaluation and React StrictMode from
 * registering duplicate listeners.
 */
export const installContactClickTracking = () => {
  if (
    typeof window === 'undefined'
    || typeof document === 'undefined'
    || window.__speedyBatContactTrackingInstalled
  ) {
    return;
  }

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const anchor = event.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="sms:"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href')?.toLowerCase() ?? '';
    if (href.startsWith('tel:')) {
      sendEvent('click_call', {
        ...getAnalyticsContext(),
        contact_channel: 'call'
      });
    } else if (href.startsWith('sms:')) {
      sendEvent('click_text', {
        ...getAnalyticsContext(),
        contact_channel: 'text'
      });
    }
  });

  window.__speedyBatContactTrackingInstalled = true;
};
