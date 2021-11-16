  import { IAddress } from "../../delivery/Delivery";
  import Input from "../input/Input";
  import "./enterAddress.scss";

  interface EnterAddressProps {
    address: IAddress;
    setAddress: (address: IAddress) => void;
    isValidAddress: (address: IAddress) => boolean;
  }

  export const EnterAddress = ({ ...props }: EnterAddressProps) => {
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
        <div className="enter_address_container">
          <Input
            type="text"
            value={props.address.street}
            placeholder="Улица"
            onChange={handleChangeStreet}
          />
          <Input
            type="text"
            value={props.address.houseNumber}
            placeholder="Дом"
            onChange={handleChangeHouseNumber}
          />
          <Input
            type="text"
            value={props.address.houseBuilding}
            placeholder="Корпус"
            onChange={handleChangeHouseBuilding}
          />
          <Input
            type="text"
            value={props.address.apartment}
            placeholder="Квартира"
            onChange={handleChangeApartment}
          />
        </div>
        {props.isValidAddress(props.address) ? (
          <div>it's OK</div>
        ) : (
          <div>Invalid Address</div>
        )}
      </div>
    );
  };
