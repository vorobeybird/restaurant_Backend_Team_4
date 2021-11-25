import "./ProfileInfo.scss";
import {Button} from "../../../components/common/button/Button";
import {ChangeEvent, FormEvent, useState} from "react";
import Input from "../../../components/common/input/Input";
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
// import MaskedInput from "react-text-mask";
import InputMask from "react-input-mask";

function ProfileInfo() {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    let email;
    let name;
    let familyName;
    let phoneNumber;
    if (user) {
        email = user.attributes.email;
        name = user.attributes.name;
        familyName = user.attributes.family_name;
        phoneNumber = user.attributes.phone_number;
    }

    const [editMode, setEditMode] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>(name);
    const [lastName, setLastName] = useState<string>(familyName);
    const [userNumber, setUserNumber] = useState<string>(phoneNumber);

    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const formChars = {
    }

    const updatedNumber = userNumber.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll("_", "")

    let formIsInvalid;
    if (firstNameError.trim() || lastNameError.trim() || updatedNumber.length < 13) {
        formIsInvalid = true;
    } else {
        formIsInvalid = false;
    }
    if (!user) {
        return <Redirect to="/login"/>
    }


    async function updateUserAttributesHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (user) {
                await Auth.updateUserAttributes(user, {
                    name: firstName,
                    family_name: lastName,
                    phone_number: updatedNumber
                });
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
    const userNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserNumber(e.target.value);
    }

    const nameRegEx = new RegExp("^([а-яА-Я]{2,30})");
    const familyNameRegEx = new RegExp("^([а-яА-Я]{2,30})");
    // const phoneNumberRegEx = new RegExp("^\\+375 \\((17|29|33|44)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$")
    // const phoneNumberRegEx = new RegExp("^\\+375\\(17|29|33|44\\)\\[0-9]{7}\\$")
    // const phoneNumberRegEx = new RegExp("^\\+375(\\s+)\\(?(17|29|33|44)\\)?(\\s+)[0-9]{3}-[0-9]{2}-[0-9]{2}$");
    //+375 29|33|44|17 111-11-11
    //убрать пробелы - добавить после (\\(s+)?)
    // const phoneNumberRegEx = new RegExp("^\\+375\\(17|29|33|44\\)[0-9]{3}[0-9]{3}[0-9]{3}$")

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
                           validationSchema={nameRegEx}
                           errorMessage="Недопустимое имя пользователя"
                           error={firstNameError}
                           onError={setFirstNameError}
                           onChange={onFirstNameChangeHandler}
                    />
                    <Input name="family_name"
                           type="text"
                           placeholder="Фамилия"
                           value={lastName}
                           validationSchema={familyNameRegEx}
                           errorMessage="Недопустимая фамилия пользователя"
                           error={lastNameError}
                           onError={setLastNameError}
                           onChange={onLastNameChangeHandler}
                    />
                    {/*<Input name="phone_number"*/}
                    {/*       type="text"*/}
                    {/*       placeholder="Номер телефона"*/}
                    {/*       value={number}*/}
                    {/*       validationSchema={phoneNumberRegEx}*/}
                    {/*       error={numberError}*/}
                    {/*       onError={setNumberError}*/}
                    {/*       errorMessage="Недопустимый номер телефона"*/}
                    {/*       onChange={onNumberChangeHandler}*/}
                    {/*/>*/}
                    <InputMask
                        className="masked_input"
                        mask='+375 (99) 999-99-99'
                        value={userNumber}
                        alwaysShowMask={true}
                        onChange={userNumberChangeHandler}>
                    </InputMask>
                </div>
                <Button type="submit" disabled={formIsInvalid}>Готово</Button>
            </form>
        </div>}
    </>

}


export default ProfileInfo;