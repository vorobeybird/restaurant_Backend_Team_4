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
import { clearCart } from "../../store/cart/cart.actions";
import emptyCart from "../../assets/empty-cart.png";
import { Link } from "react-router-dom";

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
    console.log(currentOrder)

    return axios
      .post(`${process.env.REACT_APP_GET_DISHES}/api/order`, currentOrder, {
        headers: {
          "Content-type": "application/json",
          "cross-domain": "true",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const handleOnMakingOrder = async () => {
    await onMakingOrder();
    console.log("Order done");
    dispatch(clearCart(items));
  }

  const [orderType, setOrderType] = useState("takeaway");

  const onChangeTab = (e: any) => {
    setOrderType(e.target.name);
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart__container">
            <div className="cart-title">Корзина</div>
            <div className="cart-body">
                <div className="empty-cart__img">
                  <img src={emptyCart} alt="empty-cart-img" />
                </div>
                <div className="empty-cart__title">Ваша корзина пуста</div>
                <div className="empty-cart__text">Похоже, вы пока ничего не добавили в корзину</div>
                <Link to="/menu" className="empty-cart__menu-link">
                  Перейти в меню
                </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="full-cart">
            <div className="cart_title">
              <h1>Корзина</h1>
            </div>
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
            <Button type="button" onClick={handleOnMakingOrder} >
              Оформить Заказ
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
