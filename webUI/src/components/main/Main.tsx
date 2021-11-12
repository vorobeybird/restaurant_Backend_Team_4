import "./main.scss";
import Figure from "../../assets/figure.png";
import Input from "../common/input/Input";
import InputCTA from "../common/input/InputCTA";
import CalendarLogo from "../../assets/calendar.png";
import ClockLogo from "../../assets/clock.png";
import { Button } from "../common/button/Button";
import Logo from "../../assets/main_logo.png";
import GooglePlay from "../../assets/google_play.png";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store";
import { AuthStateType } from "../../store/auth/auth.reducer";
import { Redirect } from "react-router-dom";
import { ChangeEvent } from "react";

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
  const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("changed");
  };

  const onClickDate = () => {
    console.log("Dclick!");
  };

  const onClickTime = () => {
    console.log("Tclick!");
  };

  if (user === null) return <Redirect to="/login/" />

  return (
    <>
      <div className="how_it_works">
        <div className="label">Как это работает</div>
        <p>4 простых шага для экономии вашего времени</p>
      </div>
      <div className="steps_container">
        {STEPS.map((step: any, index: number) => (
          <div className="step">
            <div className="step_number">{index + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <div className="table_reserve_container">
        <div className="table_reserve">
          <p>Забронируйте стол</p>
          <div className="inputs_container">
            <Input placeholder="&nbsp;&nbsp;Имя" onChange={(onChange)} />
            <Input placeholder="&nbsp;&nbsp;Номер телефона" onChange={onChange} />
            <div className="time_and_date_input_container">
              <InputCTA
                placeholder="&nbsp;&nbsp;Дата"
                onClick={onClickDate}
                Icon={CalendarLogo}
              />
              <InputCTA
                placeholder="&nbsp;&nbsp;Время"
                onClick={onClickTime}
                Icon={ClockLogo}
              />
            </div>
          </div>
          <button className="reserve-btn">Забронировать</button>
        </div>
      </div>

      <div className="main_menu">
        <div className="main_menu__title">Предложение недели</div>
        <div className="main_meals_container">
          <button className="main_meals_container__btn .left_btn"></button>
          {/* {MEAL_BLOCKS.map(({ image, name, price, onclick }) => {
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
                </div>
              </div>
            );
          })} */}
          <div className="meals_container">

          </div>
          <button className="main_meals_container__btn .right_btn"></button>
        </div>
      </div>


    </>
  );
};

export default Main;
