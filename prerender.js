/**
 * prerender.js — Static HTML Pre-rendering for SEO
 * 
 * This script runs AFTER `vite build` and generates individual HTML files
 * for every route (locations, services, static pages) so that Googlebot
 * can crawl and index each page without needing JavaScript rendering.
 * 
 * It reads the built index.html, then for each route:
 * 1. Sets the correct <title>, <meta description>, <meta keywords>
 * 2. Sets the correct <link rel="canonical">
 * 3. Injects route-specific noscript/fallback content into <div id="root">
 * 4. Writes a separate HTML file (e.g., dist/round-rock/index.html)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://speedybat.com';

// ── Route Definitions ──────────────────────────────────────────────
// These mirror the routes defined in data/locations.ts and data/services.ts

const locationRoutes = [
  'downtown-austin', 'south-austin', 'west-lake-hills', 'east-austin',
  'mueller', 'cedar-park', 'west-campus', 'hyde-park', 'round-rock',
  'georgetown', 'pflugerville', 'lakeway', 'bee-cave', 'kyle', 'leander',
  'liberty-hill', 'lago-vista', 'taylor', 'hutto', 'salado', 'killeen',
  'temple', 'buda', 'bastrop', 'elgin', 'new-braunfels', 'san-marcos'
];

const serviceRoutes = [
  'same-day-on-demand-courier', 'hot-shot-expedited-freight',
  'long-distance-intercity-courier', 'medical-stat-courier',
  'legal-courier-court-filing', 'manufacturing-line-down-delivery',
  'airport-recovery-next-flight-out', 'scheduled-dedicated-routes',
  'air-hand-carry-on-board-courier'
];

const staticPages = [
  { slug: 'faq', title: 'FAQ | Speedy Bat Couriers — Austin TX Courier Service', description: 'Frequently asked questions about Speedy Bat Couriers. Learn about our same-day delivery, air hand carry, pricing, service areas, and 24/7 courier operations in Austin, Texas.' },
  { slug: 'about', title: 'About | Speedy Bat Couriers — Austin TX Courier Service', description: "Learn about Speedy Bat Couriers — Austin, Texas's trusted 24/7 courier service for time-critical, same-day, and emergency deliveries across Central Texas and nationwide." }
];

// ── Location metadata (mirrors data/locations.ts) ──────────────────

const locationMeta = {
  'downtown-austin': { title: 'Downtown Austin Courier Service | Same-Day Document & Rush Messenger', description: 'Speedy Bat Couriers offers 24/7 same-day document delivery and rush business courier services in Downtown Austin, TX. Fast, secure, and dedicated messengers.', keywords: 'Downtown Austin courier service, same-day document delivery, rush business courier, corporate messenger, Austin TX courier service' },
  'south-austin': { title: 'South Austin Delivery Services | Local On-Demand Courier Near Me', description: 'Need a local courier near you in South Austin? Speedy Bat Couriers provides on-demand package delivery and neighborhood courier fleets 24/7.', keywords: 'South Austin delivery services, local courier near me, on-demand package delivery, neighborhood courier fleet, South Lamar courier' },
  'west-lake-hills': { title: 'West Lake Hills Courier Service | Secure & Confidential Parcel Delivery', description: 'Secure parcel delivery and scheduled courier routes in West Lake Hills, TX. Speedy Bat offers confidential, direct-drive shipping you can trust.', keywords: 'West Lake Hills courier service, secure parcel delivery, scheduled courier routes, confidential courier, Loop 360 courier' },
  'east-austin': { title: 'East Austin Courier Network | Prompt Local Business Messenger', description: 'Get prompt package delivery and local business messenger services in East Austin. Speedy Bat connects the Eastside with reliable, 24/7 same-day delivery.', keywords: 'East Austin courier network, prompt package delivery, local business messenger, same-day delivery service, East Austin same-day' },
  'mueller': { title: "Mueller Neighborhood Delivery | Dell Children's STAT Medical Courier", description: "STAT medical courier services to Dell Children's Hospital and local residential/retail messenger services in Mueller Austin. 24/7 dispatch.", keywords: 'Mueller neighborhood delivery, retail logistics, residential courier, same-day local messenger, Dell Childrens medical courier' },
  'cedar-park': { title: 'Cedar Park Courier Service | North Austin Business & Medical Courier', description: 'Prompt package delivery and medical courier services in Cedar Park and RM 1431 corridors. 24/7 same-day logistics and hot-shot delivery.', keywords: 'Cedar Park courier service, north Austin delivery network, medical courier Cedar Park, business package courier, 183 Toll courier' },
  'west-campus': { title: 'West Campus Student Courier | UT Austin Document & Specimen Delivery', description: 'Urgent document pick-up and department messenger services for UT Austin & West Campus area. Quick same-day courier dispatch.', keywords: 'West Campus student courier, UT Austin delivery, document pick-up, retail delivery, Guadalupe Street messenger' },
  'hyde-park': { title: 'Hyde Park Courier | Central Austin Historic Neighborhood Delivery', description: 'Same-day courier and residential delivery services in historic Hyde Park and Duval corridors. HIPAA-compliant specimen logistics and document pick-up.', keywords: 'Hyde Park courier, historic neighborhood delivery, academic delivery, residential package courier, Duval Street delivery' },
  'round-rock': { title: 'Round Rock Courier Service | Same-Day Delivery & Express Logistics', description: '24/7 same-day courier service and express delivery in Round Rock, TX. Speedy Bat offers rapid hot-shot transport, medical STAT, and freight.', keywords: 'Round Rock courier service, same-day delivery Round Rock, express logistics, medical specimen courier, Round Rock shipping' },
  'georgetown': { title: 'Georgetown Courier Service | STAT Medical & Same-Day Shipping', description: 'Emergency courier services and STAT medical specimen transport in Georgetown, TX. Direct-drive logistics and scheduled route services available 24/7.', keywords: 'Georgetown courier service, STAT medical courier, same-day delivery Georgetown, direct-drive logistics, expedited shipping' },
  'pflugerville': { title: "Pflugerville Courier Service | On-Demand Parcel & Freight Delivery", description: "Pflugerville's premier on-demand courier and same-day delivery service. 24/7 logistics solutions for businesses and residents in Pflugerville, TX.", keywords: 'Pflugerville courier service, on-demand courier, same-day delivery Pflugerville, local business shipping, SH 130 toll courier' },
  'lakeway': { title: 'Lakeway Courier Service | Secure Estate & Medical Specimen Delivery', description: 'Confidential and secure courier services in Lakeway, TX. 24/7 express package delivery, medical STAT transport, and executive legal logistics.', keywords: 'Lakeway courier service, secure delivery Lakeway, medical courier Lakeway, confidential shipping, RM 620 courier' },
  'bee-cave': { title: 'Bee Cave Courier Service | Retail & Executive Route Delivery', description: '24/7 same-day courier service in Bee Cave, TX. On-demand shipping, retail inventory logistics, and secure executive routes.', keywords: 'Bee Cave courier service, same-day delivery Bee Cave, retail inventory courier, Hill Country Galleria courier, Hwy 71 logistics' },
  'kyle': { title: 'Kyle Courier Service | Same-Day Logistics & Medical Specimen Transport', description: 'Expedited courier and same-day delivery service in Kyle, TX. Available 24/7 for medical STAT, industrial parts, and corporate document transport.', keywords: 'Kyle courier service, same-day delivery Kyle, medical courier Kyle, industrial parts delivery, I-35 south logistics' },
  'leander': { title: 'Leander Courier Service | Expedited Same-Day Package Delivery', description: 'Express same-day shipping and business courier routes in Leander, TX. 24/7 hot-shot transport and confidential document delivery.', keywords: 'Leander courier service, same-day delivery Leander, express business courier, hot-shot transport, 183A Toll logistics' },
  'liberty-hill': { title: 'Liberty Hill Courier Service | Secure On-Demand Business Transport', description: 'On-demand courier service in Liberty Hill, TX. 24/7 same-day delivery for corporate, construction, and residential clients.', keywords: 'Liberty Hill courier service, same-day delivery Liberty Hill, construction logistics, business courier, Hwy 29 shipping' },
  'lago-vista': { title: 'Lago Vista Courier Service | Expedited Lake Area Parcel Shipping', description: 'Express courier and same-day delivery service in Lago Vista, TX. We serve the North Lake Travis region 24/7 with secure transport.', keywords: 'Lago Vista courier service, same-day delivery Lago Vista, lake area courier, FM 1431 delivery, Lago Vista shipping' },
  'taylor': { title: 'Taylor Courier Service | Samsung Fab Semiconductor & Industrial Logistics', description: 'STAT semiconductor parts delivery and same-day industrial courier service in Taylor, TX. Serving the Samsung Fab corridor 24/7.', keywords: 'Taylor courier service, Samsung Taylor courier, semiconductor logistics, same-day industrial delivery, Hwy 79 courier' },
  'hutto': { title: "Hutto Courier Service | Same-Day Logistics & Industrial Parts Courier", description: "Hutto's reliable 24/7 same-day courier and express delivery provider. Hot-shot parts, medical STAT, and business delivery solutions.", keywords: 'Hutto courier service, same-day delivery Hutto, industrial parts courier, Hwy 79 logistics, Hutto business shipping' },
  'salado': { title: 'Salado Courier Service | Secure Historic District Business Courier', description: 'Express same-day shipping and historic route courier service in Salado, TX. 24/7 secure logistics and package delivery.', keywords: 'Salado courier service, same-day delivery Salado, business courier Salado, I-35 north shipping, Salado logistics' },
  'killeen': { title: 'Killeen Courier Service | Same-Day Military & Medical Cargo Transport', description: 'Emergency courier and same-day delivery service in Killeen, TX. Serving Fort Cavazos (Fort Hood) and local hospitals 24/7.', keywords: 'Killeen courier service, same-day delivery Killeen, military logistics, medical courier Killeen, Fort Cavazos courier' },
  'temple': { title: 'Temple Courier Service | Baylor Scott & White Medical STAT Courier', description: 'Specialized medical STAT specimen transport and same-day business courier in Temple, TX. Serving Baylor Scott & White daily.', keywords: 'Temple courier service, medical courier Temple, Baylor Scott and White courier, same-day delivery Temple, specimen transport' },
  'buda': { title: 'Buda Courier Service | On-Demand Industrial & Retail Logistics', description: 'Expedited courier and same-day delivery service in Buda, TX. Available 24/7 for retail logistics, warehouse transport, and corporate documents.', keywords: 'Buda courier service, same-day delivery Buda, industrial logistics, Buda warehouse courier, FM 1626 courier' },
  'bastrop': { title: 'Bastrop Courier Service | Hwy 71 Same-Day Courier & Specimen Delivery', description: 'Reliable same-day courier service and STAT medical delivery in Bastrop, TX. 24/7 express shipping along the Hwy 71 corridor.', keywords: 'Bastrop courier service, same-day delivery Bastrop, medical courier Bastrop, Hwy 71 courier, Bastrop shipping' },
  'elgin': { title: 'Elgin Courier Service | Prompt Same-Day Package & Cargo Delivery', description: 'Same-day courier and express parcel delivery in Elgin, TX. 24/7 logistics and secure courier routes along US-290 East.', keywords: 'Elgin courier service, same-day delivery Elgin, US 290 courier, local business messenger, Elgin shipping' },
  'new-braunfels': { title: 'New Braunfels Courier Service | Same-Day Tourism & Corporate Logistics', description: '24/7 same-day courier and expedited freight services in New Braunfels, TX. Medical STAT specimen transport and business delivery.', keywords: 'New Braunfels courier service, same-day delivery New Braunfels, tourism logistics, medical courier New Braunfels, I-35 logistics' },
  'san-marcos': { title: 'San Marcos Courier Service | Same-Day College Campus & Industrial Courier', description: '24/7 express courier service in San Marcos, TX. Serving Texas State University, outlet malls, and medical centers with same-day transport.', keywords: 'San Marcos courier service, same-day delivery San Marcos, Texas State University courier, San Marcos outlets courier, Hays County shipping' }
};

// ── Service metadata (mirrors data/services.ts) ──────────────────

const serviceMeta = {
  'same-day-on-demand-courier': { title: 'Same-Day Courier Austin | On-Demand Courier Services TX', description: 'Speedy Bat Couriers offers 24/7 same-day and on-demand courier services in Austin, TX. Rapid 30-60 min pickup for documents, parcels, and secure freight.', keywords: 'Same-day courier Austin, on-demand courier service, last-minute courier delivery, rush package delivery Austin, express local courier' },
  'hot-shot-expedited-freight': { title: 'Hot Shot Delivery Austin | Expedited Freight Courier Services', description: 'Flagship hot shot and expedited freight logistics in Austin and Central Texas. 24/7 dedicated direct-drive cargo vans and trucks for critical parts & machinery.', keywords: 'Hot shot delivery Austin, expedited freight service, industrial cargo courier, same-day freight logistics, dedicated cargo van dispatch' },
  'long-distance-intercity-courier': { title: 'Long-Distance Courier Austin | Intercity Overnight Courier', description: 'Secure intercity and long-distance courier services in Austin, TX. Dedicated overnight and odd-hours runs connecting Austin, DFW, Houston, and San Antonio.', keywords: 'Long-distance courier Austin, intercity courier service, overnight courier transport, 24/7 cross-city delivery, odd-hours courier service' },
  'medical-stat-courier': { title: 'Medical STAT Courier Austin | HIPAA Compliant Specimen Delivery', description: 'HIPAA-compliant medical courier services in Austin, TX. 24/7 STAT specimen runs, laboratory logistics, blood bank transport, and pharmacy routes.', keywords: 'Medical courier Austin, STAT specimen delivery, HIPAA compliant courier, laboratory specimen transport, medical supply logistics' },
  'legal-courier-court-filing': { title: 'Legal Courier Austin | Same-Day Court Filing & Document Messenger', description: 'Secure legal courier services in Austin, TX. 24/7 same-day court filing, contract pickup, process serving, and confidential legal messenger runs.', keywords: 'Legal courier Austin, court filing service, legal document messenger, same-day filing courthouse, secure legal delivery' },
  'manufacturing-line-down-delivery': { title: 'Manufacturing Line-Down Parts Delivery | Just-in-Time Courier', description: 'Emergency manufacturing line-down courier in Austin, TX. 24/7 same-day delivery of microchips, automotive components, and silicon wafers to factories.', keywords: 'Manufacturing courier service, line-down parts delivery, just-in-time logistics, semiconductor parts courier, industrial line down shipping' },
  'airport-recovery-next-flight-out': { title: 'Airport Recovery Courier | Next-Flight-Out & AOG Austin', description: '24/7 Airport recovery, Next-Flight-Out (NFO), and Aircraft on Ground (AOG) courier services at AUS and DFW. Direct air cargo pickup and delivery.', keywords: 'Airport recovery courier, next flight out delivery, AOG aviation courier, AUS airport cargo pickup, DFW air freight recovery' },
  'scheduled-dedicated-routes': { title: 'Scheduled Courier Routes Austin | Dedicated Daily Deliveries', description: 'Optimize business operations with custom scheduled courier routes and dedicated daily delivery services in Austin, TX. 24/7 contract logistics.', keywords: 'Scheduled courier routes, dedicated daily delivery, recurring courier services, interoffice mail route, contract logistics Austin' },
  'air-hand-carry-on-board-courier': { title: 'Air Hand Carry Austin | On-Board Courier Service TX', description: 'Premium air hand carry and on-board courier (OBC) services in Austin, TX. A dedicated courier personally accompanies your package on commercial flights for secure, same-day delivery nationwide.', keywords: 'Air hand carry Austin, on board courier Austin, OBC courier service, hand carry shipping Texas, expedited air courier' }
};

// ── Helper Functions ───────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugToName(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function replaceMetaTag(html, name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  // Match both single-line and multi-line meta tags
  const regex = new RegExp(`<meta ${attr}="${name}"[^>]*content="[^"]*"[^>]*/?>`, 'g');
  const replacement = `<meta ${attr}="${name}" content="${escapeHtml(content)}" />`;
  return html.replace(regex, replacement);
}

function replaceMultilineMetaTag(html, name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  // Handle meta tags that span multiple lines
  const regex = new RegExp(`<meta ${attr}="${name}"[\\s\\S]*?/>`, 'g');
  const replacement = `<meta ${attr}="${name}"\n    content="${escapeHtml(content)}" />`;
  return html.replace(regex, replacement);
}

function generateFallbackContent(routeType, slug, meta) {
  const name = slugToName(slug);
  
  if (routeType === 'location') {
    return `
    <noscript>
      <header style="background: #08080c; padding: 20px; text-align: center;">
        <h1 style="color: white; font-family: sans-serif;">${escapeHtml(meta.title)}</h1>
        <p style="color: #94a3b8; font-family: sans-serif;">Speedy Bat Couriers — Courier Service in ${escapeHtml(name)}, Texas</p>
      </header>
      <main style="background: #08080c; padding: 40px 20px; font-family: sans-serif; color: #e8e6e3;">
        <section>
          <h2 style="color: white;">Courier Service in ${escapeHtml(name)}</h2>
          <p>${escapeHtml(meta.description)}</p>
          <p>Speedy Bat Couriers provides 24/7 same-day courier service, medical STAT delivery, legal document transport, and hot-shot logistics in ${escapeHtml(name)} and the greater Austin, Texas area.</p>
        </section>
        <section>
          <h2 style="color: white;">Contact Speedy Bat Couriers</h2>
          <p>Text us 24/7 for immediate dispatch: <a href="sms:5129104938" style="color: #dc2626;">(512) 910-4938</a></p>
          <p>Serving ${escapeHtml(name)}, Austin, and all of Central Texas</p>
        </section>
      </main>
    </noscript>`;
  }
  
  if (routeType === 'service') {
    return `
    <noscript>
      <header style="background: #08080c; padding: 20px; text-align: center;">
        <h1 style="color: white; font-family: sans-serif;">${escapeHtml(meta.title)}</h1>
        <p style="color: #94a3b8; font-family: sans-serif;">Speedy Bat Couriers — Austin, Texas</p>
      </header>
      <main style="background: #08080c; padding: 40px 20px; font-family: sans-serif; color: #e8e6e3;">
        <section>
          <h2 style="color: white;">${escapeHtml(meta.title)}</h2>
          <p>${escapeHtml(meta.description)}</p>
          <p>Speedy Bat Couriers is Austin, Texas's trusted provider for this service. Available 24/7 for urgent and time-critical deliveries throughout Central Texas and nationwide.</p>
        </section>
        <section>
          <h2 style="color: white;">Contact Speedy Bat Couriers</h2>
          <p>Text us 24/7 for immediate dispatch: <a href="sms:5129104938" style="color: #dc2626;">(512) 910-4938</a></p>
          <p>Based in Austin, Texas | Serving Central Texas &amp; Nationwide</p>
        </section>
      </main>
    </noscript>`;
  }
  
  if (routeType === 'static') {
    return `
    <noscript>
      <header style="background: #08080c; padding: 20px; text-align: center;">
        <h1 style="color: white; font-family: sans-serif;">${escapeHtml(meta.title)}</h1>
      </header>
      <main style="background: #08080c; padding: 40px 20px; font-family: sans-serif; color: #e8e6e3;">
        <section>
          <p>${escapeHtml(meta.description)}</p>
          <p>Text us 24/7: <a href="sms:5129104938" style="color: #dc2626;">(512) 910-4938</a></p>
        </section>
      </main>
    </noscript>`;
  }
}

function prerenderRoute(template, slug, meta, routeType) {
  let html = template;
  
  // 1. Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  
  // 2. Replace meta description (handles multiline)
  html = replaceMultilineMetaTag(html, 'description', meta.description);
  
  // 3. Replace meta keywords if provided
  if (meta.keywords) {
    html = replaceMultilineMetaTag(html, 'keywords', meta.keywords);
  }
  
  // 4. Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${BASE_URL}/${slug}" />`
  );
  
  // 5. Replace OG tags
  html = replaceMultilineMetaTag(html, 'og:title', meta.title, true);
  html = replaceMultilineMetaTag(html, 'og:description', meta.description, true);
  html = replaceMultilineMetaTag(html, 'og:url', `${BASE_URL}/${slug}`, true);
  
  // 6. Replace Twitter tags
  html = replaceMultilineMetaTag(html, 'twitter:title', meta.title);
  html = replaceMultilineMetaTag(html, 'twitter:description', meta.description);
  
  // 7. Replace the noscript fallback content inside #root
  const fallbackContent = generateFallbackContent(routeType, slug, meta);
  html = html.replace(
    /(<div id="root">)\s*<noscript>[\s\S]*?<\/noscript>/,
    `$1\n    ${fallbackContent}`
  );
  
  return html;
}

// ── Main Execution ────────────────────────────────────────────────

function main() {
  console.log('🦇 Speedy Bat Pre-renderer: Starting...\n');
  
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  let count = 0;
  
  // Pre-render location pages
  for (const slug of locationRoutes) {
    const meta = locationMeta[slug];
    if (!meta) {
      console.warn(`⚠️  No metadata found for location: ${slug}`);
      continue;
    }
    
    const html = prerenderRoute(template, slug, meta, 'location');
    const outputDir = path.join(DIST_DIR, slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    count++;
  }
  
  // Pre-render service pages
  for (const slug of serviceRoutes) {
    const meta = serviceMeta[slug];
    if (!meta) {
      console.warn(`⚠️  No metadata found for service: ${slug}`);
      continue;
    }
    
    const html = prerenderRoute(template, slug, meta, 'service');
    const outputDir = path.join(DIST_DIR, slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    count++;
  }
  
  // Pre-render static pages
  for (const page of staticPages) {
    const html = prerenderRoute(template, page.slug, page, 'static');
    const outputDir = path.join(DIST_DIR, page.slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    count++;
  }
  
  console.log(`\n✅ Pre-rendered ${count} pages successfully!`);
  console.log(`📁 Output: ${DIST_DIR}/`);
  
  // Print summary
  console.log(`\n📄 Location pages: ${locationRoutes.length}`);
  console.log(`📄 Service pages:  ${serviceRoutes.length}`);
  console.log(`📄 Static pages:   ${staticPages.length}`);
  console.log(`📄 Total:          ${count}`);
}

main();
