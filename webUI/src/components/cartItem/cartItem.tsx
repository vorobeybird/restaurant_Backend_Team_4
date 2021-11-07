import Carousel from "@brainhubeu/react-carousel";
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
  const [pickedIngredients, setPickedIngredients] = useState<number[]>(
    [...item.ingredients].sort()
  );

  const onGear = () => setGearState(!gearState);

  const onCheckbox = (item: number) => {
    if (pickedIngredients.includes(item)) {
      const array = [...pickedIngredients];
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
      setPickedIngredients(array.sort());
    } else {
      setPickedIngredients([...pickedIngredients, item].sort());
    }
  };

  const renderIngredient = (item: number) => (
    <div key={item} className="item_ingredients_list_item">
      <p>{item}</p>
      {gearState && (
        <input
          type="checkbox"
          checked={pickedIngredients.includes(item)}
          onChange={() => onCheckbox(item)}
        />
      )}
    </div>
  );

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
    <div className="item_container">
      <div className="item_photos">
        <Carousel plugins={["arrows"]}>
          {item.photos.map((photo, index) => {
            return <img key={index} src={photo.photo_url} alt="dish" />;
          })}
        </Carousel>
      </div>
      <div className="item_info">
        <div>
          <h3>{item.title}</h3>
        </div>
        <div className="item_ingredients_container">
          <div className="item_ingredients">
            <p>Состав: </p>
            <p>{item.default_ingredients}</p>
            <div className="item_ingredients_list">
              {gearState
                ? item.ingredients.map((item) => renderIngredient(item))
                : pickedIngredients.map((item) => renderIngredient(item))}
            </div>
          </div>
          <div className="button_redact_ingredients">
            <button onClick={onGear}>
              <img src={Gear} />
              <span>Изменить состав</span>
            </button>
          </div>
        </div>
        <div className="delete-dish">
          <Button type="button" onClick={() => deleteDish(item.id)}>
            <img src={DeleteIcon} alt="delete" />
          </Button>
        </div>

        <div className="dish-number">
          <div>
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
        </div>
        <div>Вес: {item.weight} г.</div>
        <div>Калории: {item.calories}</div>
        <div>Стоимость: {item.price} BYN</div>
      </div>
    </div>
  );
};
