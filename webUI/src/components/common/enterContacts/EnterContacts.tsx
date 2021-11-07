import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { enterName, enterPhone } from "../../../store/order/order.actions";
import Input from "../input/Input";
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

  const order = useAppSelector((state) => state.order.order);

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
      <div>Контакты</div>
      <div className="contact_information">
        <div>Контактная информация</div>
        <Input
          type="text"
          onChange={handleChangeName}
          placeholder="Имя"
          value={props.name}
        />
        {props.isValidName() ? (
          <div>this name is valid</div>
        ) : (
          <div>
            Это поле должно содержать 2-30 знаков, без специальных символов (#,
            %, &, !, $, etc.) и чисел (0-9). Обязательно к заполнению.
          </div>
        )}
        <Input
          type="text"
          onChange={handleChangePhone}
          placeholder="+375 (_ _) _ _ _ _ _ _ _ _"
          value={props.phone}
        />
        {props.isValidPhone() ? (
          <div>this phone is valid</div>
        ) : (
          <div>Телефон должен содержать 9 цифр. Обязательно к заполнению.</div>
        )}
      </div>
    </div>
  );
};
