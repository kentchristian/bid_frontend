import { alpha, createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light", // change to 'dark' later if needed
    primary: {
      main: "#fefefe", // your brand color
    },
    secondary: {
      main: "#9333ea",
    },
    background: {
      default: "#242424",
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
