import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MenuItem } from "../../store/menu/menu.types";
import Navigation from "../../components/navigation/Navigation";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";
import { useEffect } from "react";
import { fetchMenuItems } from "../../store/menu/menu.actions";

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

  const items = useAppSelector((state) => state.menu.items);

  const currentPath = location.pathname as MenuPathType;
  const activeLink = PATH.indexOf(currentPath);

  const filteredItems = items.filter((item) =>
    item.categories.includes(activeLink + 1)
  );

  return (
    <>
      <Navigation />
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
          <MenuItemComponent {...item} />
        ))}
      </div>
    </>
  );
};

export default Menu;
