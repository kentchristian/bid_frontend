import {
  Alert,
  Snackbar,
  type AlertColor,
  type SnackbarOrigin,
} from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react';

type SnackbarOptions = {
  variant?: AlertColor;
  duration?: number | null;
  anchorOrigin?: SnackbarOrigin;
  action?: ReactNode;
};

type SnackbarContextValue = {
  showSnackbar: (message: string, options?: SnackbarOptions) => void;
  closeSnackbar: () => void;
};

type SnackbarState = {
  open: boolean;
  message: string;
  variant: AlertColor;
  duration: number | null;
  anchorOrigin: SnackbarOrigin;
  action?: ReactNode;
  key: number;
};

const DEFAULT_ANCHOR: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const getAlertStyles = (variant: AlertColor) => {
  if (variant === 'success') {
    return {
      backgroundColor: 'var(--accent-positive)',
      color: 'var(--positive-chip-text)',
      border: '1px solid var(--accent-positive)',
    };
  }

  if (variant === 'error') {
    return {
      backgroundColor: 'var(--accent-negative)',
      color: '#ffffff',
      border: '1px solid var(--accent-negative)',
    };
  }

  return {
    backgroundColor: 'var(--card)',
    color: 'var(--main-text)',
    border: '1px solid var(--card-border)',
  };
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SnackbarState>({
    open: false,
    message: '',
    variant: 'success',
    duration: 3000,
    anchorOrigin: DEFAULT_ANCHOR,
    action: undefined,
    key: 0,
  });

  const showSnackbar = useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      setState((prev) => ({
        ...prev,
        open: true,
        message,
        variant: options.variant ?? 'success',
        duration: options.duration ?? 3000,
        anchorOrigin: options.anchorOrigin ?? DEFAULT_ANCHOR,
        action: options.action,
        key: Date.now(),
      }));
    },
    [],
  );

  const closeSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const handleClose = useCallback(
    (_event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      closeSnackbar();
    },
    [closeSnackbar],
  );

  const value = useMemo(
    () => ({ showSnackbar, closeSnackbar }),
    [showSnackbar, closeSnackbar],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        key={state.key}
        open={state.open}
        onClose={handleClose}
        autoHideDuration={state.duration ?? undefined}
        anchorOrigin={state.anchorOrigin}
      >
        <Alert
          onClose={handleClose}
          severity={state.variant}
          variant="filled"
          action={state.action}
          sx={{
            ...getAlertStyles(state.variant),
            minWidth: 260,
            borderRadius: 2,
            boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            '& .MuiAlert-icon': { color: 'inherit' },
            '& .MuiAlert-action': { color: 'inherit' },
          }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return ctx;
};
