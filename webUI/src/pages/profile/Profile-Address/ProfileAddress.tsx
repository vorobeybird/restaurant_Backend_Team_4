import "./ProfileAddress.scss";
import {ChangeEvent, FormEvent, useState} from "react";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";
import {log} from "util";

function ProfileAddress() {
    const user = useAppSelector(state => state.auth.user);
    let userAddress: any;
    try {
        userAddress = JSON.parse(user.attributes.address);
    } catch (err) {
        userAddress = {};
        console.log(err)
    }
    const hasAddress = Object.keys(userAddress).length > 0;
    console.log(userAddress);
    console.log(hasAddress);
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [userStreet, setUserStreet] = useState<string>(userAddress.street);
    const [userStreetError, setUserStreetError] = useState<string>("");
    const [userHouse, setUserHouse] = useState<string>(userAddress.house);
    const [userHouseError, setUserHouseError] = useState<string>("");
    const [userHousing, setUserHousing] = useState<string>(userAddress.housing);
    const [userHousingError, setUserHousingError] = useState<string>("");
    const [userFlat, setUserFlat] = useState<string>(userAddress.flat);
    const [userFlatError, setUserFlatError] = useState<string>("");

    let formIsInvalid;
    if (userStreetError.trim() || userHouseError.trim() || userHousingError.trim() || userFlatError.trim()) {
        formIsInvalid = true;
    } else {
        formIsInvalid = false;
    }

    if (!user) {
        return <Redirect to="/login"/>
    }

    const onToggleHandler = () => {
        setEditMode(true);
    }

    const onUserStreetChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserStreet(e.target.value);
    }
    const onUserHouseChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserHouse(e.target.value);
    }
    const onUserHousingChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserHousing(e.target.value);
    }
    const onUserFlatChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFlat(e.target.value);
    }

    async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (user) {
                const updatedUserAddress = {
                    street: userStreet,
                    house: userHouse,
                    housing: userHousing,
                    flat: userFlat,
                }
                await Auth.updateUserAttributes(user, {address: JSON.stringify(updatedUserAddress)});
                const updatedUser = await Auth.currentAuthenticatedUser();
                dispatch(
                    {
                        type: "UPDATE_USER_ATTR",
                        payload: updatedUser,
                    }
                )
            }
            setEditMode(false);
        } catch (err) {
            console.log(err)
        }
    }

    const streetRegEx = new RegExp("^([а-яА-Я0-9-s]+)");
    const houseRegEx = new RegExp(/\d{1,3}/);
    const housingRegEx = new RegExp(/\d?/);
    const flatRegEx = new RegExp(/\d?/);


    return <>
        {!editMode && <div className={"profileAddress"}>
            {hasAddress ?
                <div className={"profileAddress__info"}>
                    <div>ул. {userAddress.street}</div>
                    <div>д. {userAddress.house}</div>
                    <div>корп. {userAddress.housing ? userAddress.housing : ""}</div>
                    <div>кв. {userAddress.flat ? userAddress.flat : ""}</div>
                </div> :
                <p className={"profileAddress__text"}>Ваш адрес не указан</p>
            }
            <Button type={"button"} onClick={onToggleHandler}>Изменить</Button>
        </div>}
        {editMode && <div className={"profileAddress"}>
            <p className={"profileAddress__city"}>г. Минск</p>
            <form onSubmit={updateUserAttributesHandler}>
                <div>
                    <label htmlFor="street">Улица</label>
                    <Input name="street"
                           id="street"
                           type="text"
                           placeholder="Улица"
                           value={userStreet}
                           validationSchema={streetRegEx}
                           errorMessage="Недопустимое название улицы"
                           error={userStreetError}
                           isRequired={true}
                           onError={setUserStreetError}
                           onChange={onUserStreetChangeHandler}
                    />
                    <label htmlFor="house">Дом</label>
                    <Input name="house"
                           id="house"
                           type="number"
                           placeholder="Дом"
                           value={userHouse}
                           errorMessage="Недопустимый номер дома"
                           error={userHouseError}
                           validationSchema={houseRegEx}
                           isRequired={true}
                           onError={setUserHouseError}
                           onChange={onUserHouseChangeHandler}
                    />
                    <label htmlFor="housing">Корпус</label>
                    <Input name="housing"
                           id="housing"
                           type="number"
                           placeholder="Корпус"
                           value={userHousing}
                           errorMessage="Недопустимый номер корпуса"
                           error={userHousingError}
                           validationSchema={housingRegEx}
                           onError={setUserHousingError}
                           onChange={onUserHousingChangeHandler}
                    />
                    <label htmlFor="flat">Квартира</label>
                    <Input name="flat"
                           id="flat"
                           type="number"
                           placeholder="Квартира"
                           value={userFlat}
                           errorMessage="Недопустимый номер квартиры"
                           error={userFlatError}
                           validationSchema={flatRegEx}
                           onError={setUserFlatError}
                           onChange={onUserFlatChangeHandler}
                    />
                </div>
                <Button disabled={formIsInvalid} type="submit">Готово</Button>
            </form>
        </div>}
    </>
}

export default ProfileAddress;