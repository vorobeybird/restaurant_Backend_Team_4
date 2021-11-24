import Logo from "../../assets/nav_logo.png";
import SearchIcon from "../../assets/search.png";
import Cart from "../../assets/cart.png";
import Profile from "../../assets/profile.png";
import "./navigation.scss";
import {Link, Redirect, useHistory} from "react-router-dom";
import { Auth } from "aws-amplify";
import {useDispatch, useSelector} from "react-redux";
import { AppStateType } from "../../store";
import { AuthStateType } from "../../store/auth/auth.reducer";
import {useState} from "react";

interface LinkType {
  title: string;
  link: string;
}

const Navigation = () => {
  const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const links: LinkType[] = [
    { title: "Меню", link: "/menu" },
    { title: "Забронировать стол", link: user && user.username.length > 0 ? "/booktable" : '/'}
  ];

  const changeRoute = (path: string) => {
    history.push(path);
  }

  return (
    <div className="navigation">
      <div className="logo" onClick={() => changeRoute('/')}>Ocean bar</div>
      <div className="links">
        {links.map(({ title, link }) => {
          return (
            <Link key={title} className="link" to={link}>
              {title}
            </Link>
          );
        })}
      </div>
      <div className="input_container">
        <div className="input">
          <div className="input_label">Поиск</div>
        </div>
        <img className="search_icon" src={SearchIcon} alt="search icon" onClick={() => changeRoute('/search')}></img>
      </div>
      <div className="navigation_icons_container">
        <Link to={user && user.username.length > 0 ? "/cart" : "/"}>
          <img className="cart_icon" src={Cart} alt="cart icon"></img>
        </Link>
        <Link to={user && user.username.length > 0 ? "/profile" : "/"} onClick={() => {}}>
          <img
            className="profile_icon"
            src={Profile}
            alt="profile icon"
          ></img>
        </Link>
      </div>

      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          <div className="menu__item">
            <div>
            < img className="search_icon" src={SearchIcon} alt="search icon" onClick={() => changeRoute('/search')}></img>
            </div>
            <Link to={user && user.username.length > 0 ? "/cart" : "/"}>
              <img className="cart_icon" src={Cart} alt="cart icon"></img>
            </Link>
            <Link to="/profile">
              <img className="profile_icon" src={Profile} alt="profile icon"></img>
            </Link>
          </div>
          {links.map(({ title, link }) => {
            return (
              <Link key={title} className="menu__item" to={link}>
                {title}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
