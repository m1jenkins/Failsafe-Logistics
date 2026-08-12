# Speedy Bat Search and AI Visibility Baseline

Status: account exports not available in this repository. Populate this file before using post-launch movement as evidence of impact.

## Business outcome

- Primary outcome: qualified urgent B2B inquiries originating in the Austin metro.
- Priority services: hot shot and expedited freight, airport recovery/NFO/AOG, manufacturing line-down, air hand carry/OBC, legal-document delivery, high-value secure-item transport, and same-day courier requests.
- Qualified-lead definition: to be agreed by Operations and the CRM owner before reporting.
- Conversion value: unknown until CRM outcomes and revenue attribution are connected.

## Baseline exports

| Source | Required export | Date range | Owner | Status | Limitation |
| --- | --- | --- | --- | --- | --- |
| Google Search Console | Page, query, country, device, search appearance, indexing, submitted/selected canonical | At least the longest comparable pre-launch period available | Marketing | Not available | Google AI-feature traffic is included in Web search reporting rather than isolated as a separate performance report. |
| GA4 | Landing pages, sessions, source/medium, referrer, `generate_lead`, `click_call`, and `click_text` | Same pre-launch period | Analytics | Event implementation added; historical event baseline unavailable | Referrer and UTM attribution cannot measure every no-click or assisted interaction. |
| Google Business Profile | Views, searches, calls, website actions, messages, and profile completeness | Same pre-launch period | Marketing | Not available | Confirm that one service-area profile represents the Austin business and that the address is hidden if there is no staffed storefront. |
| Bing Webmaster Tools | Coverage, crawl, queries, pages, and selected canonical diagnostics | Same pre-launch period | Marketing | Not available | Dashboard access required. |
| Server/CDN logs | Verified search and AI crawler fetches by user agent, URL, status, and date | Same pre-launch period | Engineering | Not available | User-agent strings must be verified where the platform publishes a method. |
| CRM/dispatch | Lead route, service, qualification, quote, win/loss, revenue, and reason codes | Same pre-launch period | Operations | Not available | Do not place customer-sensitive details in this repository. |
| Backlink/citation source | Referring domains, destination URLs, anchor/context, and legitimacy review | Current snapshot | Marketing | Not available | Do not treat bulk directory counts as authority. |

## KPI funnel

| Gate | KPI | Baseline | Cadence | Owner | Guardrail |
| --- | --- | --- | --- | --- | --- |
| Crawl | Successful verified crawler fetches to canonical routes | Unknown | Weekly after launch | Engineering | No new critical 4xx/5xx or robots blocks. |
| Index/canonical | Indexed canonical routes / submitted routes | Unknown | Weekly after launch | Marketing | Redirect sources remain excluded; selected canonical stays apex. |
| Traditional visibility | Qualified nonbrand impressions, clicks, query families, and landing pages | Unknown | Weekly/monthly | Marketing | Branded traffic is reported separately. |
| AI citation | Valid-run citation rate and factual accuracy by query family/platform | Unknown | Monthly | Marketing | Never call citation order a rank. |
| AI referral | Sessions and qualified actions attributed to identifiable AI referrals | Unknown | Monthly | Analytics | Label unattributed/no-click influence as unknown. |
| Conversion | Confirmed qualified leads and accepted jobs by route/service/source | Unknown | Weekly/monthly | Operations | Invalid, duplicate, spam, and unsupported requests are separated. |

## Launch annotations

- Record deployment date, redirect activation, analytics changes, content cohort, outages, demand shifts, and confirmed search-system updates.
- Establish pre-period variance before setting numeric continuation or rollback thresholds.
- Roll back an affected treatment or redirect cohort if indexation, accessibility, factual accuracy, or qualified-lead conversion breaches a pre-declared guardrail. Never restore unsupported claims as a rollback.
