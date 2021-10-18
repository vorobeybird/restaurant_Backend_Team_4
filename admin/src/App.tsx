import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from './theme/index';
import GlobalStyles from './theme/GlobalStyles';
import { Route, Switch } from 'react-router-dom';
import LoginLayout from './components/layouts/LoginLayout';
import AdminLayout from './components/layouts/AdminLayout';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (<StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    <div className="App">
    <Switch>
        <Route path="/login"><LoginLayout /></Route>
        <Route path="/"><AdminLayout/></Route>
      </Switch>
    </div>
    </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
