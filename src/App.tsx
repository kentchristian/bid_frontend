import { ThemeProvider } from "@mui/material";
import './App.css';
import PageContainer from './components/common/PageContainer';
import Layout from './layout';
import { theme } from './lib/theme/mui-theme';
const App = () => {
  return (
     <ThemeProvider theme={theme}>
      <Layout> 
        <PageContainer> 
          Hi 
        </PageContainer>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
