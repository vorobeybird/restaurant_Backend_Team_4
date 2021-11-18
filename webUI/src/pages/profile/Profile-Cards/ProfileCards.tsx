import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import {Auth} from "aws-amplify";

function ProfileCards() {
    const user = useAppSelector(state => state.auth.user);
    let cardsInfo = "Ваши банковские карты не указаны";
    let number = "";
    let date = "";
    let name = "";
    if (user.attributes["custom:card_number"]) {
        cardsInfo = user.attributes["custom:card_number"];
        number = user.attributes.address.split(" ")[1];
        date = user.attributes.address.split(" ")[3];
        name = user.attributes.address.split(" ")[5];
    }
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    // const [cardNumber, setUserStreet] = useState<string>(street);
    // const [userHouse, setUserHouse] = useState<string>(house);
    // const [userFlat, setUserFlat] = useState<string>(flat);

    if (!user) {
        return <Redirect to="/login"/>
    }

    const onToggleHandler = () => {
        setEditMode(true);
    }

    // const onUserStreetChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setUserStreet(e.target.value);
    // }
    // const onUserHouseChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setUserHouse(e.target.value);
    // }
    // const onUserFlatChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setUserFlat(e.target.value);
    // }

    // async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault()
    //     try {
    //         if (user) {
    //             await Auth.updateUserAttributes(user, {address: `ул. ${userStreet} д. ${userHouse} кв. ${userFlat}`});
    //             const updatedUser = await Auth.currentAuthenticatedUser();
    //             dispatch(
    //                 {
    //                     type: "UPDATE_USER_ATTR",
    //                     payload: updatedUser,
    //                 }
    //             )
    //         }
    //         setEditMode(false);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return <>
        {!editMode && <div className={"profileCards"}>
            <ul className={"profileCards__list"}>
                <li className={"profileCards__item"}>
                    <div>**** **** **** 4564</div>
                    <div>12/24</div>
                    <div>IVAN IVANOV</div>
                </li>
                <li className={"profileCards__item"}>
                    <div>**** **** **** 4564</div>
                    <div>12/24</div>
                    <div>IVAN IVANOV</div>
                </li>
            </ul>
            <Button type={"button"} onClick={onToggleHandler}>Изменить</Button>
        </div>}
        {editMode && <div className={"profileCards"}>
            <ul className={"profileCards__list"}>
                <li className={"profileCards__item"}>
                    <div>**** **** **** 4564</div>
                    <div>12/24</div>
                    <div>IVAN IVANOV</div>
                </li>
                <li className={"profileCards__item"}>
                    <div>**** **** **** 4564</div>
                    <div>12/24</div>
                    <div>IVAN IVANOV</div>
                </li>
            </ul>
            <Button type="button">Добавить карту</Button>
            <Button type="button">Готово</Button>
        </div>}
    </>
}

export default ProfileCards;