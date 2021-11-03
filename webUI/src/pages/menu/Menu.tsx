import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { AppStateType } from "../../store";
import { MenuItem } from "../../store/menu/menu.types";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";
import { fetchMenuItems } from "../../store/menu/menu.actions";
import { useEffect, useState } from "react";
import { setSelectedDish } from "../../store/dishPage/dishPage.actions";

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

  const handleDishClick = (item : MenuItem) => {
    dispatch(setSelectedDish(item));
  }

  const items = useAppSelector((state) => state.menu.items);

  const currentPath = location.pathname as MenuPathType;
  const activeLink = PATH.indexOf(currentPath);

  const filteredItems = items.filter((item) =>
    item.categories.includes(activeLink + 1)
  );

  return (
    <>
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
          {filteredItems.map((item, index) => (
            <Link to="/dishPage" className="dish-link" onClick={() => handleDishClick(item)}>
              <MenuItemComponent {...item} key={index} />
            </Link>
            
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;