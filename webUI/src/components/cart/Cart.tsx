import Navigation from "../navigation/Navigation";
import "./cart.scss";
import { useAppSelector } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";

export const Cart = () => {
  const items = useAppSelector((state) => state.cartItems.items);

  return (
    <>
      <Navigation />
      <div className="cart_title">
        <h1>Корзина</h1>
      </div>
      {items.length === 0 ? (
        <div className="no_items">No items</div>
      ) : (
        items.map((item, index) => <CartItem key={index} {...item} />)
      )}
    </>
  );
};
