import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Input from "../../components/common/input/Input";
import {Button} from "../../components/common/button/Button";
import Navigation from "../../components/navigation/Navigation";
import {ChangeEvent, useEffect, useState} from "react";
// imports for aws authentication
import {Auth, Hub} from 'aws-amplify';

const initialFromState = {
    username: "",
    password: "",
    confirmCode: "",
    formType: "signUp",
}

function Authentication() {
    const [formState, updateFormState] = useState(initialFromState);
    const [user, updateUser] = useState(null)
    useEffect(()=>{
        checkUser();
        setAuthListener();
    }, [])

    async function setAuthListener(){
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    console.log('user signed in');
                    break;
                case 'signUp':
                    console.log('user signed up');
                    break;
                case 'signOut':
                    updateFormState(state=>{
                        return {...state, formType: "signUp"}
                    })
                    break;
                case 'signIn_failure':
                    console.log('user sign in failed');
                    break;
                case 'configured':
                    console.log('the Auth module is configured');
            }
        });
    }

    async function checkUser(){
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user)
            updateUser(user);
            updateFormState(() => ({...formState, formType: "signedIn"}));
        }
        catch (err){
            // updateUser(null);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        updateFormState((state) => {
            return {...state, [e.target.name]: e.target.value}
        })
    }
    const {formType} = formState;

    async function signUpHandler() {
        try {
            const {username, password} = formState;
            await Auth.signUp({username, password});
            // можем добавить объект со свойством attributes
            updateFormState(() => ({...formState, formType: "confirmSignUp"}))
        } catch (err) {
            console.log(err)
        }
    }

    async function confirmSignUpHandler() {
        const {username, confirmCode} = formState;
        await Auth.confirmSignUp(username, confirmCode);
        updateFormState(() => ({...formState, formType: "signIn"}));
    }

    async function signInHandler() {
        const {username, password} = formState;
        await Auth.signIn(username, password);
        updateFormState(() => ({...formState, formType: "signedIn"}));
    }

    async function sighOutHandler() {
        await Auth.signOut();
    }
    function toggleSignInHandler(){
        updateFormState((state)=>{
            return {...state, formType: "signIn"}
        })
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
                    <Input name="username"
                           type="email"
                           placeholder="Введите адрес электронной почты"
                           onChange={onChangeHandler}/>
                    <Input name="password"
                           type="password"
                           placeholder="Введите пароль"
                           onChange={onChangeHandler}/>
                    <Button type="button" onClick={signUpHandler}>Зарегистрироваться</Button>
                    <div>
                        <p>У вас уже есть аккаунт OceanBar?</p>
                        <Button onClick={toggleSignInHandler} type="button">Sign In</Button>
                    </div>
                </div>}
                {formType === "confirmSignUp" &&
                <div>
                    <Input name="confirmCode"
                           type="number"
                           placeholder="Введите код подтверждения"
                           onChange={onChangeHandler}/>
                    <Button type="button" onClick={confirmSignUpHandler}>Отправить код</Button>
                </div>}
                {formType === "signIn" &&
                <div>
                    <Input name="username"
                           type="email"
                           placeholder="Введите адрес электронной почты"
                           onChange={onChangeHandler}/>
                    <Input name="password"
                           type="password"
                           placeholder="Введите пароль"
                           onChange={onChangeHandler}/>
                    <Button type="button" onClick={signInHandler}>Войти</Button>
                </div>}
                {formType === "signedIn" &&
                <div>
                    <h1>Welcome to the OceanBar</h1>
                    <Button type="button" onClick={sighOutHandler}>Выйти</Button>
                </div>}

            </section>
        </>

    )
}

//
// function Login() {
//
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   const [confirmCode, setConfirmCode] = useState("");
//   const [userSignInEmail, setUserSignInEmail] = useState("");
//   const [userSignInPassword, setUserSignInPassword] = useState("");
//
//   const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//     setUserEmail(e.currentTarget.value);
//   }
//
//   const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//     setUserPassword(e.currentTarget.value);
//   }
//
//   const confirmCodeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setConfirmCode(e.currentTarget.value);
//   }
//
//   const emailSignInChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//     setUserSignInEmail(e.currentTarget.value);
//   }
//
//   const passwordSignInChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//     setUserSignInPassword(e.currentTarget.value);
//   }
//
//   const signInHandler = async (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     try {
//       const user = await Auth.signIn(userSignInEmail, userSignInPassword);
//       console.log(user)
//     } catch (error) {
//       console.log('error signing in', error);
//     }
//   };
//
//   const signUpHandler = async (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     try {
//       const {user} = await Auth.signUp({
//         username: userEmail,
//         password: userPassword,
//         attributes: {
//           email: userEmail,          // optional
//           // phone_number,   // optional - E.164 number convention
//           // other custom attributes
//         }
//       });
//       console.log(user);
//     } catch (error) {
//       console.log('error signing up:', error);
//     }
//     setUserPassword("");
//   }
//
//   const confirmCodeHandler = async (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     try {
//       const confirm = await Auth.confirmSignUp(userEmail, confirmCode);
//       console.log(confirm);
//     } catch (error) {
//       console.log('error confirming sign up', error);
//     }
//   }
//
//   //function for signOut
//   //
//   // async function signOut() {
//   //   try {
//   //     await Auth.signOut();
//   //   } catch (error) {
//   //     console.log('error signing out: ', error);
//   //   }
//   // }
//
//   //function for global signOut
//   // async function signOut() {
//   //   try {
//   //     await Auth.signOut({ global: true });
//   //   } catch (error) {
//   //     console.log('error signing out: ', error);
//   //   }
//   // }
//
//   return (
//     <>
//       <Navigation/>
//       <div className="login_logo">
//         <img src={Logo} alt="logo"/>
//       </div>
//       <div className="common_container">
//         <div className="sign_in_container">
//           <form>
//             <h3>Вход</h3>
//             <Input value={userSignInEmail} type="email" placeholder="Электронная почта"
//                    onChange={emailSignInChangeHandler}/>
//             <div>
//               <Input value={userSignInPassword} type="password" placeholder="Пароль"
//                      onChange={passwordSignInChangeHandler}/>
//               <div className="forgot_password">
//                 <a href="#">Forgot password?</a>
//               </div>
//             </div>
//             <Button type="submit" onClick={signInHandler}>Войти</Button>
//           </form>
//         </div>
//         <div className="line"></div>
//         <div className="register_container">
//           <form action="">
//             <h3>Регистрация</h3>
//             {/*<Input placeholder="Имя" onChange={onChange}/>*/}
//             {/*<Input placeholder="Фамилия" onChange={onChange}/>*/}
//             <Input value={userEmail} type='text' placeholder="Электронная почта" onChange={emailChangeHandler}/>
//             {/*<Input placeholder="Телефон" onChange={onChange}/>*/}
//             <Input value={userPassword} type="password" placeholder="Пароль" onChange={passwordChangeHandler}/>
//             <Button type="submit" onClick={signUpHandler}>Зарегистрироваться</Button>
//           </form>
//           <div className="confirmCode">
//             <form>
//               <h3>Введите код подтверждения</h3>
//               <Input value={confirmCode} type="number" placeholder="Код подтверждения"
//                      onChange={confirmCodeChangeHandler}/>
//               <Button type="submit" onClick={confirmCodeHandler}>Отправить код подтверждения</Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default Login;
export default Authentication;