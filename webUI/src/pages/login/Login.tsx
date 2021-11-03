import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Input from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import Navigation from "../../components/navigation/Navigation";
import {ChangeEvent, FormEvent} from "react";
import {useDispatch, useSelector} from "react-redux";

// imports for aws authentication
import {Auth} from "aws-amplify";
import {AppStateType} from "../../store";
import {AuthStateType} from "../../store/auth/auth.reducer";
import {Redirect} from "react-router-dom";

export function Authentication() {
    console.log("Auth rendering");
    const dispatch = useDispatch();
    const authState = useSelector<AppStateType, AuthStateType>(
        (state) => state.auth
    );
    const {formType} = authState;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "UPDATE_STATE",
            payload: {name: e.target.name, value: e.target.value},
        });
    };

    async function signUpHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username, password} = authState;
            await Auth.signUp({username, password});
            // можем добавить объект со свойством attributes
            dispatch({type: "SIGN_UP"});
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmSignUpHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username, confirmCode, password} = authState;
            const data = await Auth.confirmSignUp(username, confirmCode);
            if (data === "SUCCESS") {
                const user = await Auth.signIn(username, password);
                dispatch({type: "SIGN_IN", payload: user})
            }
            // dispatch({type: "CONFIRM_SIGN_UP"});
        } catch (err) {
            console.log(err);
        }
    }

    async function signInHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username, password} = authState;
            const user = await Auth.signIn(username, password);
            dispatch({type: "SIGN_IN", payload: user});
        } catch (err) {
            console.log(err);
        }
    }

    function toggleSignInHandler() {
        dispatch({type: "TOGGLE_SIGN_IN_SIGN_UP"});
    }

    function togglePasswordHandler() {
        dispatch({type: "TOGGLE_PASSWORD"})
    }

    async function forgotPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username} = authState;
            const response = await Auth.forgotPassword(username);
            console.log(response);
            dispatch({type: "FORGOT_PASSWORD", payload: username});
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmForgotPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username, confirmCode, password} = authState;
            const response = await Auth.forgotPasswordSubmit(username, confirmCode, password);
            console.log(response);
            dispatch({type: "CONFIRM_FORGOT_PASSWORD"});
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="login_logo">
                <img src={Logo} alt="logo"/>
            </div>
            <section className="auth">
                {formType === "signUp" &&
                <div>
                    <form onSubmit={signUpHandler}>
                        <Input name="username"
                               type="email"
                               placeholder="Введите адрес электронной почты"
                               onChange={onChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите пароль"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Зарегистрироваться</Button>
                    </form>
                    <div>
                        <p>У вас уже есть аккаунт OceanBar?</p>
                        <p><a href="#" onClick={toggleSignInHandler}>Войти?</a></p>
                    </div>
                </div>}
                {formType === "confirmSignUp" &&
                <form onSubmit={confirmSignUpHandler}>
                    <div>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Отправить код</Button>
                    </div>
                </form>}
                {formType === "signIn" &&
                <form onSubmit={signInHandler}>
                    <div>
                        <Input name="username"
                               type="email"
                               placeholder="Введите адрес электронной почты"
                               onChange={onChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите пароль"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Войти</Button>
                    </div>
                    <div>
                        <p><a href="#" onClick={togglePasswordHandler}>Забыли пароль?</a></p>
                        <p><a href="#" onClick={toggleSignInHandler}>Хотите зарегистрировать аккаунт OceanBar?</a></p>
                    </div>
                </form>}
                {formType === "togglePassword" &&
                <form onSubmit={forgotPasswordHandler}>
                    <div>
                        <Input name="username"
                               type="string"
                               placeholder="Введите ваш email"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Получить код сброса пароля</Button>
                    </div>
                </form>}
                {formType === "confirmForgotPassword" &&
                <form onSubmit={confirmForgotPasswordHandler}>
                    <div>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               onChange={onChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите новый пароль"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Установить новый пароль</Button>
                    </div>
                </form>}
                {formType === "signedIn" && <Redirect to="/"/>}
            </section>
        </>
    )
}
