import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    mode: "light", // change to 'dark' later if needed
    primary: {
      main: "#2563eb", // your brand color
    },
    secondary: {
      main: "#9333ea",
    },
    background: {
      default: "#f9fafb",
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
        root: {
          borderRadius: 5,
          padding: "5px 5px",
          // backgroundColor: "#2563eb"
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fdfdfd",
            color: "#000000",
          },
        },
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