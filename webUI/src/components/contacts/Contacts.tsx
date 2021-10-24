import "./contacts.scss";
import MapPointer from '../../assets/map-pointer.png';
import Phone from '../../assets/phone.png';
import Clock from '../../assets/clock.png';
import Instagram from '../../assets/instagram.png';
import Facebook from '../../assets/facebook.png';
import GooglePlay from '../../assets/googlePlay.png';
import AppStore from '../../assets/appStore.png';

const Contacts = () => {

  return (
    <div className="contacts_container">
      <div className="contacts" >
        <div className="our-contacts">
          <div className="our-contacts_title">Контакты</div>
          <ul className="our-contacts_list">
            <li>
              <img src={MapPointer} alt="mapPointer" />
              <div>Минск, Революционная д. 17</div>
            </li>
            <li><img src={Phone} alt="mapPointer" />
              <div>+375 29 123-23-34</div></li>
            <li><img src={Clock} alt="mapPointer" />
              <div>Пн- Вс с 8:00 до 23:00</div></li>
          </ul>
          <ul className="our-contacts_social">
            <li>
              <a href="https://www.instagram.com/">
                <img src={Instagram} alt="instagram-logo" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/">
                <img src={Facebook} alt="facebook-logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="our-app">
          <div className="our-app_title">Наше приложение Ocean bar</div>
          <div className="our-app_sub-title">позволяет забронировать стол,  выбрать еду и оформить заказ в несколько касаний</div>
          <ul className="our-app_markets">
            <li>
              <a href="https://play.google.com/">
                <img src={GooglePlay} alt="google-play-logo" />
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/ru/app-store/">
                <img src={AppStore} alt="app-store-logo" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="map"></div>
    </div>
  );
};

export default Contacts;
