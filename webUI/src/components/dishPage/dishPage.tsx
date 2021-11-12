import React, { useEffect, useState } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { ICartItem } from "../../store/cart/cart.types";
import { ImageSlider } from "../imageSlider/imageSlider";
import caloriesImg from "../../assets/calories-icon.png";
import { addToCart } from "../../store/cart/cart.actions";
import toast, { Toaster } from "react-hot-toast";

const DishPage = () => {
  interface Iingredients {
    id: number;
    title: string;
    DishIngredient: {
      is_default: boolean;
    };
  }

  const selectedDish: ICartItem = useAppSelector(
    (state) => state.dishPage.selectedDish
  );

  const [gearState, setGearState] = useState(false);
  const [pickedIngredients, setPickedIngredients] = useState([
    ...selectedDish.ingredient,
  ]);

  const onGear = () => setGearState(!gearState);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cartItems.items);

  const onOrder = (item: ICartItem): void => {
    toast.success(`Блюдо "${item.title}" добавлено в корзину`);
    dispatch(addToCart(item, items));
  };

  const sliderData: { image: string }[] = selectedDish.photo.map(
    (photo, index) => {
      return { image: photo.photo_url };
    }
  );

  return (
    <div className="dish-page">
      <div className="dish-page__container">
        <div className="bread-crumbs"></div>
        <div className="dish-title">{selectedDish.title}</div>
        <div className="dish-item-container">
          <div className="dish-item-photos">
            {<ImageSlider sliderData={sliderData} />}
          </div>
          <div className="dish-item-info">
            <div className="dish-gear_wrapper">
              <div className="gear-title">Состав</div>
              <button className="gear-button" onClick={onGear}>
                Изменить
              </button>
            </div>
            <div className="dish-description">
              <div className="dish-ingredients">
                {pickedIngredients.map((item) => {
                  return (
                    <div className="ingredient-wrapper">
                      {gearState && !item.DishIngredient.is_default ? (
                        <input
                          type="checkbox"
                          className="ingredient-checkbox"
                        ></input>
                      ) : null}
                      <div className="ingredient-title">
                        {" "}
                        &#8226; {item.title}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="dish-calories">
                <img
                  src={caloriesImg}
                  alt="calories-img"
                  className="calories-img"
                />
                <div className="calories-amount">
                  {selectedDish.calories} Ккал
                </div>
              </div>
              <div className="dish-price"> {selectedDish.price} BYN</div>
            </div>
            <button
              className="dish-item-info__btn"
              onClick={() => onOrder(selectedDish)}
            >
              Заказать
            </button>
          </div>
        </div>
        <div className="may-interest"></div>
      </div>
    </div>
  );
};

export default DishPage;
