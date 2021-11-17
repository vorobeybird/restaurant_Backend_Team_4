import "./ProfileInfo.scss";
import {Button} from "../../../components/common/button/Button";
import {ChangeEvent, FormEvent, useState} from "react";
import Input from "../../../components/common/input/Input";
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

function ProfileInfo() {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    let email;
    let name;
    let familyName;
    let phoneNumber;
    if (user ) {
        email = user.attributes.email;
        name = user.attributes.name;
        familyName = user.attributes.family_name;
        phoneNumber = user.attributes.phone_number;
    }

    const [editMode, setEditMode] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(name);
    const [lastName, setLastName] = useState<string>(familyName);
    const [number, setNumber] = useState<string>(phoneNumber);

    if (!user) {
        return <Redirect to="/login"/>
    }

    async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (user) {
                await Auth.updateUserAttributes(user, {name: firstName, family_name: lastName, phone_number: number});
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

    const onToggleHandler = () => {
        setEditMode(true);
    }
    const onFirstNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const onLastNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const onNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value);
    }


    return <>
        {!editMode && <div className={"profileInfo"}>
            <ul className={"profileInfo__list"}>
                <li className={"profileInfo__item"}>{user.attributes.email ? user.attributes.email : ''}</li>
                <li className={"profileInfo__item"}>{user.attributes.name ? user.attributes.name : ""}</li>
                <li className={"profileInfo__item"}>{user.attributes.family_name ? user.attributes.family_name : ""}</li>
                <li className={"profileInfo__item"}>{user.attributes.phone_number ? user.attributes.phone_number : ""}</li>
            </ul>
            <Button type={"button"} onClick={onToggleHandler}>Изменить</Button>
        </div>}
        {editMode && <div className={"profileInfo"}>
            <p className={"profileInfo__username"}>{email}</p>
            <form onSubmit={updateUserAttributesHandler}>
                <div>
                    <Input name="name"
                           type="text"
                           placeholder="Имя"
                           value={firstName}
                           onChange={onFirstNameChangeHandler}
                    />
                    <Input name="family_name"
                           type="text"
                           placeholder="Фамилия"
                           value={lastName}
                           onChange={onLastNameChangeHandler}
                    />
                    <Input name="phone_number"
                           type="text"
                           placeholder="Номер телефона"
                           value={number}
                           onChange={onNumberChangeHandler}
                    />
                </div>
                <Button type="submit">Готово</Button>
            </form>
        </div>}
    </>

}


export default ProfileInfo;