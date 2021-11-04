import React, { useEffect, useState } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { ICartItem } from "../../store/cart/cart.types";
import Carousel from "@brainhubeu/react-carousel";
import { ImageSlider } from "../imageSlider/imageSlider";

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
    
    // const [gearState, setGearState] = useState(false);
    // const [pickedIngredients, setPickedIngredients] = useState<number[]>(
    //     [...selectedDish.ingredients].sort()
    // );

    // const onGear = () => setGearState(!gearState);

    const sliderData: {image: string}[] = selectedDish.photos.map((photo, index) => {
        return { image: photo.photo_url };
    })

    return (
        <div className="dish-page">
            <div className="dish-page__container">
                <div className="bread-crumbs"></div>
                <div className="dish-title">{selectedDish.title}</div>
                <div className="dish-item-container">
                    <div className="dish-item-photos">
                        {<ImageSlider sliderData={sliderData} />}
                    </div>
                    <div className="dish-item-info">
                        <div className="dish-gear_wrapper">
                            <div className="gear-title">Состав</div>
                            <button className="gear-button">Изменить</button>
                        </div>
                        
                    </div>
                </div>
                <div className="may-interest"></div>
            </div>
        </div>
    )
}

export default DishPage;