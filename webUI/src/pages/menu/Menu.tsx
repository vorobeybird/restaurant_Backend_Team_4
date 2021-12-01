import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import store, { AppStateType } from "../../store";
import { Category, MenuItem } from "../../store/menu/menu.types";
import MenuItemComponent from "./MenuItem";
import "./menu.scss";
import { fetchCategories, fetchDishes, setSelectedCategory } from "../../store/menu/menu.actions";
import { useEffect, useState } from "react";
import { setSelectedDish } from "../../store/dishPage/dishPage.actions";
import { ICartItem } from "../../store/cart/cart.types";

interface MenuProps extends RouteComponentProps {
  items: MenuItem[];
}

const Menu = ({ location }: MenuProps) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDishes());
  }, []);

  const handleDishClick = (item: ICartItem | MenuItem) => {
    dispatch(setSelectedDish(item));
  }

  const items = useAppSelector((state) => state.menu.items);
  const locations = useAppSelector((state) => state.menu.categories.map((item: Category) =>`/menu/${item.id}`));
  const currentPath = location.pathname; 
  const activeLink = useAppSelector((state) => state.menu.selectedCategory)

  const filteredItems = items.filter((item) =>(
    item.category.some(category => category.id  === activeLink)
  ));

  const setCategory = (id: number) => {
    dispatch(setSelectedCategory(id))
  }

  return (
    <>
      <div className="menu">
        <div className="menu_wrapper">
          <h2 className="menu_title">Меню</h2>
          <div className="tabs">
            {useAppSelector((state) => state.menu.categories.map((item) => {
              const isActive = activeLink === item.id;
              if(item.show_in_menu) {
                return (
                  <div
                    className={isActive ? "menu_active_link" : undefined}
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.title}
                  </div>
                );
              }
              
            }))}
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