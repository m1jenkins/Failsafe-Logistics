# Priority Service Page Cohort Experiment

## Decision

- Experiment ID: `service-evidence-hierarchy-v1`
- Owner: Marketing with Speedy Bat Operations review
- Hypothesis: replacing unsupported promises with explicit eligibility, limits, process, exceptions, contextual links, and job-specific qualification will improve accurate nonbrand retrieval and qualified inquiry quality without harming conversion.
- Claim class before test: Hypothesis
- Primary KPI: qualified nonbrand leads per eligible landing-page session.
- Secondary KPIs: nonbrand impressions, query-family coverage, valid-run citation rate, citation factual accuracy, and identifiable AI referrals.
- Minimum decision threshold: not set until baseline variance and lead volume are known.
- Decision rule: declare after the pre-period, post-period, data-quality checks, and guardrail limits are fixed; do not infer causality from one before/after observation.

## Cohorts

- Treatment pages:
  - `/hot-shot-expedited-freight`
  - `/airport-recovery-next-flight-out`
  - `/manufacturing-line-down-delivery`
- Candidate control pages:
  - `/same-day-on-demand-courier`
  - `/long-distance-intercity-courier`
  - `/scheduled-dedicated-routes`
- Matching dimensions: pre-period impressions, sessions, business intent, current position distribution, conversion volume, route age, and seasonality.
- Exclusions: branded-only queries, invalid/spam inquiries, pages affected by unrelated migrations, and periods with broken tracking.
- Cohort-overlap check: confirm no treatment page is also a redirect target for another content experiment.
- Sample-size rationale: pending baseline exports and normal-variance analysis.

## Treatment

- Exact change: evidence-ready hierarchy of direct answer → eligibility and limits → process → supported scope → exceptions → related decisions → CTA, plus stable provider identity and contextual links.
- Rollout method: deploy the three treatment pages together and annotate the release in analytics and search reporting.
- Dependencies: Operations-approved facts, working analytics events, canonical/sitemap regression pass, and policy review.
- Implementation verification: generated HTML, schema parse, claim scan, link crawl, rendered desktop/mobile QA, and analytics DebugView.
- Reversal method: restore the previous supported treatment content from version control. Never restore prohibited claims.

## Measurement

- Data sources: GSC, GA4, CRM/dispatch qualification, monthly prompt panel, and server/CDN logs when available.
- Pre-period: pending baseline selection.
- Launch date: pending production deployment.
- Post-period: pending baseline volume and indexing latency.
- Observation cadence: weekly diagnostics; monthly decision review.
- Segments: page, query family, brand/nonbrand, device, market, source/medium, AI referrer, and lead qualification.
- Guardrails: indexation/canonical selection, accessibility, factual accuracy, form completion, qualified-lead conversion, security/privacy, and site performance.

## Confounder log

- Seasonality: record holidays, weather events, manufacturing demand changes, and airport disruptions.
- Ranking-system updates: record only confirmed updates from primary platform sources.
- Site releases: record route, redirect, schema, analytics, and form changes.
- Promotions or demand shifts: record pricing, sales, partnership, or GBP activity.
- Concurrent content changes: record service, hub, FAQ, About, and authority-asset changes.
- Tracking changes or outages: record GA4, form endpoint, CRM, consent, or hosting issues.

## Stop and rollback rules

- Indexation: stop or roll back an affected cohort if canonical/index eligibility breaches its pre-declared limit.
- Conversion: stop or investigate if qualified-lead conversion breaches its limit beyond expected variance.
- Accessibility: stop for a material keyboard, screen-reader, contrast, focus, or form error.
- Factual/compliance: stop immediately for an unsupported or misleading claim.
- Security/privacy: stop immediately if sensitive data is requested, leaked to analytics, or exposed publicly.
- Result options: Continue / Iterate / Stop / Roll back / Inconclusive.
