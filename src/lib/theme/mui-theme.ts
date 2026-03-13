import { alpha, createTheme } from "@mui/material/styles"

type ThemeMode = "light" | "dark"

const LIGHT_BG = "#f3f3f3"
const DARK_BG = "#242424"

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
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            padding: "6px 10px",
            transition: theme.transitions.create(["background-color", "color"], {
              duration: theme.transitions.duration.short,
            }),
          }),
          text: ({ theme }) => ({
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
              color: theme.palette.primary.main,
            },
          }),
          outlined: ({ theme }) => ({
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.4),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderColor: theme.palette.primary.main,
            },
          }),
          contained: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
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
