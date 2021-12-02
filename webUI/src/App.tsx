import { PersistGate } from 'redux-persist/integration/react'
import MainPage from "./pages/mainPage/MainPage";
import "./app.scss";
import {Authentication} from "./pages/login/Login";
import Menu from "./pages/menu/Menu";
import {Cart} from "./components/cart/Cart";
import {OrderConfirmation} from "./components/orderConfirmation/orderConfirmation"
import Navigation from "./components/navigation/Navigation";
import Contacts from "./components/contacts/Contacts";
import Footer from "./components/footer/Footer";
import DishPage from "./components/dishPage/dishPage";
import Profile from "./pages/profile/Profile";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store";
import {AuthStateType} from "./store/auth/auth.reducer";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import awsconfig from "./aws-exports";
import {Amplify, Auth, Hub} from "aws-amplify";
import { Search } from "./components/search/search";
import { BookTableWithoutDish } from "./components/bookTableWithoutDish/BookTableWithoutDish";
import { FaRegIdBadge } from "react-icons/fa";
import { persistor } from './store';

Amplify.configure(awsconfig);

const App = () => {
    console.log("App rendering")
    const dispatch = useDispatch();
    useEffect(() => {
        persistor.purge();
        checkUser();
        setAuthListener();
    }, []);

    async function setAuthListener() {
        Hub.listen("auth", (data: { payload: { event: any } }) => {
            switch (data.payload.event) {
                case "signIn":
                    console.log("user signed in");
                    break;
                case "signUp":
                    console.log("user signed up");
                    break;
                case "signOut":
                    dispatch({type: "SIGN_OUT"});
                    break;
                case "signIn_failure":
                    console.log("user sign in failed");
                    break;
                case "configured":
                    console.log("the Auth module is configured");
            }
        });
    }

    async function checkUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log("User checking...");
            dispatch({type: "CHECK_USER", payload: user});
        } catch (err) {
            // updateUser(null);
        }
    }

    return (
        <PersistGate loading={null} persistor={persistor} >
            <Router>
                <Navigation/>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        className: "",
                        style: {
                            border: "none",
                            borderRadius: "15px",
                            padding: "16px",
                            color: "#FFFFFF",
                            backgroundColor: "rgba(239, 117, 43, 0.7)",
                            
                        },
                    }}
                />
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/login" component={Authentication}/>
                    <Route exact path="/menu" component={Menu}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route path="/dishPage" component={DishPage}/>
                    <Route path="/profile">
                        <Profile></Profile>
                        <Redirect to={"/profile/orders"}/>
                    </Route>
                    <Route path="/search" component={Search}/>
                    <Route exact path="/booktable" component={BookTableWithoutDish}/>
                    <Route path="/cart/confirm" component={OrderConfirmation}/>

                </Switch>
                <Contacts/>
                <Footer/>
            </Router>
        </PersistGate>
    );
};

export default App;
