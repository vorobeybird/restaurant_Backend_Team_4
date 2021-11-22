import { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
import "./orderConfirmation.scss";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import { ICartItem } from "../../store/cart/cart.types";

export const OrderConfirmation = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const testItem = items[0];
  return (
    <div className="order-confirmation">
      <h1 className="order-confirmation__header">Детали заказа</h1>
      <div className="order-confirmation__details">
        <div className="order-confirmation__details__dishes-container">
          {items.map((item: ICartItem) => {
            return (
              <div className="dish-item">
                <div className="dish-item__image">
                  <img src={item.photo[0].photo_url} alt="dish"></img>
                </div>
                <div>
                <p>{item.title}</p>
                <p>x{item.amount}</p>
                <p>{item.price}</p>
                </div>
                
              </div>
            );
          })}
          <div className="dish-item"></div>
        </div>
        <div className="order-confirmation__details__info-container">
          <div className="order-type"></div>
          <div className="order-adress"></div>
          <div className="order-payment"></div>
        </div>
      </div>
    </div>
  );
};
