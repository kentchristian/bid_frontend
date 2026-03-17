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
// Client-readable auth flag cookie (set by the app).
const AUTH_COOKIE_NAME = 'bid.authenticated';
const REMEMBER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

type SetAuthenticatedOptions = {
  remember?: boolean;
};

const readCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const escaped = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const readStoredAuth = () => {
  if (typeof window === 'undefined') return false;
  const cookieValue = readCookie(AUTH_COOKIE_NAME);
  return cookieValue === 'true';
};

const setAuthCookie = (value: boolean, options?: SetAuthenticatedOptions) => {
  if (typeof document === 'undefined') return;
  if (!value) {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
    return;
  }
  const remember = options?.remember ?? true;
  const maxAge = remember ? `; max-age=${REMEMBER_MAX_AGE_SECONDS}` : '';
  document.cookie = `${AUTH_COOKIE_NAME}=true; path=/${maxAge}; samesite=lax`;
};

export const MiddlewareProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);

  useEffect(() => {
    setIsAuthenticated(readStoredAuth());
  }, []);

  const setAuthenticated = (
    value: boolean,
    options?: SetAuthenticatedOptions,
  ) => {
    setIsAuthenticated(value);
    if (typeof window !== 'undefined') {
      setAuthCookie(value, options);
      // Clear legacy storage flags so cookie is source of truth.
      window.localStorage.removeItem(STORAGE_KEY);
      window.sessionStorage.removeItem(STORAGE_KEY);
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
      <Navigate to={isAuthenticated ? '/dashboard' : '/auth/login'} replace />
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
