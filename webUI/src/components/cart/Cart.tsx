import Navigation from "../navigation/Navigation";
import "./cart.scss";
import { useAppSelector } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { MenuItem } from "../../store/menu/menu.types";
import { useEffect, useState } from "react";
import { ICartItem } from "../../store/cart/cart.types";
import { Button } from "../common/button/Button";
import axios, { AxiosResponse } from "axios";

export const Cart = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const userId = useAppSelector((state) => state.auth.user.attributes.sub);
  const totalPrice = items.reduce((acc, el) => acc + el.price * el.amount, 0);

  interface DishShortInfo {
    dish_id: number;
    dish_amount: number;
  }

  interface Order {
    adress: string;
    customer_id: string;
    delivery_method: string;
    total_price: number;
    delivery_date: Date;
    contact_info: string;
    payment_method: boolean;
    comment: string;
    dish: DishShortInfo[];
  }

  const onMakingOrder = () => {
    let order = {} as Order;
    order.adress = "Brest";
    order.customer_id = userId;
    order.delivery_method = "Самовывоз";
    order.total_price = totalPrice;
    order.delivery_date = new Date();
    order.contact_info = "EdgarAllanPoe +375666666666";

    order.payment_method = true;
    order.comment = "Hi, I'm hardcode comment :)";

    let dishesShortInfo = items.map((item) => {
      let dish = {} as DishShortInfo;
      dish.dish_id = item.id;
      dish.dish_amount = item.amount;
      return dish;
    });

    order.dish = dishesShortInfo;

    axios
      .post("http:localhost:5500/api/order", order, {
        headers: { "Content-type": "application/json", "cross-domain": "true" },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    console.log(order);
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
