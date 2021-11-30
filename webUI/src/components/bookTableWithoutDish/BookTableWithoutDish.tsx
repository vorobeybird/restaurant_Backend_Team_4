import "./bookTableWithoutDish.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeDeliveryMethod, changePaymentMethod, clearOrder } from "../../store/order/order.actions";
import { useHistory } from "react-router-dom";
import { OrderTemp } from "../cart/Cart";
import axios, { Axios, AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import Modal from "../common/modal/Modal";
import moment from "moment";
import { SliderComponent } from "./SliderComponent";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { BookTableDetails } from "../common/bookTableDetails/BookTableDetails";

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

  const routeChange = (path: string) => {
    dispatch(clearOrder());
    history.push(path);
  }

  const toggleModal = () => setShowModal(!showModal);
  const closeWithRedirect = () => {
    toggleModal();
    routeChange('/')
  };

  const tryReserve = async () => {
    const result = await onMakingOrder() as AxiosResponse;
    setReservationResult(result);
  }

  const reserveTable = async () => {
    await tryReserve();
    toggleModal();
    if (reservationResult && reservationResult.status === 200) {
      setReservationResult({} as AxiosResponse);
    };
  }

  const onMakingOrder = () => {
    let currentOrder = {} as OrderTemp;

    currentOrder.delivery_method = order.delivery_method;
    currentOrder.payment_method = 0;
    currentOrder.customer_id = userId;
    currentOrder.total_price = 0;
    currentOrder.delivery_date = order.delivery_date;
    currentOrder.comment = "Hi, I'm hardcode comment :)";
    currentOrder.dish = [];
    currentOrder.contact_name = order.contact_name;
    currentOrder.contact_phone = order.contact_phone;
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

  const [time, setTime] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user.attributes.name);
  const [phone, setPhone] = useState(user.attributes.phone_number);
  const isValidName = () => {
    const reg = /[-|a-z|а-я]{2,30}/i;
    return reg.test(name);
  };

  const isValidPhone = () => {
    const reg = /^\+375[0-9]{9}$/;
    return reg.test(phone);
  };

  const steps = [
    {
      component: <ChooseDate />,
      validate: () => true
    },
    {
      component: <BookTableDetails />,
      validate: () => true
    },
    {
      component: <ChooseTime time={time} setTime={setTime} />,
      validate: () => !!time
    },
    {
      component: <EnterContacts name={name} phone={phone} setName={setName} setPhone={setPhone} isValidName={isValidName} isValidPhone={isValidPhone} />,
      validate: () => isValidName() && isValidPhone()
    }
  ]

  const [blocked, setBlocked] = useState(true);

  const onStepChange = (step: number) => {
    setBlocked(step !== steps.length - 1) 
  }

  return (
    <div className="booking-wrapper">
      <div className="booking-container">
        <div className="booking-title">Забронировать стол</div>
        <div className="booking-steps-container">
          <SliderComponent steps={steps} onStepChange={onStepChange} />
        </div>
        <div className="booking__button-wrapper">
          <button className="boocking-btn" onClick={() => routeChange('/')}>Отмена</button>
          <button
            className="boocking-btn"
            onClick={!blocked
              ? reserveTable
              : () => { }}>
            Забронировать
          </button>
        </div>
      </div>
      <Modal active={showModal} setActive={closeWithRedirect} title={""}>
        {reservationResult && reservationResult.status === 200
          ? <div className="booking-message">Вы забронировали стол на {moment(order.delivery_date).format("DD.MM.YYYY")}
            в {moment(order.delivery_date).format("hh.mm")}.<br /> Будем рады видеть Вас в Ocean Bar!</div>
          : <div className="booking-message">К сожалению,<br /> на выбранные дату - {moment(order.delivery_date).format("DD.MM.YYYY")}<br />
            время - {moment(order.delivery_date).format("hh.mm")} <br /> свободных столов на
            указанное количество человек - {order.num_of_persons} - не нашлось. <br />
            Попробуйте выбрать другую дату, время или другой стол!
          </div>
        }
      </Modal>
    </div>
  )
};
