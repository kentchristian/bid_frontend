import { useMediaQuery } from '@mui/material';
import { createContext, useContext, useMemo, type ReactNode } from 'react';

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export type BreakpointsValue = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  values: typeof BREAKPOINTS;
};

const BreakpointsContext = createContext<BreakpointsValue | null>(null);

const maxWidth = (value: number) => `(max-width: ${value}px)`;
const minWidth = (value: number) => `(min-width: ${value}px)`;
const between = (min: number, max: number) =>
  `(min-width: ${min}px) and (max-width: ${max}px)`;

export const BreakpointProvider = ({ children }: { children: ReactNode }) => {
  const mobile = useMediaQuery(maxWidth(BREAKPOINTS.mobile), { noSsr: true });
  const tablet = useMediaQuery(
    between(BREAKPOINTS.mobile + 1, BREAKPOINTS.tablet),
    { noSsr: true },
  );
  const desktop = useMediaQuery(minWidth(BREAKPOINTS.tablet + 1), {
    noSsr: true,
  });

  const value = useMemo(
    () => ({
      mobile,
      tablet,
      desktop,
      values: BREAKPOINTS,
    }),
    [mobile, tablet, desktop],
  );

  return (
    <BreakpointsContext.Provider value={value}>
      {children}
    </BreakpointsContext.Provider>
  );
};

export const useBreakpoints = () => {
  const ctx = useContext(BreakpointsContext);
  if (!ctx) {
    throw new Error('useBreakpoints must be used within BreakpointProvider');
  }
  return ctx;
};
