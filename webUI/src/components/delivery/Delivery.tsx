import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ChooseDate } from "../common/chooseDate/ChooseDate";
import { ChooseTime } from "../common/chooseTime/ChooseTime";
import { EnterContacts } from "../common/enterContacts/EnterContacts";
import { PaymentMethod } from "../common/paymentMethod/PaymentMethod";
import PrevStepIcon from "../../assets/prev.png";
import NextStepIcon from "../../assets/next.png";
import "./delivery.scss";
import { EnterAddress } from "../common/enterAddress/EnterAddress";
import { chooseAddress } from "../../store/order/order.actions";
import { useHistory } from "react-router-dom";
import { SwitchButtons } from "../common/switchButtons/SwitchButtons";
export interface IAddress {
  street: string;
  houseNumber: string;
  houseBuilding: string;
  apartment: string;
}

interface OrderProps {
  total?: number;
  combineOrder?: any;
}

export const Delivery = ({ total, combineOrder }: OrderProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [name, setName] = useState(user.attributes.name);
  const [phone, setPhone] = useState(user.attributes.phone_number);
  let history = useHistory();
  // let address = "Ваш текущий адрес не указан";

  let ustreet,
    uhouse,
    uflat,
    uhousing = "";

  if (user.attributes.address) {
    const addr = JSON.parse(user.attributes.address);
    ustreet = addr.street;
    uhouse = addr.house;
    uflat = addr.flat;
    uhousing = addr.housing;
  }

  const isValidName = () => {
    const reg = /[-|a-z|а-я]{2,30}/i;
    return reg.test(name);
  };

  const isValidPhone = () => {
    const reg = /^[^_]*$/;
    return reg.test(phone);
  };

  const [time, setTime] = useState("");

  const [address, setAddress] = useState<IAddress>({
    street: ustreet,
    houseNumber: uhouse,
    houseBuilding: uhousing,
    apartment: uflat,
  });

  const isValidAddress = (address: IAddress) => {
    // const regForStreet = /[a-z]|[а-я]/g;
    const regForStreet = /^([^0-9]*)$/g;
    const regForHouseNumber = /^\d{1,3}$/;
    const regForHouseBuilding = /^\d{1,3}$/;
    const regForApartment = /^\d{1,4}$/;
    const regForEmptyString = /^$/;

    // console.log(regForHouseBuilding.test(address.houseBuilding));

    return (
      regForStreet.test(address.street) &&
      regForHouseNumber.test(address.houseNumber) &&
      (regForHouseBuilding.test(address.houseBuilding) ||
        regForEmptyString.test(address.houseBuilding)) &&
      (regForApartment.test(address.apartment) ||
        regForEmptyString.test(address.apartment))
    );
  };

  useEffect(() => {
    let stringifiedAddress = "";
    if (isValidAddress(address)) {
      stringifiedAddress +=
        "ул. " + address.street + ", д. " + address.houseNumber;
      if (address.houseBuilding)
        stringifiedAddress += ", корп. " + address.houseBuilding;
      if (address.apartment) stringifiedAddress += ", кв. " + address.apartment;
      dispatch(chooseAddress(stringifiedAddress));
    }
  }, [address]);

  const ADD_DELIVERY_STEPS = [
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
      id: "EnterAddress",
      Component: EnterAddress,
      props: { address, setAddress, isValidAddress },
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

  const getAddDeliverySteps = (step: number) => {
    return ADD_DELIVERY_STEPS[currentStep] ?? ADD_DELIVERY_STEPS[0];
  };

  const { id, Component } = useMemo(
    () => getAddDeliverySteps(currentStep),
    [currentStep]
  );

  const handleChangeCurrentStepPrev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  const handleChangeCurrentStepNext = () => {
    if (currentStep < 4 && stepsController())
      setCurrentStep((step) => step + 1);
  };

  const pushToConfirmation = () => {
    handleChangeCurrentStepNext();
    if (currentStep === 4) {
      history.push("/cart/confirm");
      combineOrder(total);
    }
  };

  const stepsController = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return time;
      case 2:
        return isValidAddress(address);
      case 3:
        return isValidPhone() && isValidName();
      case 4:
        return true;
      default:
    }
  };

  return (
    <div className="delivery_container_wrapper">
      <h1 style={{ padding: "20px" }}>Оформление заказа</h1>
      <div className="delivery_container">
        <button
          className={`${
            currentStep === 0 ? "swiper_disabled" : undefined
          } swiper_delivery_left`}
          type="button"
          onClick={handleChangeCurrentStepPrev}
        >
          <img src={PrevStepIcon} alt="prev" />
        </button>
        <Component
          key={id}
          {...(ADD_DELIVERY_STEPS[currentStep]?.props as any)}
        />
        <button
          className={`${
            currentStep === 4 ? "swiper_disabled" : undefined
          } swiper_delivery_right`}
          type="button"
          onClick={handleChangeCurrentStepNext}
        >
          <img src={NextStepIcon} alt="next" />
        </button>
      </div>
      <div className="step_progress">
        Шаг {currentStep + 1}/{ADD_DELIVERY_STEPS.length}
      </div>
      <div className="switch-buttons-component">
        <SwitchButtons
          onClickNext={pushToConfirmation}
          onClickPrev={handleChangeCurrentStepPrev}
          children="I'm a pink circle!"
        />
      </div>
    </div>
  );
};
