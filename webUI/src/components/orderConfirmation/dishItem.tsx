import { ICartItem } from "../../store/cart/cart.types";
import edit from "../../assets/edit.svg";

type DishItem = {
    photo: any,
    title: string,
    amount: number,
    price: number,
    excluded_ingredients: string[] 
}



export const DishItem = ({price, amount, title, photo, excluded_ingredients}:DishItem) => {

    return (
        <div className="dish-item">
          <div className="dish-item__image">
            <img src={photo ? photo[0].photo_url : undefined} alt="dish"></img>
          </div>
          <div className='dish-item__info'>
            {excluded_ingredients.length > 0 ? (
              <img src={edit} title="Ингредиенты были изменены" alt='dish'></img>
            ) : undefined}
            <p className='title'>{title}</p>
            <p>x{amount}</p>
          </div>
          <div className='dish-item__price'>{price} BYN</div>
        </div>
      );
}