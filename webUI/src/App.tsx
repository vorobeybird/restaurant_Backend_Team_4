import MainPage from "./pages/mainPage/MainPage";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import "./app.scss";
import {Authentication} from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store";
import {AuthStateType} from "./store/auth/auth.reducer";
import {useEffect} from "react";
//imports for users authentication with amplify
import awsconfig from './aws-exports';
import {Amplify, Auth, Hub} from 'aws-amplify';
Amplify.configure(awsconfig);

const App = () => {
    const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);
    console.log("App rendering")
    console.log(user)
    const dispatch = useDispatch();

    useEffect(() => {
        checkUser();
        setAuthListener();
    }, [])

    async function setAuthListener() {
        Hub.listen('auth', (data: { payload: { event: any; }; }) => {
            switch (data.payload.event) {
                case 'signIn':
                    console.log('user signed in');
                    break;
                case 'signUp':
                    console.log('user signed up');
                    break;
                case 'signOut':
                    dispatch({type: "SIGN_OUT"});
                    break;
                case 'signIn_failure':
                    console.log('user sign in failed');
                    break;
                case 'configured':
                    console.log('the Auth module is configured');
            }
        });
    }

    async function checkUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log("User checking...")
            dispatch({type: "CHECK_USER", payload: user});
        } catch (err) {
            // updateUser(null);
        }
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/login" component={Authentication}/>
                <Route exact path="/menu/bar" component={Menu}/>
                <Route exact path="/menu/breakfast" component={Menu}/>
                <Route exact path="/menu" component={Menu}/>
                <Route exact path="/menu/catch" component={Menu}/>
            </Switch>
        </Router>
    );
};

export default App;
