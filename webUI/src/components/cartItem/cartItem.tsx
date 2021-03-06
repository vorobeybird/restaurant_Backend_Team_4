import "@brainhubeu/react-carousel/lib/style.css";
import { MouseEventHandler, useState } from "react";
import DeleteIcon from "../../assets/delete.png";
import { useAppDispatch } from "../../store/hooks";
import {
  decrementNumofDishes,
  deleteFromCart,
  incrementNumOfDishes,
} from "../../store/cart/cart.actions";
import { useAppSelector } from "../../store/hooks";
import "./cart.scss";
import { ICartItem } from "../../store/cart/cart.types";
import Plus from "../../assets/plus.svg";
import Minus from "../../assets/minus.svg";
import edit from "../../assets/edit.svg";

interface ICartItemProps {
  item: ICartItem;
  idx: number;
  toggleModal:  Function;
  setSelectedDish: Function;
}
export const CartItem = ({item, idx, toggleModal, setSelectedDish}: ICartItemProps) => {

  const handleEditMode = () => {
    setSelectedDish(idx);
    toggleModal();
  }
  const dispatch = useAppDispatch();

  const deleteDish = (id: number, idx: number) => {
    dispatch(deleteFromCart(id, idx));
  };

  const incrementNumber = (id: number, idx: number) => {
    dispatch(incrementNumOfDishes(id, idx));
  };

  const decrementNumber = (id: number, idx: number) => {
    dispatch(decrementNumofDishes(id, idx));
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
          <button className="gear-button" onClick={handleEditMode}>
            Изменить состав
          </button>
        </div>
        <div className="cart-item__info price">{item.price} BYN</div>
        {item.excluded_ingredients && item.excluded_ingredients.length > 0 ? <div className="cart-item__info ingredients">
          <img className="edit__icon" src={edit} alt="edit" />
          <div className="omited">без добавления: <span>{item.excluded_ingredients.join(', ')}</span></div>
          </div> : null }
      </div>
      <div className="cart-item__actions">
        <div className="calculate">
          <button onClick={() => incrementNumber(item.id, idx)} type="button">
            <img src={Plus} alt="plus" />
          </button>
          <div className="quantity">{item.amount}</div>
          <button type="button" onClick={() => decrementNumber(item.id, idx)}>
            <img src={Minus} alt="minus" />
          </button>
        </div>
        <button
          className="button-trash"
          type="button"
          onClick={() => deleteDish(item.id, idx)}
        >
          <img src={DeleteIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};
