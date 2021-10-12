import "./contacts.scss";
import Map from "../../assets/map.png";
import PhoneLogo from "../../assets/phone.png";
import ClockLogo from "../../assets/clock.png";
import { Button } from "../common/button/Button";

const Contacts = () => {
  const onClickReserveTable = () => {
    console.log("Table is reserved!");
  };

  return (
    <div className="contacts_container">
      <div>
        <h2>Контакты</h2>
        <div>
          <p>Ул. Революционная д. 17, Минск, Беларусь</p>
          <div className="phone_container">
            <div className="phone_logo">
              <img src={PhoneLogo} alt="phone"></img>
            </div>
            <p>+375 29 123 45 67</p>
          </div>
          <div className="clock_container">
            <div className="clock_logo">
              <img src={ClockLogo} alt="clock" />
            </div>
            <p>Пн-Вс 08:00 - 23:00</p>
          </div>
        </div>
        <Button onClick={onClickReserveTable}>Забронируйтете стол</Button>
      </div>
      <div>
        <img src={Map} alt="map"></img>
      </div>
    </div>
  );
};

export default Contacts;
