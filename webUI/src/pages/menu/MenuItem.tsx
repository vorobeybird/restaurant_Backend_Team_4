import { Button } from "../../components/common/button/Button";
import { MenuItem } from "../../store/menu/menu.types";
import Gear from "../../assets/gear.png";
import "./menu.scss";
import { useState } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";


const MenuItemComponent = ({
  title,
  default_ingredients,
  ingredients,
  weight,
  calories,
  photos,
  price,
  onOrder,
}: MenuItem) => {
  const [gearState, setGearState] = useState(false);
  const [pickedIngredients, setPickedIngredients] = useState<number[]>(
    [...ingredients].sort()
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

  return (
    <div className="item_container">
      <div className="item_photos">
        <img src={photos[0].photo_url} alt="dish-main-photo" />
        {/* <Carousel plugins={["arrows"]}>
          {photos.map((photo) => {
            return <img src={photo.photo_url} alt="dish" />;
          })}
        </Carousel> */}
      </div>
      <div className="item_info">
        {/* <div>
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
        <div>Стоимость: {price} BYN</div> */}
        <div className="dish-info">
          <div className="dish-title">{title}</div>
          <div className="dish-price-weight">
            <div className="dish-price">
              <span className="price">{price}</span>
              <span className="currency"> BYN</span>
            </div>
            <div className="dish-weight">
              <span className="weight">{weight}</span>
              <span className="measure"> г.</span>
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <Button type='button' onClick={onOrder}>Заказать</Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemComponent;
