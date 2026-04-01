import { alpha, createTheme, darken } from "@mui/material/styles"
import "@mui/x-date-pickers/themeAugmentation"

type ThemeMode = "light" | "dark"

const LIGHT_BG = "#f3f3f3"
const DARK_BG = "#242424"
const LIGHT_TEXT = "#1f2937"
const DARK_TEXT = "#f4f4f5"

export const getTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#fefefe", // brand color
      },
      secondary: {
        main: "#9333ea",
      },
      background: {
        default: mode === "dark" ? DARK_BG : LIGHT_BG,
        paper: mode === "dark" ? "#2b2b2b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? DARK_TEXT : LIGHT_TEXT,
      },
    },

    shape: {
      borderRadius: 12, // global border radius
    },

    typography: {
      fontFamily: "Inter, sans-serif",
      button: {
        textTransform: "none", // remove uppercase
        fontWeight: 600,
      },
    },

    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: ({ theme }) => {
            const isLight = theme.palette.mode === "light"
            const selectedBg = theme.palette.text.primary
            const selectedText = theme.palette.background.paper
            const hoverBg = alpha(selectedBg, isLight ? 0.12 : 0.2)

            return {
              borderRadius: "50%",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: hoverBg,
                
              },
              "&.Mui-selected": {
                backgroundColor: selectedBg,
                color: selectedText,
                fontWeight: 600,
                
              },
              "&.Mui-selected:hover, &.Mui-selected:focus": {
                backgroundColor: darken(selectedBg, 0.15),
              },
              "&.MuiPickersDay-today": {
                border: `1px solid ${selectedBg}`,
                
                
              },
            }
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            padding: "6px 10px",
            transition: theme.transitions.create(
              ["background-color", "color", "filter"],
              {
                duration: theme.transitions.duration.short,
              },
            ),
          }),
          text: () => ({
            color: "var(--main-text)",
            "&:hover": {
              backgroundColor: "var(--sidebar-hover)",
              color: "var(--main-text)",
            },
          }),
          outlined: () => ({
            color: "var(--main-text)",
            borderColor: "var(--sidebar-border)",
            "&:hover": {
              backgroundColor: "var(--sidebar-hover)",
              borderColor: "var(--sidebar-border)",
            },
          }),
          contained: () => ({
            backgroundColor: "var(--main-text)",
            color: "var(--main-bg)",
            "&:hover": {
              backgroundColor: "var(--main-text)",
              filter: "brightness(0.9)",
            },
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  })
