import { ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from '../layout';
import { useThemeMode } from '../lib/store/useMode';
import { getTheme } from '../lib/theme/mui-theme';
import {
  RedirectIfAuthenticated,
  RequireAuth,
} from '../middleware/MiddlewareProvider';

import { auth } from '../pages/auth';
import Dashboard from '../pages/dashboard';
import Inventory from '../pages/inventory';
import Reports from '../pages/reports';
import Sales from '../pages/sales';

const AppShell = () => {
  const mode = useThemeMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <RedirectIfAuthenticated>{auth.login}</RedirectIfAuthenticated>,
  },
  {
    path: '/auth/signup',
    element: <RedirectIfAuthenticated>{auth.signup}</RedirectIfAuthenticated>,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'sales', element: <Sales /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'reports', element: <Reports /> },
    ],
  },
]);

export default router;
