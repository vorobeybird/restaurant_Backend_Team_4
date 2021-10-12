import MainPage from "./pages/mainPage/MainPage";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.scss";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
