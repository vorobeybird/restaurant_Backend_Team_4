import Logo from "../../assets/nav_logo.png";
import SearchIcon from "../../assets/search.png";
import Cart from "../../assets/cart.png";
import Profile from "../../assets/profile.png";
import "./navigation.scss";
import { Link } from "react-router-dom";

interface LinkType {
  title: string;
  link: string;
}

const links: LinkType[] = [
  { title: "Меню", link: "/menu" },
  { title: "Забронировать стол", link: "/#" },
  { title: "Оформить заказ", link: "/#" },
];

const Navigation = () => {
  return (
    <div className="navigation">
      <img className="logo" src={Logo} alt="logo" />
      <div className="input_container">
        <input className="input" type="text" placeholder="Искать блюдо..." />
        <img className="search_icon" src={SearchIcon} alt="search icon"></img>
      </div>
      <div className="links">
        {links.map(({ title, link }) => {
          return (
            <Link key={title} className="link" to={link}>
              {title}
            </Link>
          );
        })}
      </div>
      <div className="navigation_icons_container">
        <Link to="/#">
          <img className="cart_icon" src={Cart} alt="cart icon"></img>
        </Link>
        <Link to="/login">
          <img className="profile_icon" src={Profile} alt="profile icon"></img>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
