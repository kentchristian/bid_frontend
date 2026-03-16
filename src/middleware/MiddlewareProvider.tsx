import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router';

type MiddlewareContextValue = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean, options?: SetAuthenticatedOptions) => void;
};

const MiddlewareContext = createContext<MiddlewareContextValue | null>(null);

const STORAGE_KEY = 'bid.authenticated';
// Update this name if your backend exposes a readable auth cookie.
const AUTH_COOKIE_NAME = 'bid.authenticated';

type SetAuthenticatedOptions = {
  remember?: boolean;
};

const readCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escaped}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const readStoredAuth = () => {
  if (typeof window === 'undefined') return false;
  const cookieValue = readCookie(AUTH_COOKIE_NAME);
  if (cookieValue !== null) return cookieValue === 'true';
  const localValue = window.localStorage.getItem(STORAGE_KEY);
  if (localValue === 'true') return true;
  return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
};

export const MiddlewareProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);

  useEffect(() => {
    setIsAuthenticated(readStoredAuth());
  }, []);

  const setAuthenticated = (value: boolean, options?: SetAuthenticatedOptions) => {
    setIsAuthenticated(value);
    if (typeof window !== 'undefined') {
      const remember = options?.remember ?? true;
      const primaryStorage = remember ? window.localStorage : window.sessionStorage;
      const secondaryStorage = remember ? window.sessionStorage : window.localStorage;
      primaryStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
      secondaryStorage.setItem(STORAGE_KEY, 'false');
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      setAuthenticated,
    }),
    [isAuthenticated],
  );

  return (
    <MiddlewareContext.Provider value={value}>
      {children}
    </MiddlewareContext.Provider>
  );
};

export const useMiddleware = () => {
  const ctx = useContext(MiddlewareContext);
  if (!ctx) {
    throw new Error('useMiddleware must be used within MiddlewareProvider');
  }
  return ctx;
};

export const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useMiddleware();
  const location = useLocation();
  const isRootPath = location.pathname === '/' || location.pathname === '';

  if (isRootPath) {
    return (
      <Navigate
        to={isAuthenticated ? '/dashboard' : '/auth/login'}
        replace
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export const RedirectIfAuthenticated = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { isAuthenticated } = useMiddleware();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
