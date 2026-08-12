import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const outputDirectory = resolve('dist');
const argumentsList = process.argv.slice(2);

const argumentValue = (name, fallback) => {
  const index = argumentsList.indexOf(name);
  return index >= 0 && argumentsList[index + 1] ? argumentsList[index + 1] : fallback;
};

const host = argumentValue('--host', '127.0.0.1');
const port = Number(argumentValue('--port', process.env.PORT || '4173'));

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8'
};

const redirectMap = new Map();
const redirectsFile = join(outputDirectory, '_redirects');

if (existsSync(redirectsFile)) {
  for (const line of readFileSync(redirectsFile, 'utf8').split('\n')) {
    const [source, destination, status] = line.trim().split(/\s+/);
    if (source?.startsWith('/') && destination?.startsWith('/') && status) {
      redirectMap.set(source, { destination, status: Number.parseInt(status, 10) });
    }
  }
}

const safeOutputPath = pathFromRoot => {
  const candidate = normalize(join(outputDirectory, pathFromRoot));
  return candidate === outputDirectory || candidate.startsWith(`${outputDirectory}/`)
    ? candidate
    : null;
};

const resolveDocument = pathname => {
  if (pathname === '/') return join(outputDirectory, 'index.html');

  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const directPath = safeOutputPath(cleanPath);
  if (directPath && existsSync(directPath) && statSync(directPath).isFile()) {
    return directPath;
  }

  if (!extname(cleanPath)) {
    const routeDocument = safeOutputPath(join(cleanPath, 'index.html'));
    if (routeDocument && existsSync(routeDocument) && statSync(routeDocument).isFile()) {
      return routeDocument;
    }
  }

  return null;
};

const withPreservedQuery = (destination, search) => {
  if (!search) return destination;
  const hashIndex = destination.indexOf('#');
  return hashIndex === -1
    ? `${destination}${search}`
    : `${destination.slice(0, hashIndex)}${search}${destination.slice(hashIndex)}`;
};

const server = createServer((request, response) => {
  if (!request.url || !['GET', 'HEAD'].includes(request.method || '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  let requestUrl;
  try {
    requestUrl = new URL(request.url, `http://${host}:${port}`);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const redirect = redirectMap.get(pathname);
  if (redirect) {
    response.writeHead(redirect.status, {
      Location: withPreservedQuery(redirect.destination, requestUrl.search)
    });
    response.end();
    return;
  }

  if (pathname !== '/' && pathname.endsWith('/')) {
    response.writeHead(308, { Location: `${pathname.slice(0, -1)}${requestUrl.search}` });
    response.end();
    return;
  }

  const documentPath = resolveDocument(pathname);
  const responsePath = documentPath || join(outputDirectory, '404.html');
  const status = documentPath ? 200 : 404;
  const contentType = contentTypes[extname(responsePath)] || 'application/octet-stream';

  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': contentType
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(responsePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Production preview: http://${host}:${port}`);
});
