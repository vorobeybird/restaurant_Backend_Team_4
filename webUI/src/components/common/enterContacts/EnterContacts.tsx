import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { enterName, enterPhone } from "../../../store/order/order.actions";
import Input from "../input/Input";
import "./enterContacts.scss";

export const EnterContacts = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();

  const isValidName = () => {
    const reg = /[-|a-z|а-я]{2,30}/i;
    return reg.test(name);
  };

  const isValidPhone = () => {
    const reg = /^\+375[0-9]{9}$/;
    return reg.test(phone);
  };

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e: any) => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    isValidName() ? dispatch(enterName(name)) : dispatch(enterName(""));
  }, [name]);

  useEffect(() => {
    isValidPhone() ? dispatch(enterPhone(phone)) : dispatch(enterPhone(""));
  }, [phone]);

  return (
    <div className="enter_contacts_container">
      <div>Контакты</div>
      <div className="contact-information">
        <div>Контактная информация</div>
        <Input type="text" onChange={handleChangeName} placeholder="Имя" />
        {isValidName() ? (
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
        />
        {isValidPhone() ? (
          <div>this phone is valid</div>
        ) : (
          <div>Телефон должен содержать 9 цифр. Обязательно к заполнению.</div>
        )}
      </div>
    </div>
  );
};
