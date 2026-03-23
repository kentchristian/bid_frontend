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
import { validateUser } from '../api/auth';

type MiddlewareContextValue = {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  setAuthenticated: (value: boolean, options?: SetAuthenticatedOptions) => void;
};

const MiddlewareContext = createContext<MiddlewareContextValue | null>(null);

type SetAuthenticatedOptions = {
  remember?: boolean;
};

export const MiddlewareProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const isValid = await validateUser();
        if (!cancelled) {
          setIsAuthenticated(isValid);
        }
      } catch {
        if (!cancelled) {
          setIsAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }
      }
    };

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  const setAuthenticated = (
    value: boolean,
    _options?: SetAuthenticatedOptions,
  ) => {
    setIsAuthenticated(value);
    setIsCheckingAuth(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isCheckingAuth,
      setAuthenticated,
    }),
    [isAuthenticated, isCheckingAuth],
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
  const { isAuthenticated, isCheckingAuth } = useMiddleware();
  const location = useLocation();
  const isRootPath = location.pathname === '/' || location.pathname === '';

  if (isCheckingAuth) {
    return null;
  }

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
  const { isAuthenticated, isCheckingAuth } = useMiddleware();

  if (isCheckingAuth) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
