import "./ProfilePassword.scss";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import {Auth} from "aws-amplify";
import {useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";
import toast from "react-hot-toast";

function ProfilePassword() {
    const user = useAppSelector(state => state.auth.user);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [oldPasswordError, setOldPasswordError] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordError, setNewPasswordError] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");
    const [confirmedNewPasswordError, setConfirmedNewPasswordError] = useState<string>("");

    let formIsInvalid: boolean;
    if (!oldPasswordError.trim() && !newPasswordError.trim() && !confirmedNewPasswordError.trim()) {
        formIsInvalid = false;
    } else {
        formIsInvalid = true;
    }
    let isPasswordConfirmed = "";
    if (newPassword !== "" && newPassword !== confirmedNewPassword) {
        isPasswordConfirmed = "Неверный пароль";
    }

    const validateConfirmedPassword = useCallback((confirmedPassword: string) => {
        return newPassword === confirmedPassword;
    }, [newPassword])

    if (!user) {
        return <Redirect to="/login"/>
    }

    async function updateUserPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (newPassword !== confirmedNewPassword) {
            toast.error(`Повторный пароль введен неверно`);
            return;
        }
        try {
            if (user) {
                await Auth.changePassword(user, oldPassword, newPassword);
                toast.success(`Пароль успешно изменен`);
                // const updatedUser = await Auth.currentAuthenticatedUser();
                // dispatch(
                //     {
                //         type: "UPDATE_USER_ATTR",
                //         payload: updatedUser,
                //     }
                // )
                // setOldPassword("");
                // setNewPassword("");
                // setConfirmedNewPassword("");
            }
        } catch (err) {
            setOldPasswordError("Неверный пароль")
            console.log(err)
        }
    }

    const onOldPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    }
    const onNewPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }
    const onConfirmNewPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmedNewPassword(e.target.value);
    }


    let passwordErrorMessage = "Пароль должен содержать 8-15 символов с минимум одной цифрой, одной \n" +
        "заглавной и одной строчной буквой, без (#, %, &, !, $, etc.). Обязательно к заполнению."
    const passwordRegEx = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/)

    return <div className={"profilePassword"}>
        <form onSubmit={updateUserPasswordHandler}>
            <div>
                <label htmlFor="oldPassword">*Старый пароль</label>
                <Input name="oldPassword"
                       id="oldPassword"
                       type="password"
                       value={oldPassword}
                       error={oldPasswordError}
                       errorMessage={passwordErrorMessage}
                       validationSchema={passwordRegEx}
                       onError={setOldPasswordError}
                       onChange={onOldPasswordChangeHandler}
                />
                <label htmlFor="newPassword">*Новый пароль</label>
                <Input name="newPassword"
                       id="newPassword"
                       type="password"
                       value={newPassword}
                       error={newPasswordError}
                       errorMessage={passwordErrorMessage}
                       validationSchema={passwordRegEx}
                       onError={setNewPasswordError}
                       onChange={onNewPasswordChangeHandler}
                />
                <label htmlFor="confirmNewPassword">*Повторите новый пароль</label>
                <Input name="confirmNewPassword"
                       id="confirmNewPassword"
                       type="password"
                       value={confirmedNewPassword}
                       error={confirmedNewPasswordError}
                       errorMessage={isPasswordConfirmed ? isPasswordConfirmed : passwordErrorMessage}
                       validationSchema={passwordRegEx}
                       onError={setConfirmedNewPasswordError}
                       onChange={onConfirmNewPasswordChangeHandler}
                       validate={validateConfirmedPassword}
                />
            </div>
            <Button disabled={formIsInvalid} type="submit">Готово</Button>
        </form>
    </div>
}

export default ProfilePassword;