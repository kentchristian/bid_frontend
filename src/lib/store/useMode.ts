import { useCallback, useLayoutEffect, useState } from "react"

export type ThemeMode = "light" | "dark"

const STORAGE_KEY = "theme-mode"

const readStoredMode = (): ThemeMode | null => {
  if (typeof window === "undefined") return null

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored

  return null
}

const getInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "light"

  const stored = readStoredMode()
  if (stored) return stored

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

export const useMode = () => {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialMode())

  useLayoutEffect(() => {
    if (typeof window === "undefined") return

    window.localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.dataset.theme = mode
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return { mode, setMode, toggleMode }
}
