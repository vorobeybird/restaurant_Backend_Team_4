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
    title: "Оформить заказ",
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

const SOCIAL_LiNKS = [
  {
    socialNetwork: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    socialNetwork: "Instagram",
    link: "https://www.instagram.com/",
  },
  {
    socialNetwork: "VK",
    link: "https://www.vk.com/",
  },
];

const Footer = () => {
  return (
    <footer>
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <div className="links_container">
        <div>
          <ul className="nav_links">
            {NAV_LINKS.map(({ title, link }) => (
              <li>
                <a href={link}>{title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Мы в социальных сетях</h2>
          <ul>
            {SOCIAL_LiNKS.map(({ socialNetwork, link }) => (
              <li>
                <a href={link}>{socialNetwork}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="all_rights_reserved">
        <p>©All rights reserved | Ocean Bar 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
