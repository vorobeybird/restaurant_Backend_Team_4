import "./header.scss";
import Logo from "../../assets/header_logo.png";
import { Button } from "../common/button/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_inner">
        <div className="header_content">
          <div className="header_logo">Ocean bar</div>
          <div className="header_text">Вкусно. Быстро. Качественно</div>
          <div className="header_btn">
            <Button type="button">
              <Link className="header_btn_to_menu" to="/menu">
                Меню
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
