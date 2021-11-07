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
      is_defaul: boolean
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



// [
//   {
//       "id": 1,
//       "title": "Главные блюда",
//       "show_in_menu": true,
//       "dish": [
//           {
//               "id": 1,
//               "title": "Креветки",
//               "price": 40,
//               "weight": 300,
//               "calories": 1000
//           }
//       ]
//   },
//   {
//       "id": 2,
//       "title": "Супы",
//       "show_in_menu": false,
//       "dish": []
//   },
//   {
//       "id": 3,
//       "title": "Морепродукты",
//       "show_in_menu": true,
//       "dish": [
//           {
//               "id": 2,
//               "title": "Сардины",
//               "price": 40,
//               "weight": 300,
//               "calories": 1000
//           },
//           {
//               "id": 1,
//               "title": "Креветки",
//               "price": 40,
//               "weight": 300,
//               "calories": 1000
//           }
//       ]
//   },
//   {
//       "id": 4,
//       "title": "Englishfood",
//       "show_in_menu": true,
//       "dish": []
//   }
// ]