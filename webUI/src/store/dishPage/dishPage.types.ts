import { MenuItem } from "../../store/menu/menu.types";
import { ICartItem} from "../../store/cart/cart.types";

export interface ReducerState {
  selectedDish: ICartItem
}

export enum MenuConstants {
  SET_SELECTED_DISH = 'SET_SELECTED_DISH',
}

export interface MenuActions {
  type: MenuConstants
  payload: ICartItem
}