import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Input from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import {ChangeEvent, FormEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

// imports for aws authentication
import {Auth} from "aws-amplify";
import {AppStateType} from "../../store";
import {AuthStateType} from "../../store/auth/auth.reducer";
import {Link, Redirect} from "react-router-dom";

export function Authentication() {
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
            const {name, family_name, email, phone_number, password} = authState;
            
            await Auth.signUp({username: email, password, attributes:{name, family_name, email, phone_number}});
            dispatch({type: "SIGN_UP"});
            // можем добавить объект со свойством attributes
            
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmSignUpHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {email, confirmCode, password} = authState;
            const data = await Auth.confirmSignUp(email, confirmCode);
            if (data === "SUCCESS") {
                const user = await Auth.signIn(email, password);
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
        dispatch({type: "TOGGLE_SIGN_IN"});
    }
    function toggleSignUpHandler() {
        dispatch({type: "TOGGLE_SIGN_UP"});
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
            {/* <div className="login_logo">
                <img src={Logo} alt="logo"/>
            </div> */}
            <section className="auth">
            {formType === "signIn" && <div className="register_container">
                <form onSubmit={signInHandler}>
                <h2>Вход</h2>
    
                        <Input name="username"
                               type="email"
                               placeholder="Введите адрес электронной почты"
                               onChange={onChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите пароль"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Войти</Button>
                    <div className="auth_links">
                        <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                        <Link to="#" onClick={togglePasswordHandler}>Забыли пароль?</Link>
                    </div>
                </form></div>}
                {formType === "signUp" &&
                <div className="register_container">
                    <h2>Регистрация</h2>
                    <form onSubmit={signUpHandler}>
                    <Input name="name"
                               type="text"
                               placeholder="Имя"
                               onChange={onChangeHandler}/>
                    <Input name="family_name"
                               type="text"
                               placeholder="Фамилия"
                               onChange={onChangeHandler}/>
                    <Input name="email"
                               type="email"
                               placeholder="E-mail"
                               onChange={onChangeHandler}/>
                    <Input name="phone_number"
                               type="text"
                               placeholder="Телефон"
                               onChange={onChangeHandler}/>
                    <Input name="password"
                               type="password"
                               placeholder="Пароль"
                               onChange={onChangeHandler}/>
                    <Button type="submit">Зарегистрироваться</Button>
                    <div className="auth_links">
                        <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                        <Link to="#" onClick={togglePasswordHandler}>Забыли пароль?</Link>
                    </div>
                    </form>
                </div>}
                {formType === "confirmSignUp" && <div className="register_container">
                <h2>Проверочный код</h2>
                <form onSubmit={confirmSignUpHandler}>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Отправить код</Button>
                        <div className="auth_links">
                        <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                        <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                    </div>
                </form></div>}
                {formType === "togglePassword" && <div className="register_container">
                <h2>Запросить сброс пароля</h2>
                <form onSubmit={forgotPasswordHandler}>
                        <Input name="username"
                               type="string"
                               placeholder="Введите ваш email"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Получить код сброса пароля</Button>
                        <div className="auth_links">
                        <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                        <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                    </div>
                </form></div>}
                {formType === "confirmForgotPassword" && <div className="register_container">
                <form onSubmit={confirmForgotPasswordHandler}>
                <h2>Сброс пароля</h2>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               onChange={onChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите новый пароль"
                               onChange={onChangeHandler}/>
                        <Button type="submit">Установить новый пароль</Button>
                        <div className="auth_links">
                        <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                        <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                    </div>
                </form></div>}
                {formType === "signedIn" && <Redirect to="/"/>}

            </section>
        </>
    )
}
