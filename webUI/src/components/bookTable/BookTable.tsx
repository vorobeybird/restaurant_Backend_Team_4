import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import { BookTableDetails } from "../common/bookTableDetails/BookTableDetails";
import "./bookTable.scss";

export const BookTable = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.user);
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

  const [time, setTime] = useState("");

  const [numberOfPeople, setNumberOfPeople] = useState(2);

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
      props: {},
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

  const handleChangeCurrentStepNext = () => {
    if (currentStep < 4 && stepsController())
      setCurrentStep((step) => step + 1);
  };

  console.log(order);

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
      <div className="booktable_container">
        <button
          className={`${
            currentStep === 0 ? "swiper_disabled" : undefined
          } swiper_booktable_left`}
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
          className={`${
            currentStep === 4 ? "swiper_disabled" : undefined
          } swiper_booktable_right`}
          type="button"
          onClick={handleChangeCurrentStepNext}
        >
          <img src={NextStepIcon} alt="next" />
        </button>
      </div>
      <div className="step_progress">
        Шаг {currentStep + 1}/{ADD_BOOKTABLE_STEPS.length}
      </div>
    </div>
  );
};
