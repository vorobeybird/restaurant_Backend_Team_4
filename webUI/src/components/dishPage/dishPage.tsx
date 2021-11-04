import React, { useEffect } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { ICartItem } from "../../store/cart/cart.types";

const DishPage = () => {
    const selectedDish: ICartItem = useAppSelector((state) => state.dishPage.selectedDish)
    return (
        <div className="dish-page">
            <div className="dish-page__container">
                <div className="bread-crumbs"></div>
                <CartItem {...selectedDish}/>
            </div>
        </div>
    )
}

export default DishPage;