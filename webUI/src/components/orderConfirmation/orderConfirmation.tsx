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
import { NavItem } from "./NavItem";
import "./orderConfirmation.scss";
import visaImg from "../../assets/visa.svg";
import mastercardImg from "../../assets/mastercard.svg";
import { ReactComponent as VisaIcon} from "../../assets/visa.svg";
interface orderCase {
  orderIndex: keyof orderCase;
  takeway: string;
  delivery: string;
  bookTable: string;
}

let card: string;

const testList = ["Картой на месте", "Картой онлайн", "Наличные"];

const orderCase = {
  takeway: "Самовывоз",
  delivery: "Доставка",
  bookTable: "Бронирование стола",
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
    console.log(
      "🚀 ~ file: orderConfirmation.tsx ~ line 41 ~ OrderConfirmation ~ userCards",
      userCards
    );
  } catch (err) {
    cardData = {};
  }
  const orderIndex = order.delivery_method;

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
            <OrderInformationRow label="ТИП ЗАКАЗА" value={orderIndex} />
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
          {orderIndex == "delivery" ? (
            <div className="order-info">
              <OrderInformationRow label="АДРЕС" value={`${order.adress}`} />
            </div>
          ) : undefined}
          <div className="order-info">
            <OrderInformationRow label="ИТОГО" value={`${order.total_price}`} />
            <OrderInformationRow
              label="СПОСОБ ОПЛАТЫ"
              value={`${testList[order.payment_method]}`}
            />
            {order.payment_method === 1 ? (
              <div className="payment-card">
                <NavItem icon={VisaIcon}/>
                  {/* {userCards.map((card: string) => {
                    return (
                      <NavItem icon={VisaIcon}/>
                    );
                  })} */}
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};
