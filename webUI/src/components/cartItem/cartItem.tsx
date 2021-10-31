import { MenuItem } from "../../store/menu/menu.types";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useState } from "react";
import Gear from "../../assets/gear.png";
import DeleteIcon from "../../assets/delete.png";
import { Button } from "../common/button/Button";
import { useAppDispatch } from "../../store/hooks";
import { deleteFromCart } from "../../store/cart/cart.actions";
import { useAppSelector } from "../../store/hooks";
import "./cart.scss";

export const CartItem = (item: MenuItem) => {
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
        <div>Вес: {item.weight} г.</div>
        <div>Калории: {item.calories}</div>
        <div>Стоимость: {item.price} BYN</div>
        <div className="dish-info">
          <div className="dish-title">{item.title}</div>
          <div className="dish-price-weight">
            <div className="dish-price">
              <span className="price">{item.price}</span>
              <span className="currency"> BYN</span>
            </div>
            <div className="dish-weight">
              <span className="weight">{item.weight}</span>
              <span className="measure"> г.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
