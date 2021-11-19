import "./bookTableWithoutDish.scss";
import { BookTable } from "../bookTable/BookTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeDeliveryMethod, clearOrder } from "../../store/order/order.actions";
import { useHistory } from "react-router-dom";
import { OrderTemp } from "../cart/Cart";
import { DishShortInfo } from "../../store/order/order.types";
import axios, { Axios, AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import Modal from "../common/modal/Modal";
import moment from "moment";

export const BookTableWithoutDish = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.order);
  const userId = useAppSelector((state) => state.auth?.user?.attributes?.sub);
  const items = useAppSelector((state) => state.cartItems.items);
  const [showModal, setShowModal] = useState(false);
  const [reservationResult, setReservationResult] = useState<AxiosResponse>();

  useEffect(() => {
    dispatch(changeDeliveryMethod("bookTable"))
  }, []);

  const history = useHistory();

  const routeChange = () => {
    dispatch(clearOrder());
    let path = `/`;
    history.push(path);
  }

  const toggleModal = () => setShowModal(!showModal);

  const tryReserve = async () => {
    const result = await onMakingOrder() as AxiosResponse;
    setReservationResult(result);
  }

  const reserveTable = async () => {
    await tryReserve();
    toggleModal();
  }


  const onMakingOrder = () => {
    let currentOrder = {} as OrderTemp;

    currentOrder.delivery_method = order.delivery_method;
    currentOrder.payment_method = order.payment_method;
    currentOrder.customer_id = userId;
    currentOrder.total_price = 0;
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

      return axios
        .post(`${process.env.REACT_APP_GET_DISHES}/api/reserve`, currentOrder, {
          headers: {
            "Content-type": "application/json",
            "cross-domain": "true",
          },
        })
        .then((response) => response)
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <div className="booking-title">Забронировать стол</div>
        <BookTable />
        <div className="booking__button-wrapper">
          <button className="boocking-btn" onClick={routeChange}>Отмена</button>
          <button className="boocking-btn" onClick={toggleModal}>Забронировать</button>
        </div>
      </div>
      <Modal active={showModal} setActive={reserveTable} title={""}>
        {!reservationResult
          ? <div className="booking-message">К сожалению на выбранные дату - {moment(order.delivery_date).format("DD.MM.YYYY")}<br />
            время - {moment(order.delivery_date).format("hh.mm")} свободных столов на
            указанное количество человек - {order.num_of_persons} не нашлось. <br />
            Попробуйте выбрать другую дату, время или другой стол!
          </div>
          : <div className="booking-message">Вы забронировали стол на {moment(order.delivery_date).format("DD.MM.YYYY")}
            в {moment(order.delivery_date).format("hh.mm")}. Будем рады видеть Вас в Ocean Bar!</div>
        }
      </Modal>
    </div>
  )
};
