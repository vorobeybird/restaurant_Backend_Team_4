import React, { useEffect, useState } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { ICartItem } from "../../store/cart/cart.types";
import Carousel from "@brainhubeu/react-carousel";

const DishPage = () => {
    interface MenuItem {
        id: number
        title: string;
        default_ingredients: string;
        ingredients: number[];
        price: number;
        weight: number;
        categories: number[];
        calories: number;
        photos: {
            photo_url: string,
            ordinal_num: number
            width: number,
            height: number
        }[];
    }
    const selectedDish: ICartItem = useAppSelector((state) => state.dishPage.selectedDish)
    
    const [gearState, setGearState] = useState(false);
    const [pickedIngredients, setPickedIngredients] = useState<number[]>(
        [...selectedDish.ingredients].sort()
    );

    const onGear = () => setGearState(!gearState);

    return (
        <div className="dish-page">
            <div className="dish-page__container">
                <div className="bread-crumbs"></div>
                <div className="dish-title">{selectedDish.title}</div>
                <div className="dish-item-container">
                    <div className="dish-item-photos">
                        <Carousel plugins={["arrows"]}>
                            {selectedDish.photos.map((photo, index) => {
                                return <img key={index} src={photo.photo_url} alt="dish" />;
                            })}
                        </Carousel>
                    </div>
                    <div className="dish-item-info">

                    </div>
                </div>
                {/* <CartItem {...selectedDish}/> */}
                <div className="may-interest"></div>
            </div>
        </div>
    )
}

export default DishPage;