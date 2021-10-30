import { AppDispatch } from ".."
import { MenuItem } from "../../features/menu/menu.types"
import { CartConstants } from "./cart.types"

export const addToCart = (item: MenuItem) => (dispatch: AppDispatch) => {
  
  dispatch({type: CartConstants.ADD_TO_CART, payload: item})
}

export const deleteFromCart = (id: number) => (dispatch: AppDispatch) => {
  dispatch({type: CartConstants.REMOVE_FROM_CART, payload: id})
}