import "./header.scss";
import Logo from "../../assets/header_logo.png";
import { Button } from "../common/button/Button";

const Header = () => {
  const goToMenu = () => {
    console.log("to menu page");
  };

  return (
    <div className="header">
      <img src={Logo} alt="logo" />
      <h2>Вкусно. Быстро. Качественно</h2>
      <Button type="button" onClick={goToMenu}>Меню</Button>
    </div>
  );
};

export default Header;
