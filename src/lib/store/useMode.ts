import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';

const parseStoredMode = (stored: string | null): ThemeMode | null => {
  if (!stored) return null;
  if (stored === 'light' || stored === 'dark') return stored;

  try {
    const parsed = JSON.parse(stored) as { state?: { mode?: ThemeMode } };
    const mode = parsed?.state?.mode;
    return mode === 'light' || mode === 'dark' ? mode : null;
  } catch {
    return null;
  }
};

const readStoredMode = (): ThemeMode | null => {
  if (typeof window === 'undefined') return null;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return parseStoredMode(stored);
};

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';

  const stored = readStoredMode();
  if (stored) return stored;

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const applyModeToDocument = (mode: ThemeMode) => {
  if (typeof window === 'undefined') return;

  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
};

type ModeStore = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const fallbackStorage = {
  getItem: (_name: string) => null,
  setItem: (_name: string, _value: string) => {},
  removeItem: (_name: string) => {},
};

export const useMode = create<ModeStore>()(
  persist(
    (set, get) => ({
      mode: getInitialMode(),
      setMode: (mode) => {
        applyModeToDocument(mode);
        set({ mode });
      },
      toggleMode: () => {
        const next = get().mode === 'light' ? 'dark' : 'light';
        applyModeToDocument(next);
        set({ mode: next });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? fallbackStorage : localStorage,
      ),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state?.mode) applyModeToDocument(state.mode);
      },
    },
  ),
);

export const useThemeMode = () => useMode((state) => state.mode);
export const useSetMode = () => useMode((state) => state.setMode);
export const useToggleMode = () => useMode((state) => state.toggleMode);
