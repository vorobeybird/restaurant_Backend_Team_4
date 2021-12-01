import { useMemo, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { DishItem } from "./dishItem";
import { OrderInformationRow } from "./OrderInformationRow";
import moment from "moment";
import "./orderConfirmation.scss";
import axios, { Axios, AxiosResponse } from "axios";
import visaImg from "../../assets/visa.svg";
import mastercardImg from "../../assets/mastercard.svg";
import { DELIVERY_METHOD } from "../../store/order/order.types";
import { SwitchButtons } from "../common/switchButtons/SwitchButtons";
import { OrderTemp } from "../cart/Cart";
import { clearCart } from "../../store/cart/cart.actions";
import toast, { Toaster } from "react-hot-toast";
import { DishShortInfo } from "../../store/order/order.types";
import { useHistory } from "react-router-dom";
import Api from "../../store/Api";

const paymentType = ["Картой на месте", "Картой онлайн", "Наличные"];

const deliveryDisplayNames = {
  [DELIVERY_METHOD.takeaway]: "Самовывоз",
  [DELIVERY_METHOD.delivery]: "Доставка",
  [DELIVERY_METHOD.bookTable]: "Бронирование",
};

export const OrderConfirmation = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const order = useAppSelector((state) => state.order.order);
  const user = useAppSelector((state) => state.auth.user);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo({
      top: 80,
      behavior: "smooth",
    });
  }, []);
  let dishesShortInfo = items.map((item) => {
    let dish = {} as DishShortInfo;
    dish.dish_id = item.id;
    dish.dish_amount = item.amount;
    dish.excluded_ingredients = item.excluded_ingredients
      ? item.excluded_ingredients.join(", ")
      : "";
    return dish;
  });

  const [showModal, setShowModal] = useState(false);
  const [orderResult, setOrderResult] = useState<AxiosResponse>();

  let history = useHistory();
  const onMakingOrder = () => {
    let currentOrder = {} as OrderTemp;

    currentOrder.delivery_method = order.delivery_method;
    currentOrder.payment_method = order.payment_method;
    currentOrder.customer_id = userId;
    currentOrder.total_price = order.total_price;
    currentOrder.delivery_date = order.delivery_date;
    currentOrder.comment = "Hi, I'm hardcode comment :)";

    let dishesShortInfo = items.map((item) => {
      let dish = {} as DishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.amount;
      dish.excluded_ingredients = item.excluded_ingredients
        ? item.excluded_ingredients.join(", ")
        : "";
      return dish;
    });

    currentOrder.dish = dishesShortInfo;
    currentOrder.contact_name = order.contact_name;
    currentOrder.contact_phone = order.contact_phone;

    if (currentOrder.delivery_method === "takeaway") {
      currentOrder.adress = "takeaway";
    }

    if (currentOrder.delivery_method === "bookTable") {
      currentOrder.adress = "bookTable";
      currentOrder.num_of_persons = order.num_of_persons;
      currentOrder.reserve_date = order.delivery_date;
      currentOrder.reserve_time = order.delivery_date;

      return Api.post(`${process.env.REACT_APP_GET_DISHES}/api/reserve`, currentOrder, {
          headers: {
            "Content-type": "application/json",
            "cross-domain": "true",
          },
        })
        .then((response) => {
          console.log(response);
          toast.success(`Ваш заказ был отправлен`);
        })
        .catch((err) => console.log(err));
    }

    if (currentOrder.delivery_method === "delivery") {
      currentOrder.adress = order.adress;
    }

    console.log(currentOrder);

    return Api.post(`${process.env.REACT_APP_GET_DISHES}/api/order`, currentOrder, {
        headers: {
          "Content-type": "application/json",
          "cross-domain": "true",
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(`Ваш заказ был отправлен`);
      })
      .catch((err) => console.log(err));
  };

  const handleOnMakingOrder = async () => {
    await onMakingOrder();
    console.log("Order done");
    dispatch(clearCart());
    history.push("/menu");
  };

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
              value={moment(order.delivery_date).format("HH:mm")}
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
            <OrderInformationRow
              label="ИТОГО"
              value={`${order.total_price} BYN`}
            />
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
                <div>
                  {"**** **** ****"}
                  {userCards[0].slice(userCards[0].length - 4)}
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
      <div className="order-confirmation__buttons">
        <SwitchButtons
          firstValue={"Готово"}
          onClickNext={handleOnMakingOrder}
          onClickPrev={() => {
            history.push("/cart");
          }}
          children="I'm a pink circle!"
        />
      </div>
    </div>
  );
};
