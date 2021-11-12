import { ICartItem } from "../cart/cart.types";

export interface MenuItem {
  id: number
  title: string;
  price: number;
  weight: number;
  calories: number;
  category: {
    id: number,
    title: string,
    show_in_menu: boolean
  }[];
  photo: {
    id: number,
    dish_id: number,
    photo_url: string,
    ordinal_num: number,
    width: number,
    height: number,
    public_id: string
  }[];
  ingredient: {
    id: number,
    title: string,
    DishIngredient: {
      is_default: boolean
    }
  }[];
}

export interface Category {
  id: number,
  title: string,
  show_in_menu: boolean,
  dish: []
}

export enum MenuConstants {
  GET_DISHES = 'GET_DISHES',
  GET_CATEGORIES = "GET_CATEGORIES",
  SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY"
}

export interface ReducerState {
  items: MenuItem[],
  categories: Category[]
  selectedCategory: number
}

export interface Response {
  data: MenuItem[] | Category[] | number,
  status: number
}

export interface MenuActions {
  type: MenuConstants,
  payload: MenuItem[] | Category[] | number
} 
