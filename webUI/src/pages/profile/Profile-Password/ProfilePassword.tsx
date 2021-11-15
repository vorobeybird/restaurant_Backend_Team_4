import "./ProfilePassword.scss";
import {Button} from "../../../components/common/button/Button";
import Input from "../../../components/common/input/Input";
import {ChangeEvent, FormEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {useAppSelector} from "../../../store/hooks";
import {Redirect} from "react-router-dom";

function ProfilePassword() {
    //вывести уведомление об успешном изменении пароля
    //добавить валидацию пароля
    //добавить сообщение, если не совпадает новый пароль и его подтверждение
    const user = useAppSelector(state => state.auth.user);

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>("");

    if (!user) {
        return <Redirect to="/login"/>
    }

    async function updateUserPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (newPassword !== confirmedNewPassword) {
            return;
        }
        try {
            if (user) {
                await Auth.changePassword(user, oldPassword, newPassword);
                // const updatedUser = await Auth.currentAuthenticatedUser();
                // dispatch(
                //     {
                //         type: "UPDATE_USER_ATTR",
                //         payload: updatedUser,
                //     }
                // )
                setOldPassword("");
                setNewPassword("");
                setConfirmedNewPassword("");
            }
        } catch (err) {
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

    return <div className={"profilePassword"}>
        <form onSubmit={updateUserPasswordHandler}>
            <div>
                <label htmlFor="oldPassword">Старый пароль</label>
                <Input name="oldPassword"
                       id="oldPassword"
                       type="password"
                       value={oldPassword}
                       onChange={onOldPasswordChangeHandler}
                />
                <label htmlFor="newPassword">Новый пароль</label>
                <Input name="newPassword"
                       id="newPassword"
                       type="password"
                       value={newPassword}
                       onChange={onNewPasswordChangeHandler}
                />
                <label htmlFor="confirmNewPassword">Повторите новый пароль</label>
                <Input name="confirmNewPassword"
                       id="confirmNewPassword"
                       type="password"
                       value={confirmedNewPassword}
                       onChange={onConfirmNewPasswordChangeHandler}
                />
            </div>
            <Button type="submit">Готово</Button>
        </form>
    </div>
}

export default ProfilePassword;