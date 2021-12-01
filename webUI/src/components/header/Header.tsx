import "./header.scss";
import Logo from "../../assets/header_logo.png";
import { Button } from "../common/button/Button";
import { useHistory } from "react-router";

const Header = () => {
  let history = useHistory();

  const goToMenu = () => {
    history.push("/menu");
  };

  return (
    <div className="header">
      <div className="header_inner">
        <div className="header_content">
          <div className="header_logo">Ocean bar</div>
          <div className="header_text">Вкусно. Быстро. Качественно</div>
          <div className="header_btn">
            <Button type="button" onClick={goToMenu}>
              Меню
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
