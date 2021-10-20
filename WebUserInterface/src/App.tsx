import MainPage from "./pages/mainPage/MainPage";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.scss";

//imorts for users authentication with amplify
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Menu from "./pages/menu/Menu";
Amplify.configure(awsconfig);


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/menu/bar" component={Menu} />
        <Route exact path="/menu/breakfast" component={Menu} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menu/catch" component={Menu} />
      </Switch>
    </Router>
  );
};

export default App;
