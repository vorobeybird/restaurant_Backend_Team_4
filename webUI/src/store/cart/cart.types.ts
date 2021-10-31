import { MenuItem } from "../../store/menu/menu.types";

export enum CartConstants {
  ADD_TO_CART = 'ADD_TO_CART',
  INCREMENT_NUMBER_OF_DISHES = 'INCREMENT_NUMBER_OF_DISHES',
  REMOVE_FROM_CART = "REMOVE_FROM_CART"
}

export interface ICartItem extends MenuItem {
  amount: number
}

export interface ReducerState {
  items: ICartItem[]
}