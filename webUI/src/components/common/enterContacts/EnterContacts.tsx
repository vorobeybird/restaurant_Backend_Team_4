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
    const user = useAppSelector(state => state.auth.user);
    
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
            type="text"
            onChange={handleChangeName}
            placeholder="Имя"
            value={props.name}
          />
          {props.isValidName() ? (
            <div>this name is valid</div>
          ) : (
            undefined
          )}
          <Input
            type="text"
            onChange={handleChangePhone}
            placeholder="Телефон"
            value={props.phone}
          />
          {props.isValidPhone() ? (
            <div>this phone is valid</div>
          ) : (
            undefined
          )}
        </div>
        
      </div>
    );
  };
