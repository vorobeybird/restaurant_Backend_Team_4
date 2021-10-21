import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';
import { Route, Switch } from 'react-router-dom';
import LoginLayout from './components/layouts/LoginLayout';
import AdminLayout from './components/layouts/AdminLayout';

function App() {

  console.log(process.env.REACT_APP_API)
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
