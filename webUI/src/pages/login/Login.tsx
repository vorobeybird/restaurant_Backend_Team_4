import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Input from "../../components/common/input/Input";
import { Button } from "../../components/common/button/Button";
import Navigation from "../../components/navigation/Navigation";

const Login = () => {
  const onChange = () => {
    console.log("changed");
  };

  const signIn = () => {
    console.log("sign in!");
  };

  const register = () => {
    console.log("register!");
  };

  return (
    <>
      <Navigation />
      <div className="login_logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="common_container">
        <div className="sign_in_container">
          <p>Вход</p>
          <Input placeholder="Электронная почта" onChange={onChange} />
          <div>
            <Input placeholder="Пароль" onChange={onChange} />
            <div className="forgot_password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <Button onClick={signIn}>Войти</Button>
        </div>
        <div className="line"></div>
        <div className="register_container">
          <p>Регистрация</p>
          <Input placeholder="Имя" onChange={onChange} />
          <Input placeholder="Фамилия" onChange={onChange} />
          <Input placeholder="Электронная почта" onChange={onChange} />
          <Input placeholder="Телефон" onChange={onChange} />
          <Input placeholder="Пароль" onChange={onChange} />
          <Button onClick={register}>Зарегистрироваться</Button>
        </div>
      </div>
    </>
  );
};

export default Login;
