import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import store, { AppStateType } from "../../store";
import { Category, MenuItem } from "../../store/menu/menu.types";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";
import { fetchCategories, fetchDishes } from "../../store/menu/menu.actions";
import { useEffect, useState } from "react";
import { setSelectedDish } from "../../store/dishPage/dishPage.actions";
import { ICartItem } from "../../store/cart/cart.types";

interface MenuProps extends RouteComponentProps {
  items: MenuItem[];
}

//type MenuPathType = "/menu/breakfast" | "/menu" | "/menu/bar" | "/menu/catch";

//const PATH = ["/menu/breakfast", "/menu", "/menu/bar", "/menu/catch"];

const Menu = ({ location }: MenuProps) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDishes());
  }, []);

  const handleDishClick = (item: ICartItem | MenuItem) => {
    dispatch(setSelectedDish(item));
  }

  // const categories = useAppSelector((state) => state.menu.categories.map((item) => item.title));

  const items = useAppSelector((state) => state.menu.items);

  const locations = useAppSelector((state) => state.menu.categories.map((item: Category) =>`/menu/${item.id}`));

  const currentPath = location.pathname; //MenuPathType;
  // const activeLink = locations.indexOf(currentPath);

  // const filteredItems = items.filter((item) =>
  //   item.categories.includes(activeLink + 1)
  // );

  return (
    <>
      <div className="menu">
        <div className="menu_wrapper">
          <h2 className="menu_title">Меню</h2>
          <div className="tabs">
            {useAppSelector((state) => state.menu.categories.map((item) => {
              const isActive = `/menu/${item.id}` === currentPath;
              return (
                <Link
                  className={isActive ? "menu_active_link" : undefined}
                  key={item.id}
                  to={`/menu/${item.id}`}
                >
                  {item.title}
                </Link>
              );
            }))}
          </div>
        </div>
        <div className="item_container_wrapper">
          {/* {filteredItems.map((item, index) => (
            <Link to="/dishPage" className="dish-link" onClick={() => handleDishClick(item)}>
              <MenuItemComponent {...item} key={index} />
            </Link>
          ))} */}

          

        </div>
      </div>
    </>
  );
};

export default Menu;