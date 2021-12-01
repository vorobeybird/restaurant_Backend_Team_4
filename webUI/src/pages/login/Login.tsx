import "./login.scss";
import Input from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import {ChangeEvent, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";

// imports for aws authentication
import {Auth} from "aws-amplify";
import {AppStateType} from "../../store";
import {AuthStateType} from "../../store/auth/auth.reducer";
import {Link, Redirect} from "react-router-dom";
import InputMask from "react-input-mask";

export function Authentication() {
    const dispatch = useDispatch();
    const authState = useSelector<AppStateType, AuthStateType>(
        (state) => state.auth
    );
    const {formType} = authState;

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userSecondName, setUserSecondName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");

    const [userEmailError, setUserEmailError] = useState("");
    const [userPasswordError, setUserPasswordError] = useState("");
    const [userFirstNameError, setUserFirstNameError] = useState("");
    const [userSecondNameError, setUserSecondNameError] = useState("");
    const [confirmationCodeError, setConfirmationCodeError] = useState("");

    const updatedPhone = userPhone.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll("_", "")

    let signInFormIsInvalid: boolean = true;
    let signUpFormIsInvalid: boolean = true;
    let confirmFormIsInvalid: boolean = true;
    let forgotPasswordFormIsInvalid: boolean = true;
    let confirmForgotPasswordFormIsInvalid: boolean = true;

    if (!userEmailError && !!userEmail.length &&
        !userPasswordError && !!userPassword.length) {
        signInFormIsInvalid = false;
    }
    if (!userEmailError && !!userEmail.length &&
        !userPasswordError && !!userPassword.length &&
        !userFirstNameError && !!userFirstName.length &&
        !userSecondNameError && !!userSecondName.length &&
        updatedPhone.length === 13) {
        signUpFormIsInvalid = false;
    }
    if (!confirmationCodeError && !!confirmationCode.length) {
        confirmFormIsInvalid = false;
    }
    if (!userEmailError && !!userEmail.length) {
        forgotPasswordFormIsInvalid = false;
    }
    if (!confirmationCodeError && !!confirmationCode &&
        !userPasswordError && !!userPassword) {
        confirmForgotPasswordFormIsInvalid = false;
    }

    const userEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value);
    }
    const userPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    }
    const userFirstNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(e.target.value);
    }
    const userSecondNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserSecondName(e.target.value);
    }
    const userPhoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPhone(e.target.value);
    }
    const confirmationCodeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmationCode(e.target.value);
    }

    async function signUpHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await Auth.signUp({
                username: userEmail,
                password: userPassword,
                attributes: {
                    name: userFirstName,
                    family_name: userSecondName,
                    email: userEmail,
                    phone_number: updatedPhone,
                    address: JSON.stringify({}),
                    "custom:card_number": JSON.stringify({}),
                }
            });
            dispatch({type: "SIGN_UP"});
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmSignUpHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = await Auth.confirmSignUp(userEmail, confirmationCode);
            if (data === "SUCCESS") {
                const user = await Auth.signIn(userEmail, userPassword);
                dispatch({type: "SIGN_IN", payload: user});
                setConfirmationCode("");
                setUserEmail("");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function signInHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const user = await Auth.signIn(userEmail, userPassword);
            dispatch({type: "SIGN_IN", payload: user});
            setUserEmail("");
            setUserPassword("");
        } catch (err) {
            console.log(err)
            toast.error("Не удалось авторизироваться. Неверное имя пользователя или пароль");
        }
    }

    const cleanFieldsHandler = () => {
        setUserEmail("");
        setUserPassword("");
        setUserFirstName("");
        setUserSecondName("");
        setUserPhone("");
        setConfirmationCode("");
        setUserEmailError("");
        setUserPasswordError("");
        setUserFirstNameError("");
        setUserSecondNameError("");
        setUserPhone("");
        setConfirmationCodeError("");
    }

    function toggleSignInHandler() {
        dispatch({type: "TOGGLE_SIGN_IN"});
        cleanFieldsHandler();
    }

    function toggleSignUpHandler() {
        dispatch({type: "TOGGLE_SIGN_UP"});
        cleanFieldsHandler();
    }

    function togglePasswordHandler() {
        dispatch({type: "TOGGLE_PASSWORD"})
        cleanFieldsHandler();
    }

    async function forgotPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await Auth.forgotPassword(userEmail);
            dispatch({type: "FORGOT_PASSWORD"});
        } catch (err) {
            console.log(err);
        }
    }

    async function confirmForgotPasswordHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await Auth.forgotPasswordSubmit(userEmail, confirmationCode, userPassword);
            dispatch({type: "CONFIRM_FORGOT_PASSWORD"});
        } catch (err) {
            console.log(err);
        }
    }

    const passwordErrorMessage = "Пароль должен содержать 8-15 символов с минимум одной цифрой, одной \n" +
        "заглавной и одной строчной буквой, без (#, %, &, !, $, etc.). Обязательно к заполнению.";
    const emailErrorMessage = "Электронная почта должна быть в формате xxx@yyy.zzz, без специальных символов (#, %, &, !, $, etc.). Обязательно к заполнению.";
    const userNameErrorMessage = "Это поле должно содержать 8-30 знаков, без специальных символов (#, %, &, !, $, etc.) и чисел (0-9). Обязательно к заполнению.";

    const passwordRegEx = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})/);
    const emailRegEx = new RegExp(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/);
    const nameRegEx = new RegExp("^([а-яА-Я]{2,30})");
    // const phoneNumberRegEx = new RegExp("^\\+375(\\s+)\\(?(17|29|33|44)\\)?(\\s+)[0-9]{3}-[0-9]{2}-[0-9]{2}$");
    const confirmationCodeRegEX = new RegExp(/\d{3}$/);

    const formatChar = {
        "A": "[234]",
        "B": "[3459]",
        "9": "[0-9]",
    }

    return (
        <>
            <section className="auth">
                {formType === "signIn" && <div className="register_container">
                    <form onSubmit={signInHandler}>
                        <h2>Вход</h2>
                        <Input name="username"
                               type="email"
                               placeholder="Введите адрес электронной почты"
                               value={userEmail}
                               error={userEmailError}
                               errorMessage={emailErrorMessage}
                               validationSchema={emailRegEx}
                               onError={setUserEmailError}
                               onChange={userEmailChangeHandler}/>
                        <Input name="password"
                               type="password"
                               value={userPassword}
                               placeholder="Введите пароль"
                               error={userPasswordError}
                               errorMessage={passwordErrorMessage}
                               validationSchema={passwordRegEx}
                               onError={setUserPasswordError}
                               onChange={userPasswordChangeHandler}
                               isToggled={true}/>
                        <Button disabled={signInFormIsInvalid} type="submit">Войти</Button>
                        <div className="auth_links">
                            <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                            <Link to="#" onClick={togglePasswordHandler}>Забыли пароль?</Link>
                        </div>
                    </form>
                </div>}
                {formType === "signUp" &&
                <div className="register_container">
                    <h2>Регистрация</h2>
                    <form onSubmit={signUpHandler}>
                        <Input name="name"
                               type="text"
                               placeholder="Имя"
                               value={userFirstName}
                               error={userFirstNameError}
                               errorMessage={userNameErrorMessage}
                               validationSchema={nameRegEx}
                               onError={setUserFirstNameError}
                               onChange={userFirstNameChangeHandler}/>
                        <Input name="family_name"
                               type="text"
                               placeholder="Фамилия"
                               value={userSecondName}
                               error={userSecondNameError}
                               errorMessage={userNameErrorMessage}
                               validationSchema={nameRegEx}
                               onError={setUserSecondNameError}
                               onChange={userSecondNameChangeHandler}/>
                        <Input name="username"
                               type="email"
                               placeholder="Введите адрес электронной почты"
                               value={userEmail}
                               error={userEmailError}
                               errorMessage={emailErrorMessage}
                               validationSchema={emailRegEx}
                               onError={setUserEmailError}
                               onChange={userEmailChangeHandler}/>
                        <InputMask
                            className="masked_input"
                            mask='+375 (AB) 999-99-99'
                            value={userPhone}
                            formatChars={formatChar}
                            alwaysShowMask={true}
                            onChange={userPhoneChangeHandler}>
                        </InputMask>
                        <Input name="password"
                               type="password"
                               placeholder="Введите пароль"
                               value={userPassword}
                               error={userPasswordError}
                               errorMessage={passwordErrorMessage}
                               validationSchema={passwordRegEx}
                               onError={setUserPasswordError}
                               onChange={userPasswordChangeHandler}
                               isToggled={true}/>
                        <Button disabled={signUpFormIsInvalid} type="submit">Зарегистрироваться</Button>
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
                               value={confirmationCode}
                               error={confirmationCodeError}
                               errorMessage="Код подтверждения должен содержать 6 цифр"
                               validationSchema={confirmationCodeRegEX}
                               onError={setConfirmationCodeError}
                               onChange={confirmationCodeChangeHandler}/>
                        <Button disabled={confirmFormIsInvalid} type="submit">Отправить код</Button>
                        <div className="auth_links">
                            <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                            <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                        </div>
                    </form>
                </div>}
                {formType === "togglePassword" && <div className="register_container">
                    <h2>Запросить сброс пароля</h2>
                    <form onSubmit={forgotPasswordHandler}>
                        <Input name="username"
                               type="string"
                               placeholder="Введите адрес электронной почты"
                               value={userEmail}
                               error={userEmailError}
                               errorMessage={emailErrorMessage}
                               validationSchema={emailRegEx}
                               onError={setUserEmailError}
                               onChange={userEmailChangeHandler}/>
                        <Button disabled={forgotPasswordFormIsInvalid} type="submit">Получить код сброса пароля</Button>
                        <div className="auth_links">
                            <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                            <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                        </div>
                    </form>
                </div>}
                {formType === "confirmForgotPassword" && <div className="register_container">
                    <form onSubmit={confirmForgotPasswordHandler}>
                        <h2>Сброс пароля</h2>
                        <Input name="confirmCode"
                               type="number"
                               placeholder="Введите код подтверждения"
                               value={confirmationCode}
                               error={confirmationCodeError}
                               errorMessage="Код подтверждения должен содержать 6 цифр"
                               validationSchema={confirmationCodeRegEX}
                               onError={setConfirmationCodeError}
                               onChange={confirmationCodeChangeHandler}/>
                        <Input name="password"
                               type="password"
                               placeholder="Введите новый пароль"
                               value={userPassword}
                               error={userPasswordError}
                               errorMessage={passwordErrorMessage}
                               validationSchema={passwordRegEx}
                               onError={setUserPasswordError}
                               onChange={userPasswordChangeHandler}/>
                        <Button disabled={confirmForgotPasswordFormIsInvalid} type="submit">Установить новый
                            пароль</Button>
                        <div className="auth_links">
                            <Link to="#" onClick={toggleSignInHandler}>Вход</Link>
                            <Link to="#" onClick={toggleSignUpHandler}>Регистрация</Link>
                        </div>
                    </form>
                </div>}
                {formType === "signedIn" && <Redirect to="/"/>}
            </section>
        </>
    )
}
