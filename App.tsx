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
        <main className="mt-[76px] flex min-h-[60svh] items-center justify-center bg-ink px-6 py-24 text-center text-white lg:mt-[84px]">
          <p className="text-[18px] text-white/75">
            This page has moved. <a href={redirect.destination} className="font-bold text-white underline underline-offset-4">Continue to the service-area guide</a>.
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
