import { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import { ICartItem } from "../../store/cart/cart.types";
import edit from "../../assets/edit.svg";
import { DishItem } from "./dishItem";
import { OrderInformationRow } from "./OrderInformationRow";
import moment from "moment";
import "./orderConfirmation.scss";
import visaImg from "../../assets/visa.svg";
import mastercardImg from "../../assets/mastercard.svg";
import Select from "react-select";
import {DELIVERY_METHOD} from '../../store/order/order.types';
import { SwitchButtons } from "../common/switchButtons/SwitchButtons";
const paymentType = ["Картой на месте", "Картой онлайн", "Наличные"];

const deliveryDisplayNames = {
  [DELIVERY_METHOD.takeaway]: "Самовывоз",
  [DELIVERY_METHOD.delivery]: "Доставка",
  [DELIVERY_METHOD.bookTable]:"Бронирование",
};

export const OrderConfirmation = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const order = useAppSelector((state) => state.order.order);
  const user = useAppSelector((state) => state.auth.user);
  let cardData: any;
  let userCards: any;
  try {
    cardData = JSON.parse(user.attributes["custom:card_number"]);
    userCards = Object.keys(cardData);
  } catch (err) {
    cardData = {};
  }
  const deliveryType = deliveryDisplayNames[order.delivery_method];
  

  return (
    <div className="order-confirmation">
      <h1 className="order-confirmation__header">Детали заказа</h1>
      <div className="order-confirmation__details">
        <div className="order-confirmation__details__dishes-container">
          {items.map((item, index) => {
            return <DishItem {...item} key={index} />;
          })}
        </div>
        <div className="order-confirmation__details__info-container">
          <div className="order-info">
            <OrderInformationRow label="ТИП ЗАКАЗА" value={deliveryType} />
            <OrderInformationRow
              label="ДАТА"
              value={moment(order.delivery_date).format("DD.MM.YYYY")}
            />
            <OrderInformationRow
              label="ВРЕМЯ"
              value={moment(order.delivery_date).format("hh.mm")}
            />
            <OrderInformationRow
              label="КОНТАКТЫ"
              value={`${order.contact_name}, ${order.contact_phone}`}
            />
          </div>
          {deliveryType == "Доставка" ? (
            <div className="order-info">
              <OrderInformationRow label="АДРЕС" value={`${order.adress}`} />
            </div>
          ) : undefined}
          <div className="order-info">
            <OrderInformationRow label="ИТОГО" value={`${order.total_price}`} />
            <OrderInformationRow
              label="СПОСОБ ОПЛАТЫ"
              value={`${paymentType[order.payment_method]}`}
            />
            {order.payment_method === 1 ? (
              <div className="payment-card">
                <img
                  src={+userCards[0][0] === 4 ? visaImg : mastercardImg}
                  alt={+userCards[0][0] === 4 ? "VISA" : "MASTERCARD"}
                />
                <div>{'**** **** ****'}{userCards[0].slice(userCards[0].length - 4)}</div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      <SwitchButtons
                onClickNext={()=>console.log('The order was made')}
                onClickPrev={()=>console.log('please go fuck yourself')}
                children="I'm a pink circle!"
              />
    </div>
  );
};
