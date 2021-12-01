import { IAddress } from "../../delivery/Delivery";
import Input from "../input/Input";
import "./enterAddress.scss";
import { useEffect, useState } from "react";
interface EnterAddressProps {
  address: IAddress;
  setAddress: (address: IAddress) => void;
  isValidAddress: (address: IAddress) => boolean;
}

export const EnterAddress = ({ ...props }: EnterAddressProps) => {
  const nameRegEx = new RegExp("^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$");
  const threeDigitNumberRegEx = new RegExp("^[1-9]{1,3}$");
  const fourDigitNumberRegEx = new RegExp("^[1-9]{1,4}$");
  const [userStreetError, setUserStreetError] = useState<string>("");
  const [userHouseError, setUserHouseError] = useState<string>("");
  const [userBuildingError, setUserBuildingError] = useState<string>("");
  const [userApartmentError, setUserApartmentError] = useState<string>("");
  const handleChangeStreet = (e: any) => {
    props.setAddress({ ...props.address, street: e.target.value });
  };

  const handleChangeHouseNumber = (e: any) => {
    props.setAddress({ ...props.address, houseNumber: e.target.value });
  };

  const handleChangeHouseBuilding = (e: any) => {
    props.setAddress({ ...props.address, houseBuilding: e.target.value });
  };

  const handleChangeApartment = (e: any) => {
    props.setAddress({ ...props.address, apartment: e.target.value });
  };

  return (
    <div className="enter_address_container_wrapper">
      <div className="order-header">Адрес</div>
      <div>
        <div className="enter_address_container">
          <Input
            name="name"
            type="text"
            placeholder="Улица"
            validationSchema={nameRegEx}
            errorMessage="Пожалуйста укажите название улицы кириллицей,а так же без пробелов, тире и запятых"
            error={userStreetError}
            onError={setUserStreetError}
            isRequired={true}
            value={props.address.street}
            onChange={handleChangeStreet}
          />
          <Input
            name="name"
            type="text"
            placeholder="Дом"
            validationSchema={threeDigitNumberRegEx}
            errorMessage="Неверный формат номера"
            error={userHouseError}
            onError={setUserHouseError}
            isRequired={true}
            value={props.address.houseNumber}
            onChange={handleChangeHouseNumber}
          />
          <Input
            name="name"
            type="text"
            placeholder="Корпус"
            validationSchema={threeDigitNumberRegEx}
            errorMessage="Неверный формат номера"
            error={userBuildingError}
            onError={setUserBuildingError}
            isRequired={true}
            value={props.address.houseBuilding}
            onChange={handleChangeHouseBuilding}
          />
          <Input
            name="name"
            type="text"
            placeholder="Квартира"
            validationSchema={fourDigitNumberRegEx}
            errorMessage="Неверный формат номера"
            error={userApartmentError}
            onError={setUserApartmentError}
            isRequired={true}
            value={props.address.apartment}
            onChange={handleChangeApartment}
          />
        </div>
        {/* {props.isValidAddress(props.address) ? (
          <div>it's OK</div>
        ) : (
          <div>Invalid Address</div>
        )} */}
      </div>
    </div>
  );
};
