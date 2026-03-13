import { ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import PageContainer from "./components/common/PageContainer";
import Layout from "./layout";
import { getTheme } from "./lib/theme/mui-theme";

type ThemeMode = "light" | "dark"

const App = () => {
  const [mode, setMode] = useState<ThemeMode>("light")

  const theme = useMemo(() => getTheme(mode), [mode])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <Layout
        mode={mode}
        onToggleMode={() =>
          setMode((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        <PageContainer>Hi</PageContainer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
