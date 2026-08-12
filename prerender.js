/** Build-time HTML rendering, metadata, schema, sitemap, and redirect output. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const SSR_DIR = path.join(__dirname, 'dist-ssr');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://speedybat.com';

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceMeta(html, name, content, property = false) {
  const attribute = property ? 'property' : 'name';
  const pattern = new RegExp(`<meta ${attribute}="${name}"[\\s\\S]*?\\/>`, 'g');
  return html.replace(pattern, `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`);
}

function jsonLdTag(schema, id) {
  return `<script id="${id}" type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function canonicalUrl(slug) {
  return slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
}

function renderDocument(template, route, html, schemas) {
  const url = canonicalUrl(route.slug);
  let output = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  output = replaceMeta(output, 'description', route.description);
  output = replaceMeta(output, 'og:title', route.title, true);
  output = replaceMeta(output, 'og:description', route.description, true);
  output = replaceMeta(output, 'og:url', url, true);
  output = replaceMeta(output, 'twitter:title', route.title);
  output = replaceMeta(output, 'twitter:description', route.description);

  if (schemas.length > 0) {
    const tags = schemas.map(({ schema, id }) => jsonLdTag(schema, id)).join('\n  ');
    output = output.replace('</head>', `  ${tags}\n</head>`);
  }

  return output;
}

function renderNotFoundDocument(template, html) {
  let output = template
    .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found | Speedy Bat Couriers</title>')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\n?/, '')
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  output = replaceMeta(output, 'description', 'The requested Speedy Bat page was not found. Use the service directory or contact Austin dispatch.');
  output = replaceMeta(output, 'robots', 'noindex, follow');
  output = replaceMeta(output, 'og:title', 'Page Not Found | Speedy Bat Couriers', true);
  output = output.replace(/<meta property="og:url"[^>]*\/?>\n?/, '');
  return output;
}

function generateSitemap(routes) {
  const urls = routes.map(route => `  <url>\n    <loc>${canonicalUrl(route.slug)}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function generateRedirects(routes, redirects) {
  const lines = [
    'https://www.speedybat.com/*  https://speedybat.com/:splat  308!',
    ...redirects.map(redirect => `${redirect.source}  ${redirect.destination}  308!`),
    ...routes.filter(route => route.slug).map(route => `/${route.slug}/  /${route.slug}  308!`)
  ];
  return `${lines.join('\n')}\n`;
}

async function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error('dist/index.html not found. Run the Vite client build first.');
  }

  const entryPath = path.join(SSR_DIR, 'prerender-entry.js');
  if (!fs.existsSync(entryPath)) {
    throw new Error('dist-ssr/prerender-entry.js not found. Run the SSR build first.');
  }

  const {
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildHomepageSchema,
    buildServiceSchema,
    faqItems,
    ORGANIZATION_ID,
    redirects,
    renderNotFound,
    renderRoute,
    routeManifest,
    services
  } = await import(entryPath);

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  for (const route of routeManifest) {
    const schemas = [];
    if (route.kind === 'home') {
      schemas.push({ schema: buildHomepageSchema(), id: 'jsonld-homepage' });
    } else {
      schemas.push({ schema: buildBreadcrumbSchema(route.slug, route.label), id: 'jsonld-breadcrumb' });
    }
    if (route.kind === 'service' && route.serviceId) {
      schemas.push({ schema: buildServiceSchema(services[route.serviceId]), id: 'jsonld-service' });
    }
    if (route.kind === 'faq') {
      schemas.push({ schema: buildFaqSchema(faqItems), id: 'jsonld-faq' });
    }

    const outputDir = route.slug ? path.join(DIST_DIR, route.slug) : DIST_DIR;
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(outputDir, 'index.html'),
      renderDocument(template, route, renderRoute(route.slug), schemas)
    );
  }

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap(routeManifest));
  fs.writeFileSync(path.join(DIST_DIR, '_redirects'), generateRedirects(routeManifest, redirects));
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), renderNotFoundDocument(template, renderNotFound()));
  fs.writeFileSync(
    path.join(DIST_DIR, 'seo-manifest.json'),
    `${JSON.stringify({ routes: routeManifest, redirects, organizationId: ORGANIZATION_ID }, null, 2)}\n`
  );

  fs.rmSync(SSR_DIR, { recursive: true, force: true });
  console.log(`Pre-rendered ${routeManifest.length} canonical pages, ${redirects.length} redirects, sitemap.xml, and 404.html.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
