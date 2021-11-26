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

  // if (user === null) return <Redirect to="/login" />

  const [step, setStep] = useState(1);

  let dishes = useAppSelector((state) => state.menu.items);
  useEffect(() => {
    if (localStorage.getItem(`saveDishes`)) {
      const newDishes = JSON.parse(localStorage[`saveDishes`]);
      dishesForWeek = newDishes.filter(
        (value: MenuItem, index: number) => index < 12
      );
      setTempDishesForWeek(
        dishesForWeek.filter((dish, index) => {
          return index < step * 4 && index >= step * 4 - 4;
        })
      );
    } else {
      dispatch(fetchDishes());
    }
  }, []);

  useEffect(() => {
    if (dishes.length !== 0) {
      localStorage.setItem("saveDishes", JSON.stringify(dishes));
      dishesForWeek = dishes.filter(
        (value: MenuItem, index: number) => index < 12
      );
      setTempDishesForWeek(
        dishesForWeek.filter((dish, index) => {
          return index < step * 4 && index >= step * 4 - 4;
        })
      );
    }
  }, [dishes]);

  let dishesForWeek = dishes.filter(
    (value: MenuItem, index: number) => index < 12
  );

  const [tempDishesForWeek, setTempDishesForWeek] = useState(
    dishesForWeek.filter((dish, index) => index < 4)
  );

  const goPrevDishes = () => {
    if (step > 1) {
      setStep((state) => state - 1);
      const newStep = step - 1;
      const newDishes = localStorage.getItem("saveDishes");
      if (newDishes)
        dishesForWeek = JSON.parse(newDishes).filter(
          (value: MenuItem, index: number) => index < 12
        );
      setTempDishesForWeek(
        dishesForWeek.filter((dish, index) => {
          return index < newStep * 4 && index >= newStep * 4 - 4;
        })
      );
    }
  };

  const goNextDishes = () => {
    if (step < 3) {
      setStep((state) => state + 1);
      const newStep = step + 1;
      const newDishes = localStorage.getItem("saveDishes");
      if (newDishes)
        dishesForWeek = JSON.parse(newDishes).filter(
          (value: MenuItem, index: number) => index < 12
        );
      setTempDishesForWeek(
        dishesForWeek.filter((dish, index) => {
          return index < newStep * 4 && index >= newStep * 4 - 4;
        })
      );
    }
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
