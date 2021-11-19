import { ICartItem } from "../../store/cart/cart.types";
import edit from "../../assets/edit.svg";

type DishItem = {
    photo?: any,
    title?: string,
    amount?: number,
    price?: number,
    excluded_ingredients?: string[] 
}

export const DishItem = ({price, amount, title, photo, excluded_ingredients}:DishItem) => {
    return (
        <div className="dish-item">
          <div className="dish-item__image">
            <img src={photo ? photo[0].photo_url : undefined} alt="dish"></img>
          </div>
          <div>
            {excluded_ingredients ? (
              <img src={edit} alt='dish'></img>
            ) : undefined}
            <p>{title}</p>
            <p>x{amount}</p>
            <p>{price}</p>
          </div>
        </div>
      );
}