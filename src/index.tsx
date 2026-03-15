import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const applyInitialTheme = () => {
  if (typeof window === 'undefined') return;

  const stored = window.localStorage.getItem('theme-mode');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const mode =
    stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';

  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
};

applyInitialTheme();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
