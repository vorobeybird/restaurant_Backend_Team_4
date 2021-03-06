import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import { BookTableDetails } from "../common/bookTableDetails/BookTableDetails";
import { SwitchButtons } from "../common/switchButtons/SwitchButtons";
import "./bookTable.scss";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

interface OrderProps {
  total?: number;
  combineOrder?: any;
}

export const BookTable = ({ total, combineOrder }: OrderProps) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cartItems.items);

  const [name, setName] = useState(user.attributes.name);
  const [phone, setPhone] = useState(user.attributes.phone_number);

  const isValidName = () => {
    const reg = /[-|a-z|а-я]{2,30}/i;
    return reg.test(name);
  };

  const isValidPhone = () => {
    const reg = /^[^_]*$/;
    return reg.test(phone);
  };

  const [time, setTime] = useState("");

  const [numberOfPeople, setNumberOfPeople] = useState(2);

  const isBookTable = true;
  const ADD_BOOKTABLE_STEPS = [
    {
      id: "ChooseDate",
      Component: ChooseDate,
      props: {},
    },
    {
      id: "BookTableDetails",
      Component: BookTableDetails,
      props: {},
    },
    {
      id: "ChooseTime",
      Component: ChooseTime,
      props: {
        time,
        setTime,
      },
    },
    {
      id: "EnterContacts",
      Component: EnterContacts,
      props: { name, setName, phone, setPhone, isValidName, isValidPhone },
    },
    {
      id: "PaymentMethod",
      Component: PaymentMethod,
      props: { isBookTable },
    },
  ];

  const order = useAppSelector((state) => state.order.order);
  const [currentStep, setCurrentStep] = useState(0);

  const getAddBookTableSteps = (step: number) => {
    return ADD_BOOKTABLE_STEPS[currentStep] ?? ADD_BOOKTABLE_STEPS[0];
  };

  const { id, Component } = useMemo(
    () => getAddBookTableSteps(currentStep),
    [currentStep]
  );

  const handleChangeCurrentStepPrev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  let history = useHistory();
  const handleChangeCurrentStepNext = () => {
    if (currentStep < 4 && stepsController()) {
      setCurrentStep((step) => step + 1);
    }
  };

  let cardNumber = useAppSelector(
    (state) => state.auth?.user?.attributes[`custom:card_number`]
  );

  if (!cardNumber) cardNumber = "{}";

  const pushToConfirmation = () => {
    if (Object.keys(JSON.parse(cardNumber)).length === 0) {
      toast.error("Привяжите карту, чтобы забронировать стол");
      return;
    }

    handleChangeCurrentStepNext();
    if (currentStep === 4) {
      history.push("/cart/confirm");
      combineOrder(total);
    }
  };

  const isChoosenNumOfPeople = () => order.num_of_persons;

  const stepsController = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return time;
      case 3:
        return isValidPhone() && isValidName();
      case 4:
        return true;
      default:
    }
  };

  return (
    <div className="booktable_container_wrapper">
      <h1 style={{ padding: "20px" }}>Оформление заказа</h1>
      <div className="booktable_container">
        <button
          className={
            currentStep === 0 ? "swiper_disabled" : "swiper_booktable_left"
          }
          type="button"
          onClick={handleChangeCurrentStepPrev}
        >
          <img src={PrevStepIcon} alt="prev" />
        </button>
        <Component
          key={id}
          {...(ADD_BOOKTABLE_STEPS[currentStep]?.props as any)}
        />
        <button
          className={
            currentStep === 4 ? "swiper_disabled" : "swiper_booktable_left"
          }
          type="button"
          onClick={handleChangeCurrentStepNext}
        >
          <img src={NextStepIcon} alt="next" />
        </button>
      </div>
      <div className="step_progress">
        Шаг {currentStep + 1}/{ADD_BOOKTABLE_STEPS.length}
      </div>
      <div className="switch-buttons-component">
        {cartItems.length === 0 ? undefined : (
          <SwitchButtons
            onClickNext={pushToConfirmation}
            onClickPrev={handleChangeCurrentStepPrev}
            children="I'm a pink circle!"
          />
        )}
      </div>
    </div>
  );
};
