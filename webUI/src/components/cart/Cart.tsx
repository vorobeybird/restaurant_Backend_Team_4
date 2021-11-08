import "./cart.scss";
import { useAppSelector } from "../../store/hooks";
import { CartItem } from "../cartItem/cartItem";
import { useState } from "react";
import { ICartItem } from "../../store/cart/cart.types";
import { Button } from "../common/button/Button";
import axios, { AxiosResponse } from "axios";
import { Takeaway } from "../takeaway/Takeaway";
import { DishShortInfo, Order } from "../../store/order/order.types";
import TakeawayIcon from "../../assets/takeaway.png";
import DeliveryIcon from "../../assets/delivery.png";
import BookTableIcon from "../../assets/book-table.png";

export const Cart = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const totalPrice = items.reduce((acc, el) => acc + el.price * el.amount, 0);
  const order = useAppSelector((state) => state.order.order);

  const onMakingOrder = () => {
    let currentOrder = {} as Order;
    currentOrder.adress = order.adress;
    currentOrder.customer_id = userId;

    currentOrder.delivery_method = orderType;
    currentOrder.total_price = totalPrice;
    currentOrder.delivery_date = order.delivery_date;
    currentOrder.contact_name = order.contact_name;
    currentOrder.contact_phone = order.contact_phone;
    currentOrder.payment_method = order.payment_method;
    currentOrder.comment = "Hi, I'm hardcode comment :)";

    let dishesShortInfo = items.map((item) => {
      let dish = {} as DishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.amount;
      return dish;
    });

    currentOrder.dish = dishesShortInfo;

    axios
      .post(`${process.env.REACT_APP_GET_DISHES}/api/order`, currentOrder, {
        headers: {
          "Content-type": "application/json",
          "cross-domain": "true",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    console.log(currentOrder);
  };

  const [orderType, setOrderType] = useState("takeaway");

  const onChangeTab = (e: any) => {
    setOrderType(e.target.name);
  };

  return (
    <>
      <div className="cart_title">
        <h1>Корзина</h1>
      </div>
      {items.length === 0 ? (
        <div className="no_items">No items</div>
      ) : (
        <>
          {items.map((item: ICartItem, index) => (
            <CartItem key={index} {...item} />
          ))}
          <div>Итого: {totalPrice} BYN</div>

          <div className="order_actions">
            <div>Тип заказа: </div>
            <div className="order_buttons">
              <Button type="button" name="bookTable" onClick={onChangeTab}>
                Забронировать стол
              </Button>
              <Button type="button" name="delivery" onClick={onChangeTab}>
                Доставка
              </Button>
              <Button type="button" name="takeaway" onClick={onChangeTab}>
                Навынос
              </Button>
            </div>
          </div>

          {orderType === "bookTable" ? (
            <div className="order_title">Забронировать стол</div>
          ) : orderType === "delivery" ? (
            <div className="order_title">Доставка</div>
          ) : orderType === "takeaway" ? (
            <Takeaway />
          ) : (
            <div></div>
          )}

          <div className="make_order">
            <Button type="button" onClick={onMakingOrder}>
              Оформить Заказ
            </Button>
          </div>
        </>
      )}
    </>
  );
};
