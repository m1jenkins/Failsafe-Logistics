import React, { useEffect } from 'react';
import { redirectBySource, normalizeSlug, routeBySlug } from './data/routes';
import { NotFound } from './components/NotFound';
import { RouteContent } from './components/RouteContent';
import { SiteShell } from './components/SiteShell';

const App: React.FC = () => {
  const slug = normalizeSlug(window.location.pathname);
  const route = routeBySlug[slug];
  const redirect = redirectBySource[`/${slug}`];

  useEffect(() => {
    if (redirect) {
      window.location.replace(redirect.destination);
    }
  }, [redirect]);

  if (redirect) {
    return (
      <SiteShell>
        <main className="pt-32 pb-24 min-h-screen bg-obsidian text-center px-6">
          <p className="text-slate-300">
            This page has moved. <a href={redirect.destination} className="text-red-500 underline">Continue to the service-area guide</a>.
          </p>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      {route ? <RouteContent route={route} /> : <NotFound />}
    </SiteShell>
  );
};

export default App;
