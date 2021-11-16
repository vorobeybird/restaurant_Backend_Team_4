  import { useMemo, useState } from "react";
  import { useAppSelector } from "../../store/hooks";
  import { ChooseDate } from "../common/chooseDate/ChooseDate";
  import { ChooseTime } from "../common/chooseTime/ChooseTime";
  import { EnterContacts } from "../common/enterContacts/EnterContacts";
  import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
  import "./takeaway.scss";
  import PrevStepIcon from "../../assets/prev.png";
  import NextStepIcon from "../../assets/next.png";

  export const Takeaway = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const isValidName = () => {
      const reg = /[-|a-z|а-я]{2,30}/i;
      return reg.test(name);
    };

    const isValidPhone = () => {
      const reg = /^\+375[0-9]{9}$/;
      return reg.test(phone);
    };

    const [time, setTime] = useState("");

    const ADD_TAKEAWAY_STEPS = [
      {
        id: "ChooseDate",
        Component: ChooseDate,
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

    const getAddTakeawaySteps = (step: number) => {
      return ADD_TAKEAWAY_STEPS[currentStep] ?? ADD_TAKEAWAY_STEPS[0];
    };

    const { id, Component } = useMemo(
      () => getAddTakeawaySteps(currentStep),
      [currentStep]
    );

    const handleChangeCurrentStepPrev = () => {
      if (currentStep > 0) setCurrentStep((step) => step - 1);
    };

    const handleChangeCurrentStepNext = () => {
      if (currentStep < 3 && stepsController())
        setCurrentStep((step) => step + 1);
    };

    console.log(order);

    const stepsController = () => {
      switch (currentStep) {
        case 0:
          return true;
        case 1:
          return time;
        case 2:
          return isValidPhone() && isValidName();
        case 3:
          return true;
        default:
      }
    };

    return (
      <div className="takeaway_container_wrapper">
        <h1 style={{"padding": "20px"}}>Оформление заказа</h1>
        <div className="takeaway_container">
          <button
            className={`${
              currentStep === 0 ? "swiper_disabled" : undefined
            } swiper_takeaway_left`}
            type="button"
            onClick={handleChangeCurrentStepPrev}
          >
            <img src={PrevStepIcon} alt="prev" />
          </button>
          <Component
            key={id}
            {...(ADD_TAKEAWAY_STEPS[currentStep]?.props as any)}
          />
          <button
            className={`${
              currentStep === 3 ? "swiper_disabled" : undefined
            } swiper_takeaway_right`}
            type="button"
            onClick={handleChangeCurrentStepNext}
          >
            <img src={NextStepIcon} alt="next" />
          </button>
        </div>
        <div className="step_progress">
          Шаг {currentStep + 1}/{ADD_TAKEAWAY_STEPS.length}
        </div>
      </div>
    );
  };
