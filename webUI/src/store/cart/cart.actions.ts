import { AppDispatch } from ".."
import { MenuItem } from "../../store/menu/menu.types"
import { CartConstants, ICartItem } from "./cart.types"

export const addToCart = (item: MenuItem, items: ICartItem[]) => (dispatch: AppDispatch) => {
  let newItem = items.find((currentItem) => currentItem.id === item.id)
  if(newItem) {
    dispatch({type: CartConstants.INCREMENT_NUMBER_OF_DISHES, payload: {...newItem, amount: newItem.amount + 1}})
  }
  else {
    dispatch({type: CartConstants.ADD_TO_CART, payload: {...item, amount: 1}})
  }
}

export const deleteFromCart = (id: number) => (dispatch: AppDispatch) => {
  dispatch({type: CartConstants.REMOVE_FROM_CART, payload: id})
}