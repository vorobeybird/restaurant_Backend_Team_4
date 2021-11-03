import React, { useEffect } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";

const DishPage = () => {
    const selectedDish = useAppSelector((state) => state.dishPage.selectedDish)
    return (
        <div className="dish-page">
            <div className="dish-page__container">
                <div className="bread-crumbs"></div>
                <MenuItemComponent {...selectedDish}/>
            </div>
        </div>
    )
}

export default DishPage;