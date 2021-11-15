import "./Profile.scss";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store";
import {AuthStateType} from "../../store/auth/auth.reducer";
import {Auth} from "aws-amplify";
import {NavLink, Route} from "react-router-dom"
import ProfileOrders from "./Profile-Orders/ProfileOrders";
import ProfileInfo from "./Profile-Info/ProfileInfo";
import ProfileAddress from "./Profile-Address/ProfileAddress";
import ProfileCards from "./Profile-Cards/ProfileCards";
import ProfilePassword from "./Profile-Password/ProfilePassword";

function Profile() {
    const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);

    async function signOutHandler() {
        try {
            if (user) {
                await Auth.signOut();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className={"profile"}>
            <h1 className={"profile__title"}>Профиль</h1>
            <div className={"profile__body"}>
                <div className={"profile-navigation"}>
                    <ul className={"profile-navigation__list"} >
                        <li className={"profile-navigation__item"}>
                            <NavLink activeClassName={"active"} to="/profile/orders">Мои заказы</NavLink>
                        </li>
                        <li className={"profile-navigation__item"}>
                            <NavLink activeClassName={"active"} to="/profile/info">Личные данные</NavLink>
                        </li>
                        <li className={"profile-navigation__item"}>
                            <NavLink activeClassName={"active"} to="/profile/address">Адрес</NavLink>
                        </li>
                        <li className={"profile-navigation__item"}>
                            <NavLink activeClassName={"active"} to="/profile/cards">Мои карты</NavLink>
                        </li>
                        <li className={"profile-navigation__item"}>
                            <NavLink activeClassName={"active"} to="/profile/password">Пароль</NavLink>
                        </li>
                        <li className={"profile-navigation__item"}>
                            <NavLink onClick={signOutHandler} activeClassName={"active"} to="/login" exact>Выход</NavLink>
                        </li>
                    </ul>
                </div>
                <div className={"profile-content"}>
                    <switch>
                        <Route path="/profile/orders">
                            <ProfileOrders/>
                        </Route>
                        <Route path="/profile/info">
                            <ProfileInfo/>
                        </Route>
                        <Route path="/profile/address">
                            <ProfileAddress/>
                        </Route>
                        <Route path="/profile/cards">
                            <ProfileCards/>
                        </Route>
                        <Route path="/profile/password">
                            <ProfilePassword/>
                        </Route>
                    </switch>
                </div>
            </div>
        </section>
    );
};

export default Profile;
