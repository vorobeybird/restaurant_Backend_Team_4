import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { enterName, enterPhone } from "../../../store/order/order.actions";
import Input from "../input/Input";
import InputMask from "react-input-mask";
import "./enterContacts.scss";

interface EnterContactsProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  isValidName: () => boolean;
  isValidPhone: () => boolean;
}

export const EnterContacts = ({ ...props }: EnterContactsProps) => {
  const dispatch = useAppDispatch();
  const [userStreetError, setUserStreetError] = useState<string>("");
  const [userNumber, setUserNumber] = useState<string>(props.phone);
  const nameRegEx = new RegExp("^([а-яА-Я]{2,30})");

  const formatChar = {
    A: "[234]",
    B: "[3459]",
    "9": "[0-9]",
    // "1": "+",
    // "3": "3",
    // "5": "5",
    // "7": "7",
  };
  const handleChangeName = (e: any) => {
    props.setName(e.target.value);
  };

  const handleChangePhone = (e: any) => {
    props.setPhone(e.target.value);
  };

  useEffect(() => {
    props.isValidName()
      ? dispatch(enterName(props.name))
      : dispatch(enterName(""));
  }, [props.name]);

  useEffect(() => {
    props.isValidPhone()
      ? dispatch(enterPhone(props.phone))
      : dispatch(enterPhone(""));
  }, [props.phone]);

  return (
    <div className="enter_contacts_container">
      <div className="order-header">Контакты</div>
      <div className="contact_information active">
        <Input
          name="name"
          type="text"
          placeholder="Имя"
          validationSchema={nameRegEx}
          errorMessage="Пожалуйста укажите ваше кириллицей,а так же без пробелов, тире и запятых"
          error={userStreetError}
          onError={setUserStreetError}
          isRequired={true}
          value={props.name}
          onChange={handleChangeName}
        />
        {/* {props.isValidName() ? (
            <div>this name is valid</div>
          ) : (
            undefined
          )} */}
        <InputMask
          className="masked_input"
          mask="+375 (AB) 999-99-99"
          value={props.phone}
          alwaysShowMask={true}
          formatChars={formatChar}
          onChange={handleChangePhone}
        ></InputMask>
        {/* <Input
          type="text"
          onChange={handleChangePhone}
          placeholder="Телефон"
          value={props.phone}
        /> */}
        {props.isValidPhone() ? <div>this phone is valid</div> : undefined}
      </div>
    </div>
  );
};
