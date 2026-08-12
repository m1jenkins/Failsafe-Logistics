import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://speedybat.com';
const BASE_HOSTS = new Set(['speedybat.com', 'www.speedybat.com']);
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(SCRIPT_DIR, '..');
const DIST_DIR = path.join(PROJECT_DIR, 'dist');
const MANIFEST_PATH = path.join(DIST_DIR, 'seo-manifest.json');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const NOT_FOUND_PATH = path.join(DIST_DIR, '404.html');
const STATIC_REDIRECTS_PATH = path.join(DIST_DIR, '_redirects');
const VERCEL_CONFIG_PATH = path.join(PROJECT_DIR, 'vercel.json');

const errors = [];

const forbiddenClaims = [
  { label: '$100K cargo coverage', pattern: /\$100(?:k|,?000)\s+(?:cargo\s+)?coverage/i },
  { label: 'HIPAA compliant', pattern: /\bhipaa[\s-]+compliant\b/i },
  { label: 'HIPAA-trained', pattern: /\bhipaa[\s-]+trained\b/i },
  { label: 'OSHA compliant', pattern: /\bosha[\s-]+compliant\b/i },
  { label: 'UN3373 transport', pattern: /\bun\s*3373\s+(?:transport|handling|certif(?:ied|ication))\b/i },
  { label: 'cold-chain capability', pattern: /\bcold[\s-]+chain\s+(?:capability|certif(?:ied|ication)|logistics|transport)\b/i },
  { label: 'organ transport', pattern: /\borgan[\s-]+transport\b/i },
  { label: 'blood transport', pattern: /\bblood[\s-]+transport\b/i },
  { label: 'TSA-cleared', pattern: /\btsa[\s-]+clear(?:ed|ance)\b/i },
  { label: 'court-admissible', pattern: /\bcourt[\s-]+admissible\b/i },
  { label: 'court-grade', pattern: /\bcourt[\s-]+grade\b/i },
  { label: 'pickup in 30-60', pattern: /\bpickup\s+in\s+30\s*(?:-|to)\s*60\b/i },
  { label: '30-60 Min Pickup', pattern: /\b30\s*(?:-|to)\s*60\s+min(?:ute)?s?\s+pickup\b/i },
  { label: 'customs clearing', pattern: /\bcustoms\s+clear(?:ing|ance)\b/i },
  { label: 'background-checked', pattern: /\bbackground[\s-]+check(?:ed|s)?\b/i },
  { label: 'process serving', pattern: /\bprocess\s+serv(?:ing|ice)\b/i },
  { label: 'service of process', pattern: /\bservice\s+of\s+process\b/i }
];

function addError(message) {
  errors.push(message);
}

function fatal(message) {
  console.error(`SEO regression setup failed: ${message}`);
  process.exit(1);
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    fatal(`${path.relative(PROJECT_DIR, filePath)} could not be read: ${error.message}`);
  }
}

function readJson(filePath) {
  const source = readText(filePath);
  try {
    return JSON.parse(source);
  } catch (error) {
    fatal(`${path.relative(PROJECT_DIR, filePath)} is not valid JSON: ${error.message}`);
  }
}

function decodeEntities(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    ndash: '–',
    mdash: '—',
    quot: '"'
  };

  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    const normalized = code.toLowerCase();
    if (normalized.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }
    if (normalized.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }
    return named[normalized] ?? entity;
  });
}

function normalizeComparable(value) {
  return decodeEntities(value).replace(/\s+/g, ' ').trim();
}

function normalizeSearchText(value) {
  return decodeEntities(value)
    .normalize('NFKC')
    .replace(/[‐‑‒–—―−]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAttributes(tag) {
  const body = tag
    .replace(/^<\s*\/?\s*[^\s>]+/i, '')
    .replace(/\/?>\s*$/i, '');
  const attributes = {};
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of body.matchAll(attributePattern)) {
    const name = match[1].toLowerCase();
    attributes[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }

  return attributes;
}

function openingTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
}

function titleValues(html) {
  return [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)]
    .map(match => normalizeComparable(match[1].replace(/<[^>]*>/g, ' ')));
}

function metaValues(html, attributeName, attributeValue) {
  const expected = attributeValue.toLowerCase();
  return openingTags(html, 'meta')
    .map(parseAttributes)
    .filter(attributes => attributes[attributeName]?.toLowerCase() === expected)
    .map(attributes => normalizeComparable(attributes.content ?? ''));
}

function canonicalValues(html) {
  return openingTags(html, 'link')
    .map(parseAttributes)
    .filter(attributes => (attributes.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'))
    .map(attributes => normalizeComparable(attributes.href ?? ''));
}

function robotsIncludesNoindex(html) {
  return metaValues(html, 'name', 'robots')
    .some(value => value.toLowerCase().split(/[\s,]+/).includes('noindex'));
}

function canonicalUrl(slug) {
  return slug === '' ? `${BASE_URL}/` : `${BASE_URL}/${slug}`;
}

function routeFile(slug) {
  return slug === ''
    ? path.join(DIST_DIR, 'index.html')
    : path.join(DIST_DIR, ...slug.split('/'), 'index.html');
}

function normalizePathname(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Keep the original value so the invalid target is reported below.
  }
  return decoded.replace(/^\/+/, '').replace(/\/+$/, '');
}

function walkFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files;
}

function htmlRouteFromFile(filePath) {
  const relative = path.relative(DIST_DIR, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '';
  if (relative.endsWith('/index.html')) return relative.slice(0, -'/index.html'.length);
  if (relative.endsWith('.html')) return relative.slice(0, -'.html'.length);
  return null;
}

function extractJsonLd(html, pageLabel) {
  const values = [];
  const rawValues = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let scriptNumber = 0;

  for (const match of html.matchAll(pattern)) {
    const attributes = parseAttributes(`<script${match[1]}>`);
    if ((attributes.type ?? '').toLowerCase() !== 'application/ld+json') continue;
    scriptNumber += 1;
    rawValues.push(match[2]);
    try {
      values.push(JSON.parse(match[2]));
    } catch (error) {
      addError(`${pageLabel}: JSON-LD script ${scriptNumber} does not parse (${error.message})`);
    }
  }

  return { values, rawValues };
}

function collectSchemaNodes(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaNodes(item, result);
    return result;
  }
  if (!value || typeof value !== 'object') return result;

  result.push(value);
  for (const child of Object.values(value)) collectSchemaNodes(child, result);
  return result;
}

function hasSchemaType(node, expectedType) {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  return types.includes(expectedType);
}

function hrefValues(html) {
  return openingTags(html, 'a')
    .map(parseAttributes)
    .filter(attributes => Object.hasOwn(attributes, 'href'))
    .map(attributes => attributes.href.trim());
}

function internalTargetSlug(href, pageSlug, pageLabel, reportErrors = true) {
  if (href === '' || href.startsWith('#')) return href === '' ? pageSlug : null;
  if (/^(?:tel|sms|mailto):/i.test(href)) return null;

  let target;
  try {
    target = new URL(href, canonicalUrl(pageSlug));
  } catch {
    if (reportErrors) addError(`${pageLabel}: malformed link target "${href}"`);
    return null;
  }

  if (!['http:', 'https:'].includes(target.protocol)) {
    if (reportErrors) addError(`${pageLabel}: unsupported link scheme in "${href}"`);
    return null;
  }
  if (!BASE_HOSTS.has(target.hostname.toLowerCase())) return null;

  if (target.origin !== BASE_URL && /^[a-z][a-z\d+.-]*:\/\//i.test(href) && reportErrors) {
    addError(`${pageLabel}: internal absolute link must use ${BASE_URL} (found "${href}")`);
  }

  return normalizePathname(target.pathname);
}

function validateLinks(html, pageSlug, pageLabel, routeSlugs) {
  for (const href of hrefValues(html)) {
    const targetSlug = internalTargetSlug(href, pageSlug, pageLabel);
    if (targetSlug === null) continue;
    if (!routeSlugs.has(targetSlug)) {
      addError(`${pageLabel}: internal document link "${href}" does not resolve to a canonical route`);
    }
  }
}

function validatePolicyLinks(html, pageSlug, pageLabel, routeSlugs) {
  if (!/<form\b/i.test(html)) return;

  const linkedSlugs = new Set(
    hrefValues(html)
      .map(href => internalTargetSlug(href, pageSlug, pageLabel, false))
      .filter(slug => slug !== null && routeSlugs.has(slug))
  );

  for (const policySlug of ['privacy', 'terms']) {
    if (!linkedSlugs.has(policySlug)) {
      addError(`${pageLabel}: page contains a form but no link to /${policySlug}`);
    }
  }
}

function isNegatedOrQuestion(text, start, end) {
  const previousBoundaries = [
    text.lastIndexOf('.', start - 1),
    text.lastIndexOf('!', start - 1),
    text.lastIndexOf('?', start - 1),
    text.lastIndexOf('\n', start - 1)
  ];
  const sentenceStart = Math.max(...previousBoundaries) + 1;
  const nextBoundaries = ['.', '!', '?', '\n']
    .map(character => text.indexOf(character, end))
    .filter(index => index !== -1);
  const sentenceEnd = nextBoundaries.length > 0 ? Math.min(...nextBoundaries) : text.length;
  const terminator = text[sentenceEnd] ?? '';

  if (terminator === '?') return true;

  const prefix = text.slice(sentenceStart, start);
  const suffix = text.slice(end, Math.min(sentenceEnd + 1, end + 120));
  // A contrast starts a new claim clause: "not X, but Y is available" must not
  // allow the earlier negation to suppress an affirmative match for Y.
  const activePrefixClause = prefix.split(/\b(?:but|however|yet)\b/i).at(-1) ?? prefix;
  const prefixNegation = /\b(?:not|no|never|without|cannot|can't|doesn't|don't|didn't|isn't|aren't|wasn't|weren't|won't|wouldn't|couldn't|shouldn't|hasn't|haven't|hadn't)\b[^.!?]*$/i;
  const suffixNegation = /^\s*[^.!?]{0,80}\b(?:(?:is|are|was|were|does|do|did|has|have|will|would|can|could|should)\s+not|isn't|aren't|wasn't|weren't|doesn't|don't|cannot|can't|won't|wouldn't)\b/i;

  return prefixNegation.test(activePrefixClause) || suffixNegation.test(suffix);
}

function firstAffirmativeMatch(value, pattern) {
  const text = normalizeSearchText(value);
  let offset = 0;

  while (offset < text.length) {
    const expression = new RegExp(pattern.source, pattern.flags.replace('g', ''));
    const match = expression.exec(text.slice(offset));
    if (!match) return null;

    const start = offset + match.index;
    const end = start + match[0].length;
    if (!isNegatedOrQuestion(text, start, end)) {
      const contextStart = Math.max(0, start - 55);
      const contextEnd = Math.min(text.length, end + 55);
      return text.slice(contextStart, contextEnd);
    }
    offset = end || offset + 1;
  }

  return null;
}

function searchChunks(html, jsonLdRawValues) {
  const visibleText = html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ');
  const searchableAttributeNames = new Set([
    'alt', 'aria-label', 'content', 'placeholder', 'title', 'value'
  ]);
  const attributeValues = [];

  for (const tag of html.match(/<[a-z][^>]*>/gi) ?? []) {
    const attributes = parseAttributes(tag);
    for (const [name, value] of Object.entries(attributes)) {
      if (searchableAttributeNames.has(name) && value) attributeValues.push(value);
    }
  }

  return [visibleText, ...attributeValues, ...jsonLdRawValues];
}

function validateForbiddenClaims(html, jsonLdRawValues, pageLabel) {
  const chunks = searchChunks(html, jsonLdRawValues);
  for (const claim of forbiddenClaims) {
    let context = null;
    for (const chunk of chunks) {
      context = firstAffirmativeMatch(chunk, claim.pattern);
      if (context) break;
    }
    if (context) {
      addError(`${pageLabel}: affirmative forbidden claim "${claim.label}" found near "${context}"`);
    }
  }
}

function validatePageMetadata(route, html) {
  const pageLabel = route.slug === '' ? '/' : `/${route.slug}`;
  const expectedCanonical = canonicalUrl(route.slug);
  const titles = titleValues(html);
  const descriptions = metaValues(html, 'name', 'description');
  const canonicals = canonicalValues(html);
  const ogUrls = metaValues(html, 'property', 'og:url');
  const robots = metaValues(html, 'name', 'robots');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (titles.length !== 1) {
    addError(`${pageLabel}: expected exactly one <title>, found ${titles.length}`);
  } else if (titles[0] !== normalizeComparable(route.title)) {
    addError(`${pageLabel}: rendered title does not match seo-manifest.json`);
  }

  if (descriptions.length !== 1) {
    addError(`${pageLabel}: expected exactly one meta description, found ${descriptions.length}`);
  } else if (descriptions[0] !== normalizeComparable(route.description)) {
    addError(`${pageLabel}: rendered description does not match seo-manifest.json`);
  }

  if (canonicals.length !== 1 || canonicals[0] !== expectedCanonical) {
    addError(`${pageLabel}: canonical must be exactly ${expectedCanonical}`);
  }
  if (ogUrls.length !== 1 || ogUrls[0] !== expectedCanonical) {
    addError(`${pageLabel}: og:url must be exactly ${expectedCanonical}`);
  }
  if (robots.length !== 1) {
    addError(`${pageLabel}: expected exactly one robots meta tag, found ${robots.length}`);
  } else if (robots[0].toLowerCase().split(/[\s,]+/).includes('noindex')) {
    addError(`${pageLabel}: sitemap route must not be noindex`);
  }
  if (h1Count !== 1) {
    addError(`${pageLabel}: expected exactly one H1, found ${h1Count}`);
  }
}

if (!fs.existsSync(DIST_DIR)) fatal('dist/ does not exist; run the production build first');
if (!fs.existsSync(MANIFEST_PATH)) fatal('dist/seo-manifest.json does not exist; prerendering must write it first');
if (!fs.existsSync(SITEMAP_PATH)) fatal('dist/sitemap.xml does not exist');

const manifest = readJson(MANIFEST_PATH);
if (!manifest || typeof manifest !== 'object') fatal('seo-manifest.json must contain an object');
if (!Array.isArray(manifest.routes)) fatal('seo-manifest.json must contain a routes array');
if (!Array.isArray(manifest.redirects)) fatal('seo-manifest.json must contain a redirects array');
if (typeof manifest.organizationId !== 'string' || manifest.organizationId.trim() === '') {
  fatal('seo-manifest.json must contain a non-empty organizationId');
}

const organizationId = manifest.organizationId.trim();
try {
  const organizationUrl = new URL(organizationId);
  if (organizationUrl.origin !== BASE_URL || organizationUrl.hash === '') {
    addError(`organizationId must be a fragment ID on ${BASE_URL}/ (found "${organizationId}")`);
  }
} catch {
  addError(`organizationId is not a valid absolute URL (found "${organizationId}")`);
}

const routes = [];
const routeSlugs = new Set();
for (const [index, route] of manifest.routes.entries()) {
  if (!route || typeof route !== 'object') {
    addError(`routes[${index}] must be an object`);
    continue;
  }
  const { slug, title, description } = route;
  if (typeof slug !== 'string' || (slug !== '' && !/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(slug))) {
    addError(`routes[${index}].slug is not a normalized route slug`);
    continue;
  }
  if (routeSlugs.has(slug)) {
    addError(`duplicate route slug "${slug || '/'}" in seo-manifest.json`);
    continue;
  }
  if (typeof title !== 'string' || normalizeComparable(title) === '') {
    addError(`route /${slug} has an empty title`);
  }
  if (typeof description !== 'string' || normalizeComparable(description) === '') {
    addError(`route /${slug} has an empty description`);
  }
  routeSlugs.add(slug);
  routes.push({ slug, title: String(title ?? ''), description: String(description ?? '') });
}

if (!routeSlugs.has('')) addError('seo-manifest.json must contain the homepage route with slug ""');
for (const policySlug of ['privacy', 'terms']) {
  if (!routeSlugs.has(policySlug)) addError(`seo-manifest.json must contain /${policySlug}`);
}

for (const property of ['title', 'description']) {
  const values = new Map();
  for (const route of routes) {
    const value = normalizeComparable(route[property]).toLowerCase();
    const slugs = values.get(value) ?? [];
    slugs.push(route.slug || '/');
    values.set(value, slugs);
  }
  for (const [value, slugs] of values) {
    if (value && slugs.length > 1) {
      addError(`duplicate ${property} across ${slugs.map(slug => `/${slug}`.replace('//', '/')).join(', ')}`);
    }
  }
}

const redirectSources = new Set();
const redirectTargets = new Map();
for (const [index, redirect] of manifest.redirects.entries()) {
  if (!redirect || typeof redirect !== 'object') {
    addError(`redirects[${index}] must be an object`);
    continue;
  }
  const { source, destination } = redirect;
  if (typeof source !== 'string' || !/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(source)) {
    addError(`redirects[${index}].source must be a normalized absolute path`);
    continue;
  }
  if (redirectSources.has(source)) addError(`duplicate redirect source "${source}"`);
  redirectSources.add(source);

  const sourceSlug = normalizePathname(source);
  if (routeSlugs.has(sourceSlug)) addError(`redirect source ${source} is also a canonical route`);

  if (typeof destination !== 'string') {
    addError(`redirect ${source} has no string destination`);
    continue;
  }
  redirectTargets.set(source, destination);

  try {
    const target = new URL(destination, `${BASE_URL}/`);
    if (target.origin !== BASE_URL) {
      addError(`redirect ${source} points outside ${BASE_URL}`);
    } else {
      const targetSlug = normalizePathname(target.pathname);
      if (!routeSlugs.has(targetSlug)) {
        addError(`redirect ${source} target ${destination} is not a canonical route`);
      }
    }
  } catch {
    addError(`redirect ${source} has malformed destination "${destination}"`);
  }

  const redirectDirectory = path.join(DIST_DIR, ...sourceSlug.split('/'));
  const redirectHtmlFile = path.join(DIST_DIR, `${sourceSlug}.html`);
  if (fs.existsSync(redirectDirectory) || fs.existsSync(redirectHtmlFile)) {
    addError(`redirect source ${source} must not have a generated page/file in dist/`);
  }
}

const vercelConfig = readJson(VERCEL_CONFIG_PATH);
if (vercelConfig.cleanUrls !== true) addError('vercel.json must enable cleanUrls');
if (vercelConfig.trailingSlash !== false) addError('vercel.json must disable trailingSlash');

const vercelRedirects = Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : [];
const vercelHostRedirect = vercelRedirects.find(redirect => (
  redirect?.source === '/:path*'
  && redirect?.destination === `${BASE_URL}/:path*`
  && redirect?.permanent === true
  && Array.isArray(redirect.has)
  && redirect.has.some(condition => condition?.type === 'host' && condition?.value === 'www.speedybat.com')
));
if (!vercelHostRedirect) {
  addError('vercel.json must contain a path-preserving permanent www.speedybat.com to apex redirect');
}

for (const [source, destination] of redirectTargets) {
  const matches = vercelRedirects.filter(redirect => redirect?.source === source);
  if (matches.length !== 1) {
    addError(`vercel.json must contain exactly one redirect for ${source}`);
    continue;
  }
  if (matches[0].destination !== destination || matches[0].permanent !== true) {
    addError(`vercel.json redirect ${source} must permanently target ${destination}`);
  }
}

for (const redirect of vercelRedirects) {
  if (redirect === vercelHostRedirect) continue;
  if (!redirectSources.has(redirect?.source)) {
    addError(`vercel.json contains redirect ${redirect?.source ?? '(missing source)'} outside seo-manifest.json`);
  }
}

const staticRedirectLines = readText(STATIC_REDIRECTS_PATH)
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean)
  .map(line => {
    const [source, destination, status] = line.split(/\s+/);
    return { source, destination, status };
  });

for (const [source, destination] of redirectTargets) {
  const matches = staticRedirectLines.filter(redirect => redirect.source === source);
  if (matches.length !== 1) {
    addError(`dist/_redirects must contain exactly one redirect for ${source}`);
    continue;
  }
  if (matches[0].destination !== destination || !/^308!?$/.test(matches[0].status ?? '')) {
    addError(`dist/_redirects entry ${source} must use 308 and target ${destination}`);
  }
}

const sitemap = readText(SITEMAP_PATH);
const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
  .map(match => decodeEntities(match[1]).trim());
const sitemapSet = new Set(sitemapUrls);
const expectedUrls = new Set(routes.map(route => canonicalUrl(route.slug)));

if (sitemapSet.size !== sitemapUrls.length) addError('sitemap.xml contains duplicate <loc> values');
for (const expectedUrl of expectedUrls) {
  if (!sitemapSet.has(expectedUrl)) addError(`sitemap.xml is missing ${expectedUrl}`);
}
for (const sitemapUrl of sitemapSet) {
  if (!expectedUrls.has(sitemapUrl)) addError(`sitemap.xml contains non-manifest URL ${sitemapUrl}`);
}
for (const source of redirectSources) {
  const sourceUrl = `${BASE_URL}${source}`;
  if (sitemapSet.has(sourceUrl) || sitemapSet.has(`${sourceUrl}/`)) {
    addError(`redirect source ${source} must not appear in sitemap.xml`);
  }
}

const htmlFiles = walkFiles(DIST_DIR).filter(filePath => filePath.toLowerCase().endsWith('.html'));
for (const htmlFile of htmlFiles) {
  const relative = path.relative(DIST_DIR, htmlFile).split(path.sep).join('/');
  if (relative === '404.html') continue;
  const fileSlug = htmlRouteFromFile(htmlFile);
  if (fileSlug === null || routeSlugs.has(fileSlug)) continue;
  const html = readText(htmlFile);
  if (!robotsIncludesNoindex(html)) {
    addError(`extra indexable HTML file dist/${relative} is not represented in seo-manifest.json`);
  }
}

const pageRecords = [];
for (const route of routes) {
  const filePath = routeFile(route.slug);
  const pageLabel = route.slug === '' ? '/' : `/${route.slug}`;
  if (!fs.existsSync(filePath)) {
    addError(`${pageLabel}: generated HTML file is missing`);
    continue;
  }
  const html = readText(filePath);
  validatePageMetadata(route, html);
  pageRecords.push({ slug: route.slug, label: pageLabel, html, filePath });
}

if (!fs.existsSync(NOT_FOUND_PATH)) {
  addError('dist/404.html is missing');
} else {
  const html = readText(NOT_FOUND_PATH);
  const robots = metaValues(html, 'name', 'robots');
  const canonicals = canonicalValues(html);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (robots.length !== 1 || !robots[0].toLowerCase().split(/[\s,]+/).includes('noindex')) {
    addError('404: expected exactly one robots meta tag containing noindex');
  }
  if (canonicals.length !== 0) addError('404: canonical link must be absent');
  if (h1Count !== 1) addError(`404: expected exactly one H1, found ${h1Count}`);
  pageRecords.push({ slug: '', label: '404', html, filePath: NOT_FOUND_PATH });
}

const recordedFiles = new Set(pageRecords.map(record => path.resolve(record.filePath)));
for (const htmlFile of htmlFiles) {
  if (recordedFiles.has(path.resolve(htmlFile))) continue;
  const slug = htmlRouteFromFile(htmlFile) ?? '';
  pageRecords.push({
    slug,
    label: `dist/${path.relative(DIST_DIR, htmlFile).split(path.sep).join('/')}`,
    html: readText(htmlFile),
    filePath: htmlFile
  });
}

const schemaEntries = [];
for (const page of pageRecords) {
  validateLinks(page.html, page.slug, page.label, routeSlugs);
  validatePolicyLinks(page.html, page.slug, page.label, routeSlugs);

  const jsonLd = extractJsonLd(page.html, page.label);
  validateForbiddenClaims(page.html, jsonLd.rawValues, page.label);
  for (const value of jsonLd.values) {
    for (const node of collectSchemaNodes(value)) {
      schemaEntries.push({ page: page.label, node });
    }
  }
}

const stableBusinessNodes = schemaEntries.filter(({ node }) =>
  node['@id'] === organizationId &&
  (hasSchemaType(node, 'Organization') || hasSchemaType(node, 'LocalBusiness'))
);
if (stableBusinessNodes.length !== 1) {
  addError(`expected exactly one typed organization node with @id ${organizationId}, found ${stableBusinessNodes.length}`);
} else if (stableBusinessNodes[0].page !== '/') {
  addError(`the stable organization node must be defined on the homepage, not ${stableBusinessNodes[0].page}`);
}

const stableNode = stableBusinessNodes[0]?.node;
const businessDefinitions = schemaEntries.filter(({ node }) =>
  hasSchemaType(node, 'Organization') || hasSchemaType(node, 'LocalBusiness')
);
for (const entry of businessDefinitions) {
  if (entry.node !== stableNode) {
    addError(`${entry.page}: additional ${entry.node['@type']} business identity is not allowed`);
  }
}

const localBusinessEntries = schemaEntries.filter(({ node }) => hasSchemaType(node, 'LocalBusiness'));
if (stableNode && hasSchemaType(stableNode, 'Organization')) {
  for (const entry of localBusinessEntries) {
    addError(`${entry.page}: LocalBusiness nodes are not allowed when the stable node is Organization`);
  }
} else {
  for (const entry of localBusinessEntries) {
    if (entry.node !== stableNode || entry.page !== '/') {
      addError(`${entry.page}: LocalBusiness nodes are allowed only as the single stable homepage identity`);
    }
  }
}

const serviceEntries = schemaEntries.filter(({ node }) => hasSchemaType(node, 'Service'));
if (serviceEntries.length === 0) addError('no Service JSON-LD nodes were found');
for (const { page, node } of serviceEntries) {
  const providers = Array.isArray(node.provider) ? node.provider : [node.provider];
  if (
    providers.length === 0 ||
    providers.some(provider => !provider || typeof provider !== 'object' || provider['@id'] !== organizationId)
  ) {
    addError(`${page}: every Service provider must reference ${organizationId} by @id`);
  }
}

const prohibitedSchemaProperties = new Set(['pricerange', 'address', 'sameas']);
const reportedSchemaProperties = new Set();
for (const { page, node } of schemaEntries) {
  for (const property of Object.keys(node)) {
    const normalized = property.toLowerCase();
    if (!prohibitedSchemaProperties.has(normalized)) continue;
    const reportKey = `${page}:${normalized}`;
    if (reportedSchemaProperties.has(reportKey)) continue;
    reportedSchemaProperties.add(reportKey);
    addError(`${page}: JSON-LD property "${property}" is not allowed`);
  }
}

const uniqueErrors = [...new Set(errors)];
if (uniqueErrors.length > 0) {
  console.error(`SEO regression checks failed with ${uniqueErrors.length} issue${uniqueErrors.length === 1 ? '' : 's'}:`);
  const visibleErrors = uniqueErrors.slice(0, 100);
  for (const error of visibleErrors) console.error(`  - ${error}`);
  if (uniqueErrors.length > visibleErrors.length) {
    console.error(`  - ...and ${uniqueErrors.length - visibleErrors.length} more`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `SEO regression checks passed: ${routes.length} routes, ${manifest.redirects.length} redirects, ` +
    `${serviceEntries.length} Service schema node${serviceEntries.length === 1 ? '' : 's'}.`
  );
}
