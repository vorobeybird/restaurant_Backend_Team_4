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
import edit from "../../assets/edit.svg";
import { DishItem } from "./dishItem";
import {OrderInformationRow} from "./OrderInformationRow"

interface orderCase {
  orderIndex: keyof orderCase,
  takeway : string,
  delivery: string,
  bookTable: string
}

const orderCase = {
  takeway: "Самовывоз",
  delivery: "Доставка",
  bookTable: "Бронирование стола"
}

export const OrderConfirmation = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const order = useAppSelector((state) => state.order.order);
  const orderIndex = order.delivery_method;
 
  return (
    <div className="order-confirmation">
      <h1 className="order-confirmation__header">Детали заказа</h1>
      <div className="order-confirmation__details">
        <div className="order-confirmation__details__dishes-container">
          {items.map((item, index) => {
              return <DishItem {...item} key={index}/>
          })}
        </div>
        <div className="order-confirmation__details__info-container">
          <div className="order-type">
            <div className="order-type__fields">
              <div className="order-type__fields__header">Тип заказа</div>
              <div className="order-type__fields__value">Доставка</div>
            </div>
            <div className="order-type__fields">
              <div className="order-type__fields__header">Дата</div>
              <div className="order-type__fields__value">13.04.2021</div>
            </div>
            <div className="order-type__fields">
              <div className="order-type__fields__header">Время</div>
              <div className="order-type__fields__value">15.04</div>
            </div>
            <div className="order-type__fields">
              <div className="order-type__fields__header">Контакты</div>
              <div className="order-type__fields__value">Костя</div>
            </div>
          </div>
          <div className="order-adress"></div>
          <div className="order-payment"></div>
        </div>
      </div>
    </div>
  );
};
