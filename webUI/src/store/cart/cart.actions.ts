import { AppDispatch } from "..";
import { MenuItem } from "../../store/menu/menu.types";
import { CartConstants, ICartItem } from "./cart.types";

export const addToCart =
  (item: MenuItem, items: ICartItem[]) => (dispatch: AppDispatch) => {
    let sameItem = items.find((i) => (i.id === item.id) && (i.excluded_ingredients.join() === item.excluded_ingredients.join()));
    if (sameItem) {
      //если ингредиенты в корзине и в настройках нового блюда, добавляемого в корзину, совпадают
      // нужно найти в корзине нужное блюдо и инкрементировать его количество
      dispatch({ type: CartConstants.ADD_SAME_DISH, payload: { ...item, amount: sameItem.amount + 1 }});
    } else {
      dispatch({ type: CartConstants.ADD_TO_CART, payload: { ...item, amount: 1}});
    }
  };

export const omitIngredient = (id: number, idx: number, ingredient: String) => (dispatch: AppDispatch) => {
  dispatch({ type: CartConstants.OMIT_INGREDIENT, payload: { id, idx, ingredient }});
}
export const pickIngredient = (id: number, idx: number, ingredient: String) => (dispatch: AppDispatch) => {
  dispatch({ type: CartConstants.PICK_INGREDIENT, payload: { id, idx, ingredient }});
}

export const deleteFromCart = (id: number, idx: number) => (dispatch: AppDispatch) => {
  dispatch({ type: CartConstants.REMOVE_FROM_CART, payload: {id, idx } });
};

export const incrementNumOfDishes = (id: number, idx: number) => (dispatch: AppDispatch) => {
  dispatch({ type: CartConstants.INCREMENT_NUMBER_OF_DISHES, payload: {id, idx } });
};

export const decrementNumofDishes = (id: number, idx: number) => (dispatch: AppDispatch) => {
  dispatch({ type: CartConstants.DECREMENT_NUMBER_OF_DISHES, payload: {id, idx } });
};

export const clearCart = () => (dispatch: AppDispatch) => {
  dispatch({type: CartConstants.CLEAR_CART, payload: []})
}

