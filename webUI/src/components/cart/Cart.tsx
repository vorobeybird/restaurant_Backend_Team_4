import Navigation from "../navigation/Navigation";
import "./cart.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
import { Delivery } from "../delivery/Delivery";
import { clearOrder } from "../../store/order/order.actions";

export const Cart = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const totalPrice = items.reduce((acc, el) => acc + el.price * el.amount, 0);
  const order = useAppSelector((state) => state.order.order);
  const dispatch = useAppDispatch();

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

    // axios
    //   .post("http:localhost:5500/api/order", currentOrder, {
    //     headers: { "Content-type": "application/json", "cross-domain": "true" },
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));

    console.log(currentOrder);
  };

  const [orderType, setOrderType] = useState("takeaway");

  const onChangeTab = (e: any) => {
    dispatch(clearOrder());
    setOrderType(e.target.alt);
  };

  return (
    <>
      <Navigation />
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
              <button
                className={
                  orderType === "bookTable" ? "order_button_pushed" : undefined
                }
                type="button"
                onClick={onChangeTab}
              >
                <img src={BookTableIcon} alt="bookTable" />
              </button>
              <button
                className={
                  orderType === "delivery" ? "order_button_pushed" : undefined
                }
                type="button"
                onClick={onChangeTab}
              >
                <img src={DeliveryIcon} alt="delivery" />
              </button>
              <button
                className={
                  orderType === "takeaway" ? "order_button_pushed" : undefined
                }
                type="button"
                onClick={onChangeTab}
              >
                <img src={TakeawayIcon} alt="takeaway" />
              </button>
            </div>
          </div>

          {orderType === "bookTable" ? (
            <div className="order_title">Забронировать стол</div>
          ) : orderType === "delivery" ? (
            <Delivery />
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
