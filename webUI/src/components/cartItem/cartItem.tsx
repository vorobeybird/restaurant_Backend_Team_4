import "@brainhubeu/react-carousel/lib/style.css";
import { useState } from "react";
import Gear from "../../assets/gear.png";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "../common/button/Button";
import { useAppDispatch } from "../../store/hooks";
import {
  decrementNumofDishes,
  deleteFromCart,
  incrementNumOfDishes,
} from "../../store/cart/cart.actions";
import { useAppSelector } from "../../store/hooks";
import "./cart.scss";
import { ICartItem } from "../../store/cart/cart.types";
import Plus from "../../assets/plus.png";
import Minus from "../../assets/minus.png";

export const CartItem = (item: ICartItem) => {
  const [gearState, setGearState] = useState(false);
  const [pickedIngredients, setPickedIngredients] = useState(item.ingredient);

  const onGear = () => setGearState(!gearState);

  // const onCheckbox = (item: number) => {
  //   if (pickedIngredients.includes(item)) {
  //     const array = [...pickedIngredients];
  //     const index = array.indexOf(item);
  //     if (index > -1) {
  //       array.splice(index, 1);
  //     }
  //     setPickedIngredients(array.sort());
  //   } else {
  //     setPickedIngredients([...pickedIngredients, item].sort());
  //   }
  // };

  // const renderIngredient = (item: ICartItem) => (
  //   <div key={item.id} className="item_ingredients_list_item">
  //     <p>{item}</p>
  //     {gearState && (
  //       <input
  //         type="checkbox"
  //         checked={pickedIngredients.includes(item)}
  //         onChange={() => onCheckbox(item)}
  //       />
  //     )}
  //   </div>
  // );

  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cartItems.items);

  const deleteDish = (id: number) => {
    dispatch(deleteFromCart(id));
  };

  const incrementNumber = (id: number) => {
    dispatch(incrementNumOfDishes(id));
  };

  const decrementNumber = (id: number) => {
    dispatch(decrementNumofDishes(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={item.photo[0].photo_url} alt="dish" />
      </div>
      <div className="cart-item__info">
        <div>
          <h3>{item.title}</h3>
        </div>
        <div className="dish-gear_wrapper">
          <button className="gear-button" onClick={onGear}>
            Изменить состав
          </button>
        </div>
        <div className="cart-item__info price">{item.price} BYN</div>
        {gearState ? (<div className="dish-ingredients">
          {pickedIngredients.map((item) => {
            return (
              <div className="ingredient-wrapper">
                {gearState && !item.DishIngredient.is_default ? (
                  <input
                    type="checkbox"
                    className="ingredient-checkbox"
                  ></input>
                ) : null}
                <div className="ingredient-title"> &#8226; {item.title}</div>
              </div>
            );
          })}
        </div>) : null}
        
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__actions button">
            <Button onClick={() => incrementNumber(item.id)} type="button">
              <img src={Plus} alt="plus" />
            </Button>
          </div>
          <div>{item.amount}</div>
          <div>
            <Button type="button" onClick={() => decrementNumber(item.id)}>
              <img src={Minus} alt="minus" />
            </Button>
          </div>
          <div className="delete-dish">
            <Button type="button" onClick={() => deleteDish(item.id)}>
              <img src={DeleteIcon} alt="delete" />
            </Button>
          </div>
          </div>
        </div>
  );
};
