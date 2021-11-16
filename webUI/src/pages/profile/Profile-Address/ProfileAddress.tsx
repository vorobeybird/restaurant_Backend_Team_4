import "./ProfileAddress.scss";
import {ChangeEvent, FormEvent, useState} from "react";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";

function ProfileAddress() {
    const user = useAppSelector(state => state.auth.user);
    let address = "Ваш текущий адрес не указан";
    let street = "";
    let house = "";
    let flat = "";
    if (user.attributes.address) {
        address = user.attributes.address;
        street = user.attributes.address.split(" ")[1];
        house = user.attributes.address.split(" ")[3];
        flat = user.attributes.address.split(" ")[5];
    }
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [userStreet, setUserStreet] = useState<string>(street);
    const [userHouse, setUserHouse] = useState<string>(house);
    const [userFlat, setUserFlat] = useState<string>(flat);

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
    const onUserFlatChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFlat(e.target.value);
    }

    async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (user) {
                await Auth.updateUserAttributes(user, {address: `ул. ${userStreet} д. ${userHouse} кв. ${userFlat}`});
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
            <p className={"profileAddress__text"}>{address}</p>
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
                    />
                    <label htmlFor="house">Дом</label>
                    <Input name="house"
                           id="house"
                           type="number"
                           placeholder="Дом"
                           value={userHouse}
                           onChange={onUserHouseChangeHandler}
                    />
                    <label htmlFor="flat">Квартира</label>
                    <Input name="flat"
                           id="flat"
                           type="number"
                           placeholder="Квартира"
                           value={userFlat}
                           onChange={onUserFlatChangeHandler}
                    />
                </div>
                <Button type="submit">Готово</Button>
            </form>
        </div>}
    </>
}

export default ProfileAddress;