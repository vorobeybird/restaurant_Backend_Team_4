import "./contacts.scss";
import MapPointer from '../../assets/map-pointer.png';

const Contacts = () => {

  return (
    <div className="contacts_container">
      <div className="contacts" >
        <div className="our-contacts">
          <div className="our-contacts_title">Наши контакты</div>
          <ul className="our-contacts_list">
            <li>
              <img src={MapPointer}  alt="mapPointer"/>
              <div>Минск, Революционная д. 17</div>
            </li>
            <li><img src={MapPointer}  alt="mapPointer"/>
              <div>+375 29 123-23-34</div></li>
            <li><img src={MapPointer}  alt="mapPointer"/>
              <div>Пн- Вс с 8:00 до 23:00</div></li>
          </ul>
        </div>
        <div className="our-app"></div>
      </div>
      <div className="map"></div>
    </div>
  );
};

export default Contacts;
