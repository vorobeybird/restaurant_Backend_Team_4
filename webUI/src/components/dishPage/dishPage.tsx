import React, { useEffect, useState } from "react";
import "./dishPage.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MenuItemComponent from "../../pages/menu/MenuItem";
import { CartItem } from "../cartItem/cartItem";
import { ICartItem } from "../../store/cart/cart.types";
import { ImageSlider } from "../imageSlider/imageSlider";
import caloriesImg from "../../assets/calories-icon.png";
import { addToCart } from "../../store/cart/cart.actions";
import Modal from "../common/modal/Modal";

const DishPage = () => {
    interface Iingredients {
        id: number;
        title: string;
        DishIngredient: {
            is_default: boolean
        }
    }

    const selectedDish: ICartItem = useAppSelector((state) => state.dishPage.selectedDish)
    const [showModal, setShowModal] = useState(false);
    const [pickedIngredients, setPickedIngredients] = useState([...selectedDish.ingredient]);

    const modalOpen = () => setShowModal(!showModal);

    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cartItems.items);
    const onOrder = (item: ICartItem): void => {
        dispatch(addToCart(item, items));
    };

    const sliderData: {image: string}[] = selectedDish.photo.map((photo, index) => {
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
                            <button className="gear-button" onClick={modalOpen}>Изменить</button>
                        </div>
                        <div className="dish-description">
                            <div className="dish-ingredients">
                                { selectedDish.ingredient.map((item) => {
                                    return (
                                        <div className="ingredient-wrapper">
                                            <div className="ingredient-title"> {item.title}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="dish-calories">
                                <img src={caloriesImg} alt="calories-img" className="calories-img"/>
                                <div className="calories-amount">{selectedDish.calories} Ккал</div>
                            </div>
                            <div className="dish-price"> {selectedDish.price} BYN</div>
                        </div>
                        <button className="dish-item-info__btn" onClick={() => onOrder(selectedDish)}>Заказать</button>
                    </div>
                    <Modal active={showModal} setActive={setShowModal} title={"Изменить состав"}><div className="dish-modal-title">{selectedDish.title}</div>
                    <div className="ingredients-form">
                    <div className="ingredients-list">
                        {selectedDish.ingredient.map(item => <div className="ingredient-item"><label>{item.DishIngredient.is_default ? <input type="checkbox" className="ingredient-checkbox" checked disabled /> : <input type="checkbox" value={item.title} className="ingredient-checkbox" />}  {item.title}</label></div>)}
                            </div>
                            <div className="button-container"><button className="ingredients-edit__btn">Готово</button></div>

                    </div></Modal>
                </div>
                <div className="may-interest"></div>
            </div>
        </div>
    )
}

export default DishPage;