/**
 * prerender.js — Static HTML Pre-rendering for SEO
 *
 * Runs AFTER `vite build` + `vite build --ssr prerender-entry.tsx`.
 * For every route (homepage, locations, services, static pages) it:
 * 1. Renders the real React page to HTML (via the SSR bundle) into #root
 * 2. Sets the correct <title>, meta description, canonical, OG/Twitter tags
 * 3. Injects route-specific JSON-LD (location/service schema, breadcrumbs,
 *    FAQ schema on /faq only)
 * 4. Writes dist/<route>/index.html
 * It also writes dist/sitemap.xml, dist/404.html, and dist/_redirects.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const SSR_DIR = path.join(__dirname, 'dist-ssr');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://speedybat.com';

// ── Helpers ────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceMultilineMetaTag(html, name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  const regex = new RegExp(`<meta ${attr}="${name}"[\\s\\S]*?/>`, 'g');
  const replacement = `<meta ${attr}="${name}" content="${escapeHtml(content)}" />`;
  return html.replace(regex, replacement);
}

function jsonLdTag(schema, id) {
  const idAttr = id ? ` id="${id}"` : '';
  return `<script${idAttr} type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function prerenderRoute(template, { slug, title, description, html, schemas, robots }) {
  let out = template;

  // The homepage LocalBusiness schema belongs on the homepage only —
  // location/service pages carry their own route-specific schema.
  if (slug) {
    out = out.replace(/ *<!-- Structured Data: Local Business -->[\s\S]*?<\/script>\n/, '');
  }

  // Title + meta
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = replaceMultilineMetaTag(out, 'description', description);
  out = replaceMultilineMetaTag(out, 'og:title', title, true);
  out = replaceMultilineMetaTag(out, 'og:description', description, true);
  out = replaceMultilineMetaTag(out, 'twitter:title', title);
  out = replaceMultilineMetaTag(out, 'twitter:description', description);

  if (robots) {
    out = replaceMultilineMetaTag(out, 'robots', robots);
  }

  // Canonical + og:url
  const url = slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`
  );
  out = replaceMultilineMetaTag(out, 'og:url', url, true);

  // Route-specific JSON-LD before </head>
  if (schemas && schemas.length > 0) {
    const tags = schemas.map(s => jsonLdTag(s.schema, s.id)).join('\n  ');
    out = out.replace('</head>', `  ${tags}\n</head>`);
  }

  // Server-rendered markup into #root
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  return out;
}

/**
 * The 404 page is a host-level fallback (served for any unmatched path with a
 * real HTTP 404 status on Vercel/Netlify/Cloudflare Pages/GitHub Pages), not a
 * normal route: it must not be indexable and has no canonical URL of its own.
 */
function prerenderNotFound(template, html) {
  let out = prerenderRoute(template, {
    slug: '404-not-found', // dummy slug, only used to strip the homepage schema; never a real path
    title: '404: Page Not Found | Speedy Bat Couriers',
    description: "The page you're looking for doesn't exist. Text (512) 910-4938 for 24/7 courier dispatch in Austin, TX.",
    html,
    schemas: [],
    robots: 'noindex, follow'
  });
  // Neither a canonical link nor og:url apply to a non-indexable utility page
  // served for many different bad paths — drop both rather than leave them
  // pointing at the internal dummy slug prerenderRoute() built the rest of
  // this page's URL-based tags from.
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\n?/, '');
  out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/?>\n?/, '');
  return out;
}

/**
 * Static hosts that use Netlify-style _redirects (Netlify, Cloudflare Pages,
 * Render, etc.) don't collapse /route/ and /route to one canonical URL the
 * way Vercel's `trailingSlash` config does — so every route gets an explicit
 * 301 from its trailing-slash form to the canonical no-slash form used by
 * every canonical tag, sitemap entry, and JSON-LD @id/url in this build.
 */
function generateRedirects(routes) {
  const lines = routes
    .filter(({ slug }) => slug) // homepage has no distinct trailing-slash form to redirect
    .map(({ slug }) => `/${slug}/  /${slug}  301!`);
  return lines.join('\n') + '\n';
}

// No <lastmod>/<changefreq>/<priority>: Google documents that it ignores all
// three when it can't verify them, and stamping every URL with the build date
// on every deploy (the previous behavior) is worse than omitting them — it
// actively misreports every page as having just changed.
function generateSitemap(routes) {
  const urls = routes.map(({ slug }) => `  <url>
    <loc>${slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`}</loc>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  console.log('🦇 Speedy Bat Pre-renderer: Starting...\n');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const entryPath = path.join(SSR_DIR, 'prerender-entry.js');
  if (!fs.existsSync(entryPath)) {
    console.error('❌ dist-ssr/prerender-entry.js not found. Run `vite build --ssr prerender-entry.tsx --outDir dist-ssr` first.');
    process.exit(1);
  }

  const {
    renderRoute, renderNotFound, locations, services, faqItems,
    buildLocationSchema, buildServiceSchema, buildBreadcrumbSchema
  } = await import(entryPath);

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Assemble route table
  const routes = [];

  // Homepage (overwrites dist/index.html in place)
  routes.push({
    slug: '',
    title: 'Courier Austin TX | 24/7 Same-Day & Rush Delivery | Speedy Bat',
    description: "Speedy Bat Couriers — Austin's 24/7 courier for same-day delivery, air hand carry, hot shot & emergency logistics. Pickup in 30-60 min. Text (512) 910-4938.",
    schemas: []
  });

  for (const slug of Object.keys(services)) {
    const service = services[slug];
    routes.push({
      slug,
      title: service.title,
      description: service.metaDescription,
      schemas: [
        { schema: buildServiceSchema(service), id: 'jsonld-service-schema' },
        { schema: buildBreadcrumbSchema(slug, service.name), id: 'jsonld-breadcrumb' }
      ]
    });
  }

  for (const slug of Object.keys(locations)) {
    const location = locations[slug];
    routes.push({
      slug,
      title: location.title,
      description: location.metaDescription,
      schemas: [
        { schema: buildLocationSchema(location), id: 'jsonld-location-schema' },
        { schema: buildBreadcrumbSchema(slug, `${location.name} Courier Service`), id: 'jsonld-breadcrumb' }
      ]
    });
  }

  routes.push({
    slug: 'faq',
    title: 'FAQ | Speedy Bat Couriers — Austin TX Courier Service',
    description: 'Frequently asked questions about Speedy Bat Couriers. Learn about our same-day delivery, air hand carry, pricing, service areas, and 24/7 courier operations in Austin, Texas.',
    schemas: [
      {
        schema: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': faqItems.map(item => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
          }))
        }
      },
      { schema: buildBreadcrumbSchema('faq', 'FAQ'), id: 'jsonld-breadcrumb' }
    ]
  });

  routes.push({
    slug: 'about',
    title: 'About | Speedy Bat Couriers — Austin TX Courier Service',
    description: "Learn about Speedy Bat Couriers — Austin, Texas's trusted 24/7 courier service for time-critical, same-day, and emergency deliveries across Central Texas and nationwide.",
    schemas: [{ schema: buildBreadcrumbSchema('about', 'About'), id: 'jsonld-breadcrumb' }]
  });

  // Render + write every route
  let count = 0;
  for (const route of routes) {
    const html = renderRoute(route.slug);
    const out = prerenderRoute(template, { ...route, html });

    const outputDir = route.slug ? path.join(DIST_DIR, route.slug) : DIST_DIR;
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), out);
    count++;
  }

  // Sitemap
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap(routes));

  // 404 page — a flat dist/404.html (not a route subdirectory) so Vercel,
  // Netlify, Cloudflare Pages, and GitHub Pages all auto-serve it with a real
  // HTTP 404 status for any unmatched path.
  fs.writeFileSync(
    path.join(DIST_DIR, '404.html'),
    prerenderNotFound(template, renderNotFound())
  );

  // _redirects — trailing-slash cleanup for Netlify-style static hosts.
  // Vercel gets the same behavior from vercel.json's trailingSlash setting.
  fs.writeFileSync(path.join(DIST_DIR, '_redirects'), generateRedirects(routes));

  // Clean up the throwaway SSR bundle
  fs.rmSync(SSR_DIR, { recursive: true, force: true });

  console.log(`✅ Pre-rendered ${count} pages with full HTML + sitemap.xml`);
  console.log(`📁 Output: ${DIST_DIR}/`);
}

main();
