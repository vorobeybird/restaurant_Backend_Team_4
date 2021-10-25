import Contacts from "../../components/contacts/Contacts";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import Navigation from "../../components/navigation/Navigation";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Header />
      <Main />
      <Contacts />
      <Footer />
    </>
  );
};

export default MainPage;
