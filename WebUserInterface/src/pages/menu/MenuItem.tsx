import { Button } from "../../components/common/button/Button";
import { MenuItem } from "../../store/menu/menu.types";
import Gear from "../../assets/gear.png";
import "./menu.scss";
import { useState } from "react";
import Close from "../../assets/close.png";

const MenuItemComponent = ({
  title,
  default_ingredients,
  ingredients,
  weight,
  calories,
  photo,
  price,
}: MenuItem) => {
  const [gearState, setGearState] = useState(false);
  const [pickedIngredients, setPickedIngredients] = useState<number[]>(
    [...ingredients].sort()
  );

  const onGear = () => setGearState(!gearState);

  const onOrder = () => {
    console.log("ordered");
  };

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

  const onClose = () => {
    console.log("closed");
  };

  return (
    <div className="item_container">
      <div className="item_close">
        <button onClick={onClose}>
          <img src={Close} />
        </button>
      </div>
      <div className="item_photo">
        <img src={photo} />
      </div>
      <div className="item_info">
        <div>
          <h3>{title}</h3>
        </div>
        <div className="item_ingredients_container">
          <div className="item_ingredients">
            <p>Состав: </p>
            <p>{default_ingredients}</p>
            <div className="item_ingredients_list">
              {gearState
                ? ingredients.map((item) => renderIngredient(item))
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
        <div>Вес: {weight} г.</div>
        <div>Калории: {calories}</div>
        <div>Стоимость: {price} BYN</div>
        <div className="button_item_order">
          <Button onClick={onOrder}>Заказать</Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemComponent;
