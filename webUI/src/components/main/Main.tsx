import "./main.scss";
import { useSelector } from "react-redux";
import { AppStateType } from "../../store";
import { AuthStateType } from "../../store/auth/auth.reducer";
import { Link, Redirect } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { fetchCategories, fetchDishes } from "../../store/menu/menu.actions";
import { MenuItem } from "../../store/menu/menu.types";
import { ICartItem } from "../../store/cart/cart.types";
import { setSelectedDish } from "../../store/dishPage/dishPage.actions";
import NextLogo from "../../assets/next.png";
import PrevLogo from "../../assets/prev.png";

const STEPS = [
  "Забронируйте стол",
  "Сделайте предзаказ",
  "Оплатите онлайн",
  "К вашему приходу все готово",
];

const Main = () => {
  const user = useSelector<AppStateType, AuthStateType>(
    (state) => state.auth.user
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDishes());
  }, []);

  // if (user === null) return <Redirect to="/login" />

  const [step, setStep] = useState(1);

  const dishes = useAppSelector((state) => state.menu.items);
  const dishesForWeek = dishes.filter(
    (value: MenuItem, index: number) => index < 12
  );

  console.log(dishesForWeek);
  console.log(step, "step");

  const [tempDishesForWeek, setTempDishesForWeek] = useState(
    dishesForWeek.filter((dish, index) => index < 4)
  );

  useEffect(() => {
    setTempDishesForWeek(
      dishesForWeek.filter((dish, index) => {
        return index < step * 4 && index >= step * 4 - 4;
      })
    );
    console.log(tempDishesForWeek);
  }, [step]);

  const goPrevDishes = () => {
    if (step > 1) setStep((state) => state - 1);
  };

  const goNextDishes = () => {
    if (step < 3) setStep((state) => state + 1);
  };

  const handleDishClick = (item: ICartItem | MenuItem) => {
    dispatch(setSelectedDish(item));
  };

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

      <div className="main_menu">
        <div className="main_menu__title">Предложение недели</div>
        <div className="main_meals_container">
          <button
            className={`main_meals_container__btn ${
              step === 1 ? "blur" : undefined
            }`}
            onClick={goPrevDishes}
          >
            <img src={PrevLogo} alt="prev" />
          </button>
          <div className="meals_container">
            {tempDishesForWeek?.map((dish) => {
              return (
                <Link
                  to="/dishPage"
                  className="dish-link"
                  onClick={() => handleDishClick(dish)}
                >
                  <MenuItemComponent {...dish} />
                </Link>
              );
            })}
          </div>
          <button
            className={`main_meals_container__btn ${
              step === 3 ? "blur" : undefined
            }`}
            onClick={goNextDishes}
          >
            <img src={NextLogo} alt="next" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
