import Navigation from "../navigation/Navigation";
import "./cart.scss";
import { useAppSelector } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { MenuItem } from "../../store/menu/menu.types";
import { useEffect, useState } from "react";
import { ICartItem } from "../../store/cart/cart.types";
import { Button } from "../common/button/Button";

export const Cart = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const totalPrice = items.reduce((acc, el) => acc + el.price * el.amount, 0);

  const onBookTable = () => {
    console.log("table is booked");
  };

  const onDelivery = () => {
    console.log("lunch is running!");
  };

  const onTakeaway = () => {
    console.log("takeaway");
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
              <div>
                <Button type="button" onClick={onBookTable}>
                  Забронировать стол
                </Button>
              </div>
              <div>
                <Button type="button" onClick={onDelivery}>
                  Доставка
                </Button>
              </div>
              <div>
                <Button type="button" onClick={onTakeaway}>
                  Навынос
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
