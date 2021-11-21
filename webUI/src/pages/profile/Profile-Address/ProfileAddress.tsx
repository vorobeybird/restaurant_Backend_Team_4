import "./ProfileAddress.scss";
import {ChangeEvent, FormEvent, useState} from "react";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";

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
    const [userHouse, setUserHouse] = useState<string>(userAddress.house);
    const [userHousing, setUserHousing] = useState<string>(userAddress.housing);
    const [userFlat, setUserFlat] = useState<string>(userAddress.flat);

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
        if (!userStreet.trim() || !userHouse.trim() || !userFlat.trim()) {
            return;
        }
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

    return <>
        {!editMode && <div className={"profileAddress"}>
            {hasAddress ?
                <div className={"profileAddress__info"}>
                    <div>ул. {userAddress.street}</div>
                    <div>д. {userAddress.house}</div>
                    <div>корп. {userAddress.housing ? userAddress.housing : ""}</div>
                    <div>кв. {userAddress.flat}</div>
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
                           onChange={onUserStreetChangeHandler}
                           isRequired={true}
                    />
                    <label htmlFor="house">Дом</label>
                    <Input name="house"
                           id="house"
                           type="number"
                           placeholder="Дом"
                           value={userHouse}
                           onChange={onUserHouseChangeHandler}
                           isRequired={true}
                    />
                    <label htmlFor="housing">Корпус</label>
                    <Input name="housing"
                           id="housing"
                           type="number"
                           placeholder="Корпус"
                           value={userHousing}
                           onChange={onUserHousingChangeHandler}
                    />
                    <label htmlFor="flat">Квартира</label>
                    <Input name="flat"
                           id="flat"
                           type="number"
                           placeholder="Квартира"
                           value={userFlat}
                           onChange={onUserFlatChangeHandler}
                           isRequired={true}
                    />
                </div>
                <Button type="submit">Готово</Button>
            </form>
        </div>}
    </>
}

export default ProfileAddress;