import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { installContactClickTracking } from './utils/analytics';

installContactClickTracking();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Every route is prerendered to static HTML (see prerender.js), so in
// production #root already has markup and must be hydrated, not replaced —
// re-rendering from scratch discards the prerendered paint and hurts LCP/CLS.
// The dev server (`vite`) never prerenders, so #root is empty there.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
