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
 * It also generates dist/sitemap.xml with the build date as lastmod.
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

function breadcrumbSchema(slug, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${BASE_URL}/` },
      { '@type': 'ListItem', 'position': 2, 'name': name, 'item': `${BASE_URL}/${slug}` }
    ]
  };
}

function prerenderRoute(template, { slug, title, description, html, schemas }) {
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

function generateSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map(({ slug, priority, changefreq }) => `  <url>
    <loc>${slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
    renderRoute, locations, services, faqItems,
    buildLocationSchema, buildServiceSchema
  } = await import(entryPath);

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Assemble route table
  const routes = [];

  // Homepage (overwrites dist/index.html in place)
  routes.push({
    slug: '',
    title: 'Courier Austin TX | 24/7 Same-Day & Rush Delivery | Speedy Bat',
    description: "Speedy Bat Couriers — Austin's 24/7 courier for same day delivery, air hand carry, hot shot & emergency logistics. Rush pickup in 30-60 min. Text (512) 910-4938.",
    schemas: [],
    priority: '1.0',
    changefreq: 'weekly'
  });

  for (const slug of Object.keys(services)) {
    const service = services[slug];
    routes.push({
      slug,
      title: service.title,
      description: service.metaDescription,
      schemas: [
        { schema: buildServiceSchema(service), id: 'jsonld-service-schema' },
        { schema: breadcrumbSchema(slug, service.name) }
      ],
      priority: '0.8',
      changefreq: 'weekly'
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
        { schema: breadcrumbSchema(slug, `${location.name} Courier Service`) }
      ],
      priority: '0.6',
      changefreq: 'weekly'
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
      { schema: breadcrumbSchema('faq', 'FAQ') }
    ],
    priority: '0.5',
    changefreq: 'monthly'
  });

  routes.push({
    slug: 'about',
    title: 'About | Speedy Bat Couriers — Austin TX Courier Service',
    description: "Learn about Speedy Bat Couriers — Austin, Texas's trusted 24/7 courier service for time-critical, same-day, and emergency deliveries across Central Texas and nationwide.",
    schemas: [{ schema: breadcrumbSchema('about', 'About') }],
    priority: '0.5',
    changefreq: 'monthly'
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

  // Clean up the throwaway SSR bundle
  fs.rmSync(SSR_DIR, { recursive: true, force: true });

  console.log(`✅ Pre-rendered ${count} pages with full HTML + sitemap.xml`);
  console.log(`📁 Output: ${DIST_DIR}/`);
}

main();
