import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './lib/styles/global.css';
import router from './routes/route-config';

const applyInitialTheme = () => {
  if (typeof window === 'undefined') return;

  const stored = window.localStorage.getItem('theme-mode');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  let resolvedMode: 'light' | 'dark' | null = null;

  if (stored === 'light' || stored === 'dark') {
    resolvedMode = stored;
  } else if (stored) {
    try {
      const parsed = JSON.parse(stored) as { state?: { mode?: 'light' | 'dark' } };
      const mode = parsed?.state?.mode;
      resolvedMode = mode === 'light' || mode === 'dark' ? mode : null;
    } catch {
      resolvedMode = null;
    }
  }

  const mode = resolvedMode ?? (prefersDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
};

applyInitialTheme();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
