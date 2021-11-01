import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MenuItem } from "../../store/menu/menu.types";
import Navigation from "../../components/navigation/Navigation";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";
import { useState, useEffect } from "react";
import { fetchMenuItems } from "../../store/menu/menu.actions";
import  Contacts  from '../../components/contacts/Contacts';
import  Footer  from '../../components/footer/Footer';
import { useSelector } from "react-redux";
import { AppStateType } from "../../store";
import { AuthStateType } from "../../store/auth/auth.reducer";
import Modal from "../../components/common/modal/Modal";
import LoginForm from "../login/loginForm/LoginForm";

interface MenuProps extends RouteComponentProps {
  items: MenuItem[];
}

type MenuPathType = "/menu/breakfast" | "/menu" | "/menu/bar" | "/menu/catch";

const PATH = ["/menu/breakfast", "/menu", "/menu/bar", "/menu/catch"];

const PATH_NAMES = ["Завтраки", "Основное меню", "Меню бара", "Улов недели"];

const Menu = ({ location }: MenuProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, []);
  const [modalActive, setModalActive] = useState<Boolean>(false);
  const user = useSelector<AppStateType, AuthStateType>(state => state.auth.user);
  const items = useAppSelector((state) => state.menu.items);

  const currentPath = location.pathname as MenuPathType;
  const activeLink = PATH.indexOf(currentPath);

  const filteredItems = items.filter((item) =>
    item.categories.includes(activeLink + 1)
  );
  const onOrder = () => {
    (user === null) ? setModalActive(true) : alert("You are auth user so You can make an order")
    console.log("ordered");
  };

  return (
    <>
      <Navigation />
      <div className="menu">
        <div className="menu_wrapper">
          <h2 className="menu_title">Меню</h2>
          <div className="tabs">
            {PATH_NAMES.map((path, index) => {
              const isActive = index === activeLink;
              return (
                <Link
                  className={isActive ? "menu_active_link" : undefined}
                  key={path}
                  to={PATH[index]}
                >
                  {path}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="item_container_wrapper">
          {filteredItems.map((item) => (
            <MenuItemComponent {...item} onOrder={onOrder} />
          ))}
        </div>
        <Modal active={modalActive} setActive={setModalActive} title={"Для оформления заказа, пожалуйста, войдите или зарегистрируйтесь"}><LoginForm isRedirect={false} callback={setModalActive} /></Modal>
      </div>
      <Contacts />
      <Footer />
    </>
  );
};

export default Menu;
// import { Link, RouteComponentProps } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../../store/hooks";
// import { AppStateType } from "../../store";
// import { MenuItem } from "../../store/menu/menu.types";
// import Navigation from "../../components/navigation/Navigation";
// import MenuItemComponent from "./MenuItem";
// import "./menu.scss";
// import { useEffect } from "react";
// import { fetchMenuItems } from "../../store/menu/menu.actions";

// interface MenuProps extends RouteComponentProps {
//   items: MenuItem[];
// }

// type MenuPathType = "/menu/breakfast" | "/menu" | "/menu/bar" | "/menu/catch";

// const PATH = ["/menu/breakfast", "/menu", "/menu/bar", "/menu/catch"];

// const PATH_NAMES = ["Завтраки", "Основное меню", "Меню бара", "Улов недели"];

// const Menu = ({ location }: MenuProps) => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchMenuItems());
//   }, []);

//   const items = useAppSelector((state) => state.menu.items);

//   const currentPath = location.pathname as MenuPathType;
//   const activeLink = PATH.indexOf(currentPath);

//   const filteredItems = items.filter((item) =>
//     item.categories.includes(activeLink + 1)
//   );

//   return (
//     <>
//       <Navigation />
//       <div className="menu_wrapper">
//         <h2 className="menu_title">Меню</h2>
//         <div className="tabs">
//           {PATH_NAMES.map((path, index) => {
//             const isActive = index === activeLink;
//             return (
//               <Link
//                 className={isActive ? "menu_active_link" : undefined}
//                 key={path}
//                 to={PATH[index]}
//               >
//                 {path}
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//       <div className="item_container_wrapper">
//         {filteredItems.map((item) => (
//           <MenuItemComponent {...item} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Menu;

