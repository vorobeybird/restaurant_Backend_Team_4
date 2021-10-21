export interface MenuItem {
  title: string;
  default_ingredients: string;
  ingredients: number[];
  price: number;
  weight: number;
  categories: number[];
  calories: number;
  photos: {
    photo_url: string,
    ordinal_num: number
    width: number, 
    height: number
  }[];
}

export enum MenuConstants {
  FETCH_ITEMS = 'FETCH_ITEMS',
}

export interface ReducerState {
  items: MenuItem[]
}

export interface Response {
  data: MenuItem[]
  status: number
}

export interface MenuActions {
  type: MenuConstants
  payload: MenuItem[]
} 