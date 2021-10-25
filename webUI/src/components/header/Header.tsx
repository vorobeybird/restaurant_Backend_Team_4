import "./header.scss";
import Logo from "../../assets/header_logo.png";
import { Button } from "../common/button/Button";

const Header = () => {
  const goToMenu = () => {
    console.log("to menu page");
  };

  return (
    <div className="header">
      <div className="header_inner"> 
        <div className="header_content">
          <div className="header_logo">Ocean bar</div>
          <div className="header_text">Вкусно. Быстро. Качественно</div>
          <div className="header_btn">
            <Button onClick={goToMenu}>Меню</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
