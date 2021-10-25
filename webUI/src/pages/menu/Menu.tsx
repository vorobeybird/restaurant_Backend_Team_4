import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";

import { AppStateType } from "../../store";
import { MenuItem } from "../../store/menu/menu.types";
import Navigation from "../../components/navigation/Navigation";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";

interface MenuProps extends RouteComponentProps {
  items: MenuItem[];
}

type MenuPathType = "/menu/breakfast" | "/menu" | "/menu/bar" | "/menu/catch";

const PATH = ["/menu/breakfast", "/menu", "/menu/bar", "/menu/catch"];

const PATH_NAMES = ["Завтраки", "Основное меню", "Меню бара", "Улов недели"];

const Menu = ({ items, location }: MenuProps) => {
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
        {filteredItems.map((item, index) => (
          <MenuItemComponent key={index} {...item} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (store: AppStateType) => ({ items: store.menu.items });

export default connect(mapStateToProps)(Menu);
