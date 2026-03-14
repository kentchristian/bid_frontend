import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import "./App.css";
import Layout from "./layout";
import { useMode } from "./lib/store/useMode";
import { getTheme } from "./lib/theme/mui-theme";
import Dashboard from "./pages/dashboard";

const App = () => {
  const { mode, toggleMode } = useMode();

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Layout mode={mode} onToggleMode={toggleMode}>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
