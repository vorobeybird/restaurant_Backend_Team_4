import "./main.scss";
import Figure from "../../assets/figure.png";
import Input from "../common/input/Input";
import InputCTA from "../common/input/InputCTA";
import CalendarLogo from "../../assets/calendar.png";
import ClockLogo from "../../assets/clock.png";
import { Button } from "../common/button/Button";
import Logo from "../../assets/main_logo.png";
import GooglePlay from "../../assets/google_play.png";

const STEPS = [
  "Забронируйте стол",
  "Сделайте предзаказ",
  "Оплатите онлайн",
  "К вашему приходу все готово",
];

const MEAL_BLOCKS = [
  {
    image: Figure,
    name: "Название блюда",
    price: 8,
    onclick: () => console.log("Order"),
  },
  {
    image: Figure,
    name: "Название блюда",
    price: 10,
    onclick: () => console.log("Order"),
  },
  {
    image: Figure,
    name: "Название блюда",
    price: 14,
    onclick: () => console.log("Order"),
  },
  {
    image: Figure,
    name: "Название блюда",
    price: 6,
    onclick: () => console.log("Order"),
  },
];

const Main = () => {
  const onChange = () => {
    console.log("changed");
  };

  const onClickDate = () => {
    console.log("Dclick!");
  };

  const onClickTime = () => {
    console.log("Tclick!");
  };

  return (
    <>
      <div className="how_it_works">
        <h3>Как это работает</h3>
        <p>4 простых шага для экономии вашего времени</p>
      </div>
      <div className="steps_container">
        {STEPS.map((step) => (
          <div className="step">
            <img src={Figure} alt="figure" />
            <p>{step}</p>
          </div>
        ))}
      </div>
      <div className="table_resevation_container">
        <p>Забронируйте стол</p>
        <div className="inputs_container">
          <div>
            {/*<Input placeholder="Имя Фамилия" onChange={onChange} />*/}
            {/*<Input placeholder="Номер телефона" onChange={onChange} />*/}
          </div>
          <div className="time_and_date_input_container">
            {/*<InputCTA*/}
            {/*  placeholder="Дата"*/}
            {/*  onClick={onClickDate}*/}
            {/*  Icon={CalendarLogo}*/}
            {/*/>*/}
            {/*<InputCTA*/}
            {/*  placeholder="Время"*/}
            {/*  onClick={onClickTime}*/}
            {/*  Icon={ClockLogo}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
      <div className="main_menu">
        <h2>Меню</h2>
        <div className="tabs">
          <p>Завтраки</p>
          <p className="active_tab">Основное меню</p>
          <p>Меню бара</p>
          <p>Улов недели</p>
        </div>

        <div className="main_meals_container">
          {MEAL_BLOCKS.map(({ image, name, price, onclick }) => {
            return (
              <div className="meals_container">
                <div className="meal">
                  <div>
                    <img src={image} alt="meal icon" />
                  </div>
                  <div>
                    <p>{name}</p>
                    <p>Цена: ${price}</p>
                  </div>
                  <div>
                    {/*<Button onClick={onclick}>Заказать</Button>*/}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="more_details">
          <a href="#">Подробнее</a>
        </div>
      </div>

      <div className="main_install_app_container">
        <div>
          <h2>Установите наше приложение</h2>
        </div>
        <div className="main_install_app">
          <div className="main_logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="app_link_container">
            <div>
              <p>
                Приложение Ocean Bar
                <br />
                Позволяет забронировать
                <br /> стол, выбрать еду и <br />
                оформить заказ в несколько
                <br /> касаний.
              </p>
            </div>
            <div className="google_logo">
              <a href="#">
                <img src={GooglePlay} alt="google play" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
