import "./cart.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CartItem } from "../cartItem/cartItem";
import { MouseEvent, useState } from "react";
import { ICartItem } from "../../store/cart/cart.types";
import { Button } from "../common/button/Button";
import axios, { AxiosResponse } from "axios";
import { Takeaway } from "../takeaway/Takeaway";
import { DishShortInfo, Order } from "../../store/order/order.types";
import TakeawayIcon from "../../assets/takeaway.png";
import DeliveryIcon from "../../assets/delivery.png";
import BookTableIcon from "../../assets/book-table.png";
import { clearCart, omitIngredient, pickIngredient } from "../../store/cart/cart.actions";
import emptyCart from "../../assets/empty-cart.png";
import { Link } from "react-router-dom";
import { Delivery } from "../delivery/Delivery";
import { clearOrder } from "../../store/order/order.actions";
import Modal from "../common/modal/Modal";

export const Cart = () => {


  const items = useAppSelector((state) => state.cartItems.items);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const totalPrice = items.reduce((acc, el) => acc + el.price * el.amount, 0);
  const order = useAppSelector((state) => state.order.order);
  const dispatch = useAppDispatch();

  const [selectedDish, setSelectedDish] = useState(null);
  const dishItem = items.find(i => i.id === selectedDish);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const editIngredients = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    !e.target.checked ? 
    dispatch(omitIngredient(id, e.target.value)) :
    dispatch(pickIngredient(id, e.target.value))
}

  const checkOrder = (order: Order) =>
    order.adress &&
    order.comment &&
    order.contact_name &&
    order.contact_phone &&
    order.customer_id &&
    order.customer_id &&
    order.delivery_date &&
    order.delivery_method &&
    order.dish.length !== 0 &&
    order.payment_method &&
    order.total_price;

  const onMakingOrder = () => {
    let currentOrder = {} as Order;
    currentOrder.delivery_method = orderType;
    if (currentOrder.delivery_method === "takeaway") {
      currentOrder.adress = "takeaway";
    } else {
      currentOrder.adress = order.adress;
    }
    currentOrder.customer_id = userId;
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
      dish.excluded_ingredients = item.excluded_ingredients.join(', ');
      return dish;
    });

    currentOrder.dish = dishesShortInfo;

    console.log(currentOrder);

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
    dispatch(clearCart());
  };
  const clearFullCart = async () => {
    console.log("Order done");
    dispatch(clearCart());
  };
  const [orderType, setOrderType] = useState("");

  const onChangeTab = (e: any) => {
    dispatch(clearOrder());
    setOrderType(e.target.alt);
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart__container empty-cart__container--small">
            <div className="cart-title">Корзина</div>
            <div className="cart-body">
              <div className="empty-cart__img">
                <img src={emptyCart} alt="empty-cart-img" />
              </div>
              <div className="empty-cart__title">Ваша корзина пуста</div>
              <div className="empty-cart__text">
                Похоже, вы пока ничего не добавили в корзину
              </div>
              <Link to="/menu" className="empty-cart__menu-link">
                Перейти в меню
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="full-cart">
          <div className="cart_order_container">
            <div className="cart_title">
              <p>Корзина</p>
            </div>
            <div className="cart_order">
              <h1>Ваш заказ</h1>
            </div>
            <button className="clear-button" onClick={clearFullCart}>
              Очистить корзину
            </button>
            {items.map((item: ICartItem, index) => (
              <CartItem key={index} toggleModal={toggleModal} item={item} setSelectedDish={setSelectedDish} />
            ))}
            <div className="total-price">
              <div>Итого:</div>
              <div className="total-price__number"> {totalPrice} BYN</div>
            </div>
          </div>

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
            <Button type="button" onClick={handleOnMakingOrder}>
              Оформить Заказ
            </Button>
          </div>
          <Modal active={showModal} setActive={toggleModal} title={"Изменить состав"}><div className="dish-modal-title">{dishItem && dishItem.title}</div>
                    <div className="ingredients-form">
                    <div className="ingredients-list">
                        {dishItem && dishItem.ingredient.map(i => <div className="ingredient-item" key={i.id}><label>{i.DishIngredient.is_default 
                    ? <input type="checkbox" className="ingredient-checkbox" checked disabled /> 
                    : <input type="checkbox" className="ingredient-checkbox" onChange={ (e)=> editIngredients(e, dishItem.id)} checked={!dishItem.excluded_ingredients.includes(i.title)} value={i.title} />} {i.title}</label></div>)}
                            </div>
                            <div className="button-container"><button onClick={toggleModal} className="ingredients-edit__btn">Готово</button></div>

                    </div></Modal>
        </div>
      )}
    </>
  );
};
