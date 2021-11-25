import "./footer.scss";
import Logo from "../../assets/nav_logo.png";

const NAV_LINKS = [
  {
    title: "Меню",
    link: "#",
  },
  {
    title: "Забронировать стол",
    link: "#",
  },
  {
    title: "Корзина",
    link: "#",
  },
  {
    title: "Профиль",
    link: "#",
  },
  {
    title: "Контакты",
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo"><a style={{textDecoration:'none', color:'white'}} href="#" >Ocean bar</a></div>

      <ul className="nav_links">
        {NAV_LINKS.map(({ title, link }, index) => (
          <li key={index}>
            <a href={link}>{title}</a>
          </li>
        ))}
      </ul>
      <div className="all_rights_reserved">
        <p>©All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
