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
                {/* <img src={MapPointer} alt="mapPointer" /> */}
                
                <div>Минск, Революционная д. 17</div>
              </li>
              <li><img src={Phone} alt="mapPointer" />
                <div>+375 29 123-23-34</div></li>
              <li><img src={Clock} alt="mapPointer" />
                <div>Пн- Вс с 8:00 до 23:00</div></li>
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
            </ul>
          </div>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9402.7932719204!2d27.54608244970704!3d53.90156584693363!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfe967b4142f%3A0xc70eccdee62c5086!2z0YPQuy4g0KDQtdCy0L7Qu9GO0YbQuNC-0L3QvdCw0Y8gMTcsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1637768488215!5m2!1sru!2sby" width={"1600"} height={"400"} style={{border:0}} loading="lazy"></iframe>
      </div>
    );
  };

  export default Contacts;
