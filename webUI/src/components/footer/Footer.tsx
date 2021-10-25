import "./footer.scss";
import Logo from "../../assets/nav_logo.png";

const NAV_LINKS = [
  {
    title: "Меню",
    link: "#",
  },
  {
    title: "Оформить заказ",
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
    title: "Условия пользвания",
    link: "#",
  },
  {
    title: "Политика Конфиденциальности",
    link: "#",
  },
  {
    title: "Политика cookies",
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        Ocean bar
      </div>

      <ul className="nav_links">
        {NAV_LINKS.map(({ title, link }) => (
          <li>
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
