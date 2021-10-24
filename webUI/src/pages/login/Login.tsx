import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Input from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import Navigation from "../../components/navigation/Navigation";
import {ChangeEvent, FormEvent} from "react";
import {useDispatch, useSelector} from "react-redux";

// imports for aws authentication
import {Auth} from 'aws-amplify';
import {AppStateType} from "../../store";
import {AuthStateType} from "../../store/auth/auth.reducer";

export function Authentication() {
    console.log("Auth rendering")
    const dispatch = useDispatch();
    const authState = useSelector<AppStateType, AuthStateType>(state => state.auth)
    const {formType} = authState;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "UPDATE_STATE", payload: {name: e.target.name, value: e.target.value}})
    }

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
            const {username, confirmCode} = authState;
            await Auth.confirmSignUp(username, confirmCode);
            dispatch({type: "CONFIRM_SIGN_UP"});
        } catch (err) {
            console.log(err);
        }
    }

    async function signInHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const {username, password} = authState;
            const user = await Auth.signIn(username, password);
            dispatch({type: "SIGN_IN", payload: user})
        } catch (err) {
            console.log(err);
        }
    }

    async function sighOutHandler() {
        try {
            await Auth.signOut();
        } catch (err) {
            console.log(err);
        }
    }

    function toggleSignInHandler() {
        dispatch({type: "TOGGLE"})
    }

    return (
        <>
            <Navigation/>
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
                        <Button onClick={toggleSignInHandler} type="submit">Sign In</Button>
                    </div>
                </div>}
                {formType === "confirmSignUp" &&
                <form onSubmit={confirmSignUpHandler}>
                    <div>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               onChange={onChangeHandler}/>
                        <Button type="button">Отправить код</Button>
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
                        <p>Хотите зарегистрировать аккаунт OceanBar?</p>
                        <Button onClick={toggleSignInHandler} type="button">Sign Up</Button>
                    </div>
                </form>}
                {formType === "signedIn" &&
                <div>
                    <h1>Welcome to the OceanBar</h1>
                    <Button type="button" onClick={sighOutHandler}>Выйти</Button>
                </div>}
            </section>
        </>

    )
}
