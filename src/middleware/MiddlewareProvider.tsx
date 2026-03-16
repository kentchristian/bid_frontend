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
  setAuthenticated: (value: boolean) => void;
};

const MiddlewareContext = createContext<MiddlewareContextValue | null>(null);

const STORAGE_KEY = 'bid.authenticated';

const readStoredAuth = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'true';
};

export const MiddlewareProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);

  useEffect(() => {
    setIsAuthenticated(readStoredAuth());
  }, []);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
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
