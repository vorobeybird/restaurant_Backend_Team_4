import { useState } from "react";
import Input from "../input/Input";
import "./enterContacts.scss";

// [Это поле должно содержать 2-30 знаков, без специальных символов (#, %, &, !, $, etc.) и чисел (0-9). Обязательно к заполнению.]

export const EnterContacts = () => {
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

  const saveName = (e: any) => {
    setName(e.target.value);
  };

  const savePhone = (e: any) => {
    setPhone(e.target.value);
  };

  console.log(phone);

  return (
    <div className="enter_contacts_container">
      <div>Контакты</div>
      <div className="contact-information">
        <div>Контактная информация</div>
        <Input type="text" onChange={saveName} placeholder="Имя" />
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
          onChange={savePhone}
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
