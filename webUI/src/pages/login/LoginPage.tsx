import "./login.scss";
import Logo from "../../assets/header_logo.png";
import Navigation from "../../components/navigation/Navigation";
import LoginForm from "./loginForm/LoginForm";

export function LoginPage() {




  return (
    <>
      <Navigation />
      <div className="login_logo">
        <img src={Logo} alt="logo" />
      </div>
      <LoginForm isRedirect={true} />
    </>
  )
}
