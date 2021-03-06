import { MenuItem } from "../../store/menu/menu.types";

export enum CartConstants {
  ADD_TO_CART = "ADD_TO_CART",
  INCREMENT_NUMBER_OF_DISHES = "INCREMENT_NUMBER_OF_DISHES",
  DECREMENT_NUMBER_OF_DISHES = "DECREMENT_NUMBER_OF_DISHES",
  ADD_SAME_DISH = "ADD_SAME_DISH",
  ADD_SAME_DISH_MODIFIED = "ADD_SAME_DISH_MODIFIED",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART",
  OMIT_INGREDIENT = "OMIT_INGREDIENT",
  PICK_INGREDIENT = "PICK_INGREDIENT",
}

export interface ICartItem extends MenuItem {
  amount: number;
  excluded_ingredients: string[];
}

export interface ReducerState {
  items: ICartItem[];
}
