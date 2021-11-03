import { MenuItem } from "../../store/menu/menu.types";

export interface ReducerState {
  selectedDish: MenuItem
}

export enum MenuConstants {
  SET_SELECTED_DISH = 'SET_SELECTED_DISH',
}

export interface MenuActions {
  type: MenuConstants
  payload: MenuItem
}